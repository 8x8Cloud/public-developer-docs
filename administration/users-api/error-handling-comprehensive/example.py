import requests
import time
import logging
from typing import Dict, Optional, Callable, Any
from functools import wraps

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class APIError(Exception):
    """Base exception for API errors."""
    def __init__(self, message: str, status_code: int = None, error_data: Dict = None):
        self.message = message
        self.status_code = status_code
        self.error_data = error_data or {}
        super().__init__(self.message)

class RetryableError(APIError):
    """Exception for errors that should be retried."""
    pass

class NonRetryableError(APIError):
    """Exception for errors that should not be retried."""
    pass

def api_error_handler(max_retries: int = 3, retry_delay: float = 1.0):
    """
    Decorator for comprehensive API error handling with automatic retry logic.

    Args:
        max_retries: Maximum number of retry attempts for retryable errors (default: 3)
        retry_delay: Initial delay between retries in seconds (default: 1.0)

    Returns:
        Decorated function with error handling

    Example:
        @api_error_handler(max_retries=3)
        def get_user(api_key: str, user_id: str) -> Dict:
            response = requests.get(
                f'https://api.8x8.com/users/{user_id}',
                headers={'X-API-Key': api_key}
            )
            response.raise_for_status()
            return response.json()

        try:
            user = get_user("your-api-key", "user-123")
        except NonRetryableError as e:
            print(f"Cannot retry: {e.message}")
        except RetryableError as e:
            print(f"Retry exhausted: {e.message}")
    """
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs) -> Any:
            attempt = 0
            current_delay = retry_delay

            while attempt <= max_retries:
                try:
                    return func(*args, **kwargs)

                except requests.exceptions.HTTPError as e:
                    attempt += 1
                    status_code = e.response.status_code
                    error_data = {}

                    # Try to parse error response
                    try:
                        error_data = e.response.json()
                    except:
                        error_data = {'detail': e.response.text}

                    # Extract detailed error information
                    error_title = error_data.get('title', 'HTTP Error')
                    error_detail = error_data.get('detail', str(e))
                    field_errors = error_data.get('errors', [])

                    # Build comprehensive error message
                    error_message = f"HTTP {status_code}: {error_title}"
                    if error_detail:
                        error_message += f" - {error_detail}"

                    # Add field-level errors if present
                    if field_errors:
                        error_message += "\nField errors:"
                        for field_error in field_errors:
                            field = field_error.get('field', 'unknown')
                            code = field_error.get('code', 'UNKNOWN')
                            msg = field_error.get('message', '')
                            error_message += f"\n  - {field}: [{code}] {msg}"

                    # Log error details
                    logger.error(
                        f"API error: {error_message}",
                        extra={
                            'status_code': status_code,
                            'error_data': error_data,
                            'attempt': attempt,
                            'max_retries': max_retries
                        }
                    )

                    # Classify error as retryable or non-retryable
                    if status_code == 429:  # Rate limit
                        # Extract retry-after header
                        retry_after = e.response.headers.get('X-RateLimit-Reset')
                        if retry_after:
                            wait_time = int(retry_after) - int(time.time())
                            wait_time = max(wait_time, 1)
                            logger.warning(f"Rate limited. Waiting {wait_time}s until reset...")
                            if attempt <= max_retries:
                                time.sleep(wait_time)
                                continue

                        # Fall back to exponential backoff
                        if attempt <= max_retries:
                            logger.warning(f"Rate limited. Retrying in {current_delay}s... (attempt {attempt}/{max_retries})")
                            time.sleep(current_delay)
                            current_delay *= 2
                            continue
                        else:
                            raise RetryableError(
                                f"Rate limit exceeded: {error_message}",
                                status_code=status_code,
                                error_data=error_data
                            )

                    elif status_code in [500, 502, 503, 504]:  # Server errors
                        if attempt <= max_retries:
                            logger.warning(f"Server error. Retrying in {current_delay}s... (attempt {attempt}/{max_retries})")
                            time.sleep(current_delay)
                            current_delay *= 2
                            continue
                        else:
                            raise RetryableError(
                                f"Server error after {max_retries} retries: {error_message}",
                                status_code=status_code,
                                error_data=error_data
                            )

                    elif status_code == 424:  # Failed dependency
                        if attempt <= max_retries:
                            logger.warning(f"Dependency failure. Retrying in {current_delay}s... (attempt {attempt}/{max_retries})")
                            time.sleep(current_delay)
                            current_delay *= 2
                            continue
                        else:
                            raise RetryableError(
                                f"Dependency failure: {error_message}",
                                status_code=status_code,
                                error_data=error_data
                            )

                    elif status_code in [400, 401, 403, 404, 409]:  # Client errors (non-retryable)
                        if status_code == 400:
                            message = f"Validation error: {error_message}"
                        elif status_code == 401:
                            message = f"Authentication failed: Check your API key"
                        elif status_code == 403:
                            message = f"Permission denied: {error_detail}"
                        elif status_code == 404:
                            message = f"Resource not found: {error_detail}"
                        elif status_code == 409:
                            message = f"Conflict: {error_detail}"
                        else:
                            message = error_message

                        raise NonRetryableError(
                            message,
                            status_code=status_code,
                            error_data=error_data
                        )

                    else:  # Unknown status code
                        raise APIError(
                            f"Unexpected error: {error_message}",
                            status_code=status_code,
                            error_data=error_data
                        )

                except requests.exceptions.Timeout as e:
                    attempt += 1
                    logger.error(f"Request timeout: {e}")

                    if attempt <= max_retries:
                        logger.warning(f"Timeout. Retrying in {current_delay}s... (attempt {attempt}/{max_retries})")
                        time.sleep(current_delay)
                        current_delay *= 2
                        continue
                    else:
                        raise RetryableError(
                            f"Request timeout after {max_retries} retries",
                            error_data={'original_error': str(e)}
                        )

                except requests.exceptions.ConnectionError as e:
                    attempt += 1
                    logger.error(f"Connection error: {e}")

                    if attempt <= max_retries:
                        logger.warning(f"Connection error. Retrying in {current_delay}s... (attempt {attempt}/{max_retries})")
                        time.sleep(current_delay)
                        current_delay *= 2
                        continue
                    else:
                        raise RetryableError(
                            f"Connection error after {max_retries} retries: Network unavailable",
                            error_data={'original_error': str(e)}
                        )

                except requests.exceptions.RequestException as e:
                    # Generic request exception (non-retryable)
                    logger.error(f"Request failed: {e}")
                    raise APIError(
                        f"Request failed: {str(e)}",
                        error_data={'original_error': str(e)}
                    )

        return wrapper
    return decorator


# Example usage
@api_error_handler(max_retries=3)
def get_user_with_error_handling(api_key: str, user_id: str, base_url: str = "https://api.8x8.com") -> Optional[Dict]:
    """
    Retrieve user with comprehensive error handling.

    Args:
        api_key: Your API authentication key
        user_id: User ID to retrieve
        base_url: API base URL

    Returns:
        User data dict, or None if not found

    Raises:
        NonRetryableError: For validation errors, auth failures, etc.
        RetryableError: For rate limits, server errors after max retries

    Example:
        try:
            user = get_user_with_error_handling("your-api-key", "user-123")
            if user:
                print(f"Found user: {user['basicInfo']['firstName']}")
        except NonRetryableError as e:
            print(f"Cannot retry: {e.message}")
            if e.error_data.get('errors'):
                for err in e.error_data['errors']:
                    print(f"  {err['field']}: {err['message']}")
        except RetryableError as e:
            print(f"Service temporarily unavailable: {e.message}")
    """
    headers = {
        'X-API-Key': api_key,
        'Accept': 'application/vnd.users.v1+json'
    }

    response = requests.get(
        f'{base_url}/users/{user_id}',
        headers=headers,
        timeout=10
    )
    response.raise_for_status()
    return response.json()
