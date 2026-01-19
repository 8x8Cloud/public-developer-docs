import requests
from typing import Dict, Optional

def list_available_phone_numbers(
    api_key: str,
    base_url: str = "https://api.8x8.com/admin-provisioning"
) -> Optional[Dict]:
    """
    Retrieve available phone numbers in the United States.

    Args:
        api_key: Your API authentication key (must have UC & CC Number Admin scope)
        base_url: API base URL (default: https://api.8x8.com/admin-provisioning)

    Returns:
        Dict containing phone number data and pagination info, or None on error

    Example:
        result = list_available_phone_numbers("your-api-key")
        if result:
            phone_numbers = result.get('data', [])
            print(f"Found {len(phone_numbers)} available US phone numbers")
            for number in phone_numbers:
                print(f"  {number['phoneNumber']} - {number['nationalFormattedNumber']}")
    """
    headers = {
        'X-API-Key': api_key,
        'Accept': 'application/vnd.phonenumbers.v1+json'
    }

    # Filter for available numbers in United States
    params = {
        'filter': 'status==AVAILABLE;country==US',
        'pageSize': 100
    }

    try:
        response = requests.get(
            f'{base_url}/phone-numbers',
            headers=headers,
            params=params,
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
