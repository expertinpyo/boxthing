#! /usr/bin/python2
import asyncio
import json
import websockets.server as websockets
import asyncio_mqtt as aiomqtt
import os
import time
import sys

mqtt_message_queue = asyncio.Queue()

stream = os.popen("cat /proc/cpuinfo | grep Serial | awk '{print$3}'")
serial_number = stream.read().replace("\n","")
stream.close()


EMULATE_HX711=False

referenceUnit = 394


if not EMULATE_HX711:
    import RPi.GPIO as GPIO
    from hx711 import HX711
    GPIO.setwarnings(False)
else:
    from emulated_hx711 import HX711

def cleanAndExit():
    print("Cleaning...")

    if not EMULATE_HX711:
        GPIO.cleanup()
        
    print("Bye!")
    sys.exit()

hx = HX711(13, 8)
hx.set_reading_format("MSB", "MSB")
hx.set_reference_unit(referenceUnit)
hx.reset()
hx.tare()
print("Tare done! Add weight now...")

async def mqtt_consumer(client):
    async with client.unfiltered_messages() as messages:
        await client.subscribe(f"boxthing/{serial_number}")
        async for message in messages:
            data = json.loads(message.payload)
            print(f"Message from mqtt: {data}")

async def mqtt_producer(client):
    while True:
        message = await mqtt_message_queue.get()
        print(message)
        await client.publish("boxthing",json.dumps(message))
        
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
        
async def mqtt_test_coro(water_data):
    while True:
        await mqtt_message_queue.put({
            "type": "wt",
            "deviceId": serial_number,
            "amount": water_data,
        })
        await asyncio.sleep(5)        

async def load_cell():
    check_data_next = 0
    check_data_before = 0
    check_cnt = 0
    while True:
        try:
            val = hx.get_weight(5)
            
            int_val = int(val)
            if -3 <= int_val - check_data_next <= 3:
                if check_cnt < 5:
                    check_cnt += 1
                if check_cnt == 5 and int_val > 10:
                    check_cnt += 1
                    cha = check_data_before - check_data_next
                    if cha > 0:
                        print(f"You Drinked {cha}g water!")
                        await mqtt_test_coro(cha)
            else:
                if check_cnt == 6 and check_data_next > 10:
                    check_data_before = check_data_next
                check_cnt = 0
                check_data_next = int_val
            hx.power_down()
            hx.power_up()
            time.sleep(0.1)

        except (KeyboardInterrupt, SystemExit):
            cleanAndExit()


async def main():
    await asyncio.gather(
        mqtt_main(),
        load_cell(),
    )
    
if __name__ == "__main__":
    # 다음줄은 윈도우에서 실행할 경우 필요
    #asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    #asyncio.run(main())
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())