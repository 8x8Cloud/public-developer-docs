import requests
from typing import List, Dict, Optional

def fetch_all_users(api_key: str, base_url: str = "https://api.8x8.com/admin-provisioning", page_size: int = 100) -> Optional[List[Dict]]:
    """
    Fetch all users using scroll-based pagination.

    Args:
        api_key: Your API authentication key
        base_url: API base URL (default: https://api.8x8.com/admin-provisioning)
        page_size: Number of items per page (default: 100, max: 1000)

    Returns:
        List of all user objects, or None on error

    Example:
        users = fetch_all_users("your-api-key", page_size=50)
        if users:
            print(f"Retrieved {len(users)} users total")
            for user in users:
                print(f"- {user.get('basicInfo', {}).get('userName')}")
    """
    headers = {
        'x-api-key': api_key,
        'Accept': 'application/vnd.users.v1+json'
    }

    all_users = []
    scroll_id = None

    try:
        while True:
            # Build URL with scrollId if we have one
            if scroll_id:
                url = f'{base_url}/users?pageSize={page_size}&scrollId={scroll_id}'
            else:
                url = f'{base_url}/users?pageSize={page_size}'

            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()
            page_data = response.json()

            # Add users from this page
            users_in_page = page_data.get('data', [])
            all_users.extend(users_in_page)

            # Check if more pages exist
            pagination = page_data.get('pagination', {})
            has_more = pagination.get('hasMore', False)

            if not has_more:
                break

            # Get scroll ID for next page
            scroll_id = pagination.get('nextScrollId')
            if not scroll_id:
                break

        return all_users

    except requests.exceptions.HTTPError as e:
        print(f"HTTP error: {e}")
        if e.response is not None:
            print(f"Response: {e.response.text}")
        return None

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None
