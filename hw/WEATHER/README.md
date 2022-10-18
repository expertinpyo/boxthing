---
last_modified_on: 2022-10-17
---
# weather
## weather api 선택
### openweathermap api
- [사이트](https://openweathermap.org/)
    - boxthing 구글 이메일을 이용하여 회원가입
- 언어 설정 가능
- 도시 설정 가능
- 현재 날씨 정보와 대기 정보 무료로 사용 가능
- free tier
    - 60 calls/minute
    - 1,000,000 calls/month
- [openweathermap_test.py](./openweathermap_test.py)로 테스트
- response
    ```json
    {'coord': {'lon': 127.0089, 'lat': 37.2911}, 'weather': [{'id': 800, 
    'main': 'Clear', 'description': '맑음', 'icon': '01d'}], 'base': 'stations', 'main': {'temp': 13.73, 'feels_like': 11.84, 'temp_min': 13.4, 'temp_max': 13.76, 'pressure': 1019, 'humidity': 26}, 'visibility': 10000, 'wind': {'speed': 3.6, 'deg': 310, 'gust': 8.75}, 'clouds'': 1019, 'humidity': 26}, 'vis, 'sys': {'type': 1, 'id': 8096, 'country': 'KR', 'sunrise': 1665956461, 'sunset': 1665996809}, 'timezoneibility': 10000, 'wind': {'spe': 'Suwon-si', 'cod': 200}ed': 3.6, 'deg': 310, 'gust': 
    8.75}, 'clouds': {'all': 0}, ' \S07P31A408\hw\WEATHER>dt': 1665991657, 'sys': {'type': 1, 'id': 8096, 'country': 'KR', 'sunrise': 1665956461, 'sunset': 1665996809}, 'timezone': 32400, 'id': 1835553, 'name': 'Suwon-si', 'cod': 200}   
    ```
    - `temp_min`, `temp_max` 값은 **현재** 도시의 평균적인 최대 최소 값
        - 하루 동안의 최대 최소가 아님!
    - 도시 이름 없을 때
        ```json
        {'cod': '404', 'message': 'city not found'}
        ```
### 기상청 육상 중기예보
- [사이트](https://www.data.go.kr/data/15059468/openapi.do)
- api url: http://www.kma.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=108
- response
    ```xml
    <rss version="2.0">
    <channel>
    <title>기상청 육상 중기예보</title>
    <link>http://www.kma.go.kr/weather/forecast/mid-term_01.jsp</link>
    <description>기상청 날씨 웹서비스</description>
    <language>ko</language>
    <generator>기상청</generator>
    <pubDate>2022년 10월 17일 (월)요일 06:00</pubDate>
    <item>
    <author>기상청</author>
    <category>육상중기예보</category>
    <title>전국 육상 중기예보 - 2022년 10월 17일 (월)요일 06:00 발표</title>
    <link>http://www.kma.go.kr/weather/forecast/mid-term_01.jsp</link>
    <guid>http://www.kma.go.kr/weather/forecast/mid-term_01.jsp</guid>
    <description>
    <header>
    <title>전국 육상중기예보</title>
    <tm>202210170600</tm>
    <wf>
    <![CDATA[ ○ (하늘상태) 이번 예보기간 전국이 대체로 맑은 날이 많겠습니다. <br />○ (기온) 이번 예보기간 아침 기온은 3~14도, 낮 기온은 16~22도로 어제(16일, 아침최저기온 12~17도, 낮최고기온 18~26도)보다 낮겠습니다. <br /> 특히, 20일(목) 아침 기온은 내륙을 중심으로 5도 내외로 춥겠으니, 건강관리와 농작물 관리에 유의하기 바랍니다.<br />○ (주말전망) 22일(토)은 오전에 가끔 구름많다가 오후에는 맑아지겠고, 23일(일)은 전국이 대체로 맑겠으나, 강원영동은 구름많겠습니다. <br /> 아침 기온은 6~13도, 낮 기온은 17~22도가 되겠습니다. ]]>
    </wf>
    </header>
    <body>
    <location wl_ver="3">
    <province>서울ㆍ인천ㆍ경기도</province>
    <city>서울</city>
    <data>
    <mode>A02</mode>
    <tmEf>2022-10-20 00:00</tmEf>
    <wf>맑음</wf>
    <tmn>7</tmn>
    <tmx>19</tmx>
    <reliability/>
    <rnSt>0</rnSt>
    </data>
    <data>
    <mode>A02</mode>
    <tmEf>2022-10-20 12:00</tmEf>
    <wf>구름많음</wf>
    <tmn>7</tmn>
    <tmx>19</tmx>
    <reliability/>
    <rnSt>20</rnSt>
    </data>
    <data>
    <mode>A02</mode>
    <tmEf>2022-10-21 00:00</tmEf>
    <wf>구름많음</wf>
    <tmn>10</tmn>
    <tmx>19</tmx>
    <reliability/>
    <rnSt>30</rnSt>
    </data>
    <data>
    <mode>A02</mode>
    <tmEf>2022-10-21 12:00</tmEf>
    <wf>구름많음</wf>
    <tmn>10</tmn>
    <tmx>19</tmx>
    <reliability/>
    <rnSt>30</rnSt>
    </data>
    <data>
    <mode>A02</mode>
    <tmEf>2022-10-22 00:00</tmEf>
    <wf>구름많음</wf>
    <tmn>11</tmn>
    <tmx>19</tmx>
    <reliability/>
    <rnSt>20</rnSt>
    ```
    - response 예시로 제주도까지 현재 날짜 3일 이후부터 알려줌
    - 예보 기간에 대한 전체 내용을 알려줘서 이 부분을 참고하면 좋을 듯

### 기상청 단기 예보
- [사이트](https://www.data.go.kr/data/15084084/openapi.do)
- 현재 상황, 6시간 단기 예보 제공
- 개발 과정 시 10,000 트래픽 제공
- 강수 확률 강슈 형태, 온도, 습도 등으로 모드를 선탣헤서 api call 해야 함
- 코드로 되어 있어서 추가적 세팅 필요

## 결론
- '날씨 알려줘'에 대한 응답으로
    1. 지금 당장 외부 날씨 + 오늘 전반적인 날씨를 알려줘야 할 지
    2. 일주일 정도 대략적인 예보를 알려줘야 할 지  
    에 따라 `openweathermap` 혹은 `기상청 육상 중기예보`를 사용할지 결정하면 될 듯