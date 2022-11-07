import asyncio
import json
import websockets.server as websockets
import asyncio_mqtt as aiomqtt
from dotenv import load_dotenv
import os
from os import environ
from typing import Optional
from datetime import datetime
from water_check import amount_water
from modules.api import google_calendar, github_notification


ws_message_queue: asyncio.Queue[tuple[str, dict | list | None]] = asyncio.Queue()
mqtt_message_queue: asyncio.Queue[tuple[str, dict | list | None]] = asyncio.Queue()


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
        message_dict = json.loads(message)
        type_list = message_dict["type"].split("/")
        data = message_dict["data"]

        print(f"Message from websocket type: {type_list}, data: {data}")

        if type_list[0] == "init":
            pass


async def ws_producer(websocket):
    while True:
        type_, data = await ws_message_queue.get()
        message = {
            "type": type_,
            "data": data,
        }

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
        await client.subscribe(
            f"{environ['MQTT_BASE_TOPIC']}/device/{environ['DEVICE_ID']}/#"
        )
        async for message in messages:
            data = json.loads(message.payload)
            topic_list = message.topic.split("/")[3:]

            print(f"Message from mqtt topic: {topic_list}, data: {data}")

            if topic_list[0] == "init":
                pass


async def mqtt_producer(client):
    while True:
        topic, data = await mqtt_message_queue.get()
        message = {
            "device_id": environ["DEVICE_ID"],
            "data": data,
        }

        await client.publish(
            f"{environ['MQTT_BASE_TOPIC']}/server/{topic}", json.dumps(message)
        )


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
        await state.has_ws_connection.wait()

        events = []
        if state.google_access_token:
            events = google_calendar(state.google_access_token)
            # TODO: Need access token expiration check

        if events:
            await ws_message_queue.put(("calendar", events))

        await asyncio.sleep(5 * 60)


async def github_notifications_coroutine():
    while True:
        await state.has_ws_connection.wait()

        notifications = []
        if state.github_access_token:
            notifications, last_updated_at = github_notification(
                state.github_access_token, state.github_notification_last_updated_at
            )
            if last_updated_at is not None:
                state.github_notification_last_updated_at = last_updated_at

        if notifications:
            await ws_message_queue.put(("github/noti", notifications))

        await asyncio.sleep(1 * 60)

async def water_coroutine():
    async for water in amount_water():
        await ws_message_queue.put(("water", water))
        await mqtt_message_queue.put(("water", water))

async def main():
    load_dotenv()

    ws_server = await websockets.serve(
        ws_handler, "localhost", int(environ["WEBSOCKET_PORT"])
    )

    await mqtt_message_queue.put(("init", None))

    await asyncio.gather(
        ws_server.serve_forever(),
        mqtt_client(),
        google_calendar_coroutine(),
        github_notifications_coroutine(),
        water_coroutine(),
    )


if __name__ == "__main__":
    # 윈도우에서 실행할 경우
    if os.name == "nt":
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

    asyncio.run(main())
