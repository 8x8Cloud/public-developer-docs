"""
Retrieve a specific user by ID from the 8x8 Users API.

Requirements:
- Python 3.8+
- requests: pip install requests
"""
import requests
from typing import Optional, Dict


def get_user(
    api_key: str,
    user_id: str,
    base_url: str = "https://api.8x8.com"
) -> Optional[Dict]:
    """
    Retrieve detailed information for a specific user.

    Args:
        api_key: Your API authentication key
        user_id: Unique identifier for the user
        base_url: API base URL (default: https://api.8x8.com)

    Returns:
        Dict containing complete user details, or None on error

    Example:
        user = get_user("your-api-key", "user-789")
        if user:
            print(f"User: {user['basicInfo']['firstName']} {user['basicInfo']['lastName']}")
            print(f"Email: {user['basicInfo']['primaryEmail']}")
            print(f"Status: {user['basicInfo']['status']}")
    """
    headers = {
        'x-api-key': api_key,
        'Accept': 'application/vnd.users.v1+json'
    }

    try:
        response = requests.get(
            f'{base_url}/v1/users/{user_id}',
            headers=headers,
            timeout=10
        )
        response.raise_for_status()
        return response.json()

    except requests.exceptions.HTTPError as e:
        print(f"HTTP error: {e}")
        if e.response is not None:
            if e.response.status_code == 404:
                print(f"User not found: {user_id}")
            print(f"Response: {e.response.text}")
        return None

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None
