import requests
import time
from typing import Dict, Optional

def update_ring_group_settings(
    api_key: str,
    ring_group_id: str,
    new_ring_pattern: Optional[str] = None,
    new_ring_timeout: Optional[int] = None,
    base_url: str = "https://api.8x8.com/admin-provisioning"
) -> Optional[Dict]:
    """
    Update ring group settings while preserving other configuration.

    Args:
        api_key: Your API authentication key
        ring_group_id: ID of the ring group to update
        new_ring_pattern: New ring pattern (ROUND_ROBIN, SEQUENTIAL, SIMULTANEOUS)
        new_ring_timeout: New ring timeout in seconds
        base_url: API base URL (default: https://api.8x8.com/admin-provisioning)

    Returns:
        Dict containing updated ring group, or None on error

    Example:
        updated_group = update_ring_group_settings(
            api_key="your-api-key",
            ring_group_id="abc123",
            new_ring_pattern="ROUND_ROBIN",
            new_ring_timeout=25
        )
        if updated_group:
            print(f"Updated ring group: {updated_group['name']}")
    """
    headers = {
        'X-API-Key': api_key,
        'Accept': 'application/vnd.ringgroups.v1+json',
        'Content-Type': 'application/vnd.ringgroups.v1+json'
    }

    try:
        # Step 1: Retrieve current ring group configuration
        response = requests.get(
            f'{base_url}/ring-groups/{ring_group_id}',
            headers=headers,
            timeout=10
        )
        response.raise_for_status()
        ring_group = response.json()
        print(f"Retrieved ring group: {ring_group['name']}")

        # Step 2: Modify specific settings
        if new_ring_pattern:
            ring_group['ringPattern'] = new_ring_pattern
            print(f"Changed ring pattern to: {new_ring_pattern}")
        if new_ring_timeout:
            ring_group['ringTimeout'] = new_ring_timeout
            print(f"Changed ring timeout to: {new_ring_timeout} seconds")

        # Step 3: Update ring group (async operation)
        update_response = requests.put(
            f'{base_url}/ring-groups/{ring_group_id}',
            headers=headers,
            json=ring_group,
            timeout=10
        )
        update_response.raise_for_status()
        operation = update_response.json()
        operation_id = operation['operationId']
        print(f"Update operation initiated (ID: {operation_id})")

        # Step 4: Poll operation status until completion
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
                print("Ring group updated successfully")

                # Step 5: Retrieve updated ring group
                final_response = requests.get(
                    f"{base_url}/ring-groups/{ring_group_id}",
                    headers=headers,
                    timeout=10
                )
                final_response.raise_for_status()
                return final_response.json()

            elif status == 'FAILED':
                error_message = operation_status.get('error', {}).get('message', 'Unknown error')
                print(f"Update failed: {error_message}")
                return None

        print(f"Operation timed out after {max_attempts * poll_interval} seconds")
        return None

    except requests.exceptions.HTTPError as e:
        print(f"HTTP error: {e}")
        if e.response is not None:
            print(f"Response: {e.response.text}")
        return None

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None
