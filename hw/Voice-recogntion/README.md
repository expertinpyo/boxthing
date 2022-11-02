## Google STT 설정

- 해당 사이트를 통해 STT를 설정하자
  https://cloud.google.com/speech-to-text/docs/before-you-begin#windows

## 테스트

- 라이브러리 설치
  https://cloud.google.com/speech-to-text/docs/transcribe-client-libraries#client-libraries-usage-python

- `google_stt_test.py`를 실행시켜보자!

## Picovoice 설정

### 설정

- https://github.com/Picovoice/porcupine/tree/master/demo/python

### Access Key 만들기

- https://console.picovoice.ai/

### 설치

```
pip3 install pvporcupinedemo
```

### 테스트

만들어둔 본인의 access_key를 넣고 실행시켜보기

```
porcupine_demo_mic --access_key ${ACCESS_KEY} --keywords picovoice
```
