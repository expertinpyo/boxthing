import requests
from datetime import datetime, timedelta
from dateutil import tz

GOOGLE_CALENDAR_BASE_URL = "https://www.googleapis.com/calendar/v3"


class GoogleAccessTokenExpired(Exception):
    pass


def google_calendar(token):
    # get google calendar list
    headers = {"Authorization": f"Bearer {token}"}

    url = f"{GOOGLE_CALENDAR_BASE_URL}/users/me/calendarList"
    calendar_list = []
    params = {}

    while True:
        response = requests.get(url=url, headers=headers, params=params)
        if response.status_code == 401:
            raise GoogleAccessTokenExpired

        data = response.json()

        if "items" not in data:
            break

        calendar_list += data["items"]

        if "nextPageToken" not in data:
            break

        params["page_token"] = data["nextPageToken"]

    event_list = []
    KST = tz.gettz("Asia/Seoul")
    today = datetime.now(tz=tz.UTC).astimezone(tz=KST)
    today_start = datetime(today.year, today.month, today.day, tzinfo=KST)
    today_end = today_start + timedelta(days=1)

    for calendar in calendar_list:
        calendar_id = calendar["id"]
        url = f"{GOOGLE_CALENDAR_BASE_URL}/calendars/{calendar_id}/events"

        params = {
            "timeMin": today_start.isoformat(),
            "timeMax": today_end.isoformat(),
            "timeZone": "Asia/Seoul",
            "singleEvents": "True",
            "orderBy": "startTime",
        }

        while True:
            response = requests.get(url=url, headers=headers, params=params)
            data = response.json()

            if "items" not in data:
                break

            event_list += data["items"]

            if "nextPageToken" not in data:
                break

            params["pageToken"] = data["nextPageToken"]

    print(event_list)

    return event_list
