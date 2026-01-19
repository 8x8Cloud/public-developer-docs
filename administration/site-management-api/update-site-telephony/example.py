import requests
from typing import Dict, Optional

def update_site_telephony(
    api_key: str,
    site_id: str,
    site_data: Dict,
    main_number: str,
    display_name: str,
    dial_plan_ruleset: str = "DOMESTIC",
    base_url: str = "https://api.8x8.com/admin-provisioning"
) -> Optional[Dict]:
    """
    Update site telephony features (caller ID and external calling permissions).

    Args:
        api_key: Your API authentication key
        site_id: Site identifier
        site_data: Complete site object (from GET /sites/{siteId})
        main_number: Main phone number for caller ID (e.g., "+14155551234")
        display_name: Display name for caller ID
        dial_plan_ruleset: External calling permission (INTERNATIONAL, DOMESTIC, EMERGENCYONLY)
        base_url: API base URL

    Returns:
        Dict containing Operation object with operationId, or None on error

    Example:
        # First, get the current site data
        # site = get_site(api_key, site_id)

        operation = update_site_telephony(
            api_key="your-api-key",
            site_id="0023OEZiR7qQ_EGb6xYjgg",
            site_data=site,
            main_number="+14155551234",
            display_name="SF Office",
            dial_plan_ruleset="DOMESTIC"
        )
        if operation:
            print(f"Site update started: {operation['operationId']}")
    """
    headers = {
        'x-api-key': api_key,
        'Accept': 'application/vnd.sites.v1+json',
        'Content-Type': 'application/vnd.sites.v1+json'
    }

    # Update site data with telephony configuration
    payload = site_data.copy()
    payload['callerIdSettings'] = {
        'mainNumber': main_number,
        'setMainNumberAsCallerId': True,
        'shareMainNumberAsCallerId': False,
        'displayName': display_name
    }
    payload['defaultDialPlanRuleset'] = dial_plan_ruleset

    try:
        response = requests.put(
            f'{base_url}/sites/{site_id}',
            headers=headers,
            json=payload,
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
