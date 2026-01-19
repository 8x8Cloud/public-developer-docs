import requests
import time
from typing import Dict, Optional

def get_user_with_retry(api_key: str, user_id: str, base_url: str = "https://api.8x8.com/admin-provisioning", max_retries: int = 3) -> Optional[Dict]:
    """
    Get a user with comprehensive error handling and retry logic.

    Args:
        api_key: Your API authentication key
        user_id: The user ID to retrieve
        base_url: API base URL (default: https://api.8x8.com/admin-provisioning)
        max_retries: Maximum retry attempts for transient errors (default: 3)

    Returns:
        Dict containing user data, or None on error

    Example:
        user = get_user_with_retry("your-api-key", "hvOB1l3zDCaDAwp9tNLzZA")
        if user:
            print(f"User: {user.get('basicInfo', {}).get('userName')}")
    """
    headers = {
        'x-api-key': api_key,
        'Accept': 'application/vnd.users.v1+json'
    }

    for attempt in range(max_retries):
        try:
            response = requests.get(
                f'{base_url}/users/{user_id}',
                headers=headers,
                timeout=10
            )
            response.raise_for_status()
            return response.json()

        except requests.exceptions.HTTPError as e:
            status_code = e.response.status_code if e.response else None
            response_body = e.response.json() if e.response and e.response.content else {}

            # 401: Authentication error - don't retry
            if status_code == 401:
                print(f"Authentication failed: Invalid or missing API key")
                request_id = response_body.get('requestId', 'N/A')
                print(f"Request ID: {request_id}")
                return None

            # 403: Authorization error - don't retry
            elif status_code == 403:
                print(f"Authorization failed: Insufficient permissions or customer ID mismatch")
                detail = response_body.get('detail', 'No details provided')
                print(f"Detail: {detail}")
                return None

            # 404: Not found - don't retry
            elif status_code == 404:
                print(f"User not found: {user_id}")
                return None

            # 400: Validation error - don't retry
            elif status_code == 400:
                print(f"Validation error:")
                errors = response_body.get('errors', [])
                for error in errors:
                    print(f"  - {error.get('field')}: {error.get('message')}")
                return None

            # 429: Rate limit - retry with exponential backoff
            elif status_code == 429:
                reset_time = e.response.headers.get('x-ratelimit-reset')
                print(f"Rate limit exceeded. Reset time: {reset_time}")

                if attempt < max_retries - 1:
                    wait_time = 2 ** attempt  # Exponential backoff: 1s, 2s, 4s
                    print(f"Retrying in {wait_time} seconds... (attempt {attempt + 1}/{max_retries})")
                    time.sleep(wait_time)
                    continue
                else:
                    print(f"Max retries reached")
                    return None

            # 500: Server error - retry
            elif status_code == 500:
                print(f"Server error occurred")

                if attempt < max_retries - 1:
                    wait_time = 2 ** attempt
                    print(f"Retrying in {wait_time} seconds... (attempt {attempt + 1}/{max_retries})")
                    time.sleep(wait_time)
                    continue
                else:
                    print(f"Max retries reached")
                    return None

            # Other HTTP errors - don't retry
            else:
                print(f"HTTP error {status_code}: {response_body.get('title', 'Unknown error')}")
                print(f"Detail: {response_body.get('detail', 'No details provided')}")
                return None

        except requests.exceptions.Timeout:
            print(f"Request timed out")
            if attempt < max_retries - 1:
                wait_time = 2 ** attempt
                print(f"Retrying in {wait_time} seconds... (attempt {attempt + 1}/{max_retries})")
                time.sleep(wait_time)
                continue
            else:
                print(f"Max retries reached")
                return None

        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")
            return None

    return None
