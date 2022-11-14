## Google STT 설정

- 해당 사이트를 통해 STT를 설정하자
  https://cloud.google.com/speech-to-text/docs/before-you-begin#windows

## 테스트

- 라이브러리 설치
  https://cloud.google.com/speech-to-text/docs/transcribe-client-libraries#client-libraries-usage-python

- `/Test_Code/google_stt_test.py`를 실행시켜보자!

## 에러 발생

- 다음과 같은 에러가 발생할 것입니다.

```
ImportError: /lib/arm-linux-gnueabihf/libm.so.6: version GLIBC_2.29 not found (required by /home/pi/google_stt/env/lib/python3.7/site-packages/grpc/_cython/cygrpc.cpython-37m-arm-linux-gnueabihf.so)
```

### 해결

1. `/home/pi/.bashrc`수정하기

```
export PATH="$HOME/.local/bin:$PATH"
```

2. 수정 후 다음 명령어 4줄 입력 - 약 : 30분

```
pip uninstall grpcio
pip uninstall grpcio-status
pip install grpcio==1.44.0 --no-binary=grpcio
pip install grpcio-tools==1.44.0 --no-binary=grpcio-tools

```

- 테스트 다시 해보면, 에러 발생 없어질 것입니다.

## Picovoice 설정

- 해당 페이지에서 custon wake-up word 제작 할 수 있음 : https://console.picovoice.ai/ppn
- 해당 콘솔에서 로그인하면 ACCESS_KEY 발급받을 수 있음 : https://console.picovoice.ai/

### 라이브러리 설정

- https://github.com/Picovoice/porcupine/tree/master/demo/python

### 설치

```
pip3 install pvporcupinedemo
```

### 테스트

`/Test_Code/porcupine_demo_mic`를 통해 테스트
만들어둔 본인의 access_key를 넣고 실행시켜보기

```
porcupine_demo_mic --access_key ${ACCESS_KEY} --keywords picovoice
```

- picovoice라고 마이크에 말 했을 때, Hotword detected라는 메세지 출력하면 정상

## 전체 코드 동작

- STT & PicoVoice 설정이 완료된다면, 다음 코드를 실행시켜보자

- `도와줘-박싱_ko_raspberry-pi_v2_1_0.ppn`와 `porcupine_params_ko.pv`가 저장된 경로 기록한 후 명령어 입력 시 변경 후 입력해주기!
- 다음 명령어를 통해 입력된 audio_index 확인하기

```
porcupine_demo_mic --show_audio_devices
```

- 직전에 출력된 audio_index를 통해 명령어 입력 시 index 변경해주기!

```
python3 voice.py --access_key ${ACCESS_KEY} --keyword_paths /home/pi/stt/pico/도와줘-박싱_ko_raspberry-pi_v2_1_0.ppn --model_path /home/pi/stt/pico/porcupine_params_ko.pv --audio_device_index 1
```

### 동작 흐름

- wake-up word인 "도와줘 박싱"로 깨운 후, 3초 안에 실행할 명령어 말하면 됩니다.(반복)
