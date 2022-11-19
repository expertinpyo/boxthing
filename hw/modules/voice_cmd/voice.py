import os
from . import voice_porcupine_custom
import sys
import time
from threading import Thread
from .voice_recognition import VoiceRecognition


give_evnets_flag = 0


class DetectHotword(Thread):
    def __init__(self):
        super().__init__()
        self.kill_received = False
        self.stt = VoiceRecognition()

    def run(self):
        global give_evnets_flag, send_command
        while not self.kill_received:
            if (voice_porcupine_custom.hot_word_flag):
                print("Hotword detected")
                voice_porcupine_custom.stop_wake_flag = 1
                send_command = self.stt.run()
                give_evnets_flag = 1
                voice_porcupine_custom.stop_wake_flag = 0
                time.sleep(7)


def recognize_boxthing():
    if voice_porcupine_custom.recognize:
        voice_porcupine_custom.recognize = 0
        return True


def give_events():
    global give_evnets_flag
    if give_evnets_flag:
        give_evnets_flag = 0
        return send_command


args = voice_porcupine_custom.porcupine_parsing()
threads = []
th1 = voice_porcupine_custom.PorcupineCustom(
    access_key=args.access_key,
    library_path=args.library_path,
    model_path=args.model_path,
    keyword_paths=args.keyword_paths,
    sensitivities=args.sensitivities,
    input_device_index=args.audio_device_index)

th2 = DetectHotword()
th3 = Thread(target=voice_porcupine_custom.timer1)
th4 = Thread(target=voice_porcupine_custom.timer2)
threads.append(th1)
threads.append(th2)
threads.append(th3)
th1.start()
th2.start()
th3.start()
th4.start()
