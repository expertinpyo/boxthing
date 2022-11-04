# 얼굴 부위 검출

- 전면에서 찍은 영상으로 자세가 잘못됐는지 판단하기
  - 올바른 자세를 맨 처음에 찍는다.
  - 올바른 자세의 눈간 거리를 측정한다.
  - 만약 구부정한 자세로 있다면, 카메라와 얼굴이 가까워지게 찍힌다.
  - 그러면 눈간 거리가 늘어나게 되어, 자세가 잘못되었다는 것을 인식한다.

### 구글 드라이브와 연동하여 이미지 출력

```java
from google.colab import drive
drive.mount('/content/drive')

import numpy as np
import cv2
from google.colab.patches import cv2_imshow
def handle_image():
    #이미지 읽어오기
    imgfile='/content/drive/MyDrive/landmark/img.jpg'
    img=cv2.imread(imgfile, cv2.IMREAD_COLOR)
    imgfile= cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    cv2_imshow(img)

if __name__=='__main__':
    handle_image()
```

## 얼굴 특징점 찾아주기

```java
!pip install dlib

from google.colab.patches import cv2_imshow
import numpy as np
import dlib
import cv2

RIGHT_EYE = list(range(36, 42))
LEFT_EYE = list(range(42, 48))
MOUTH = list(range(48, 68))
NOSE = list(range(27, 36))
EYEBROWS = list(range(17, 27))
JAWLINE = list(range(1, 17))
ALL = list(range(0, 68))
EYES = list(range(36, 48))

#-- 데이터 파일과 이미지 파일 경로
predictor_file = '/content/drive/MyDrive/landmark/shape_predictor_68_face_landmarks.dat' #-- 자신의 개발 환경에 맞게 변경할 것
image_file = '/content/drive/MyDrive/landmark/img.jpg' #-- 자신의 개발 환경에 맞게 변경할 것

detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor(predictor_file)

image = cv2.imread(image_file)
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

rects = detector(gray, 1)
print("Number of faces detected: {}".format(len(rects)))

for (i, rect) in enumerate(rects):
    points = np.matrix([[p.x, p.y] for p in predictor(gray, rect).parts()])
    show_parts = points[ALL]
    for (i, point) in enumerate(show_parts):
        x = point[0,0]
        y = point[0,1]
        cv2.circle(image, (x, y), 1, (0, 255, 255), -1)
        cv2.putText(image, "{}".format(i + 1), (x, y - 2),
		cv2.FONT_HERSHEY_SIMPLEX, 0.3, (0, 255, 0), 1)

cv2_imshow(image)
cv2.waitKey(0)
```

## 눈간거리 구하기

```java
import cv2, dlib, math
from google.colab.patches import cv2_imshow

#준비
predictor = dlib.shape_predictor("/content/drive/MyDrive/landmark/shape_predictor_68_face_landmarks.dat")
detector = dlib.get_frontal_face_detector()

#얼굴
img = cv2.imread('/content/drive/MyDrive/landmark/img.jpg') #이미지 파일 불러오기
dets = detector(img, 1)

for k, d in enumerate(dets):
    shape = predictor(img, d) #shape: 얼굴 랜드마크 추출

    min_x = 10000
    max_x = -999
    min_y = 0
    max_y = 0
    for i in range(shape.num_parts): #총 68개
        shape_point = shape.part(i)

        #얼굴 랜드마크마다 그리기
        ## i(랜드마크 번호)가 17보다 작으면 out(바깥쪽)을 그린다 - 파란색 점
        if i >= 36 and i<=47:
            print('얼굴 랜드마크 No.{} 좌표위치: ({}, {})'.format(i, shape_point.x, shape_point.y))
            #cv2.circle(img, (shape_point.x, shape_point.y), circle_r, color_l_out, line_width)
            cv2.putText(img, "{}".format(i + 1), (shape_point.x, shape_point.y - 2),cv2.FONT_HERSHEY_SIMPLEX, 0.3, (0, 255, 0), 1)
            if min_x > shape_point.x :
              min_x = shape_point.x
              min_y = shape_point.y

            if max_x < shape_point.x :
              max_x = shape_point.x
              max_y = shape_point.y

print('Min x : {} , y : {} , Max x : {}, y : {}'.format(min_x,min_y,max_x,max_y))

dx = max_x - min_x
dy = max_y - min_y

distance = math.sqrt((dx * dx) + (dy * dy))
print(distance)

cv2_imshow(img)
cv2.waitKey(0)
```

### 참고

[https://suy379.tistory.com/m/92](https://suy379.tistory.com/m/92)

[https://needjarvis.tistory.com/m/641](https://needjarvis.tistory.com/m/641)

# 실시간 인식(테스트중)

```java
import cv2, dlib, math
from google.colab.patches import cv2_imshow

#준비
predictor = dlib.shape_predictor("/content/drive/MyDrive/landmark/shape_predictor_68_face_landmarks.dat")
detector = dlib.get_frontal_face_detector()

vid_in = cv2.VideoCapture(0)
# "---" for the video file
#vid_in = cv2.VideoCapture("baby_vid.mp4")

# capture the image in an infinite loop
# -> make it looks like a video
while True:
    # Get frame from video
    # get success : ret = True / fail : ret= False
    ret, image_o = vid_in.read()

   # resize the video
    image = cv2.resize(image_o, dsize=(640, 480), interpolation=cv2.INTER_AREA)
    img_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Get faces (up-sampling=1)
    face_detector = detector(img_gray, 1)
    # the number of face detected
    print("The number of faces detected : {}".format(len(face_detector)))

    # loop as the number of face
    # one loop belong to one face
    for face in face_detector:
        # face wrapped with rectangle
        cv2.rectangle(image, (face.left(), face.top()), (face.right(), face.bottom()),
                      (0, 0, 255), 3)

        # make prediction and transform to numpy array
        landmarks = predictor(image, face)  # 얼굴에서 68개 점 찾기

        #create list to contain landmarks
        landmark_list = []

        # append (x, y) in landmark_list
        for p in landmarks.parts():
            landmark_list.append([p.x, p.y])
            cv2.circle(image, (p.x, p.y), 2, (0, 255, 0), -1)

    cv2.imshow('result', image)

    # wait for keyboard input
    key = cv2.waitKey(1)

    # if esc,
    if key == 27:
        break

vid_in.release()
```

### 참고

- [https://studiou.tistory.com/4](https://studiou.tistory.com/4)
- [https://ultrakid.tistory.com/m/2](https://ultrakid.tistory.com/m/2)
