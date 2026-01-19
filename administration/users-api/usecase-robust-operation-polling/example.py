"""
Production-ready robust polling utility for async operations.

Requirements:
- Python 3.8+
- requests: pip install requests
"""
import requests
import time
from typing import Optional, Dict, Callable
from enum import Enum


class OperationStatus(Enum):
    """Operation status values."""
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


class PollingConfig:
    """Configuration for polling behavior."""
    def __init__(
        self,
        initial_delay: float = 1.0,
        max_delay: float = 30.0,
        backoff_multiplier: float = 2.0,
        timeout_seconds: int = 300
    ):
        self.initial_delay = initial_delay
        self.max_delay = max_delay
        self.backoff_multiplier = backoff_multiplier
        self.timeout_seconds = timeout_seconds


def poll_operation_robust(
    api_key: str,
    operation_id: str,
    base_url: str = "https://api.8x8.com",
    config: Optional[PollingConfig] = None,
    on_status_change: Optional[Callable[[str, Dict], None]] = None
) -> Optional[Dict]:
    """
    Production-ready polling with exponential backoff, timeout, and callbacks.

    Args:
        api_key: Your API authentication key
        operation_id: ID of the operation to poll
        base_url: API base URL (default: https://api.8x8.com)
        config: Polling configuration (uses defaults if not provided)
        on_status_change: Optional callback(status, operation_data) when status changes

    Returns:
        Dict containing operation details when complete/failed/cancelled, or None on timeout

    Raises:
        requests.exceptions.RequestException: On network errors

    Example:
        def status_callback(status, data):
            print(f"Status changed to: {status}")

        config = PollingConfig(
            initial_delay=0.5,
            max_delay=20.0,
            timeout_seconds=180
        )

        operation = poll_operation_robust(
            "your-api-key",
            "op_1234567890abcdef",
            config=config,
            on_status_change=status_callback
        )

        if operation:
            if operation['status'] == 'completed':
                print(f"Success! Resource: {operation['resourceId']}")
            elif operation['status'] == 'failed':
                print(f"Failed: {operation['error']['detail']}")
    """
    if config is None:
        config = PollingConfig()

    headers = {
        'x-api-key': api_key,
        'Accept': 'application/vnd.users.v1+json'
    }

    delay = config.initial_delay
    start_time = time.time()
    attempt = 0
    last_status = None

    print(f"Starting to poll operation {operation_id}")
    print(f"Configuration: initial_delay={config.initial_delay}s, max_delay={config.max_delay}s, timeout={config.timeout_seconds}s")

    while True:
        attempt += 1
        elapsed = time.time() - start_time

        # Check timeout
        if elapsed >= config.timeout_seconds:
            print(f"Timeout: Operation exceeded {config.timeout_seconds} seconds")
            return None

        try:
            response = requests.get(
                f'{base_url}/v1/operations/{operation_id}',
                headers=headers,
                timeout=10
            )
            response.raise_for_status()
            operation = response.json()

            status = operation.get('status')
            print(f"Attempt {attempt} ({elapsed:.1f}s elapsed): Status = {status}")

            # Trigger callback on status change
            if on_status_change and status != last_status:
                on_status_change(status, operation)
                last_status = status

            # Check terminal states
            if status == OperationStatus.COMPLETED.value:
                resource_id = operation.get('resourceId')
                print(f"Operation completed successfully! Resource ID: {resource_id}")
                return operation

            elif status == OperationStatus.FAILED.value:
                error = operation.get('error', {})
                print(f"Operation failed: {error.get('detail', 'Unknown error')}")
                print(f"Error type: {error.get('type')}")
                return operation

            elif status == OperationStatus.CANCELLED.value:
                print("Operation was cancelled")
                return operation

            # Still pending or in_progress, calculate next delay
            remaining_time = config.timeout_seconds - elapsed
            if remaining_time <= 0:
                print("Timeout: No time remaining")
                return None

            # Apply exponential backoff
            next_delay = min(delay, remaining_time, config.max_delay)
            print(f"Waiting {next_delay:.1f}s before next poll...")
            time.sleep(next_delay)

            # Increase delay for next iteration
            delay = min(delay * config.backoff_multiplier, config.max_delay)

        except requests.exceptions.HTTPError as e:
            print(f"HTTP error polling operation: {e}")
            if e.response is not None:
                if e.response.status_code == 404:
                    print(f"Operation not found: {operation_id}")
                    return None
                print(f"Response: {e.response.text}")
            raise

        except requests.exceptions.Timeout:
            print(f"Request timeout on attempt {attempt}, retrying...")
            # Don't raise, continue polling

        except requests.exceptions.RequestException as e:
            print(f"Request error: {e}")
            raise
