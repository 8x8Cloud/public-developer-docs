"""
Poll an async operation until completion.

Requirements:
- Python 3.8+
- requests: pip install requests
"""
import requests
import time
from typing import Optional, Dict


def poll_operation(
    api_key: str,
    operation_id: str,
    base_url: str = "https://api.8x8.com",
    max_attempts: int = 30,
    initial_delay: float = 1.0
) -> Optional[Dict]:
    """
    Poll an operation until it completes, fails, or times out.

    Args:
        api_key: Your API authentication key
        operation_id: ID of the operation to poll
        base_url: API base URL (default: https://api.8x8.com)
        max_attempts: Maximum number of polling attempts (default: 30)
        initial_delay: Initial delay between polls in seconds (default: 1.0)

    Returns:
        Dict containing operation details when complete, or None on error/timeout

    Example:
        operation = poll_operation("your-api-key", "op_1234567890abcdef")
        if operation and operation['status'] == 'completed':
            print(f"Operation completed! Resource ID: {operation.get('resourceId')}")
        elif operation and operation['status'] == 'failed':
            print(f"Operation failed: {operation.get('error')}")
        else:
            print("Operation timed out")
    """
    headers = {
        'x-api-key': api_key,
        'Accept': 'application/vnd.users.v1+json'
    }

    delay = initial_delay
    max_delay = 30.0

    for attempt in range(1, max_attempts + 1):
        try:
            response = requests.get(
                f'{base_url}/v1/operations/{operation_id}',
                headers=headers,
                timeout=10
            )
            response.raise_for_status()
            operation = response.json()

            status = operation.get('status')
            print(f"Attempt {attempt}: Operation status is '{status}'")

            if status == 'completed':
                print("Operation completed successfully!")
                return operation
            elif status == 'failed':
                print(f"Operation failed: {operation.get('error')}")
                return operation
            elif status == 'cancelled':
                print("Operation was cancelled")
                return operation

            # Still pending or in_progress, wait before next poll
            if attempt < max_attempts:
                print(f"Waiting {delay:.1f} seconds before next poll...")
                time.sleep(delay)
                # Exponential backoff with cap
                delay = min(delay * 2, max_delay)

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
