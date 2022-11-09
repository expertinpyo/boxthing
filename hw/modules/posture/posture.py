import asyncio
import cv2, dlib, math
import cvlib as cv
import time
import asyncio
from datetime import datetime, timedelta
from dateutil import tz
import base64
import io
from PIL import Image
import numpy as np

class Cam:
    first_image = None
    running = asyncio.Event()
    lock_webcam = asyncio.Lock()
    webcam = None
    first_dis = first_down = first_area = 0
    predictor = dlib.shape_predictor("./shape_predictor_68_face_landmarks.dat")
    detector = dlib.get_frontal_face_detector()
    send_posture_flag = 0

    
    def __init__(self):
        pass
     
    #포즈 인식 시작 및 카메라 사용 권한 획득
    async def start(self):
        async with self.lock_webcam:
            # webcam 세팅
            self.webcam = cv2.VideoCapture(0)
        self.running.set()

    #포즈 인식 중지/ 카메라할당 해제
    async def stop(self):
        self.running.clear()
        #webcam 정리작업
        async with self.lock_webcam:
            await self.webcam.release()
        return True
            
    
    #포즈 인식
    async def capture(self):
        posture_score = 0
        posture_cnt = 0
        while True:
            await self.running.wait()
            async with self.lock_webcam:
                status, frame = self.webcam.read()
            image = cv2.resize(frame, dsize=(640, 480), interpolation=cv2.INTER_AREA)
            # 작업 시작
            if posture_cnt == 5:
                now_dis, now_down, now_area = self.find_distance(image)
                if now_dis - self.first_dis > 15 :
                    self.send_posture_flag = 2
                    posture_score = int(87-(now_dis-self.first_dis)/2)
                    if posture_score < 60 : posture_score = 60
                elif now_down - self.first_down > 12 :
                    self.send_posture_flag = 3
                    posture_score = int(80-(now_down - self.first_down)/4)
                    if posture_score < 60 : posture_score = 60
                elif now_dis == 0 and now_down == 0 and now_area == 0: 
                    posture_score = -1
                    self.send_posture_flag = 4
                else :
                    self.send_posture_flag = 1
                    if now_dis - self.first_dis < 0 :
                        posture_score = int(100+(now_dis - self.first_dis))
                    else : 
                        posture_score = int(100-(now_dis - self.first_dis))
                today = datetime.now(tz=tz.UTC)
                yield {"posture_flag": self.send_posture_flag, "posture_score": posture_score, "timestamp": today.isoformat()}
                posture_cnt = 0
            posture_cnt += 1
            await asyncio.sleep(0.2)

    #초기 사진 유효 체크
    async def checking(self, image_string):
        self.first_image = self.base64_to_img(image_string)
        self.first_dis, self.first_down, self.first_area = self.find_distance(self.first_image)
        #반환값
        if self.first_dis or self.first_down or self.first_area :
            return True
        else:
            return False

    def base64_to_img(self, image_string):
        encoded_data = image_string.split(',')[1]
        imgdata = base64.b64decode(encoded_data)
        dataBytesIO = io.BytesIO(imgdata)
        image = Image.open(dataBytesIO)
        return cv2.cvtColor(np.array(image, cv2.COLOR_BGR2RGB))
    
    def find_distance(self,img):
        result_list = []
        resulti = []
        dis = down_point = max_area = 0
        min_x = max_x = min_y = max_y = 0

        faces, confidence = cv.detect_face(img)
        
        # 검출된 얼굴 없으시 0 반환
        if len(faces) == 0:
            return 0, 0, 0
        
        # 가장 가까운 얼굴영역 검출
        for face in faces:
            area = (face[2]-face[0]) * (face[3]-face[1])
            if max_area < area :
                if self.first_area - 6000 > area :
                    continue
                max_area = area
                resulti = dlib.rectangle(face[0], face[1], face[2], face[3])
        
        if resulti != [] :
            result_list.append(resulti)   

        #  검출된 영역 내 관자놀이 탐색 후 관자놀이 간 거리를 반환
        for k, d in enumerate(result_list): 
            shape = self.predictor(img, d) #shape: 얼굴 랜드마크 추출 

            p = shape.part(0)
            #cv2.circle(img, (p.x, p.y), 2, (0, 255, 0), -1)
            min_x = p.x
            min_y = p.y
            p = shape.part(16)
            #cv2.circle(img, (p.x, p.y), 2, (0, 255, 0), -1)
            max_x = p.x
            max_y = p.y
            dx = max_x - min_x    
            dy = max_y - min_y 
            dis = math.sqrt((dx * dx) + (dy * dy))
            down_point = shape.part(8).y
        
        return dis, down_point, max_area