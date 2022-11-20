# HW

- 라즈베리파이 4에 USB 마이크를 장착하여 구글 stt & picovoice를 통해 음성인식 진행
- USB 웹캠을 장착하여 OpenCV와 Tensorflow를 통해 얼굴인식하여 자세 교정 권고
- 로드셀을 장착하여 마신 물을 측정하여 일일 권장량에 맞는 음수량 권고

## 개발환경

- Debian 10 (buster)
- Python == 3.7.3
- OpenCV == 4.6.0
- cvlib == 0.2.7
- dlib == 19.24.0
- tensorflow == 2.4.0
- google-cloud-speech == 2.16.2
- pvporcupine == 2.1.4
- pvrecorder == 1.1.1

## 사용한 HW

- Raspberry Pi 4
- USB Mic
- USB Webcam
- 로드셀(?)
- LCD Display (1024x600)

## 세팅

### 1. RPI 세팅

#### 준비물

- 라즈베리파이
- SD 카드
- SD카드 리더기
- (선택) LCD 모니터, HTML 케이블, 마우스, 키보드

#### 라즈비안 설치

1. SD 카드를 포멧시키자!

- 윈도우에서 SD카드를 장착하면 포멧하겠냐는 알림창을 통해 포멧을 시킬 수 있다. 만약 해당 알림창이 발생하지 않을경우 해당 [사이트](https://www.sdcard.org/downloads/formatter/sd-memory-card-formatter-for-windows-download/)를 통해 포멧시키자!

2. 라즈비안 설치

- [https://www.raspberrypi.com/software/](https://www.raspberrypi.com/software/)에서 라즈비안 설치 가능하다.
  - 라즈비안 : 라즈베리 OS를 편리하게 설치가능하게 해주는 툴

3. 라즈비안 사용법

- 라즈비안을 실행시키면, `운영체제`와 `저장소`를 선택하여 설치할 수 있다.

  - 운영체제 : 32-bit / 64-bit / legacy 등 다양한 버전의 OS를 설치할 수 있다.
  - 저장소 : SD 카드를 포멧시켰기 때문에, SD카드 리더기를 통해 SD카드에 라즈베리파이 OS를 설치하자!

### 2. 음성인식 세팅

USB 마이크 1개를 이용하여 wakeup word와 google stt를 이용하여 명령어를 입력

#### 1. Picovoice 설정

"하이 빅스비"와 같은 wakeup word 설정

- [Picovoice 사이트](https://console.picovoice.ai/)에서 로그인 후 `Access Token` 발급
- 라이브러리 설치

```
pip3 install pvporcupinedemo
pip3 install pvrecorder
```

- 테스트

`hw/Voice-recogntion/Test_Code/porcupine_demo_mic`를 통해
만들어둔 본인의 access_key를 넣고 실행

```
porcupine_demo_mic --access_key ${ACCESS_KEY} --keywords picovoice
```

- picovoice라고 마이크에 말 했을 때, Hotword detected라는 메세지 출력하면 정상

#### 2. Google STT 설정

- `프로젝트 생성 > 서비스 계정 & Access 키(.json 파일) 발급` [참고 사이트](https://cloud.google.com/speech-to-text/docs/before-you-begin#windows)
- 생성한 Acess 키(.json 파일)를 환경변수로 설정

```
GOOGLE_APPLICATION_CREDENTIALS="KEY_PATH"
```

- 라이브러리 설치

```
pip3 install --upgrade google-cloud-speech
pip3 uninstall grpcio
pip3 uninstall grpcio-status
pip3 install grpcio==1.44.0 --no-binary=grpcio
pip3 install grpcio-tools==1.44.0 --no-binary=grpcio-tools
```

- 테스트

`hw/Voice-recogntion/Test_Code/google_stt_test.py`를 실행

```
python3 google_stt_test.py
```

`Transcript: how old is the Brooklyn Bridge` 출력 시 정상

### 3. 자세인식 설정

OpenCV와 Tensorflow를 이용하여 USB 카메라에 찍힌 사진을 통해 자세 인식

#### 1. OpenCV 설정

- 라이브러리 설치

```
pip3 install opencv-contrib-python==4.1.0.25
```

- 테스트

```
python3 -c "import cv2; print(cv2.__version__)"
```

에러 없을 시 정상

#### 2. dlib 설정

- 라이브러리 설치

```
pip3 install dlib
```

- 테스트

```
python3 -c "import dlib; print(dlib.__version__)"
```

에러 없을 시 정상

#### 3. cvlib 설정

- 라이브러리 설치

```
pip3 install cvlib
pip3 install <https://github.com/lhelontra/tensorflow-on-arm/releases/download/v2.1.0/tensorflow-2.1.0-cp37-none-linux_armv7l.whl>
```

- 테스트

```
python3 -c "import cvlib; print(cvlib.__version__)"
```

에러 없을 시 정상

## 실행

### .env 설정

`.env.template`를 참고하여 본인의 환경에 맞게 수정하여 `.env`로 파일명을 변경해서 저장

#### 구성

- WEBSOCKET_PORT : 사용할 웹소켓 port 번호
- MQTT_HOST : MQTT 서버의 웹 주소
- MQTT_PORT : MQTT port 번호
- MQTT_BASE_TOPIC : MQTT의 BASE 주제
- DEVICE_ID : 라즈베리파이의 시리얼 번호
  - 본인 시리얼 번호 확인방법
  ```
  cat /proc/cpuinfo | grep Serial | awk '{print $3}'
  ```
- PICOVOICE_KEY : [Picovoice 사이트](https://console.picovoice.ai/)에서 로그인 후 얻은 ACCESS KEY
- KEYWORDS_PATH : 사용할 wakeup word ppn 파일 경로
- MODEL_PATH : 사용할 wakeup word의 언어 pv 파일 경로
- AUDIO_INDEX : USB 마이크가 장착된 audio index
  - `./Voice-recognition/show_audio.py` 실행시키기
  - 사용중인 마이크 명에 일치하는 audio index 확인
- RECORD_PATH : 녹음 후 저장되는 경로, 어느 경로든 상관없음

### 실행

```
python3 main.py
```

## 차후 보완점

- 스피커를 추가하여 청각으로 메세지 알림 확인
- 고개를 돌려 얼굴인식 못할 경우를 대비한 추가 센서
