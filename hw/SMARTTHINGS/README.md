## 스마트싱스?
1. 스마트싱스 플랫폼에 연결
    * 연결 방식
        * 허브 연결
            * zwave,zigbee 장치를 통해 연결
        * 클라우드 연결
            * 클라우드 서버(AWS 등)에서 직접 코드 실행
        * 직접 연결
            * 클라우드 서버 없이 직접 Smart Things 클라우드에 연결. SDK API 사용

2. 스마트싱스 연결된 서비스 사용
    * SmartApps 개발

### 실행 예제
- ESP32-DevKitC 보드 개발한 예제
1. SDK-C 소스코드 clone 후 setup.py로 세팅
2. 개발자 사이트에서 프로젝트 생성
3. 장치 프로필 추가
4. 기기 온보딩 추가
5. 제품 정보 추가
6. 디바이스 애플리케이션 작성
7. 온보딩

### 10-18 정리 요약
* 스마트싱스 서드파티 제품을 제작하기 위해서 어떤 과정을 거치는지 대략적으로 알아보았다면 구체적으로 어떤 세팅이 필요한지 알아보았다.
* SmartThings Device 개발을 위한 3단계
    * 환경설정(Setup Enviornment) 단계
        * SDK 소스코드
        * Device Identity 생성
        * Toolchain 세팅
    * Device 등록 단계
        * 스마트싱스 개발자 페이지에서 진행
        * 프로젝트 생성
        * device profile 생성
        * onboarding profile 생성
        * Deploy
        * device identity 업로드
        * 온보딩 json 파일 다운
    * Device App 제작 단계