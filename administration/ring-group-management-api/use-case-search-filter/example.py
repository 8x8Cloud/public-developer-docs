import requests
from typing import Dict, List, Optional

def search_ring_groups_with_filter(
    api_key: str,
    name_filter: Optional[str] = None,
    extension_range_start: Optional[int] = None,
    extension_range_end: Optional[int] = None,
    sort_order: str = 'name',
    page_size: int = 100,
    base_url: str = "https://api.8x8.com/admin-provisioning"
) -> List[Dict]:
    """
    Search ring groups with RSQL filters, sorting, and pagination.

    Args:
        api_key: Your API authentication key
        name_filter: Filter ring groups by name (supports wildcards with *)
        extension_range_start: Filter by minimum extension number
        extension_range_end: Filter by maximum extension number
        sort_order: Sort field (use 'name' for ascending, '-name' for descending)
        page_size: Number of items per page (default: 100, max: 1000)
        base_url: API base URL (default: https://api.8x8.com/admin-provisioning)

    Returns:
        List of ring groups matching the filter criteria

    Example:
        # Find all ring groups with "Sales" in the name
        groups = search_ring_groups_with_filter(
            api_key="your-api-key",
            name_filter="*Sales*",
            sort_order="name"
        )
        print(f"Found {len(groups)} ring groups")

        # Find ring groups by extension range
        groups = search_ring_groups_with_filter(
            api_key="your-api-key",
            extension_range_start=2000,
            extension_range_end=2999,
            sort_order="-name"
        )
    """
    headers = {
        'X-API-Key': api_key,
        'Accept': 'application/vnd.ringgroups.v1+json'
    }

    # Build RSQL filter expression
    filters = []
    if name_filter:
        filters.append(f'name=="{name_filter}"')
    if extension_range_start is not None:
        filters.append(f'extensionNumber>={extension_range_start}')
    if extension_range_end is not None:
        filters.append(f'extensionNumber<={extension_range_end}')

    filter_expression = ';'.join(filters) if filters else None

    all_ring_groups = []
    scroll_id = None
    has_more = True

    try:
        while has_more:
            # Build query parameters
            params = {
                'pageSize': page_size,
                'sort': sort_order
            }
            if filter_expression:
                params['filter'] = filter_expression
            if scroll_id:
                params['scrollId'] = scroll_id

            # Search ring groups
            response = requests.get(
                f'{base_url}/ring-groups',
                headers=headers,
                params=params,
                timeout=10
            )
            response.raise_for_status()
            result = response.json()

            # Add ring groups from this page
            page_data = result.get('data', [])
            all_ring_groups.extend(page_data)
            print(f"Retrieved page with {len(page_data)} ring groups")

            # Check for more pages
            pagination = result.get('pagination', {})
            has_more = pagination.get('hasMore', False)
            scroll_id = pagination.get('nextScrollId')

            if not has_more:
                print(f"Reached end of results. Total: {len(all_ring_groups)} ring groups")

        return all_ring_groups

    except requests.exceptions.HTTPError as e:
        print(f"HTTP error: {e}")
        if e.response is not None:
            print(f"Response: {e.response.text}")
        return []

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return []
