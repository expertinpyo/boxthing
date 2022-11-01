import asyncio
import json
import websockets.server as websockets
import asyncio_mqtt as aiomqtt

mqtt_message_queue = asyncio.Queue()


async def mqtt_consumer(client):
    async with client.unfiltered_messages() as messages:
        await client.subscribe("boxthing")
        async for message in messages:
            data = json.loads(message.payload)
            print(f"Message from mqtt: {data}")
            
            await mqtt_message_queue.put((data["deviceId"], {
                "type": "wt",
                "check": 1,
            }))

async def mqtt_producer(client):
    while True:
        device_id, message = await mqtt_message_queue.get()
        await client.publish(f"boxthing/{device_id}",json.dumps(message))
        
        
        
async def mqtt_main():
    async with aiomqtt.Client(
        hostname="k7a408.p.ssafy.io",
        port=8883,
        tls_params=aiomqtt.TLSParameters(),
    ) as client:
        await asyncio.gather(
            mqtt_consumer(client),
            mqtt_producer(client)
        )
        
async def mqtt_test_coro():
    while True:
        await mqtt_message_queue.put({
            "type": "wt",
            "amount": "100",
        })
        await asyncio.sleep(5)
        
        
async def main():
    await asyncio.gather(
        mqtt_main(),
    )
    
if __name__ == "__main__":
    # 다음줄은 윈도우에서 실행할 경우 필요
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    #asyncio.run(main())
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())