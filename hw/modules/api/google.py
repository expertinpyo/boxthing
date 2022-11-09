import asyncio
import aiohttp
from datetime import datetime, timedelta
from dateutil import tz
import logging

GOOGLE_CALENDAR_BASE_URL = "https://www.googleapis.com/calendar/v3"

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


class GoogleAccessTokenExpired(Exception):
    pass


async def fetch_calendar(calendar, headers, params):
    calendar_id = calendar["id"]
    url = f"{GOOGLE_CALENDAR_BASE_URL}/calendars/{calendar_id}/events"

    event_list = []

    async with aiohttp.ClientSession() as session:
        while True:
            async with session.get(url=url, headers=headers, params=params) as response:
                data = await response.json()

                if "items" not in data:
                    break

                event_list += data["items"]

                if "nextPageToken" not in data:
                    break

                params["pageToken"] = data["nextPageToken"]

    return event_list


async def google_calendar(token):
    # get google calendar list
    headers = {"Authorization": f"Bearer {token}"}

    url = f"{GOOGLE_CALENDAR_BASE_URL}/users/me/calendarList"
    calendar_list = []
    params = {}

    async with aiohttp.ClientSession() as session:
        while True:
            async with session.get(url=url, headers=headers, params=params) as response:
                if response.status == 401:
                    logger.info("google access token expired")
                    raise GoogleAccessTokenExpired

                data = await response.json()

                if "items" not in data:
                    break

                calendar_list += data["items"]

                if "nextPageToken" not in data:
                    break

                params["page_token"] = data["nextPageToken"]

    KST = tz.gettz("Asia/Seoul")
    today = datetime.now(tz=tz.UTC).astimezone(tz=KST)
    today_start = datetime(today.year, today.month, today.day, tzinfo=KST)
    today_end = today_start + timedelta(days=1)

    params = {
        "timeMin": today_start.isoformat(),
        "timeMax": today_end.isoformat(),
        "timeZone": "Asia/Seoul",
        "singleEvents": "True",
        "orderBy": "startTime",
    }

    event_list = await asyncio.gather(
        *[fetch_calendar(calendar, headers, params) for calendar in calendar_list]
    )

    flattened_list = []
    for events, calendar in zip(event_list, calendar_list):
        for event in events:
            event["calendar"] = calendar
            flattened_list.append(event)

    sorted_list = sorted(flattened_list, key=lambda x: x["start"]["dateTime"])

    logger.info(f"get {len(sorted_list)} events from google calendar")

    return sorted_list
