import requests
from typing import Dict, List, Optional

def create_emergency_ready_site(
    api_key: str,
    site_name: str,
    pbx_name: str,
    address_data: Dict,
    emergency_emails: List[str],
    locale: str = "en-US",
    timezone: str = "America/Los_Angeles",
    base_url: str = "https://api.8x8.com/admin-provisioning"
) -> Optional[Dict]:
    """
    Create a site with emergency address and notification configuration.

    This is a complete two-step workflow: creates address, then creates site.

    Args:
        api_key: Your API authentication key
        site_name: Site name (e.g., "San Francisco Office")
        pbx_name: Parent PBX name (e.g., "pbx01")
        address_data: Dict with keys: streetNumber, streetName, city, state, postal, country
        emergency_emails: List of email addresses for emergency notifications
        locale: Language/locale code (default: "en-US")
        timezone: IANA timezone (default: "America/Los_Angeles")
        base_url: API base URL

    Returns:
        Dict containing Operation object with operationId, or None on error

    Example:
        operation = create_emergency_ready_site(
            api_key="your-api-key",
            site_name="San Francisco Office",
            pbx_name="pbx01",
            address_data={
                'streetNumber': '100',
                'streetName': 'Market St',
                'city': 'San Francisco',
                'state': 'CA',
                'postal': '94105',
                'country': 'US'
            },
            emergency_emails=["security@company.com", "facilities@company.com"]
        )
        if operation:
            print(f"Site creation started: {operation['operationId']}")
    """
    headers_address = {
        'x-api-key': api_key,
        'Accept': 'application/vnd.addresses.v1+json',
        'Content-Type': 'application/vnd.addresses.v1+json'
    }

    # Step 1: Create address
    try:
        response = requests.post(
            f'{base_url}/addresses',
            headers=headers_address,
            json=address_data,
            timeout=10
        )
        response.raise_for_status()
        address = response.json()
        address_id = address['id']
        print(f"Address created with ID: {address_id}")

    except requests.exceptions.HTTPError as e:
        print(f"Address creation failed: {e}")
        if e.response is not None:
            print(f"Response: {e.response.text}")
        return None
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None

    # Step 2: Create site with emergency configuration
    headers_site = {
        'x-api-key': api_key,
        'Accept': 'application/vnd.sites.v1+json',
        'Content-Type': 'application/vnd.sites.v1+json'
    }

    site_payload = {
        'name': site_name,
        'pbxName': pbx_name,
        'locale': locale,
        'timezone': timezone,
        'address': {
            'id': address_id
        },
        'emergencyNotifications': [
            {
                'type': 'EMAIL',
                'values': emergency_emails
            }
        ]
    }

    try:
        response = requests.post(
            f'{base_url}/sites',
            headers=headers_site,
            json=site_payload,
            timeout=10
        )
        response.raise_for_status()
        return response.json()

    except requests.exceptions.HTTPError as e:
        print(f"Site creation failed: {e}")
        if e.response is not None:
            print(f"Response: {e.response.text}")
        return None
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None
