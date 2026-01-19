import requests
import time
from typing import Dict, Optional

def get_users_with_rate_limiting(api_key: str, base_url: str = "https://api.8x8.com/admin-provisioning", max_retries: int = 5) -> Optional[Dict]:
    """
    Fetch users with rate limit handling and exponential backoff.

    Args:
        api_key: Your API authentication key
        base_url: API base URL (default: https://api.8x8.com/admin-provisioning)
        max_retries: Maximum retry attempts when rate limited (default: 5)

    Returns:
        Dict containing user data and pagination info, or None on error

    Example:
        result = get_users_with_rate_limiting("your-api-key")
        if result:
            print(f"Retrieved {len(result.get('data', []))} users")
            print(f"Rate limit remaining: {result.get('rateLimit', {}).get('remaining')}")
    """
    headers = {
        'x-api-key': api_key,
        'Accept': 'application/vnd.users.v1+json'
    }

    for attempt in range(max_retries):
        try:
            response = requests.get(
                f'{base_url}/users?pageSize=100',
                headers=headers,
                timeout=10
            )

            # Extract rate limit headers
            rate_limit_limit = response.headers.get('x-ratelimit-limit')
            rate_limit_remaining = response.headers.get('x-ratelimit-remaining')
            rate_limit_reset = response.headers.get('x-ratelimit-reset')

            # Proactive throttling: slow down if remaining is low
            if rate_limit_remaining and int(rate_limit_remaining) < 10:
                print(f"Rate limit low ({rate_limit_remaining} remaining). Slowing down...")
                time.sleep(1)

            # Handle rate limit exceeded
            if response.status_code == 429:
                print(f"Rate limit exceeded")
                print(f"Limit: {rate_limit_limit}, Remaining: {rate_limit_remaining}, Reset: {rate_limit_reset}")

                if attempt < max_retries - 1:
                    # Calculate wait time until reset
                    if rate_limit_reset:
                        wait_until_reset = int(rate_limit_reset) - int(time.time())
                        wait_time = max(wait_until_reset, 0)
                    else:
                        # Fallback to exponential backoff if no reset time
                        wait_time = 2 ** attempt  # 1s, 2s, 4s, 8s, 16s

                    print(f"Waiting {wait_time} seconds before retry... (attempt {attempt + 1}/{max_retries})")
                    time.sleep(wait_time)
                    continue
                else:
                    print(f"Max retries reached")
                    return None

            response.raise_for_status()
            data = response.json()

            # Include rate limit info in response
            result = {
                'data': data.get('data', []),
                'pagination': data.get('pagination', {}),
                'rateLimit': {
                    'limit': rate_limit_limit,
                    'remaining': rate_limit_remaining,
                    'reset': rate_limit_reset
                }
            }

            return result

        except requests.exceptions.HTTPError as e:
            print(f"HTTP error: {e}")
            if e.response is not None:
                print(f"Response: {e.response.text}")
            return None

        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")
            return None

    return None
