import requests
from typing import Dict, Optional

def test_credentials(api_key: str, base_url: str = "https://api.8x8.com/admin-provisioning") -> Optional[Dict]:
    """
    Test API credentials with a simple authenticated request.

    Args:
        api_key: Your API authentication key
        base_url: API base URL (default: https://api.8x8.com/admin-provisioning)

    Returns:
        Dict containing API response with user data, or None on error

    Example:
        result = test_credentials("your-api-key")
        if result:
            print("Credentials are valid!")
            print(f"Found {len(result.get('data', []))} users")
        else:
            print("Authentication failed - check your API key")
    """
    headers = {
        'x-api-key': api_key,
        'Accept': 'application/vnd.users.v1+json'
    }

    try:
        response = requests.get(
            f'{base_url}/users?pageSize=1',
            headers=headers,
            timeout=10
        )
        response.raise_for_status()
        return response.json()

    except requests.exceptions.HTTPError as e:
        print(f"HTTP error: {e}")
        if e.response is not None:
            print(f"Status code: {e.response.status_code}")
            print(f"Response: {e.response.text}")
        return None

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None
