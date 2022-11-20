import asyncio
import json
import websockets.server as websockets
from modules.water import return_water
from modules.posture import Cam
from modules.voice_cmd import give_events, recognize_boxthing
import asyncio_mqtt as aiomqtt
from dotenv import load_dotenv
import os
from os import environ
from threading import Thread
import logging

from modules.api import (
    google_calendar,
    GoogleAccessTokenExpired,
    github_notification,
    github_set_read,
)

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

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
cam = Cam()

th = Thread(target=cam.take_picture)
th.start()


async def ws_consumer(websocket):
    async for message in websocket:
        message_dict = json.loads(message)
        type_list = message_dict["type"].split(
            "/") if "type" in message_dict else [""]
        data = message_dict["data"] if "data" in message_dict else None

        logger.info(f"message from websocket type={type_list}")

        if type_list[0] == "github":
            if type_list[1] == "qr":
                await mqtt_message_queue.put(("qr/github", None))

            if type_list[1] == "read":
                await github_set_read(
                    state.github_access_token, state.github_notification_last_updated_at
                )

        if type_list[0] == "log":
            # Pass any log request to mqtt
            await mqtt_message_queue.put(("/".join(type_list), data))

        if type_list[0] == "posture":
            if type_list[1] == "reset":
                cam.stop()
                await ws_message_queue.put(("posture/ready", None))
            elif type_list[1] == "capture":
                result = cam.checking(data)
                if result:
                    await ws_message_queue.put(("posture/complete", None))
                else:
                    await ws_message_queue.put(("posture/nope", None))
            elif type_list[1] == "complete":
                cam.start()


async def ws_producer(websocket):
    while True:
        type_, data = await ws_message_queue.get()
        message = {
            "type": type_,
            "data": data,
        }

        logger.info(f"send ws message type={type_}")

        await websocket.send(json.dumps(message))


async def ws_handler(websocket):
    await state.init_done.wait()

    logger.info("ws connected")

    if state.ws_connected.is_set():
        logger.warning("ws connection already exists")
        await websocket.close()
        return

    state.ws_connected.set()

    done, pending = await asyncio.wait(
        [ws_consumer(websocket), ws_producer(websocket)],
        return_when=asyncio.FIRST_COMPLETED,
    )

    logger.info("ws disconnected")

    for task in pending:
        task.cancel()

    # reset states
    state.init_done.clear()
    state.ws_connected.clear()
    state.google_logged_in.clear()
    state.github_logged_in.clear()

    while not ws_message_queue.empty():
        await ws_message_queue.get()
    while not mqtt_message_queue.empty():
        await mqtt_message_queue.get()

    state.google_access_token = ""
    state.github_access_token = ""
    state.github_notification_last_updated_at = None

    await mqtt_message_queue.put(("init", None))


async def mqtt_consumer(client):
    async with client.unfiltered_messages() as messages:
        await client.subscribe(
            f"{environ['MQTT_BASE_TOPIC']}/device/{environ['DEVICE_ID']}/#"
        )
        async for message in messages:
            message_dict = json.loads(message.payload)
            data = message_dict["data"] if "data" in message_dict else None
            topic_list = message.topic.split("/")[3:]

            logger.info(f"message from mqtt topic={topic_list}")

            if topic_list[0] == "init":
                if (
                    data is None
                    or "google_access_token" not in data
                    or "github_access_token" not in data
                ):
                    logger.error(
                        f"MQTT: invalid data: topic={message.topic}, data={data}"
                    )
                    continue

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
                    if data is None or "link" not in data:
                        logger.error(
                            f"invalid mqtt message: topic={topic_list}, data={data}"
                        )
                        continue

                    ws_data = {
                        "google": {"is_login": False, "link": data["link"]},
                        "github": {
                            "is_login": True if state.github_access_token else False
                        },
                    }

                    await ws_message_queue.put(("init", ws_data))
                    state.init_done.set()

                if topic_list[1] == "github":
                    if data is None or "link" not in data:
                        logger.error(
                            f"invalid mqtt message: topic={topic_list}, data={data}"
                        )
                        continue

                    ws_data = {"link": data["link"]}

                    await ws_message_queue.put(("github/qr", ws_data))

            if topic_list[0] == "login":
                if topic_list[1] == "google":
                    if data is None or "access_token" not in data:
                        logger.error(
                            f"invalid mqtt message: topic={topic_list}, data={data}"
                        )
                        continue
                    state.google_access_token = data["access_token"]

                    await ws_message_queue.put(("login", None))
                    state.google_logged_in.set()

                if topic_list[1] == "github":
                    if data is None or "access_token" not in data:
                        logger.error(
                            f"invalid mqtt message: topic={topic_list}, data={data}"
                        )
                        continue
                    state.github_access_token = data["access_token"]

                    await ws_message_queue.put(("github/login", None))
                    state.github_logged_in.set()

            if topic_list[0] == "access_token":
                if topic_list[1] == "google":
                    if data is None or "access_token" not in data:
                        logger.error(
                            f"invalid mqtt message: topic={topic_list}, data={data}"
                        )
                        continue
                    state.google_access_token = data["access_token"]
                    state.google_refreshed.set()

                if topic_list[1] == "github":
                    if data is None or "access_token" not in data:
                        logger.error(
                            f"invalid mqtt message: topic={topic_list}, data={data}"
                        )
                        continue
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

        logger.info(f"send mqtt message topic={topic}")

        await client.publish(
            f"{environ['MQTT_BASE_TOPIC']}/server/{topic}", json.dumps(message)
        )


async def mqtt_client():
    async with aiomqtt.Client(
        hostname=environ["MQTT_HOST"],
        port=int(environ["MQTT_PORT"]),
        tls_params=aiomqtt.TLSParameters(),
    ) as client:
        logger.info("mqtt connected")

        await asyncio.gather(
            mqtt_consumer(client),
            mqtt_producer(client),
        )

        logger.info("mqtt disconnected")


async def google_calendar_coroutine():
    await state.google_logged_in.wait()

    while True:
        await state.ws_connected.wait()

        try:
            events = await google_calendar(state.google_access_token)

            if events:
                await ws_message_queue.put(("calendar", events))

            await asyncio.sleep(5 * 60)

        except GoogleAccessTokenExpired:
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

        if last_updated_at is not None:
            state.github_notification_last_updated_at = last_updated_at

        if notifications:
            await ws_message_queue.put(("github/noti", notifications))

        await asyncio.sleep(1 * 60)


async def water_coroutine():
    while True:
        water = return_water()
        if water:
            await ws_message_queue.put(("water", water))
            await mqtt_message_queue.put(("water", water))
        await asyncio.sleep(0.1)


async def motion_coro():
    async for image in cam.capture():
        print(image)
        await ws_message_queue.put(("posture", image))
        await mqtt_message_queue.put(("posture", image))


async def recognize_boxthing_coroutine():
    while True:
        recognize_flag = recognize_boxthing()
        if recognize_flag:
            print("인식함")
            await ws_message_queue.put(("send/cmd", None))
        await asyncio.sleep(0.1)


async def voice_command_coroutine():

    while True:
        # await state.ws_connected.wait()
        voice_cmd = give_events()
        if voice_cmd:
            print(voice_cmd)
            if voice_cmd == "캘린더":
                # print("calendar")
                await ws_message_queue.put(("success/cmd", None))
                await ws_message_queue.put(("route/calendar", None))
            elif voice_cmd == "깃허브" or voice_cmd == "기타부" or voice_cmd == "러브":
                # print("Git")
                await ws_message_queue.put(("success/cmd", None))
                await ws_message_queue.put(("route/git", None))
            elif voice_cmd == "자세" or voice_cmd == "자세히":
                # print("posture")
                await ws_message_queue.put(("success/cmd", None))
                await ws_message_queue.put(("route/posture", None))
            elif voice_cmd == "마신" or voice_cmd == "음수량" or voice_cmd == "맛있는" or voice_cmd == "마신물" or voice_cmd == "음주량" or voice_cmd == "미수령":
                # print("water-check")
                await ws_message_queue.put(("success/cmd", None))
                await ws_message_queue.put(("route/water", None))
            elif voice_cmd == "누적" or voice_cmd == "무적":
                print("show_graph")
                await ws_message_queue.put(("success/cmd", None))
                await ws_message_queue.put(("toggle/posture/today", None))
            elif voice_cmd == "실시간":
                print("show_graph")
                await ws_message_queue.put(("success/cmd", None))
                await ws_message_queue.put(("toggle/posture/runtime", None))
            elif voice_cmd == "오늘":
                print("show_graph")
                await ws_message_queue.put(("success/cmd", None))
                await ws_message_queue.put(("toggle/water/today", None))
            elif voice_cmd == "일주일" or voice_cmd == "통계" or voice_cmd == "공개" or voice_cmd == "홍게":
                print("show_graph")
                await ws_message_queue.put(("success/cmd", None))
                await ws_message_queue.put(("toggle/water/week", None))
            elif voice_cmd == "스트레칭" or voice_cmd == "채팅" or voice_cmd == "세팅" or voice_cmd == "쇼파" or voice_cmd == "트레이딩" or voice_cmd == "스트레스" or voice_cmd == "스케쥴":
                # print("show_Stretching")
                await ws_message_queue.put(("success/cmd", None))
                await ws_message_queue.put(("stretch", None))
            elif voice_cmd == "사진":
                print("take picture")
                await ws_message_queue.put(("success/cmd", None))
                await ws_message_queue.put(("posture/re", None))
            elif voice_cmd == "음성":
                print("show voice_cmd")
                await ws_message_queue.put(("success/cmd", None))
                await ws_message_queue.put(("show/cmd", None))
            else:
                await ws_message_queue.put(("fail/cmd", None))
                print("unknown command")

        await asyncio.sleep(1)


async def main():
    load_dotenv()
    logging.basicConfig(level=logging.INFO)

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
        voice_command_coroutine(),
        motion_coro(),
        recognize_boxthing_coroutine()
    )


if __name__ == "__main__":
    # 윈도우에서 실행할 경우
    if os.name == "nt":
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
