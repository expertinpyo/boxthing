## OpenCV 설치

```
pip3 install opencv-contrib-python==4.1.0.25
```

### OpenCV 테스트

```java
python3 -c "import cv2; print(cv2.__version__)"
```

- cv2_test.py

```
import cv2
import numpy as np

img = np.zeros(shape=(512, 512, 3), dtype=np.uint8) + 255  # White 배경 생성
# img=np.ones((512, 512, 3), np.uint8)*255 # 위 코드와 동일
# img = np.full(shape=(512,512,3),fill_value=255,dtype=np.uint8) 위코드와 동일
# img = np.zeros((512, 512, 3), np.uint8) <- Black 배경

pt1 = 100, 100
pt2 = 400, 400
cv2.rectangle(img, pt1, pt2, (0, 255, 0), 2)

cv2.line(img, (0, 0), (500, 0), (255, 0, 0), 5)
cv2.line(img, (0, 0), (0, 500), (0, 0, 255), 5)

cv2.imshow('img',img)
cv2.waitKey()
cv2.destroyAllWindows()

// python3 cv2_test.py 로 실행시키기

```

### 에러

- cannot open shared object file ~~ 발생시

```
pip3 install opencv-contrib-python
sudo apt-get install -y libatlas-base-dev libhdf5-dev libhdf5-serial-dev libatlas-base-dev libjasper-dev  libqtgui4  libqt4-test

```

### dlib

- 참고
  [https://edudeveloper.tistory.com/123](https://edudeveloper.tistory.com/123)
  [https://learnopencv.com/install-dlib-on-ubuntu/](https://learnopencv.com/install-dlib-on-ubuntu/)
  [https://kumarvinay.com/installing-dlib-library-in-ubuntu/](https://kumarvinay.com/installing-dlib-library-in-ubuntu/)
  [https://pyimagesearch.com/2017/05/01/install-dlib-raspberry-pi/](https://pyimagesearch.com/2017/05/01/install-dlib-raspberry-pi/)
  - [https://moordev.tistory.com/298](https://moordev.tistory.com/298)

```java
pip3 install dlib
```

### dlib Test

```java
python3 -c "import dlib; print(dlib.__version__)"
```

### cvlib

- 참고
  - [https://www.oreilly.com/library/view/mastering-opencv-4/9781789344912/8c793967-8bcb-4362-9283-1b31e491e863.xhtml](https://www.oreilly.com/library/view/mastering-opencv-4/9781789344912/8c793967-8bcb-4362-9283-1b31e491e863.xhtml)
    [https://github.com/arunponnusamy/cvlib](https://github.com/arunponnusamy/cvlib)

```java
pip3 install cvlib
pip3 install https://github.com/lhelontra/tensorflow-on-arm/releases/download/v2.1.0/tensorflow-2.1.0-cp37-none-linux_armv7l.whl
```

### cvlib Test

```
python3 -c "import cvlib; print(cvlib.__version__)"
```
