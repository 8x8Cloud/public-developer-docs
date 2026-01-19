import requests
from typing import Dict, Optional

def audit_phone_numbers_by_status(
    api_key: str,
    base_url: str = "https://api.8x8.com/admin-provisioning"
) -> Optional[Dict[str, int]]:
    """
    Generate inventory report showing phone number counts by status.

    Args:
        api_key: Your API authentication key (must have UC & CC Number Admin scope)
        base_url: API base URL (default: https://api.8x8.com/admin-provisioning)

    Returns:
        Dict with status names as keys and counts as values, or None on error

    Example:
        counts = audit_phone_numbers_by_status("your-api-key")
        if counts:
            print("Phone Number Inventory Summary:")
            print(f"  Available:    {counts.get('AVAILABLE', 0)}")
            print(f"  Assigned:     {counts.get('ASSIGNED', 0)}")
            print(f"  Porting:      {counts.get('PORTING', 0)}")
            print(f"  Pre-Porting:  {counts.get('PRE_PORTING', 0)}")
            print(f"  Total:        {sum(counts.values())}")
    """
    headers = {
        'X-API-Key': api_key,
        'Accept': 'application/vnd.phonenumbers.v1+json'
    }

    statuses = ['AVAILABLE', 'ASSIGNED', 'PORTING', 'PRE_PORTING']
    counts = {}

    for status in statuses:
        count = 0
        scroll_id = None
        has_more = True

        try:
            while has_more:
                params = {
                    'filter': f'status=={status}',
                    'pageSize': 100
                }
                if scroll_id:
                    params = {'scrollId': scroll_id}

                response = requests.get(
                    f'{base_url}/phone-numbers',
                    headers=headers,
                    params=params,
                    timeout=10
                )
                response.raise_for_status()

                result = response.json()
                count += len(result.get('data', []))

                pagination = result.get('pagination', {})
                has_more = pagination.get('hasMore', False)
                scroll_id = pagination.get('nextScrollId')

            counts[status] = count

        except requests.exceptions.HTTPError as e:
            print(f"HTTP error querying {status}: {e}")
            if e.response is not None:
                print(f"Response: {e.response.text}")
            return None

        except requests.exceptions.RequestException as e:
            print(f"Request failed for {status}: {e}")
            return None

    return counts
