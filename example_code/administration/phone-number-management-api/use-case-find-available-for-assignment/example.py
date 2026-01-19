import requests
from typing import Dict, Optional

def find_available_number_for_assignment(
    api_key: str,
    country: str = "US",
    category: str = "LOCAL",
    base_url: str = "https://api.8x8.com/admin-provisioning"
) -> Optional[str]:
    """
    Find an available phone number for user or ring group assignment.

    Args:
        api_key: Your API authentication key (must have UC & CC Number Admin scope)
        country: ISO 3166-2 country code (default: US)
        category: Number category - LOCAL or TOLL_FREE (default: LOCAL)
        base_url: API base URL (default: https://api.8x8.com/admin-provisioning)

    Returns:
        E.164 phone number string ready for assignment, or None if no numbers available

    Example:
        phone_number = find_available_number_for_assignment("your-api-key")
        if phone_number:
            print(f"Found available number: {phone_number}")
            # Pass to User Management API for assignment
        else:
            print("No available numbers found")
    """
    headers = {
        'X-API-Key': api_key,
        'Accept': 'application/vnd.phonenumbers.v1+json'
    }

    # Build filter for available numbers with specified criteria
    params = {
        'filter': f'status==AVAILABLE;country=={country};category=={category}',
        'pageSize': 1  # Only need one number
    }

    try:
        response = requests.get(
            f'{base_url}/phone-numbers',
            headers=headers,
            params=params,
            timeout=10
        )
        response.raise_for_status()

        result = response.json()
        numbers = result.get('data', [])

        if not numbers:
            print(f"No available {category} numbers found in {country}")
            return None

        # Return first available number in E.164 format
        return numbers[0]['phoneNumber']

    except requests.exceptions.HTTPError as e:
        print(f"HTTP error: {e}")
        if e.response is not None:
            print(f"Response: {e.response.text}")
        return None

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None
