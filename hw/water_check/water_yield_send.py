import asyncio
import time
import sys
import RPi.GPIO as GPIO
from hx711 import HX711

async def cleanAndExit():
    print("Cleaning...")
    GPIO.cleanup()
    print("Bye!")
    sys.exit()
  
async def amount_water():
    referenceUnit = 394
    check_data_next = 0
    check_data_before = 0
    check_cnt = 0
    hx = HX711(13, 8)
    hx.set_reading_format("MSB", "MSB")
    hx.set_reference_unit(referenceUnit)
    hx.reset()
    hx.tare()
    print("Tare done! Add weight now...")
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
                        yield cha
            else:
                if check_cnt == 6 and check_data_next > 10:
                    check_data_before = check_data_next
                check_cnt = 0
                check_data_next = int_val

            hx.power_down()
            hx.power_up()
            await asyncio.sleep(0.1)

        except (KeyboardInterrupt, SystemExit):
            cleanAndExit()