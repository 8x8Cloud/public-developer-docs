import requests
import time
from typing import Dict, Optional

def configure_forwarding_rules(
    api_key: str,
    ring_group_id: str,
    base_url: str = "https://api.8x8.com/admin-provisioning"
) -> Optional[Dict]:
    """
    Configure call forwarding rules for a ring group.

    Args:
        api_key: Your API authentication key
        ring_group_id: ID of the ring group to configure
        base_url: API base URL (default: https://api.8x8.com/admin-provisioning)

    Returns:
        Dict containing updated ring group with forwarding rules, or None on error

    Example:
        updated_group = configure_forwarding_rules(
            api_key="your-api-key",
            ring_group_id="abc123"
        )
        if updated_group:
            print(f"Configured {len(updated_group['forwardingRules'])} forwarding rules")
    """
    headers = {
        'X-API-Key': api_key,
        'Accept': 'application/vnd.ringgroups.v1+json',
        'Content-Type': 'application/vnd.ringgroups.v1+json'
    }

    try:
        # Step 1: Retrieve current ring group
        response = requests.get(
            f'{base_url}/ring-groups/{ring_group_id}',
            headers=headers,
            timeout=10
        )
        response.raise_for_status()
        ring_group = response.json()
        print(f"Retrieved ring group: {ring_group['name']}")

        # Step 2: Configure forwarding rules
        forwarding_rules = [
            # NO_ANSWER: Forward to voicemail after timeout
            {
                'condition': 'NO_ANSWER',
                'enabled': True,
                'destinations': [{
                    'type': 'VOICEMAIL'
                }]
            },
            # BUSY: Forward to another extension when all members busy
            {
                'condition': 'BUSY',
                'enabled': True,
                'destinations': [{
                    'type': 'EXTENSION_NUMBER',
                    'destination': '3000'
                }]
            },
            # OUTAGE: Forward to external number during system outages
            {
                'condition': 'OUTAGE',
                'enabled': True,
                'destinations': [{
                    'type': 'EXTERNAL_NUMBER',
                    'destination': '+14085551234'
                }]
            }
        ]

        ring_group['forwardingRules'] = forwarding_rules
        print(f"Configured {len(forwarding_rules)} forwarding rules")

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

        # Step 4: Poll operation status
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
                print("Forwarding rules configured successfully")

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
                print(f"Configuration failed: {error_message}")
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
