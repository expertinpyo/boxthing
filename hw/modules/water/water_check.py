import asyncio
import time
import sys
import RPi.GPIO as GPIO
from .hx711 import HX711
from datetime import datetime, timedelta
from dateutil import tz
from threading import Thread

cha = 0
return_flag = 0

def cleanAndExit():
    print("Cleaning...")
    GPIO.cleanup()
    print("Bye!")
    sys.exit()

def return_water():
    global return_flag,cha
    if return_flag:
        return_flag = 0
        today = datetime.now(tz=tz.UTC)
        return {"amount":cha, "timestamp": today.isoformat()}

def amount_water():
    global return_flag,cha
    referenceUnit = 394
    check_data_next = 0
    check_data_before = 0
    check_cnt = 0
    hx = HX711(15, 14)
    hx.setting()
    hx.set_reading_format("MSB", "MSB")
    hx.set_reference_unit(referenceUnit)
    hx.reset()
    hx.tare()
    print("Tare done! Add weight now...")
    while True:
        try:
            val = hx.get_weight(11)
            
            int_val = val + 220
            #print(int_val)
            if -3 <= int_val - check_data_next <= 3:
                if check_cnt < 3:
                    check_cnt += 1
                if check_cnt == 3 and int_val > 20:
                    check_cnt += 1
                    cha = check_data_before - check_data_next
                    if cha > 10:
                        return_flag = 1
            else:
                if check_cnt == 4 and check_data_next > 20:
                    check_data_before = check_data_next
                check_cnt = 0
                check_data_next = int_val

            hx.power_down()
            hx.power_up()
            time.sleep(0.25)

        except (KeyboardInterrupt, SystemExit):
             cleanAndExit()

th = Thread(target = amount_water)
th.start()
