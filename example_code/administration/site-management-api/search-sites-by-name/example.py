import requests
from typing import Dict, Optional

def search_sites_by_name(
    api_key: str,
    name_pattern: str,
    page_size: int = 100,
    page_number: int = 0,
    base_url: str = "https://api.8x8.com/admin-provisioning"
) -> Optional[Dict]:
    """
    Search sites by name with wildcard filtering.

    Note: Site search has limited RSQL support - only name field with == operator.

    Args:
        api_key: Your API authentication key
        name_pattern: Name pattern with optional wildcards (e.g., "Office*", "*Branch", "*Office*")
        page_size: Number of items per page (default: 100)
        page_number: Page number, 0-indexed (default: 0)
        base_url: API base URL

    Returns:
        Dict containing paginated site results, or None on error

    Example:
        results = search_sites_by_name(
            api_key="your-api-key",
            name_pattern="Office*"
        )
        if results:
            sites = results.get('data', [])
            print(f"Found {len(sites)} sites")
            for site in sites:
                print(f"  - {site['name']}")
    """
    headers = {
        'x-api-key': api_key,
        'Accept': 'application/vnd.sites.v1+json'
    }

    params = {
        'filter': f'name=={name_pattern}',
        'pageSize': page_size,
        'pageNumber': page_number
    }

    try:
        response = requests.get(
            f'{base_url}/sites',
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
