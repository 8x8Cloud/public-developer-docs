import requests
from typing import Dict, Optional

def check_address_usage(
    api_key: str,
    address_id: str,
    base_url: str = "https://api.8x8.com/admin-provisioning"
) -> Optional[Dict]:
    """
    Check if an address can be deleted by examining its usage counts.

    Args:
        api_key: Your API authentication key
        address_id: Address identifier
        base_url: API base URL

    Returns:
        Dict containing address with usage information, or None on error

    Example:
        address = check_address_usage(
            api_key="your-api-key",
            address_id="addr_ny_shared"
        )
        if address:
            usage = address.get('addressUsage', {})
            total_usage = sum(usage.values())
            if total_usage == 0:
                print("Address can be safely deleted")
            else:
                print(f"Address in use: {total_usage} references")
                for category, count in usage.items():
                    if count > 0:
                        print(f"  - {category}: {count}")
    """
    headers = {
        'x-api-key': api_key,
        'Accept': 'application/vnd.addresses.v1+json'
    }

    try:
        response = requests.get(
            f'{base_url}/addresses/{address_id}',
            headers=headers,
            timeout=10
        )
        response.raise_for_status()
        return response.json()

    except requests.exceptions.HTTPError as e:
        print(f"HTTP error: {e}")
        if e.response is not None:
            print(f"Response: {e.response.text}")
        return None

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None
