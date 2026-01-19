import requests
from typing import List, Dict, Optional

def sort_users(api_key: str, sort_expression: str, base_url: str = "https://api.8x8.com/admin-provisioning") -> Optional[List[Dict]]:
    """
    Fetch users sorted by specified field(s).

    Args:
        api_key: Your API authentication key
        sort_expression: Sort expression (e.g., "+lastName" or "-createdTime" or "+department,+lastName")
        base_url: API base URL (default: https://api.8x8.com/admin-provisioning)

    Returns:
        List of users in sorted order, or None on error

    Example:
        # Ascending by last name (A-Z)
        users = sort_users("your-api-key", "+basicInfo.lastName")

        # Descending by creation date (newest first)
        users = sort_users("your-api-key", "-basicInfo.createdTime")

        # Multi-field sort: department (A-Z), then last name (A-Z), then first name (A-Z)
        users = sort_users("your-api-key", "+directoryInfo.department,+basicInfo.lastName,+basicInfo.firstName")

        # Ascending without + prefix (equivalent)
        users = sort_users("your-api-key", "basicInfo.lastName")

        if users:
            print(f"Retrieved {len(users)} users in sorted order")
            for user in users[:5]:  # Show first 5
                info = user.get('basicInfo', {})
                print(f"- {info.get('lastName')}, {info.get('firstName')}")
    """
    headers = {
        'x-api-key': api_key,
        'Accept': 'application/vnd.users.v1+json'
    }

    try:
        url = f'{base_url}/users?sort={sort_expression}&pageSize=100'

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
