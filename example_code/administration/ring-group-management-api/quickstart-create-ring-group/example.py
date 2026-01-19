import requests
import time
from typing import Dict, Optional

def create_ring_group_with_polling(
    api_key: str,
    name: str,
    extension_number: str,
    base_url: str = "https://api.8x8.com/admin-provisioning"
) -> Optional[Dict]:
    """
    Create a ring group and poll until creation completes.

    Args:
        api_key: Your API authentication key
        name: Ring group name (2-64 characters)
        extension_number: Internal extension number
        base_url: API base URL (default: https://api.8x8.com/admin-provisioning)

    Returns:
        Dict containing created ring group data, or None on error

    Example:
        ring_group = create_ring_group_with_polling(
            api_key="your-api-key",
            name="Sales Team",
            extension_number="1001"
        )
        if ring_group:
            print(f"Created ring group: {ring_group['name']} (ID: {ring_group['id']})")
    """
    headers = {
        'X-API-Key': api_key,
        'Accept': 'application/vnd.ringgroups.v1+json',
        'Content-Type': 'application/vnd.ringgroups.v1+json'
    }

    # Ring group payload with required fields
    ring_group_data = {
        'name': name,
        'extensionNumber': extension_number,
        'ringPattern': 'ROUND_ROBIN',
        'ringTimeout': 15,
        'inboundCallerIdFormat': 'RGNAME_CALLERNUMBER'
    }

    try:
        # Step 1: Create ring group (async operation)
        response = requests.post(
            f'{base_url}/ring-groups',
            headers=headers,
            json=ring_group_data,
            timeout=10
        )
        response.raise_for_status()
        operation = response.json()
        operation_id = operation['operationId']
        print(f"Ring group creation initiated. Operation ID: {operation_id}")

        # Step 2: Poll operation status until completion
        max_attempts = 30
        poll_interval = 2  # seconds

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
            print(f"Operation status: {status}")

            if status == 'COMPLETED':
                ring_group_id = operation_status.get('resourceId')
                if not ring_group_id:
                    print("Operation completed but no resource ID returned")
                    return None

                # Step 3: Retrieve created ring group
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
