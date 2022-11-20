# Backend



## 개발 환경

- OS 

  - Window 10

  

- Backend

  - Java 17

  - JDK 17.0.3

  - Spring boot 2.7.3 

  - gradle-7.5(빌드 관리)

  - jpa 2.7.3

  

- DB

  - Maria DB 10.6.8

  

- Infra

  - AWS(EC2)
  - Docker 20.10.18



## ERD



![erd](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F938f4983-35eb-4080-9d5f-5c18137b0d84%2FUntitled.png?table=block&id=886b7910-e88f-4153-be03-460c118b07d3&spaceId=1cb587b7-9197-4d3d-ae40-7c93fcf2070a&width=2000&userId=1aa8f4c2-cc76-4782-a183-7be85c182abc&cache=v2)





- User
  - username : 구글 아이디
  - email : 구글 이메일
  - token : 구글 refresh 토큰
  - git_token : git 토큰
- Device
  - seriali_number : 장치 시리얼 넘버(라즈베리파이)
  - state : 상태, 로그인 시 이용
  - user_id : 연결된 유저 id(1 : 1)
- WaterLog
  - timestamp : 생성일자(UTC + 09 기준)
  - amount : 음수량
- PostureLog
  - timestamp : 생성일자(UTC + 09 기준)
  - posture_score : 자세 점수





## Dependency

- spring-boot-starter-data-jpa 2.7.3
- querydsl
  - querydsl-jpa 5.0.0
  - querydsl-apt 5.0.0
- mapstruct
  - mapstruct 1.5.3
  - mapstruct-processor 1.5.3
  - lombok-mapstruct-binding 0.2.0
- mqtt
  - spring-boot-integration
  - spring-boot-integration-mqtt

- gson : gson 2.10
- lombok 





## MQTT



### 정의

Messege Queueing Telemetry Transport

Publish - Subscribe, 발행 - 구독 기반의 메시지 송수신 프로토콜

TCP / IP 프로토콜 위에서 동작하지만, 상당히 가벼움

저전력 + 소규모 디바이스를 위한 통신 프로토콜

M2M(Machne to Machine) or IoT에서 주로 사용



### 구조

![출처 : https://www.joinc.co.kr/w/man/12/MQTT/Tutorial](https://docs.google.com/drawings/d/17LKdzxE9KiDXsfCMNCuR4DRStxeBaqnTL3b_zX3376g/pub?w=585&h=255)

메시지를 발행(Publish) 하고, 구독(Subscribe)하는 것을 원칙으로 함

=> Publisher와 Subscribeer는 모두 Broker에 대한 클라이언트로 작동함



- Topic
  - 메시지 발행 - 구독 행위 모두 채널 단위로 일어남. MQTT에서 이를 토픽이라 부름
  - "/"로 구분되는 계층 구조를 가짐

![img](https://docs.google.com/drawings/d/1qN-CtcvdojhgnfX2ONynNhPGHDvln5iPbZlOEh2dbPE/pub?w=734&h=291)



- Publisher
  - Topic을 발행하기 위한 목적으로 Broker 서버에 연결
- Subscriber
  - Topic을 구독하기 위한 목적으로 Broker 서버에 연결



### QoS

3 단계의 Quality of Service 제공

- 0 : 메시지는 한번만 전달, 전달여부는 확인하지 않음
- 1 : 메시지는 반드시 한번 이상 전달, 하지만 핸드쉐이킹 과정을 엄밀히 추적하지 않으므로 중복 전송될 수 있음
- 메시지는 한번만 전달됨, 핸드쉐이킹 과정을 추적함. 높은 품질을 보장하지만 성능의 희생이 따름



### Boxthing MQTT

- MQTT Broker

  - Mosquitto MQTT Broker

- QoS

  - 0

- Process

  ~~~mermaid
  sequenceDiagram
  	participant RPi
  	participant Broker
  	participant AWS
  	
  	AWS->>Broker: subscribe topic "boxthing/server"
  	RPi->>Broker: subscribe topic "boxthing/device/device_id"
  	
  
  	
  ~~~

- MQTT API

  | 이름              | 방향            | topic                        | data                                                 |
  | ----------------- | --------------- | ---------------------------- | ---------------------------------------------------- |
  | base format       | 디바이스 → 서버 | server                       | { device_id: string }                                |
  |                   | 서버 → 디바이스 | device/device_id             | { success: bool, message: string, data: object}      |
  | 부팅              | 디바이스 → 서버 | init                         | null                                                 |
  | 부팅 응답         | 서버 → 디바이스 | init                         | { google_access_token: string                        |
  | QR 요청           | 디바이스 → 서버 | qr/provider_string           | null                                                 |
  | QR 응답           | 서버 → 디바이스 | qr/provider_string           | { link: string }                                     |
  | 로그인 성공       | 서버 → 디바이스 | login/provider_string        | { access_token: string }                             |
  | Access token 요청 | 디바이스 → 서버 | access_token/provider_string | null                                                 |
  | Access token 응답 | 서버 → 디바이스 | access_token/provider_string | { access_token: string }                             |
  | 음수량 전송       | 디바이스 → 서버 | water                        | { amount: float, timestamp: datetime }               |
  | 자세 전송         | 디바이스 → 서버 | posture                      | { posture_score: int, timestamp: datetime }          |
  | 음수량 로그       | 디바이스 → 서버 | log/water/stat               | { days: int }                                        |
  |                   | 서버 → 디바이스 | log/water/stat               | [ { date: date, amount: float }, … ]                 |
  |                   | 디바이스 → 서버 | log/water/today              | null                                                 |
  |                   | 서버 → 디바이스 | log/water/today              | [ { timestamp: datetime, amount : float }, … ]       |
  | 자세 로그         | 디바이스 → 서버 | log/posture/today            | null                                                 |
  |                   | 서버 → 디바이스 | log/posture/today            | [ { timestamp: datetime, posture_score: float }, … ] |
  
  



## 패키지 구조

<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F4e12a2e0-b56b-47c5-82b4-cbc46a0ba644%2FUntitled.png?table=block&id=59d1cc4c-8982-4f75-82ba-13c814f631d5&spaceId=1cb587b7-9197-4d3d-ae40-7c93fcf2070a&width=2000&userId=1aa8f4c2-cc76-4782-a183-7be85c182abc&cache=v2" style="zoom:15%;" />

- api
  - entity / dto / repository / mapper / querydsl
- config
  - Oauth2 관련 SecurityConfig / MqttConfig / QueryDsl
- enums
  - mqtt 메시지 관련 enum 
- mqtt
  - mqtt dto / MessageParser / mqtt message handler
- security.oauth2
  - Google, Github 소셜 로그인 Handler

- util
  - Google Accee Token 갱신용 AccessTokenRefresher / QR 로그인을 위한 QRCreator



## JPA



### QueryDsl

##### 정의 

정적 타입을 이용해 SQL과 같은 쿼리를 생성할 수 있게 해주는 프레임워크



##### JPQL과의 차이점

- QueryDsl
  - IDE를 통한 자동 완성 기능
  - Java 코드로 이뤄져 있으므로 정적인 단계(컴파일 단계)에서 에러 처리 가능
  - 조건문을 활용한 동적 쿼리문 작성 간편
  - 코드의 재사용성 증가
- JPQL
  - 쿼리를 직접 스트링으로 입력해줘야 함
  - 따라서, 모든 에러 런타임 단에서 확인해야한다는 단점 존재



##### 사용법

1. 쿼리문 작성을 위해 JpaQuery 인스턴스 필요 => JpaQueryFactory를 통해 인스턴스 먼저 생성
2. 사용하려는 QEntity 생성
3. 쿼리문 작성
4. 쿼리 결과 반환



##### 사용 예시 (WaterLogQueryDsl)

~~~ java
@Configuration
@RequiredArgsConstructor
public class WaterLogQueryDsl {

  private final JPAQueryFactory jpaQueryFactory;
  private final QWaterLog waterLog = new QWaterLog("waterLog");

  public List<WaterLog> findAllByUserAndDate(User user, int days) {
    ZonedDateTime end = ZonedDateTime.now().withHour(0).withMinute(0).withSecond(0);
    ZonedDateTime start = end.minusDays((long) days + 1).withHour(0).withMinute(0).withSecond(0);

    return jpaQueryFactory
        .select(waterLog)
        .from(waterLog)
        .where(waterLog.user.eq(user), waterLog.timestamp.between(start, end))
        .orderBy(waterLog.timestamp.asc())
        .fetch();
  }
}
~~~







## OAuth2



### 정의

서비스 제공자(구글, 깃허브 등)가 신뢰할 수 잆는 타 어플리케이션에게 사용자의 아이디와 패스워드를 제공하지 않더라도 사용자의 특정 정보에 접근하거나 작업을 처리할 수 있도록하는 방법이자 표준

토큰 자체가 데이터를 포함하고 있는 JWT와 달리, OAuth Access Token은 권한을 확인하고 서비스 제공자에게 데이터를 요청하기 위해 사용



### 구성 요소

Client / Resource Owner / Resource Server / Authorization Server

- Client
  - 서비스 제공자에게 서비스를 제공받은 서버 or 서비스(내가 만든 앱)
- Resource Owner
  - 서비스 제공자의 서비스(Google, Github 등)에 가입되어 있어 개인 정보를 소유 중인 사용자, 내가 만든 앱을 사용할 유저
- Resource Server
  - Resource Owner의 개인정보를 가지고 있는 서비스 제공자의 서버
- Authorization Server
  - OAuth 2.0 엑세스 토큰을 발급받기 위한 서비스 제공자의 인증 서버



### 작동 원리

1. 사용자가 서비스(Google, Github 등)에 로그인 되어있지 않은 경우 로그인 요청
2. Client는 Access Token 발급을 위한 Code 값을 넣어오기 위해 github, google/oauth 등으로 요청
3. AccessToken 발급을 위해 Code를 파라미터로 넘겨 Authrization Server에 요청
4. Client에 google, github를 통해 로그인한 사용자의 정보를 얻기 위해 AccessToken을 Authorization HTTP Header에 첨부해 요청
