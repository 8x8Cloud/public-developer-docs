import requests
from typing import Dict, Optional, Tuple

def verify_phone_number_availability(
    api_key: str,
    phone_number: str,
    base_url: str = "https://api.8x8.com/admin-provisioning"
) -> Tuple[bool, Optional[Dict]]:
    """
    Verify if a specific phone number exists and is available for assignment.

    Args:
        api_key: Your API authentication key (must have UC & CC Number Admin scope)
        phone_number: Phone number in E.164 format (e.g., +14085551234)
        base_url: API base URL (default: https://api.8x8.com/admin-provisioning)

    Returns:
        Tuple of (is_available: bool, number_data: Dict or None)
        - (True, data) if number exists and status is AVAILABLE
        - (False, data) if number exists but status is not AVAILABLE
        - (False, None) if number doesn't exist or error occurs

    Example:
        is_available, number_data = verify_phone_number_availability(
            "your-api-key",
            "+14085551234"
        )
        if is_available:
            print(f"Number {number_data['phoneNumber']} is available for assignment")
            # Proceed with User Management or Ring Group Management API
        elif number_data:
            print(f"Number exists but status is {number_data['status']}")
        else:
            print("Number not found in inventory")
    """
    headers = {
        'X-API-Key': api_key,
        'Accept': 'application/vnd.phonenumbers.v1+json'
    }

    try:
        response = requests.get(
            f'{base_url}/phone-numbers/{phone_number}',
            headers=headers,
            timeout=10
        )
        response.raise_for_status()

        number_data = response.json()
        status = number_data.get('status')

        if status == 'AVAILABLE':
            return (True, number_data)
        else:
            print(f"Number exists but status is {status} (not available)")
            return (False, number_data)

    except requests.exceptions.HTTPError as e:
        if e.response is not None and e.response.status_code == 404:
            print(f"Phone number {phone_number} not found in inventory")
            return (False, None)
        else:
            print(f"HTTP error: {e}")
            if e.response is not None:
                print(f"Response: {e.response.text}")
            return (False, None)

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return (False, None)
