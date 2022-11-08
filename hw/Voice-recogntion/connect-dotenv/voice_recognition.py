import os
import io
import time
from google.cloud import speech
from . import voice_porcupine_custom


class VoiceRecognition():
    def __init__(self):
        self.voice_file_name='cmd.wav'
        self.local_file_path = os.path.join(
            '/home/pi/stt/pico/', self.voice_file_name)
        self.client = speech.SpeechClient()
        self.config = config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=16000,
            language_code="ko-KR"
        )

    def parse_command(self):
        with io.open(self.local_file_path, 'rb') as f:
            content = f.read()
        audio = speech.RecognitionAudio(content=content)

        # send cmd.wav file to google stt and get result
        response = self.client.recognize(config=self.config, audio=audio)

        var2 = []

        # among candidates, find a keyword that has the highest confidence
        for result in response.results:
            var2 = result.alternatives[0].transcript

        if len(var2) > 0 :
            var1 = var2.split()
            self.var = var1[0]
        else :
            print("command not parsing")
            self.var = "Error"

    def map_commands(self):
        # map robot func according to the cmd
        if self.var == "테스트":
            print("테스트!!!!!!!")
        else:
            print("Unknown command!!")

    def run(self):
        """record cmd if hot word detected -> parse -> map
        """
        if voice_porcupine_custom.hot_word_flag:
            print("\nFinish recording\n Start parsing")
            self.parse_command()
            print("\nFinish parsing\n")
            return self.var
