import asyncio
import cv2
import dlib
import math
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
    taking = asyncio.Event()
    #lock_webcam = asyncio.Lock()
    now_image = None
    webcam = None
    first_dis = first_down = first_area = 0
    predictor = dlib.shape_predictor("./shape_predictor_68_face_landmarks.dat")
    #detector = dlib.get_frontal_face_detector()
    send_posture_flag = 0

    def __init__(self):
        pass

    # 포즈 인식 시작 및 카메라 사용 권한 획득
    def start(self):
        # webcam 세팅
        self.webcam = cv2.VideoCapture(0)

    # 포즈 인식 중지/ 카메라할당 해제
    def stop(self):
        if self.webcam:
            self.webcam.release()
        self.webcam = None

    # 포즈 인식

    async def capture(self):
        posture_score = 0
        posture_cnt = 0
        posture_flag_list = [0 for i in range(5)]
        posture_score_list = [0 for i in range(5)]
        now_dis = now_down = now_area = 0
        while True:
            if self.webcam:
                await self.taking.wait()
                self.taking.clear()
                if self.now_image is not None:
                    now_dis, now_down, now_area = self.find_distance(
                        self.now_image)
                if now_dis > self.first_dis * 1.2:
                    posture_score = int(70 - (now_dis - self.first_dis * 1.2))
                    if posture_score < 1:
                        posture_score = 1
                    # print(posture_score)
                    posture_flag_list[2] += 1
                    posture_score_list[2] += posture_score
                    #print(send_posture_flag, "거북목", posture_score)
                # elif now_down > self.first_down * 1.05 and now_dis > self.first_dis * 0.96:
                #     posture_score = int(70 - (now_down - self.first_down))
                #     if posture_score < 1 : posture_score = 1
                #     posture_flag_list[3] += 1
                #     posture_score_list[3] += posture_score
                    #print(send_posture_flag, "허리무리", posture_score)
                elif now_dis == 0 and now_down == 0 and now_area == 0:
                    posture_flag_list[4] += 1
                    posture_score_list[4] = 0
                else:
                    #print("FIRST", now_dis - first_dis)
                    #print("SECOND", now_down - first_down * 1.05)
                    posture_score = int(
                        100-(abs(now_dis - self.first_dis)/1.2))
                    if posture_score < 70:
                        posture_score = 70
                    posture_flag_list[1] += 1
                    posture_score_list[1] += posture_score
                    # print(send_posture_flag, "올바른 자세", posture_score
                # print(posture_flag_list)
                # print(now_dis,now_down)
                if posture_cnt == 3:
                    self.send_posture_flag = posture_flag_list.index(
                        max(posture_flag_list))
                    posture_score = int(
                        posture_score_list[self.send_posture_flag]/max(posture_flag_list))
                    today = datetime.now(tz=tz.UTC)
                    yield {"posture_flag": self.send_posture_flag, "posture_score": posture_score, "timestamp": today.isoformat()}
                    #print(self.send_posture_flag, posture_score)
                    posture_flag_list = [0 for i in range(5)]
                    posture_score_list = [0 for i in range(5)]
                    posture_cnt = 0
                posture_cnt += 1
            await asyncio.sleep(0.01)

    # 초기 사진 유효 체크

    def take_picture(self):  # 사진 찍고 크기 조정
        while True:
            if self.webcam:
                # print("HERE")
                status, frame = self.webcam.read()
                self.now_image = cv2.resize(frame, dsize=(640, 480),
                                            interpolation=cv2.INTER_AREA)
                self.taking.set()

    def checking(self, image_string):
        self.first_image = self.base64_to_img(image_string)
        self.first_dis, self.first_down, self.first_area = self.find_distance(
            self.first_image)
        # 반환값
        if self.first_dis or self.first_down or self.first_area:
            return True
        else:
            return False

    def base64_to_img(self, image_string):
        encoded_data = image_string.split(',')[1]
        imgdata = base64.b64decode(encoded_data)
        dataBytesIO = io.BytesIO(imgdata)
        image = Image.open(dataBytesIO)
        return cv2.cvtColor(np.array(image), cv2.COLOR_BGR2RGB)

    def find_distance(self, img):
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
            if max_area < area:
                if area < self.first_area * 0.3:
                    continue
                max_area = area
                resulti = dlib.rectangle(face[0], face[1], face[2], face[3])

        if resulti != []:
            result_list.append(resulti)

        #  검출된 영역 내 관자놀이 탐색 후 관자놀이 간 거리를 반환
        for k, d in enumerate(result_list):
            shape = self.predictor(img, d)  # shape: 얼굴 랜드마크 추출

            min_x, min_y = (shape.part(0).x, shape.part(0).y)
            max_x, max_y = (shape.part(16).x, shape.part(16).y)

            dx, dy = (max_x - min_x, max_y - min_y)
            dis = math.sqrt((dx * dx) + (dy * dy))
            down_point = shape.part(8).y

        return dis, down_point, max_area
