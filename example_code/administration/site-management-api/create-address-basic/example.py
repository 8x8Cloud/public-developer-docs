import requests
from typing import Dict, Optional

def create_address(
    api_key: str,
    street_number: str,
    street_name: str,
    city: str,
    state: str,
    postal: str,
    country: str,
    secondary_location: Optional[str] = None,
    base_url: str = "https://api.8x8.com/admin-provisioning"
) -> Optional[Dict]:
    """
    Create an address for site registration.

    Args:
        api_key: Your API authentication key
        street_number: Street number (e.g., "7")
        street_name: Street name (e.g., "34TH ST")
        city: City name (e.g., "New York")
        state: State/province code (e.g., "NY")
        postal: Postal/ZIP code (e.g., "10001")
        country: ISO 3166-1 alpha-2 country code (e.g., "US")
        secondary_location: Optional unit/suite number (e.g., "613")
        base_url: API base URL

    Returns:
        Dict containing created address with ID, or None on error

    Example:
        address = create_address(
            api_key="your-api-key",
            street_number="7",
            street_name="34TH ST",
            city="New York",
            state="NY",
            postal="10001",
            country="US",
            secondary_location="613"
        )
        if address:
            print(f"Address created with ID: {address['id']}")
    """
    headers = {
        'x-api-key': api_key,
        'Accept': 'application/vnd.addresses.v1+json',
        'Content-Type': 'application/vnd.addresses.v1+json'
    }

    payload = {
        'streetNumber': street_number,
        'streetName': street_name,
        'city': city,
        'state': state,
        'postal': postal,
        'country': country
    }

    if secondary_location:
        payload['secondaryLocation'] = secondary_location

    try:
        response = requests.post(
            f'{base_url}/addresses',
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
