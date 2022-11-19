# Boxthing

![LGO2.png](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F74877254-3d32-4c85-bbce-cb78aafb315b%2FLGO2.png?table=block&id=f6b2810a-6aa8-4acb-adb3-156df6d8b176&spaceId=1cb587b7-9197-4d3d-ae40-7c93fcf2070a&width=2000&userId=1aa8f4c2-cc76-4782-a183-7be85c182abc&cache=v2)

## 🎥 서비스 소개 영상

[![썸네일](./front/screenshot/thumnail.png)](https://www.youtube.com/watch?v=dtN5zS2B7Eo)
※ 클릭하면 넘어갑니다!

## 💡 개발자를 위한 IoT 스마트 박스 📦

📅 `Google Calendar` 일정 확인 및 알림

🔊 연동된 `Github` 계정 알림 확인

🥛 사용자의 일일 및 주간 `음수량` 추이 확인

🙋🏼‍♂️ 사용자의 `앉아있는 자세` 실시간 확인 후 점수화

🧘🏼 업무도 쉬면서! `스트레칭 정보` 제공

❄️ `Samsung Smart Things` 연동, 먼 거리 기기 조작 가능

## 📁 File Structure

`master`

```jsx
|--back
|--docs // presentation files
|--front
|--hw
```

## 🏗️ Total Architecture

![Untitled](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F32b44f8d-d88a-4133-ab35-1ecc7d3370e7%2FUntitled.png?table=block&id=2c07facc-752d-4680-9be3-a3d1c842fbf2&spaceId=1cb587b7-9197-4d3d-ae40-7c93fcf2070a&width=2000&userId=1aa8f4c2-cc76-4782-a183-7be85c182abc&cache=v2)

## ⌨️ Tech Stacks

### Environment

- OS : Windows 10
- IDE
  - VS Code
  - IntelliJ
- DB : Maria DB

### BE

- Java 17
- JDK 17.0.3
- Spring Boot 2.7.3
- Gradle

### FE

- react 18.2.0
- recoil 0.7.6
- react-webcam: 7.0.1
- react-router-dom: 6.4.2
- echarts-for-react: 3.0.2

### HW

-
-
-

## 📺 ScreenShot

📅 Google Calendar 일정 확인 및 알림

![calendar](./front/screenshot/calendar.gif)

- 임박한 일정(20분 내), 진행 중인 일정, 오늘의 일정 확인 가능
- 임박한 일정 발생 시, 페이지가 자동으로 이동되어 빠른 내용 확인 가능

🔊 연동된 `Github` 계정 알림 확인

![github](./front/screenshot/noti.gif)

- 읽지 않은 알림 발생 시, 페이지가 자동으로 이동되어 빠른 내용 확인 가능
- 다른 페이지 이동 시, 자동으로 읽음 처리 및 상태 연동

🥛 사용자의 일일 및 주간 `음수량` 추이 확인

![water](./front/screenshot/watermodal.gif)

- 음수 시 음수량 확인 및 시간대별 음수 추이 확인 가능

![waterstatistics](./front/screenshot/watersta.gif)

- 최근 15일간의 총 음수량 확인 가능

🙋🏼‍♂️ 사용자의 `앉아있는 자세` 실시간 확인 후 점수화

![capture](./front/screenshot/capture.gif)

- 자세 측정 점수의 기준이 되는 사진을 측정 전에 촬영

![posture](./front/screenshot/posture.gif)

- 일정한 간격으로 자세 점수를 측정하여 시각화
- 71점 이상일 경우 좋은 자세로 판단

![posturebad](./front/screenshot/posturebad.gif)

- 70점 이하일 경우 안좋은 자세로 판단하여 알림을 통해 자세 교정을 권고

🧘🏼 업무도 쉬면서! `스트레칭 정보` 제공

![stretch](./front/screenshot/mic.gif)

- 음성 명령어를 통해 약 10가지 스트레칭 정보 제공

❄️ `Samsung Smart Things` 연동, 먼 거리 기기 조작 가능

![smartthings](./front/screenshot/smartthings.gif)

- 삼성 SmartThings 스펙에 맞추어 서드파티 제품으로 제작되었기 때문에 삼성 SmartThings 어플리케이션을 통해 언제 어디서든 기기 조작이 가능

## 🗨️ Communication Tools

- JIRA
- Mattermost
- Gitlab
- [Notion](https://www.notion.so/00d5db4b515043539bf3ef8fb3dc2e16)
  - 더 많은 정보를 위해 노션을 방문해보세요

## 👩‍👩‍👧‍👧 Members

| Name   | Email              | Position |
| ------ | ------------------ | -------- |
| 김지인 |                    |          |
| 윤경식 | didnlie@naver.com  | FE       |
| 정재훈 |                    |          |
| 한동현 |                    |          |
| 홍인표 | ypd02363@naver.com | BE       |
