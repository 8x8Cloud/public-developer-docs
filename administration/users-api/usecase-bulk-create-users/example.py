import requests
import csv
import time
from typing import Dict, List, Optional, Tuple
from concurrent.futures import ThreadPoolExecutor, as_completed

def bulk_create_users(
    api_key: str,
    csv_file_path: str,
    site_id: str,
    base_url: str = "https://api.8x8.com",
    max_concurrent: int = 5
) -> Dict:
    """
    Create multiple users from CSV file with parallel processing.

    Args:
        api_key: Your API authentication key
        csv_file_path: Path to CSV file with user data (columns: firstName, lastName, email, department, jobTitle)
        site_id: Site ID to assign all users to
        base_url: API base URL (default: https://api.8x8.com)
        max_concurrent: Maximum concurrent requests (default: 5, max recommended: 10)

    Returns:
        Dict with summary: {
            'total': int,
            'successful': int,
            'failed': int,
            'results': List[Dict]
        }

    Example:
        summary = bulk_create_users(
            api_key="your-api-key",
            csv_file_path="new_employees.csv",
            site_id="SAH3U8guQaK4WQhpDZi0rQ"
        )
        print(f"Created {summary['successful']}/{summary['total']} users")
        for result in summary['results']:
            if result['status'] == 'failed':
                print(f"Failed: {result['email']} - {result['error']}")
    """
    headers = {
        'X-API-Key': api_key,
        'Content-Type': 'application/vnd.users.v1+json',
        'Accept': 'application/vnd.users.v1+json'
    }

    # Read and validate CSV
    users_data = []
    try:
        with open(csv_file_path, 'r') as f:
            reader = csv.DictReader(f)
            for row in reader:
                if not all(k in row for k in ['firstName', 'lastName', 'email']):
                    print(f"Skipping invalid row: {row}")
                    continue
                users_data.append(row)
    except Exception as e:
        return {
            'total': 0,
            'successful': 0,
            'failed': 0,
            'error': f"Failed to read CSV: {e}",
            'results': []
        }

    print(f"Loaded {len(users_data)} users from CSV")

    def create_single_user(user_data: Dict) -> Dict:
        """Create a single user and poll operation."""
        email = user_data['email']

        # Build user payload
        payload = {
            'basicInfo': {
                'userName': email,
                'firstName': user_data['firstName'],
                'lastName': user_data['lastName'],
                'primaryEmail': email,
                'status': 'ACTIVE',
                'site': {'id': site_id}
            }
        }

        # Add optional directory info if present
        if user_data.get('department') or user_data.get('jobTitle'):
            payload['directoryInfo'] = {}
            if user_data.get('department'):
                payload['directoryInfo']['department'] = user_data['department']
            if user_data.get('jobTitle'):
                payload['directoryInfo']['jobTitle'] = user_data['jobTitle']

        try:
            # Create user
            response = requests.post(
                f'{base_url}/users',
                headers=headers,
                json=payload,
                timeout=10
            )
            response.raise_for_status()

            operation_data = response.json()
            operation_id = operation_data.get('operationId')

            if not operation_id:
                return {
                    'email': email,
                    'status': 'failed',
                    'error': 'No operation ID returned'
                }

            # Poll operation with exponential backoff
            max_attempts = 30
            wait_time = 1

            for attempt in range(max_attempts):
                time.sleep(wait_time)

                poll_response = requests.get(
                    f'{base_url}/operations/{operation_id}',
                    headers=headers,
                    timeout=10
                )
                poll_response.raise_for_status()

                operation = poll_response.json()
                status = operation.get('status')

                if status == 'COMPLETED':
                    return {
                        'email': email,
                        'status': 'success',
                        'userId': operation.get('resourceId'),
                        'operationId': operation_id
                    }
                elif status == 'FAILED':
                    error_detail = operation.get('error', {}).get('detail', 'Unknown error')
                    return {
                        'email': email,
                        'status': 'failed',
                        'error': error_detail,
                        'operationId': operation_id
                    }

                # Exponential backoff, max 30 seconds
                wait_time = min(wait_time * 2, 30)

            return {
                'email': email,
                'status': 'failed',
                'error': 'Operation timeout after 5 minutes',
                'operationId': operation_id
            }

        except requests.exceptions.HTTPError as e:
            error_msg = f"HTTP {e.response.status_code}"
            if e.response is not None:
                try:
                    error_data = e.response.json()
                    error_msg = error_data.get('detail', error_msg)
                except:
                    pass
            return {
                'email': email,
                'status': 'failed',
                'error': error_msg
            }
        except Exception as e:
            return {
                'email': email,
                'status': 'failed',
                'error': str(e)
            }

    # Process users in parallel
    results = []
    successful = 0
    failed = 0

    print(f"Creating {len(users_data)} users with max {max_concurrent} concurrent requests...")

    with ThreadPoolExecutor(max_workers=max_concurrent) as executor:
        # Submit all tasks
        future_to_user = {
            executor.submit(create_single_user, user): user
            for user in users_data
        }

        # Process as they complete
        for i, future in enumerate(as_completed(future_to_user), 1):
            result = future.result()
            results.append(result)

            if result['status'] == 'success':
                successful += 1
                print(f"[{i}/{len(users_data)}] ✓ Created: {result['email']}")
            else:
                failed += 1
                print(f"[{i}/{len(users_data)}] ✗ Failed: {result['email']} - {result['error']}")

    # Generate summary
    summary = {
        'total': len(users_data),
        'successful': successful,
        'failed': failed,
        'results': results
    }

    print(f"\n=== Bulk Create Summary ===")
    print(f"Total: {summary['total']}")
    print(f"Successful: {summary['successful']}")
    print(f"Failed: {summary['failed']}")
    print(f"Success Rate: {(successful/len(users_data)*100):.1f}%")

    return summary
