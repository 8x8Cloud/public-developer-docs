import requests
from typing import Dict, Optional

def create_site(
    api_key: str,
    name: str,
    pbx_name: str,
    address_id: str,
    locale: str = "en-US",
    timezone: str = "America/Los_Angeles",
    site_code: Optional[str] = None,
    extension_length: Optional[int] = None,
    base_url: str = "https://api.8x8.com/admin-provisioning"
) -> Optional[Dict]:
    """
    Create a new site (asynchronous operation).

    Args:
        api_key: Your API authentication key
        name: Site name (e.g., "Headquarters")
        pbx_name: Parent PBX name (e.g., "pbx01")
        address_id: ID of previously created address
        locale: Language/locale code (default: "en-US")
        timezone: IANA timezone (default: "America/Los_Angeles")
        site_code: Optional site code for extensions
        extension_length: Optional extension length (digits)
        base_url: API base URL

    Returns:
        Dict containing Operation object with operationId, or None on error

    Example:
        operation = create_site(
            api_key="your-api-key",
            name="Headquarters",
            pbx_name="pbx01",
            address_id="b1c4944a-17a0-4b00-8d48-36001df07e22",
            site_code="1345",
            extension_length=4
        )
        if operation:
            print(f"Site creation started: {operation['operationId']}")
            # Poll this operation using poll_operation()
    """
    headers = {
        'x-api-key': api_key,
        'Accept': 'application/vnd.sites.v1+json',
        'Content-Type': 'application/vnd.sites.v1+json'
    }

    payload = {
        'name': name,
        'pbxName': pbx_name,
        'locale': locale,
        'timezone': timezone,
        'address': {
            'id': address_id
        }
    }

    if site_code:
        payload['siteCode'] = site_code
    if extension_length:
        payload['extensionLength'] = extension_length

    try:
        response = requests.post(
            f'{base_url}/sites',
            headers=headers,
            json=payload,
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
