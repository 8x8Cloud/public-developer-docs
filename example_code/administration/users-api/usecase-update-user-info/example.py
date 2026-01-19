"""
Update user information with complete data retrieval pattern.

Requirements:
- Python 3.8+
- requests: pip install requests
"""
import requests
import time
from typing import Optional, Dict


def update_user(
    api_key: str,
    user_id: str,
    updates: Dict,
    base_url: str = "https://api.8x8.com",
    poll_timeout: int = 300
) -> Optional[Dict]:
    """
    Update user information following the complete GET-modify-PUT pattern.

    CRITICAL: PUT operations require ALL user attributes. This function retrieves
    the current user, applies your updates, and submits the complete object.

    Args:
        api_key: Your API authentication key
        user_id: ID of the user to update
        updates: Dict with fields to update (e.g., {'jobTitle': 'Senior Engineer', 'department': 'R&D'})
        base_url: API base URL (default: https://api.8x8.com)
        poll_timeout: Maximum time to wait for operation completion in seconds (default: 300)

    Returns:
        Dict containing the updated user details, or None on error

    Example:
        user = update_user("your-api-key", "user-789", {
            'jobTitle': 'Senior Software Engineer',
            'department': 'R&D',
            'timezone': 'America/New_York'
        })
        if user:
            print(f"User updated: {user['basicInfo']['userName']}")
        else:
            print("Update failed")
    """
    headers = {
        'x-api-key': api_key,
        'Content-Type': 'application/vnd.users.v1+json',
        'Accept': 'application/vnd.users.v1+json'
    }

    # Step 1: Retrieve current user data
    print(f"Retrieving current user data for {user_id}...")
    try:
        response = requests.get(
            f'{base_url}/v1/users/{user_id}',
            headers=headers,
            timeout=10
        )
        response.raise_for_status()
        current_user = response.json()
        print("Current user data retrieved successfully")

    except requests.exceptions.HTTPError as e:
        print(f"HTTP error retrieving user: {e}")
        if e.response is not None:
            if e.response.status_code == 404:
                print(f"User not found: {user_id}")
            print(f"Response: {e.response.text}")
        return None

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None

    # Step 2: Apply updates to complete user object
    print("Applying updates to user data...")
    for field, value in updates.items():
        # Handle nested fields (e.g., jobTitle is in directoryInfo)
        if field in ['jobTitle', 'department', 'directoryScope', 'displayInDirectory', 'profilePictureURL']:
            current_user['directoryInfo'][field] = value
        elif field in ['firstName', 'lastName', 'primaryEmail', 'status', 'locale', 'timezone']:
            current_user['basicInfo'][field] = value
        else:
            print(f"Warning: Unknown field '{field}', skipping")

    # Step 3: Submit update request with complete user object
    print(f"Submitting update for user {user_id}...")
    try:
        response = requests.put(
            f'{base_url}/v1/users/{user_id}',
            headers=headers,
            json=current_user,
            timeout=10
        )
        response.raise_for_status()
        operation = response.json()
        operation_id = operation['operationId']
        print(f"Update initiated. Operation ID: {operation_id}")

    except requests.exceptions.HTTPError as e:
        print(f"HTTP error during update: {e}")
        if e.response is not None:
            print(f"Response: {e.response.text}")
        return None

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None

    # Step 4: Poll for operation completion
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
                print("Operation completed! Retrieving updated user...")

                # Step 5: Retrieve and return updated user
                user_response = requests.get(
                    f'{base_url}/v1/users/{user_id}',
                    headers=headers,
                    timeout=10
                )
                user_response.raise_for_status()
                updated_user = user_response.json()

                # Compare before and after
                print("\nUpdate summary:")
                for field in updates.keys():
                    print(f"  {field}: updated")

                return updated_user

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
