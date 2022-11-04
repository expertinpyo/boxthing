# 연결

### 리본 케이블

- 파란 부분이 오디오 잭 방향으로 연결한다.
  - 참고 : [http://www.3demp.com/community/boardDetails.php?cbID=233](http://www.3demp.com/community/boardDetails.php?cbID=233)
- RPI 설정

```java
sudo raspi-config
Interface Options > Camera > Enable
```

### USB 케이블

### 테스트

- 사진 찍는 명령어를 통해 사진이 잘 찍혔는지 확인하기!

```java
raspistill -o test.jpg
```
