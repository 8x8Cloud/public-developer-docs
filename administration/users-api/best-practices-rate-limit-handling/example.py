"""
Best practices for handling API rate limits.

Requirements:
- Python 3.8+
- requests: pip install requests
"""
import requests
import time
from typing import Optional, Dict, Callable
from datetime import datetime


class RateLimitHandler:
    """HTTP client wrapper with automatic rate limit handling."""

    def __init__(self, api_key: str, base_url: str = "https://api.8x8.com"):
        self.api_key = api_key
        self.base_url = base_url
        self.requests_made = 0
        self.rate_limit_hits = 0

    def _get_headers(self) -> Dict[str, str]:
        """Get standard headers for API requests."""
        return {
            'x-api-key': self.api_key,
            'Content-Type': 'application/vnd.users.v1+json',
            'Accept': 'application/vnd.users.v1+json'
        }

    def _handle_rate_limit_headers(self, response: requests.Response) -> None:
        """Log rate limit information from response headers."""
        limit = response.headers.get('X-RateLimit-Limit')
        remaining = response.headers.get('X-RateLimit-Remaining')
        reset = response.headers.get('X-RateLimit-Reset')

        if limit and remaining:
            print(f"Rate Limit: {remaining}/{limit} requests remaining")

            if reset:
                reset_time = datetime.fromtimestamp(int(reset))
                print(f"Rate limit resets at: {reset_time}")

            # Warn if getting close to limit
            remaining_count = int(remaining)
            if remaining_count < 10:
                print(f"WARNING: Only {remaining_count} requests remaining before rate limit")

    def _wait_for_rate_limit_reset(self, reset_timestamp: Optional[str]) -> None:
        """Wait until rate limit resets."""
        if not reset_timestamp:
            # No reset time provided, use default backoff
            wait_time = 60
            print(f"No reset time provided, waiting {wait_time} seconds...")
            time.sleep(wait_time)
            return

        try:
            reset_time = int(reset_timestamp)
            current_time = int(time.time())
            wait_time = max(reset_time - current_time + 1, 0)

            if wait_time > 0:
                print(f"Rate limit exceeded. Waiting {wait_time} seconds until reset...")
                time.sleep(wait_time)
            else:
                print("Rate limit should already be reset, retrying...")

        except ValueError:
            print("Invalid reset timestamp, waiting 60 seconds...")
            time.sleep(60)

    def request_with_retry(
        self,
        method: str,
        endpoint: str,
        max_retries: int = 3,
        **kwargs
    ) -> Optional[requests.Response]:
        """
        Make HTTP request with automatic rate limit retry.

        Args:
            method: HTTP method (GET, POST, PUT, DELETE)
            endpoint: API endpoint (e.g., '/v1/users')
            max_retries: Maximum number of retries for rate limit errors
            **kwargs: Additional arguments passed to requests

        Returns:
            Response object if successful, None on failure

        Example:
            handler = RateLimitHandler("your-api-key")
            response = handler.request_with_retry("GET", "/v1/users", params={'pageSize': 10})
            if response:
                users = response.json()
        """
        url = f"{self.base_url}{endpoint}"
        headers = kwargs.pop('headers', {})
        headers.update(self._get_headers())

        for attempt in range(1, max_retries + 1):
            try:
                self.requests_made += 1
                response = requests.request(
                    method,
                    url,
                    headers=headers,
                    timeout=10,
                    **kwargs
                )

                # Log rate limit info from headers
                self._handle_rate_limit_headers(response)

                # Check for rate limit error
                if response.status_code == 429:
                    self.rate_limit_hits += 1
                    print(f"Rate limit hit (attempt {attempt}/{max_retries})")

                    if attempt < max_retries:
                        # Wait based on X-RateLimit-Reset header
                        reset_time = response.headers.get('X-RateLimit-Reset')
                        self._wait_for_rate_limit_reset(reset_time)
                        continue
                    else:
                        print("Max retries reached for rate limit")
                        return None

                # Raise for other HTTP errors
                response.raise_for_status()
                return response

            except requests.exceptions.HTTPError as e:
                print(f"HTTP error: {e}")
                if e.response is not None:
                    print(f"Response: {e.response.text}")
                return None

            except requests.exceptions.RequestException as e:
                print(f"Request failed: {e}")
                return None

        return None

    def get_stats(self) -> Dict[str, int]:
        """Get usage statistics."""
        return {
            'requests_made': self.requests_made,
            'rate_limit_hits': self.rate_limit_hits
        }


# Convenience function
def get_users_with_rate_limiting(
    api_key: str,
    page_size: int = 50,
    filter_query: Optional[str] = None,
    base_url: str = "https://api.8x8.com"
) -> Optional[Dict]:
    """
    Get users with automatic rate limit handling.

    Args:
        api_key: Your API authentication key
        page_size: Number of users per page
        filter_query: Optional RSQL filter
        base_url: API base URL

    Returns:
        Dict with users data, or None on error

    Example:
        users = get_users_with_rate_limiting(
            "your-api-key",
            page_size=100,
            filter_query="status==active"
        )
        if users:
            print(f"Retrieved {len(users['data'])} users")
    """
    handler = RateLimitHandler(api_key, base_url)

    params = {'pageSize': page_size}
    if filter_query:
        params['filter'] = filter_query

    response = handler.request_with_retry("GET", "/v1/users", params=params)

    if response:
        stats = handler.get_stats()
        print(f"\nRequest stats: {stats}")
        return response.json()

    return None
