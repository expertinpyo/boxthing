import asyncio
import json
import websockets.server as websockets
import asyncio_mqtt as aiomqtt
from dotenv import load_dotenv
import os
from os import environ

from modules.api import (
    google_calendar,
    GoogleAccessTokenExpired,
    github_notification,
    github_set_read,
)

ws_message_queue = asyncio.Queue()
mqtt_message_queue = asyncio.Queue()


class State:
    lock = asyncio.Lock()

    ws_connected = asyncio.Event()
    init_done = asyncio.Event()
    google_logged_in = asyncio.Event()
    github_logged_in = asyncio.Event()
    google_refreshed = asyncio.Event()

    google_access_token = ""
    github_access_token = ""
    github_notification_last_updated_at = None


state = State()


async def ws_consumer(websocket):
    async for message in websocket:
        message_dict = json.loads(message)
        type_list = message_dict["type"].split("/")
        data = message_dict["data"]

        print(f"Message from websocket type: {type_list}, data: {data}")

        if type_list[0] == "github":
            if type_list[1] == "qr":
                await mqtt_message_queue.put(("github/qr", None))

            if type_list[1] == "read":
                await github_set_read(
                    state.github_access_token, state.github_notification_last_updated_at
                )

        if type_list[0] == "log":
            # Pass any log request to mqtt
            await mqtt_message_queue.put(("/".join(type_list), data))


async def ws_producer(websocket):
    while True:
        type_, data = await ws_message_queue.get()
        message = {
            "type": type_,
            "data": data,
        }

        await websocket.send(json.dumps(message))


async def ws_handler(websocket):
    await state.init_done.wait()

    if state.ws_connected.is_set():
        await websocket.close()
        return

    state.ws_connected.set()

    await asyncio.gather(
        ws_consumer(websocket),
        ws_producer(websocket),
    )

    state.ws_connected.clear()


async def mqtt_consumer(client):
    async with client.unfiltered_messages() as messages:
        await client.subscribe(
            f"{environ['MQTT_BASE_TOPIC']}/device/{environ['DEVICE_ID']}/#"
        )
        async for message in messages:
            message_dict = json.loads(message.payload)
            data = message_dict["data"]
            topic_list = message.topic.split("/")[3:]

            print(f"Message from mqtt topic: {topic_list}, data: {data}")

            if topic_list[0] == "init":
                state.google_access_token = data["google_access_token"]
                state.github_access_token = data["github_access_token"]

                if state.google_access_token:
                    state.google_logged_in.set()
                if state.github_access_token:
                    state.github_logged_in.set()

                if not state.google_access_token:
                    await mqtt_message_queue.put(("qr/google", None))
                    continue

                ws_data = {
                    "google": {"is_login": True},
                    "github": {
                        "is_login": True if state.github_access_token else False
                    },
                }

                await ws_message_queue.put(("init", ws_data))
                state.init_done.set()

            if topic_list[0] == "qr":
                if topic_list[1] == "google":
                    ws_data = {
                        "google": {"is_login": False, "link": data["link"]},
                        "github": {
                            "is_login": True if state.github_access_token else False
                        },
                    }

                    await ws_message_queue.put(("init", ws_data))
                    state.init_done.set()

                if topic_list[1] == "github":
                    ws_data = {"link": data["link"]}

                    await ws_message_queue.put(("github/qr", ws_data))

            if topic_list[0] == "login":
                if topic_list[1] == "google":
                    state.google_access_token = data["access_token"]

                    await ws_message_queue.put(("login", None))
                    state.google_logged_in.set()

                if topic_list[1] == "github":
                    state.github_access_token = data["access_token"]

                    await ws_message_queue.put(("github/login", None))
                    state.github_logged_in.set()

            if topic_list[0] == "access_token":
                if topic_list[1] == "google":
                    state.google_access_token = data["access_token"]
                    state.google_refreshed.set()

                if topic_list[1] == "github":
                    state.github_access_token = data["access_token"]

            if topic_list[0] == "log":
                # Pass any log response to ws
                await ws_message_queue.put(("/".join(topic_list), data))


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
    await state.google_logged_in.wait()

    while True:
        await state.ws_connected.wait()

        try:
            events = await google_calendar(state.google_access_token)
            print(f"google calendar events: {events}")

            if events:
                await ws_message_queue.put(("calendar", events))

            await asyncio.sleep(5 * 60)

        except GoogleAccessTokenExpired:
            print("google access token expired")
            state.google_refreshed.clear()
            await mqtt_message_queue.put(("access_token/google", None))
            await state.google_refreshed.wait()


async def github_notifications_coroutine():
    await state.github_logged_in.wait()

    while True:
        await state.ws_connected.wait()

        notifications, last_updated_at = await github_notification(
            state.github_access_token, state.github_notification_last_updated_at
        )

        print(
            f"github notifications: {notifications}, last_updated_at: {last_updated_at}"
        )

        if last_updated_at is not None:
            state.github_notification_last_updated_at = last_updated_at

        if notifications:
            await ws_message_queue.put(("github/noti", notifications))

        await asyncio.sleep(1 * 60)


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
    )


if __name__ == "__main__":
    # 윈도우에서 실행할 경우
    if os.name == "nt":
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
