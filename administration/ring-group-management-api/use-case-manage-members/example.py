import requests
import time
from typing import Dict, List, Optional

def manage_ring_group_members(
    api_key: str,
    ring_group_id: str,
    add_user_ids: Optional[List[str]] = None,
    remove_user_ids: Optional[List[str]] = None,
    base_url: str = "https://api.8x8.com/admin-provisioning"
) -> Optional[Dict]:
    """
    Add or remove members from a ring group.

    Args:
        api_key: Your API authentication key
        ring_group_id: ID of the ring group to modify
        add_user_ids: List of user IDs to add as members
        remove_user_ids: List of user IDs to remove from ring group
        base_url: API base URL (default: https://api.8x8.com/admin-provisioning)

    Returns:
        Dict containing updated ring group with members, or None on error

    Example:
        updated_group = manage_ring_group_members(
            api_key="your-api-key",
            ring_group_id="abc123",
            add_user_ids=["new_user_1", "new_user_2"],
            remove_user_ids=["old_user_1"]
        )
        if updated_group:
            print(f"Ring group now has {len(updated_group['members'])} members")
    """
    headers = {
        'X-API-Key': api_key,
        'Accept': 'application/vnd.ringgroups.v1+json',
        'Content-Type': 'application/vnd.ringgroups.v1+json'
    }

    try:
        # Step 1: Retrieve current ring group with members
        response = requests.get(
            f'{base_url}/ring-groups/{ring_group_id}',
            headers=headers,
            timeout=10
        )
        response.raise_for_status()
        ring_group = response.json()
        current_members = ring_group.get('members', [])
        print(f"Current members: {len(current_members)}")

        # Step 2: Remove specified members
        if remove_user_ids:
            current_members = [m for m in current_members if m['userId'] not in remove_user_ids]
            print(f"Removed {len(remove_user_ids)} members")

        # Step 3: Add new members
        if add_user_ids:
            max_sequence = max([m.get('sequenceNumber', 0) for m in current_members], default=0)
            for i, user_id in enumerate(add_user_ids, start=1):
                current_members.append({
                    'userId': user_id,
                    'sequenceNumber': max_sequence + i,
                    'voicemailAccessEnabled': True
                })
            print(f"Added {len(add_user_ids)} new members")

        # Update ring group with modified members
        ring_group['members'] = current_members

        # Step 4: Submit update (async operation)
        update_response = requests.put(
            f'{base_url}/ring-groups/{ring_group_id}',
            headers=headers,
            json=ring_group,
            timeout=10
        )
        update_response.raise_for_status()
        operation = update_response.json()
        operation_id = operation['operationId']
        print(f"Member update operation initiated (ID: {operation_id})")

        # Step 5: Poll operation status
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
                # Retrieve updated ring group with members
                final_response = requests.get(
                    f"{base_url}/ring-groups/{ring_group_id}",
                    headers=headers,
                    timeout=10
                )
                final_response.raise_for_status()
                return final_response.json()

            elif status == 'FAILED':
                error_message = operation_status.get('error', {}).get('message', 'Unknown error')
                print(f"Member update failed: {error_message}")
                return None

        print(f"Operation timed out")
        return None

    except requests.exceptions.HTTPError as e:
        print(f"HTTP error: {e}")
        if e.response is not None:
            print(f"Response: {e.response.text}")
        return None

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None
