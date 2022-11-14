import aiohttp
from datetime import datetime, timedelta
import logging

GITHUB_API_BASE_URL = "https://api.github.com"
PER_PAGE = 50

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


async def github_notification(token, last_updated_at=None):
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
    async with aiohttp.ClientSession() as session:
        while True:
            async with session.get(url=url, headers=headers, params=params) as response:
                data = await response.json()

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

    logger.info(
        f"get {len(notifications)} github notifications since {last_updated_at}"
    )

    return notifications, updated_at


async def github_set_read(token, last_updated_at=None):
    url = f"{GITHUB_API_BASE_URL}/notifications"
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {token}",
    }
    data = {"read": True}

    if last_updated_at:
        last_updated_at_plus_1sec = last_updated_at + timedelta(seconds=1)
        data["last_read_at"] = last_updated_at_plus_1sec.strftime("%Y-%m-%dT%H:%M:%SZ")

    async with aiohttp.ClientSession() as session:
        async with session.put(url=url, headers=headers, json=data) as response:
            logger.info(f"set github notifications as read since {last_updated_at} with status={response.status}")
