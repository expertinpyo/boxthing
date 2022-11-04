import requests
from datetime import datetime
from typing import Optional

GITHUB_API_BASE_URL = "https://api.github.com"
PER_PAGE = 50


def github_notification(token, last_updated_at: Optional[datetime] = None):
    url = f"{GITHUB_API_BASE_URL}/notifications"
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {token}",
    }
    params = {
        "all": "true",
        "page": 1,
        "per_page": PER_PAGE,
    }

    if last_updated_at:
        params["since"] = last_updated_at.strftime("%Y-%m-%dT%H:%M:%SZ")

    notifications = []
    updated_at = None

    while True:
        response = requests.get(url=url, headers=headers, params=params)
        data = response.json()

        if not data:
            break

        notifications += data

        if not updated_at:
            updated_at = datetime.fromisoformat(
                notifications[0]["updated_at"].replace("Z", "+00:00")
            )

        if len(data) < PER_PAGE:
            break

        params["page"] += 1

    return notifications, updated_at
