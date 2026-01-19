import requests
import time
from typing import Dict, Optional

def poll_operation(
    api_key: str,
    operation_id: str,
    max_attempts: int = 60,
    poll_interval: float = 2.0,
    base_url: str = "https://api.8x8.com/admin-provisioning"
) -> Optional[Dict]:
    """
    Poll an asynchronous operation until completion or failure.

    Args:
        api_key: Your API authentication key
        operation_id: Operation ID from async operation response
        max_attempts: Maximum number of polling attempts (default: 60)
        poll_interval: Seconds between polling attempts (default: 2.0)
        base_url: API base URL

    Returns:
        Dict containing completed Operation object, or None on error

    Example:
        operation = poll_operation(
            api_key="your-api-key",
            operation_id="op_123456789"
        )
        if operation and operation['status'] == 'COMPLETED':
            print(f"Resource ID: {operation['resourceId']}")
        elif operation and operation['status'] == 'FAILED':
            print(f"Operation failed: {operation.get('error')}")
    """
    headers = {
        'x-api-key': api_key,
        'Accept': 'application/vnd.operations.v1+json'
    }

    for attempt in range(max_attempts):
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
                return operation
            elif status == 'FAILED':
                print(f"Operation failed: {operation.get('error')}")
                return operation
            elif status in ('PENDING', 'IN_PROGRESS'):
                time.sleep(poll_interval)
                continue
            else:
                print(f"Unknown operation status: {status}")
                return operation

        except requests.exceptions.HTTPError as e:
            print(f"HTTP error: {e}")
            if e.response is not None:
                print(f"Response: {e.response.text}")
            return None

        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")
            return None

    print(f"Operation timed out after {max_attempts} attempts")
    return None
