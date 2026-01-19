"""
Test authentication with the 8x8 Users API.

Requirements:
- Python 3.8+
- requests: pip install requests
"""
import requests
from typing import Optional, Dict


def test_authentication(api_key: str, base_url: str = "https://api.8x8.com") -> Optional[Dict]:
    """
    Test API authentication by making a simple request.

    Args:
        api_key: Your API authentication key
        base_url: API base URL (default: https://api.8x8.com)

    Returns:
        Dict containing API response if authenticated, or None on error

    Example:
        result = test_authentication("your-api-key")
        if result:
            print("Authentication successful!")
        else:
            print("Authentication failed")
    """
    headers = {
        'x-api-key': api_key,
        'Content-Type': 'application/vnd.users.v1+json',
        'Accept': 'application/vnd.users.v1+json'
    }

    try:
        response = requests.get(
            f'{base_url}/v1/users',
            headers=headers,
            params={'pageSize': 1},
            timeout=10
        )
        response.raise_for_status()
        print("Authentication successful!")
        return response.json()

    except requests.exceptions.HTTPError as e:
        if e.response is not None and e.response.status_code == 401:
            print("Authentication failed: Invalid or missing API key")
            print(f"Response: {e.response.text}")
        else:
            print(f"HTTP error: {e}")
            if e.response is not None:
                print(f"Response: {e.response.text}")
        return None

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None
