import asyncio
import json
import websockets.server as websockets
import asyncio_mqtt as aiomqtt


ws_message_queue = asyncio.Queue()
mqtt_message_queue = asyncio.Queue()


async def ws_consumer(websocket):
    async for message in websocket:
        data = json.loads(message)
        print(f"Message from websocket: {data}")


async def ws_producer(websocket):
    while True:
        message = await ws_message_queue.get()
        await websocket.send(json.dumps(message))


async def ws_handler(websocket):
    await asyncio.gather(
        ws_consumer(websocket),
        ws_producer(websocket),
    )


async def ws_test_coro():
    count = 1
    while True:
        await ws_message_queue.put(
            {
                "message": "Hello, World!",
                "count": count,
            }
        )
        count += 1

        await asyncio.sleep(5)


async def mqtt_consumer(client):
    async with client.unfiltered_messages() as messages:
        await client.subscribe("boxthing/somelongid")
        async for message in messages:
            data = json.loads(message)
            print(f"Message from mqtt: {data}")


async def mqtt_producer(client):
    while True:
        message = await mqtt_message_queue.get()
        await client.publish("boxthing", json.dumps(message))


async def mqtt_main():
    async with aiomqtt.Client(
        hostname="k7a408.p.ssafy.io",
        port=8883,
        tls_params=aiomqtt.TLSParameters(),
    ) as client:
        await asyncio.gather(
            mqtt_consumer(client),
            mqtt_producer(client),
        )


async def mqtt_test_coro():
    while True:
        await mqtt_message_queue.put(
            {
                "type": "qr",
                "deviceId": "somelongid",
            }
        )

        await asyncio.sleep(5)


async def main_coro():
    while True:
        pass


async def main():
    ws_server = await websockets.serve(ws_handler, "localhost", 8765)

    await asyncio.gather(
        ws_server.serve_forever(),
        mqtt_main(),
        ws_test_coro(),
        mqtt_test_coro(),
        main_coro(),
    )


if __name__ == "__main__":
    # 다음줄은 윈도우에서 실행할 경우 필요
    #asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    #asyncio.run(main())
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
