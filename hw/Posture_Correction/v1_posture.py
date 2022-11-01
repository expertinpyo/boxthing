import cv2, dlib, math
import cvlib as cv
import time

def find_distance(img):
    global min_x, max_x, min_y, max_y
    #dets = detector(img_gray, 1)
    faces, confidence = cv.detect_face(image)

    result_list = []
    for face in faces:
            resulti = dlib.rectangle(face[0], face[1], face[2], face[3])
            result_list.append(resulti)

    for k, d in enumerate(result_list):
        shape = predictor(img_gray, d) #shape: 얼굴 랜드마크 추출


        for i in range(shape.num_parts): #총 68개
            shape_point = shape.part(i)
            if i == 36 :
                min_x = shape_point.x
                min_y = shape_point.y
            if i == 45 :
                max_x = shape_point.x
                max_y = shape_point.y

    dx = max_x - min_x
    dy = max_y - min_y

    dis = math.sqrt((dx * dx) + (dy * dy))

    return dis

def take_picture():
    global webcam

    status, frame = webcam.read()

    image = cv2.resize(frame, dsize=(640, 480), interpolation=cv2.INTER_AREA)
    #img_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    return image

#준비
predictor = dlib.shape_predictor("./shape_predictor_68_face_landmarks.dat")
detector = dlib.get_frontal_face_detector()

webcam = cv2.VideoCapture(0)

min_x = max_x = min_y = max_y = 0

for i in range(3):
    print(i+1)
    time.sleep(1)

first_img = take_picture()
first_dis = find_distance(first_img)

print(first_dis)

bad_posture = 0

while webcam.isOpened():
    image = take_picture()

    distance = find_distance(image)

    if distance > first_dis + 20 or distance < first_dis - 13 :
        bad_posture += 1
    else :
        if bad_posture > 0 : bad_posture = 0
        print("올바른 자세", distance)

    if bad_posture > 3 : print("잘못된 자세")

    time.sleep(1)

webcam.release()
cv2.destroyAllWindows()