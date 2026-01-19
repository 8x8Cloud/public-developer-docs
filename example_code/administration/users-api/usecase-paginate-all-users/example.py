"""
List and filter users with pagination support.

Requirements:
- Python 3.8+
- requests: pip install requests
"""
import requests
from typing import List, Optional, Dict, Generator


def list_and_filter_users(
    api_key: str,
    filter_query: Optional[str] = None,
    page_size: int = 50,
    base_url: str = "https://api.8x8.com"
) -> Generator[Dict, None, None]:
    """
    Retrieve all users matching filter criteria using pagination.

    Args:
        api_key: Your API authentication key
        filter_query: RSQL filter expression (e.g., "status==active;department==Engineering")
        page_size: Items per page (default: 50, max: 100)
        base_url: API base URL (default: https://api.8x8.com)

    Yields:
        Dict representing each user

    Example:
        # Get all active users in Engineering department
        for user in list_and_filter_users(
            "your-api-key",
            filter_query="status==active;department==Engineering"
        ):
            print(f"{user['basicInfo']['userName']}: {user['basicInfo']['primaryEmail']}")
    """
    headers = {
        'x-api-key': api_key,
        'Accept': 'application/vnd.users.v1+json'
    }

    params = {'pageSize': min(page_size, 100)}
    if filter_query:
        params['filter'] = filter_query

    scroll_id = None
    page_count = 0

    while True:
        try:
            # Use scrollId for subsequent pages
            if scroll_id:
                params = {'scrollId': scroll_id}

            response = requests.get(
                f'{base_url}/v1/users',
                headers=headers,
                params=params,
                timeout=10
            )
            response.raise_for_status()
            data = response.json()

            users = data.get('data', [])
            pagination = data.get('pagination', {})
            page_count += 1

            print(f"Page {page_count}: Retrieved {len(users)} users")

            # Yield each user
            for user in users:
                yield user

            # Check if there are more pages
            if not pagination.get('hasMore', False):
                print(f"Completed: Retrieved all users across {page_count} pages")
                break

            scroll_id = pagination.get('nextScrollId')
            if not scroll_id:
                print("No more pages available")
                break

        except requests.exceptions.HTTPError as e:
            print(f"HTTP error: {e}")
            if e.response is not None:
                print(f"Response: {e.response.text}")
            break

        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")
            break


def get_all_users_list(
    api_key: str,
    filter_query: Optional[str] = None,
    page_size: int = 50,
    base_url: str = "https://api.8x8.com"
) -> List[Dict]:
    """
    Retrieve all users as a list (convenience wrapper).

    Args:
        api_key: Your API authentication key
        filter_query: RSQL filter expression
        page_size: Items per page (default: 50, max: 100)
        base_url: API base URL (default: https://api.8x8.com)

    Returns:
        List of all users matching the filter

    Example:
        users = get_all_users_list(
            "your-api-key",
            filter_query="status==active"
        )
        print(f"Found {len(users)} active users")
    """
    return list(list_and_filter_users(api_key, filter_query, page_size, base_url))
