import pvporcupine
from pvrecorder import PvRecorder

def show_audio_devices():
        devices = PvRecorder.get_audio_devices()

        for i in range(len(devices)):
            print('index: %d, device name: %s' % (i, devices[i]))

show_audio_devices()
