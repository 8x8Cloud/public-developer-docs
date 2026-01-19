"""
Create a new user in the 8x8 Users API.

Requirements:
- Python 3.8+
- requests: pip install requests
"""
import requests
from typing import Optional, Dict


def create_user(
    api_key: str,
    user_name: str,
    first_name: str,
    last_name: str,
    email: str,
    site_id: str,
    site_name: str,
    job_title: str = "Employee",
    department: str = "General",
    base_url: str = "https://api.8x8.com"
) -> Optional[Dict]:
    """
    Create a new user and return the operation details.

    Args:
        api_key: Your API authentication key
        user_name: Username for the new user
        first_name: User's first name
        last_name: User's last name
        email: User's primary email address
        site_id: ID of the site to assign the user to
        site_name: Name of the site
        job_title: User's job title (default: "Employee")
        department: User's department (default: "General")
        base_url: API base URL (default: https://api.8x8.com)

    Returns:
        Dict containing operation details with operationId, or None on error

    Example:
        operation = create_user(
            api_key="your-api-key",
            user_name="jane.smith",
            first_name="Jane",
            last_name="Smith",
            email="jane.smith@example.com",
            site_id="site-123",
            site_name="San Francisco Office",
            job_title="Software Engineer",
            department="Engineering"
        )
        if operation:
            print(f"User creation started. Operation ID: {operation['operationId']}")
    """
    headers = {
        'x-api-key': api_key,
        'Content-Type': 'application/vnd.users.v1+json',
        'Accept': 'application/vnd.users.v1+json'
    }

    user_data = {
        'basicInfo': {
            'userName': user_name,
            'firstName': first_name,
            'lastName': last_name,
            'primaryEmail': email,
            'status': 'active',
            'locale': 'en-US',
            'timezone': 'America/Los_Angeles',
            'site': {
                'id': site_id,
                'name': site_name
            }
        },
        'directoryInfo': {
            'jobTitle': job_title,
            'department': department,
            'displayInDirectory': True
        }
    }

    try:
        response = requests.post(
            f'{base_url}/v1/users',
            headers=headers,
            json=user_data,
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
