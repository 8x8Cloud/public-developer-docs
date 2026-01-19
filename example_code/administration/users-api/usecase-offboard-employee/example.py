import requests
import time
from typing import Dict, Optional, Literal

def offboard_employee(
    api_key: str,
    user_id: str,
    base_url: str = "https://api.8x8.com/admin-provisioning",
    grace_period_days: int = 7,
    retention_days: int = 30
) -> Dict[str, str]:
    """
    Three-stage employee offboarding: disable, deprovision licenses, then delete.

    This function demonstrates the recommended offboarding workflow:
    - Stage 1: Immediately disable user login (set status to INACTIVE)
    - Stage 2: After grace period, remove licenses to free them for reassignment
    - Stage 3: After retention period, permanently delete the user account

    Args:
        api_key: Your API authentication key
        user_id: ID of the user to offboard
        base_url: API base URL (default: https://api.8x8.com/admin-provisioning)
        grace_period_days: Days before license deprovision (default: 7, simulated instantly in demo)
        retention_days: Days before account deletion (default: 30, simulated instantly in demo)

    Returns:
        Dict with status of each stage: {'stage1': 'completed', 'stage2': 'completed', 'stage3': 'completed'}

    Example:
        result = offboard_employee("your-api-key", "hvOB1l3zDCaDAwp9tNLzZA")
        if result.get('stage3') == 'completed':
            print("Employee fully offboarded")
    """
    headers = {
        'x-api-key': api_key,
        'Accept': 'application/vnd.users.v1+json',
        'Content-Type': 'application/json'
    }

    result = {}

    # Stage 1: Disable user immediately
    print(f"Stage 1: Disabling user {user_id}...")

    try:
        # Get current user data
        get_response = requests.get(
            f'{base_url}/users/{user_id}',
            headers=headers,
            timeout=10
        )
        get_response.raise_for_status()
        user_data = get_response.json()

        # Update status to INACTIVE
        user_data['basicInfo']['status'] = 'INACTIVE'

        put_response = requests.put(
            f'{base_url}/users/{user_id}',
            headers=headers,
            json=user_data,
            timeout=10
        )
        put_response.raise_for_status()
        operation = put_response.json()

        # Poll operation until completed
        stage1_status = _poll_operation(base_url, operation['operationId'], headers)
        result['stage1'] = stage1_status

        if stage1_status != 'completed':
            print(f"Stage 1 failed with status: {stage1_status}")
            return result

        print("Stage 1: User disabled successfully")

    except requests.exceptions.RequestException as e:
        print(f"Stage 1 failed: {e}")
        result['stage1'] = 'failed'
        return result

    # Stage 2: Deprovision licenses (after grace period, simulated instantly for demo)
    print(f"\nStage 2: Deprovisioning licenses (normally after {grace_period_days} days)...")
    time.sleep(1)  # Simulate grace period with short delay

    try:
        # Get updated user data
        get_response = requests.get(
            f'{base_url}/users/{user_id}',
            headers=headers,
            timeout=10
        )
        get_response.raise_for_status()
        user_data = get_response.json()

        # Remove all licenses and extensions
        user_data['serviceInfo']['licenses'] = []
        user_data['serviceInfo']['extensions'] = []

        put_response = requests.put(
            f'{base_url}/users/{user_id}',
            headers=headers,
            json=user_data,
            timeout=10
        )
        put_response.raise_for_status()
        operation = put_response.json()

        # Poll operation until completed
        stage2_status = _poll_operation(base_url, operation['operationId'], headers)
        result['stage2'] = stage2_status

        if stage2_status != 'completed':
            print(f"Stage 2 failed with status: {stage2_status}")
            return result

        print("Stage 2: Licenses deprovisioned successfully")

    except requests.exceptions.RequestException as e:
        print(f"Stage 2 failed: {e}")
        result['stage2'] = 'failed'
        return result

    # Stage 3: Delete user permanently (after retention period, simulated instantly for demo)
    print(f"\nStage 3: Deleting user permanently (normally after {retention_days} days)...")
    time.sleep(1)  # Simulate retention period with short delay

    try:
        delete_response = requests.delete(
            f'{base_url}/users/{user_id}',
            headers=headers,
            timeout=10
        )
        delete_response.raise_for_status()
        operation = delete_response.json()

        # Poll operation until completed
        stage3_status = _poll_operation(base_url, operation['operationId'], headers)
        result['stage3'] = stage3_status

        if stage3_status == 'completed':
            print("Stage 3: User deleted successfully")
        else:
            print(f"Stage 3 failed with status: {stage3_status}")

    except requests.exceptions.RequestException as e:
        print(f"Stage 3 failed: {e}")
        result['stage3'] = 'failed'
        return result

    return result


def _poll_operation(
    base_url: str,
    operation_id: str,
    headers: Dict[str, str],
    max_attempts: int = 60
) -> Literal['completed', 'failed', 'timeout']:
    """Poll operation status until completion or timeout."""
    for attempt in range(max_attempts):
        try:
            response = requests.get(
                f'{base_url}/operations/{operation_id}',
                headers=headers,
                timeout=10
            )
            response.raise_for_status()
            operation = response.json()

            status = operation['status'].lower()

            if status == 'completed':
                return 'completed'
            elif status == 'failed':
                error = operation.get('error', {})
                print(f"Operation failed: {error.get('detail', 'Unknown error')}")
                return 'failed'
            elif status in ['pending', 'in_progress']:
                time.sleep(1)  # Wait before next poll
                continue
            else:
                print(f"Unknown operation status: {status}")
                return 'failed'

        except requests.exceptions.RequestException as e:
            print(f"Error polling operation: {e}")
            return 'failed'

    print(f"Operation timed out after {max_attempts} attempts")
    return 'timeout'
