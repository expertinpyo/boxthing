import os
import voice_porcupine_custom
import sys
import time
from threading import Thread
from voice_recognition import VoiceRecognition


class DetectHotword(Thread):
    def __init__(self):
        super().__init__()
        self.kill_received = False
        self.stt = VoiceRecognition()
    def run(self):
        while not self.kill_received:
            if(voice_porcupine_custom.hot_word_flag):
                print("Hotword detected")
                voice_porcupine_custom.stop_wake_flag = 1
                self.stt.run()
                voice_porcupine_custom.stop_wake_flag = 0
                time.sleep(7)


def has_live_threads(threads):
    for t in threads:
        if t.is_alive():
            return True


if __name__ == "__main__":
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
    th3 = Thread(target = voice_porcupine_custom.timer)
    threads.append(th1)
    threads.append(th2)
    threads.append(th3)
    th1.start()
    th2.start()
    th3.start()

    while has_live_threads(threads):
        try:
            for t in threads:
                if t is not None and t.is_alive():
                    t.join(1)
        except KeyboardInterrupt:
            print("Sending kill to threads")
            for t in threads:
                t.kill_received = True

            for t in threads:
                if t is not None and t.is_alive():
                    t.join(1)

    print("Exited")
