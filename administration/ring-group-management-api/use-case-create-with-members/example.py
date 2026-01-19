import requests
import time
from typing import Dict, List, Optional

def create_ring_group_with_members(
    api_key: str,
    name: str,
    extension_number: str,
    member_user_ids: List[str],
    voicemail_email: Optional[str] = None,
    base_url: str = "https://api.8x8.com/admin-provisioning"
) -> Optional[Dict]:
    """
    Create a ring group with multiple members and voicemail settings.

    Args:
        api_key: Your API authentication key
        name: Ring group name (2-64 characters)
        extension_number: Internal extension number
        member_user_ids: List of user IDs to add as members
        voicemail_email: Email for voicemail notifications (optional)
        base_url: API base URL (default: https://api.8x8.com/admin-provisioning)

    Returns:
        Dict containing created ring group with members, or None on error

    Example:
        ring_group = create_ring_group_with_members(
            api_key="your-api-key",
            name="Customer Support",
            extension_number="2001",
            member_user_ids=["user_id_1", "user_id_2", "user_id_3"],
            voicemail_email="support@example.com"
        )
        if ring_group:
            print(f"Created ring group with {len(ring_group.get('members', []))} members")
    """
    headers = {
        'X-API-Key': api_key,
        'Accept': 'application/vnd.ringgroups.v1+json',
        'Content-Type': 'application/vnd.ringgroups.v1+json'
    }

    # Build members array with sequence numbers
    members = []
    for i, user_id in enumerate(member_user_ids, start=1):
        members.append({
            'userId': user_id,
            'sequenceNumber': i,
            'voicemailAccessEnabled': True
        })

    # Ring group payload with members and voicemail
    ring_group_data = {
        'name': name,
        'extensionNumber': extension_number,
        'ringPattern': 'ROUND_ROBIN',
        'ringTimeout': 20,
        'inboundCallerIdFormat': 'RGNAME_CALLERNUMBER',
        'members': members
    }

    # Add voicemail settings if email provided
    if voicemail_email:
        ring_group_data['voicemailSettings'] = {
            'notificationEmail': voicemail_email,
            'notificationAction': 'NOTIFY_ONLY'
        }

    try:
        # Step 1: Create ring group with members (async operation)
        response = requests.post(
            f'{base_url}/ring-groups',
            headers=headers,
            json=ring_group_data,
            timeout=10
        )
        response.raise_for_status()
        operation = response.json()
        operation_id = operation['operationId']
        print(f"Ring group creation with {len(members)} members initiated")
        print(f"Operation ID: {operation_id}")

        # Step 2: Poll operation status until completion
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
                ring_group_id = operation_status.get('resourceId')
                print(f"Ring group created successfully (ID: {ring_group_id})")

                # Step 3: Retrieve ring group with members
                ring_group_response = requests.get(
                    f"{base_url}/ring-groups/{ring_group_id}",
                    headers=headers,
                    timeout=10
                )
                ring_group_response.raise_for_status()
                return ring_group_response.json()

            elif status == 'FAILED':
                error_message = operation_status.get('error', {}).get('message', 'Unknown error')
                print(f"Ring group creation failed: {error_message}")
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
