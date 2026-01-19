import requests
import json
import csv
from typing import List, Dict, Optional

def export_phone_number_inventory(
    api_key: str,
    output_format: str = "json",
    output_file: str = "phone_numbers",
    base_url: str = "https://api.8x8.com/admin-provisioning"
) -> Optional[List[Dict]]:
    """
    Export complete phone number inventory using scroll pagination.

    Args:
        api_key: Your API authentication key (must have UC & CC Number Admin scope)
        output_format: Export format - "json" or "csv" (default: json)
        output_file: Output filename without extension (default: phone_numbers)
        base_url: API base URL (default: https://api.8x8.com/admin-provisioning)

    Returns:
        List of all phone numbers, or None on error. Also writes to file.

    Example:
        phone_numbers = export_phone_number_inventory("your-api-key", "csv")
        if phone_numbers:
            print(f"Exported {len(phone_numbers)} phone numbers to phone_numbers.csv")
    """
    headers = {
        'X-API-Key': api_key,
        'Accept': 'application/vnd.phonenumbers.v1+json'
    }

    all_numbers = []
    scroll_id = None
    has_more = True

    try:
        # Iterate through all pages using scroll pagination
        while has_more:
            params = {'pageSize': 100}
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
            page_numbers = result.get('data', [])
            all_numbers.extend(page_numbers)

            pagination = result.get('pagination', {})
            has_more = pagination.get('hasMore', False)
            scroll_id = pagination.get('nextScrollId')

        # Export to specified format
        if output_format.lower() == 'csv':
            filename = f'{output_file}.csv'
            with open(filename, 'w', newline='') as f:
                if all_numbers:
                    writer = csv.DictWriter(f, fieldnames=all_numbers[0].keys())
                    writer.writeheader()
                    writer.writerows(all_numbers)
            print(f"Exported {len(all_numbers)} numbers to {filename}")

        else:  # json
            filename = f'{output_file}.json'
            with open(filename, 'w') as f:
                json.dump(all_numbers, f, indent=2)
            print(f"Exported {len(all_numbers)} numbers to {filename}")

        return all_numbers

    except requests.exceptions.HTTPError as e:
        print(f"HTTP error: {e}")
        if e.response is not None:
            print(f"Response: {e.response.text}")
        return None

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None

    except IOError as e:
        print(f"File write error: {e}")
        return all_numbers  # Return data even if file write fails
