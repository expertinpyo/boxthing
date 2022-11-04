import asyncio
import json
import websockets.server as websockets
import asyncio_mqtt as aiomqtt
from dotenv import load_dotenv
from os import environ
from typing import Optional
from datetime import datetime

from modules.api import google_calendar, github_notification


ws_message_queue = asyncio.Queue()
mqtt_message_queue = asyncio.Queue()


class State:
    lock = asyncio.Lock()

    has_ws_connection = asyncio.Event()

    google_access_token = ""
    google_refresh_token = ""
    github_access_token = ""
    github_notification_last_updated_at: Optional[datetime] = None


state = State()


async def ws_consumer(websocket):
    async for message in websocket:
        data = json.loads(message)
        print(f"Message from websocket: {data}")


async def ws_producer(websocket):
    while True:
        message = await ws_message_queue.get()
        await websocket.send(json.dumps(message))


async def ws_handler(websocket):
    if state.has_ws_connection.is_set():
        await websocket.close()
        return

    state.has_ws_connection.set()

    await asyncio.gather(
        ws_consumer(websocket),
        ws_producer(websocket),
    )

    state.has_ws_connection.clear()


async def mqtt_consumer(client):
    async with client.unfiltered_messages() as messages:
        await client.subscribe(f"{environ['MQTT_BASE_TOPIC']}/{environ['DEVICE_ID']}")
        async for message in messages:
            data = json.loads(message.payload)
            print(f"Message from mqtt: {data}")


async def mqtt_producer(client):
    while True:
        message = await mqtt_message_queue.get()
        message["deviceId"] = environ['DEVICE_ID']
        await client.publish(environ["MQTT_BASE_TOPIC"], json.dumps(message))


async def mqtt_client():
    async with aiomqtt.Client(
        hostname=environ["MQTT_HOST"],
        port=int(environ["MQTT_PORT"]),
        tls_params=aiomqtt.TLSParameters(),
    ) as client:
        await asyncio.gather(
            mqtt_consumer(client),
            mqtt_producer(client),
        )


async def google_calendar_coroutine():
    while True:
        events = []
        if state.google_access_token:
            events = google_calendar(state.google_access_token)
            # TODO: Need access token expiration check

        if events:
            await ws_message_queue.put(events)

        await asyncio.sleep(5 * 60)


async def github_notifications_coroutine():
    while True:
        notifications = []
        if state.github_access_token:
            notifications, last_updated_at = github_notification(
                state.github_access_token, state.github_notification_last_updated_at
            )
            if last_updated_at is not None:
                state.github_notification_last_updated_at = last_updated_at

        if notifications:
            await ws_message_queue.put(notifications)

        await asyncio.sleep(1 * 60)


async def main():
    load_dotenv()

    ws_server = await websockets.serve(
        ws_handler, "localhost", int(environ["WEBSOCKET_PORT"])
    )

    # Websocket 연결이 생길때까지 블락
    # TODO: 다른 모든 코루틴의 매 루프마다 has_ws_connection.wait()를 걸어두는건?
    await state.has_ws_connection.wait()

    await asyncio.gather(
        ws_server.serve_forever(),
        mqtt_client(),
        google_calendar_coroutine(),
        github_notifications_coroutine(),
    )


if __name__ == "__main__":
    # 다음줄은 윈도우에서 실행할 경우 필요
    # asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(main())
