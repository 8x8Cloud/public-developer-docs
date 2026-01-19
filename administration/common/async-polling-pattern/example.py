import requests
import time
from typing import Dict, Optional

def poll_operation(api_key: str, operation_id: str, base_url: str = "https://api.8x8.com/admin-provisioning", max_wait: int = 300) -> Optional[Dict]:
    """
    Poll an async operation until completion.

    Args:
        api_key: Your API authentication key
        operation_id: The operation ID to poll
        base_url: API base URL (default: https://api.8x8.com/admin-provisioning)
        max_wait: Maximum seconds to wait (default: 300)

    Returns:
        Dict containing completed operation with resourceId, or None on error/timeout

    Example:
        # After creating a resource (POST returns 202 with operationId)
        operation = poll_operation("your-api-key", "op_1a2b3c4d5e6f")
        if operation and operation.get('status') == 'COMPLETED':
            resource_id = operation.get('resourceId')
            print(f"Operation completed! Resource ID: {resource_id}")
        elif operation and operation.get('status') == 'FAILED':
            print(f"Operation failed: {operation.get('error')}")
        else:
            print("Operation timed out")
    """
    headers = {
        'x-api-key': api_key,
        'Accept': 'application/vnd.users.v1+json'
    }

    start_time = time.time()
    poll_interval = 1  # Start with 1 second

    try:
        while time.time() - start_time < max_wait:
            response = requests.get(
                f'{base_url}/operations/{operation_id}',
                headers=headers,
                timeout=10
            )
            response.raise_for_status()
            operation = response.json()

            status = operation.get('status')
            if status in ['COMPLETED', 'FAILED']:
                return operation

            # Wait before next poll
            time.sleep(poll_interval)

        print(f"Operation timed out after {max_wait} seconds")
        return None

    except requests.exceptions.HTTPError as e:
        print(f"HTTP error: {e}")
        if e.response is not None:
            print(f"Response: {e.response.text}")
        return None

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None
