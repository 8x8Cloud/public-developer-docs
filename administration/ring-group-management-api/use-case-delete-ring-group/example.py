import requests
import time
from typing import Dict, Optional

def delete_ring_group_with_verification(
    api_key: str,
    ring_group_id: str,
    base_url: str = "https://api.8x8.com/admin-provisioning"
) -> bool:
    """
    Delete a ring group and verify successful removal.

    Args:
        api_key: Your API authentication key
        ring_group_id: ID of the ring group to delete
        base_url: API base URL (default: https://api.8x8.com/admin-provisioning)

    Returns:
        True if deletion successful, False otherwise

    Example:
        success = delete_ring_group_with_verification(
            api_key="your-api-key",
            ring_group_id="abc123"
        )
        if success:
            print("Ring group deleted successfully")
    """
    headers = {
        'X-API-Key': api_key,
        'Accept': 'application/vnd.ringgroups.v1+json'
    }

    try:
        # Step 1: Verify ring group exists
        response = requests.get(
            f'{base_url}/ring-groups/{ring_group_id}',
            headers=headers,
            timeout=10
        )
        response.raise_for_status()
        ring_group = response.json()
        print(f"Found ring group to delete: {ring_group['name']}")

        # Step 2: Initiate deletion (async operation)
        delete_response = requests.delete(
            f'{base_url}/ring-groups/{ring_group_id}',
            headers=headers,
            timeout=10
        )
        delete_response.raise_for_status()
        operation = delete_response.json()
        operation_id = operation['operationId']
        print(f"Deletion operation initiated (ID: {operation_id})")

        # Step 3: Poll operation status until completion
        max_attempts = 30
        poll_interval = 2

        for attempt in range(max_attempts):
            time.sleep(poll_interval)

            status_response = requests.get(
                f"{base_url}/operations/{operation_id}",
                headers=headers,
                timeout=10
            )
            status_response.raise_for_status()
            operation_status = status_response.json()

            status = operation_status['status']

            if status == 'COMPLETED':
                print("Deletion operation completed")

                # Step 4: Verify ring group no longer exists (should get 404)
                try:
                    verify_response = requests.get(
                        f"{base_url}/ring-groups/{ring_group_id}",
                        headers=headers,
                        timeout=10
                    )
                    verify_response.raise_for_status()
                    print("Warning: Ring group still exists after deletion")
                    return False
                except requests.exceptions.HTTPError as e:
                    if e.response.status_code == 404:
                        print("Verified: Ring group successfully deleted")
                        return True
                    else:
                        raise

            elif status == 'FAILED':
                error_message = operation_status.get('error', {}).get('message', 'Unknown error')
                print(f"Deletion failed: {error_message}")
                return False

        print(f"Operation timed out after {max_attempts * poll_interval} seconds")
        return False

    except requests.exceptions.HTTPError as e:
        if e.response.status_code == 404:
            print("Ring group not found (may already be deleted)")
            return False
        print(f"HTTP error: {e}")
        if e.response is not None:
            print(f"Response: {e.response.text}")
        return False

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return False
