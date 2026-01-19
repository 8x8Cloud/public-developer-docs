import requests
from typing import Dict, Optional

def delete_site_and_address(
    api_key: str,
    site_id: str,
    address_id: str,
    base_url: str = "https://api.8x8.com/admin-provisioning"
) -> Optional[Dict]:
    """
    Delete a site and its associated address (multi-step workflow).

    Preconditions:
    - All users must be removed from the site before deletion
    - Address can only be deleted if all usage counts are zero

    Args:
        api_key: Your API authentication key
        site_id: Site identifier
        address_id: Address identifier
        base_url: API base URL

    Returns:
        Dict with status information, or None on error

    Example:
        result = delete_site_and_address(
            api_key="your-api-key",
            site_id="0023OEZiR7qQ_EGb6xYjgg",
            address_id="addr_sf_market_st"
        )
        if result and result.get('site_deleted') and result.get('address_deleted'):
            print("Site and address successfully deleted")
    """
    headers_site = {
        'x-api-key': api_key,
        'Accept': 'application/vnd.sites.v1+json'
    }

    headers_address = {
        'x-api-key': api_key,
        'Accept': 'application/vnd.addresses.v1+json'
    }

    result = {
        'site_deleted': False,
        'address_deleted': False
    }

    # Step 1: Delete site (asynchronous)
    try:
        response = requests.delete(
            f'{base_url}/sites/{site_id}',
            headers=headers_site,
            timeout=10
        )
        response.raise_for_status()
        operation = response.json()
        print(f"Site deletion started: {operation.get('operationId')}")
        result['site_operation'] = operation
        result['site_deleted'] = True
        # Note: You should poll this operation to confirm completion

    except requests.exceptions.HTTPError as e:
        print(f"Site deletion failed: {e}")
        if e.response is not None:
            print(f"Response: {e.response.text}")
        return result
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return result

    # Step 2: Check address usage
    try:
        response = requests.get(
            f'{base_url}/addresses/{address_id}',
            headers=headers_address,
            timeout=10
        )
        response.raise_for_status()
        address = response.json()
        usage = address.get('addressUsage', {})

        # Check if all usage counts are zero
        total_usage = sum(usage.values())
        if total_usage > 0:
            print(f"Address still in use (total usage: {total_usage})")
            result['address_usage'] = usage
            return result

    except requests.exceptions.HTTPError as e:
        print(f"Failed to check address usage: {e}")
        return result
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return result

    # Step 3: Delete address (synchronous)
    try:
        response = requests.delete(
            f'{base_url}/addresses/{address_id}',
            headers=headers_address,
            timeout=10
        )
        response.raise_for_status()
        print("Address deleted successfully")
        result['address_deleted'] = True

    except requests.exceptions.HTTPError as e:
        print(f"Address deletion failed: {e}")
        if e.response is not None:
            print(f"Response: {e.response.text}")
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")

    return result
