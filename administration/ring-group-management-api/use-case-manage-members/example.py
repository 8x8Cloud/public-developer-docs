import requests
import time
from typing import Dict, List, Optional


def update_ring_group_members(
    api_key: str,
    ring_group_id: str,
    add: Optional[List[Dict]] = None,
    update: Optional[List[Dict]] = None,
    remove: Optional[List[Dict]] = None,
    base_url: str = "https://api.8x8.com/admin-provisioning"
) -> Optional[Dict]:
    """
    Apply a targeted add/update/remove delta to a ring group's members using
    POST /ring-groups/{ringGroupId}/update-members.

    Only the members you pass are changed; the rest of the ring group's membership
    and configuration is left untouched, and the whole delta is applied atomically.
    At least one of add/update/remove must be non-empty. Identify each member by
    either extensionId or extensionNumber, and never list the same member in more
    than one array.

    Requirements:
    - Python 3.8+
    - requests: pip install requests

    Args:
        api_key: Your API authentication key
        ring_group_id: ID of the ring group to modify
        add: New members to add, e.g.
            [{"extensionNumber": "1005", "sequenceNumber": 4, "voicemailAccessEnabled": True}]
        update: Existing members to modify; omitted fields keep their current value, e.g.
            [{"extensionNumber": "1002", "sequenceNumber": 1}]
        remove: Members to remove, e.g. [{"extensionNumber": "1003"}]
        base_url: API base URL (default: https://api.8x8.com/admin-provisioning)

    Returns:
        Dict containing the ring group after the delta is applied, or None on error.

    Example:
        result = update_ring_group_members(
            api_key="your-api-key",
            ring_group_id="aeP9pOoDRbq8_KKiwtsXhQ",
            add=[{"extensionNumber": "1005", "sequenceNumber": 4, "voicemailAccessEnabled": True}],
            update=[{"extensionNumber": "1002", "sequenceNumber": 1}],
            remove=[{"extensionNumber": "1003"}],
        )
        if result:
            print(f"Ring group now has {len(result.get('members', []))} members")
    """
    # Build the delta payload, including only the arrays that were provided.
    modifications: Dict[str, List[Dict]] = {}
    if add:
        modifications["add"] = add
    if update:
        modifications["update"] = update
    if remove:
        modifications["remove"] = remove

    if not modifications:
        raise ValueError("Provide at least one of 'add', 'update', or 'remove'")

    # A write with a payload carries the version in Content-Type; no Accept is
    # sent (the endpoint always returns an Operation). Reads (the polling GETs
    # below) carry the version in Accept.
    write_headers = {
        "X-API-Key": api_key,
        "Content-Type": "application/vnd.ringgroups.update-members.v1+json"
    }
    operations_headers = {
        "X-API-Key": api_key,
        "Accept": "application/vnd.operations.v1+json"
    }
    ring_group_headers = {
        "X-API-Key": api_key,
        "Accept": "application/vnd.ringgroups.v1+json"
    }

    try:
        # Step 1: Submit the membership delta (async operation)
        response = requests.post(
            f"{base_url}/ring-groups/{ring_group_id}/update-members",
            headers=write_headers,
            json=modifications,
            timeout=10
        )
        response.raise_for_status()
        operation = response.json()
        operation_id = operation["operationId"]
        print(f"Member update operation initiated (ID: {operation_id})")

        # Step 2: Poll operation status until it reaches a terminal state
        max_attempts = 30
        poll_interval = 2

        for _ in range(max_attempts):
            time.sleep(poll_interval)

            status_response = requests.get(
                f"{base_url}/operations/{operation_id}",
                headers=operations_headers,
                timeout=10
            )
            status_response.raise_for_status()
            operation_status = status_response.json()
            status = operation_status["status"]

            if status == "COMPLETED":
                # Step 3: Retrieve the ring group to confirm the applied delta
                final_response = requests.get(
                    f"{base_url}/ring-groups/{ring_group_id}",
                    headers=ring_group_headers,
                    timeout=10
                )
                final_response.raise_for_status()
                return final_response.json()

            if status == "FAILED":
                # Validations that are race-condition-prone (member exists,
                # resulting collection size) are performed asynchronously and
                # surface here via the operation's error field.
                error_message = operation_status.get("error", {}).get("message", "Unknown error")
                print(f"Member update failed: {error_message}")
                return None

        print("Operation timed out")
        return None

    except requests.exceptions.HTTPError as e:
        print(f"HTTP error: {e}")
        if e.response is not None:
            print(f"Response: {e.response.text}")
        return None

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None
