"""
Complete user creation workflow with validation, error handling, and polling.

Requirements:
- Python 3.8+
- requests: pip install requests
"""
import requests
import time
import re
from typing import Optional, Dict


def validate_user_data(user_data: Dict) -> tuple[bool, Optional[str]]:
    """
    Validate user data before submission.

    Args:
        user_data: User data dictionary to validate

    Returns:
        Tuple of (is_valid: bool, error_message: Optional[str])
    """
    # Check required fields
    required_fields = ['userName', 'firstName', 'lastName', 'primaryEmail', 'siteId', 'siteName']
    for field in required_fields:
        if field not in user_data or not user_data[field]:
            return False, f"Missing required field: {field}"

    # Validate email format
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(email_pattern, user_data['primaryEmail']):
        return False, f"Invalid email format: {user_data['primaryEmail']}"

    return True, None


def create_user_complete(
    api_key: str,
    user_data: Dict,
    base_url: str = "https://api.8x8.com",
    poll_timeout: int = 300
) -> Optional[Dict]:
    """
    Complete user creation workflow: validate, create, poll, and verify.

    Args:
        api_key: Your API authentication key
        user_data: Dict with userName, firstName, lastName, primaryEmail, siteId, siteName,
                   and optional jobTitle, department
        base_url: API base URL (default: https://api.8x8.com)
        poll_timeout: Maximum time to wait for operation completion in seconds (default: 300)

    Returns:
        Dict containing the created user details, or None on error

    Example:
        user = create_user_complete("your-api-key", {
            'userName': 'jane.smith',
            'firstName': 'Jane',
            'lastName': 'Smith',
            'primaryEmail': 'jane.smith@example.com',
            'siteId': 'site-123',
            'siteName': 'San Francisco Office',
            'jobTitle': 'Software Engineer',
            'department': 'Engineering'
        })
        if user:
            print(f"User created successfully: {user['basicInfo']['userId']}")
        else:
            print("User creation failed")
    """
    # Step 1: Validate input data
    is_valid, error_msg = validate_user_data(user_data)
    if not is_valid:
        print(f"Validation error: {error_msg}")
        return None

    # Step 2: Submit user creation request
    headers = {
        'x-api-key': api_key,
        'Content-Type': 'application/vnd.users.v1+json',
        'Accept': 'application/vnd.users.v1+json'
    }

    request_body = {
        'basicInfo': {
            'userName': user_data['userName'],
            'firstName': user_data['firstName'],
            'lastName': user_data['lastName'],
            'primaryEmail': user_data['primaryEmail'],
            'status': 'active',
            'locale': user_data.get('locale', 'en-US'),
            'timezone': user_data.get('timezone', 'America/Los_Angeles'),
            'site': {
                'id': user_data['siteId'],
                'name': user_data['siteName']
            }
        },
        'directoryInfo': {
            'jobTitle': user_data.get('jobTitle', 'Employee'),
            'department': user_data.get('department', 'General'),
            'displayInDirectory': True
        }
    }

    try:
        print("Creating user...")
        response = requests.post(
            f'{base_url}/v1/users',
            headers=headers,
            json=request_body,
            timeout=10
        )
        response.raise_for_status()
        operation = response.json()
        operation_id = operation['operationId']
        print(f"User creation initiated. Operation ID: {operation_id}")

    except requests.exceptions.HTTPError as e:
        print(f"HTTP error during user creation: {e}")
        if e.response is not None:
            error_data = e.response.json() if e.response.headers.get('content-type') == 'application/problem+json' else {}
            if e.response.status_code == 400:
                errors = error_data.get('errors', [])
                if errors:
                    print("Validation errors:")
                    for err in errors:
                        print(f"  - {err.get('field')}: {err.get('message')}")
                else:
                    print(f"  {error_data.get('detail', e.response.text)}")
            elif e.response.status_code == 409:
                print(f"Conflict: {error_data.get('detail', 'User might already exist')}")
            else:
                print(f"Response: {e.response.text}")
        return None

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None

    # Step 3: Poll for operation completion
    print("Polling for operation completion...")
    delay = 1.0
    max_delay = 30.0
    start_time = time.time()

    while time.time() - start_time < poll_timeout:
        try:
            response = requests.get(
                f'{base_url}/v1/operations/{operation_id}',
                headers=headers,
                timeout=10
            )
            response.raise_for_status()
            operation = response.json()
            status = operation['status']

            if status == 'completed':
                user_id = operation.get('resourceId')
                print(f"Operation completed! User ID: {user_id}")

                # Step 4: Retrieve and verify created user
                print("Retrieving user details...")
                user_response = requests.get(
                    f'{base_url}/v1/users/{user_id}',
                    headers=headers,
                    timeout=10
                )
                user_response.raise_for_status()
                return user_response.json()

            elif status == 'failed':
                error = operation.get('error', {})
                print(f"Operation failed: {error.get('detail', 'Unknown error')}")
                return None

            # Still pending or in_progress
            time.sleep(delay)
            delay = min(delay * 2, max_delay)

        except requests.exceptions.RequestException as e:
            print(f"Error polling operation: {e}")
            return None

    print(f"Operation timed out after {poll_timeout} seconds")
    return None
