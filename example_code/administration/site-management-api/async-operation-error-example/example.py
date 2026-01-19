import requests
from typing import Dict, Optional

def poll_operation_with_error_handling(
    api_key: str,
    operation_id: str,
    base_url: str = "https://api.8x8.com/admin-provisioning"
) -> Optional[Dict]:
    """
    Poll an asynchronous operation and handle failures with error details.

    Args:
        api_key: Your API authentication key
        operation_id: Operation ID from async operation response
        base_url: API base URL

    Returns:
        Dict containing Operation object (may be FAILED), or None on error

    Example:
        operation = poll_operation_with_error_handling(
            api_key="your-api-key",
            operation_id="op_failed_example"
        )
        if operation:
            if operation['status'] == 'COMPLETED':
                print(f"Success! Resource: {operation['resourceId']}")
            elif operation['status'] == 'FAILED':
                error = operation.get('error', {})
                print(f"Operation failed: {error.get('title')}")
                for err in error.get('errors', []):
                    print(f"  - {err.get('field')}: {err.get('message')}")
    """
    headers = {
        'x-api-key': api_key,
        'Accept': 'application/vnd.operations.v1+json'
    }

    try:
        response = requests.get(
            f'{base_url}/operations/{operation_id}',
            headers=headers,
            timeout=10
        )
        response.raise_for_status()
        operation = response.json()

        status = operation.get('status')

        if status == 'COMPLETED':
            print("Operation completed successfully")
            return operation

        elif status == 'FAILED':
            # Extract error details from the operation
            error = operation.get('error', {})
            print(f"Operation failed: {error.get('title', 'Unknown error')}")

            # Display specific error messages
            errors = error.get('errors', [])
            for err in errors:
                field = err.get('field', 'general')
                code = err.get('code', 'UNKNOWN')
                message = err.get('message', 'No message provided')
                print(f"  [{code}] {field}: {message}")

            return operation

        else:
            print(f"Operation status: {status}")
            return operation

    except requests.exceptions.HTTPError as e:
        print(f"HTTP error: {e}")
        if e.response is not None:
            print(f"Response: {e.response.text}")
        return None

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None
