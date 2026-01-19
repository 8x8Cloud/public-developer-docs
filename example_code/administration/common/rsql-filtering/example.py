import requests
from typing import List, Dict, Optional
from urllib.parse import quote

def filter_users(api_key: str, rsql_filter: str, base_url: str = "https://api.8x8.com/admin-provisioning") -> Optional[List[Dict]]:
    """
    Filter users using RSQL query syntax.

    Args:
        api_key: Your API authentication key
        rsql_filter: RSQL filter expression (will be URL-encoded automatically)
        base_url: API base URL (default: https://api.8x8.com/admin-provisioning)

    Returns:
        List of users matching the filter, or None on error

    Example:
        # Simple equality filter
        users = filter_users("your-api-key", "basicInfo.status==ACTIVE")

        # Wildcard search
        users = filter_users("your-api-key", "basicInfo.primaryEmail==*@example.com")

        # Logical AND (semicolon)
        users = filter_users("your-api-key", "basicInfo.status==ACTIVE;directoryInfo.department==Engineering")

        # Logical OR (comma)
        users = filter_users("your-api-key", "directoryInfo.department==Engineering,directoryInfo.department==Sales")

        # Complex expression with parentheses
        users = filter_users("your-api-key",
            "basicInfo.status==ACTIVE;(directoryInfo.department==Engineering,directoryInfo.department==Sales)")

        # Date comparison
        users = filter_users("your-api-key", "basicInfo.createdTime>2025-01-01T00:00:00Z")

        if users:
            print(f"Found {len(users)} matching users")
    """
    headers = {
        'x-api-key': api_key,
        'Accept': 'application/vnd.users.v1+json'
    }

    try:
        # URL-encode the filter
        encoded_filter = quote(rsql_filter)
        url = f'{base_url}/users?filter={encoded_filter}&pageSize=100'

        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        data = response.json()

        return data.get('data', [])

    except requests.exceptions.HTTPError as e:
        print(f"HTTP error: {e}")
        if e.response is not None:
            print(f"Status code: {e.response.status_code}")
            print(f"Response: {e.response.text}")
        return None

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None
