import os
from . import voice_porcupine_custom
import sys
import time
from threading import Thread
from .voice_recognition import VoiceRecognition
from datetime import datetime, timedelta
from dateutil import tz


give_evnets_flag = 0


class DetectHotword(Thread):
    def __init__(self):
        super().__init__()
        self.kill_received = False
        self.stt = VoiceRecognition()

    def run(self):
        global give_evnets_flag, send_command
        while not self.kill_received:
            if(voice_porcupine_custom.hot_word_flag):
                print("Hotword detected")
                voice_porcupine_custom.stop_wake_flag = 1
                send_command = self.stt.run()
                give_evnets_flag = 1
                voice_porcupine_custom.stop_wake_flag = 0
                time.sleep(7)


def give_events():
    global give_evnets_flag
    if give_evnets_flag:
        give_evnets_flag = 0
        today = datetime.now(tz=tz.UTC)
        return {"voicecmd": send_command, "timestamp": today.isoformat()}


args = voice_porcupine_custom.porcupine_parsing()
print(args)
threads = []
th1 = voice_porcupine_custom.PorcupineCustom(
    access_key=args.access_key,
    library_path=args.library_path,
    model_path=args.model_path,
    keyword_paths=args.keyword_paths,
    sensitivities=args.sensitivities,
    input_device_index=args.audio_device_index)

th2 = DetectHotword()
th3 = Thread(target=voice_porcupine_custom.timer)
threads.append(th1)
threads.append(th2)
threads.append(th3)
th1.start()
th2.start()
th3.start()
