import cv2, dlib, math
import cvlib as cv
import time

def find_distance(img): # 얼굴 검출 및 거리 반환
    global first_area
    
    result_list = []
    resulti = []
    dis = down_point = max_area = 0
    min_x = max_x = min_y = max_y = 0

    faces, confidence = cv.detect_face(img)
    
    # 검출된 얼굴 없으시 0 반환
    if len(faces) == 0 :
        return 0, 0, 0 
    
    # 가장 가까운 얼굴영역 검출
    for face in faces:
        area = (face[2]-face[0]) * (face[3]-face[1])
        if max_area < area :
            if first_area - 6000 > area :
                continue
            max_area = area
            resulti = dlib.rectangle(face[0], face[1], face[2], face[3])
    
    if resulti != [] :
        result_list.append(resulti)   

    #  검출된 영역 내 관자놀이 탐색 후 관자놀이 간 거리를 반환
    for k, d in enumerate(result_list): 
        shape = predictor(img, d) #shape: 얼굴 랜드마크 추출 

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

def take_picture():  # 사진 찍고 크기 조정
    global webcam
    
    status, frame = webcam.read()
    
    image = cv2.resize(frame, dsize=(640, 480), interpolation=cv2.INTER_AREA)
    #img_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    return image

# 올바른 자세를 1장 찍고 기준점을 삼는다.
def init():
    global first_img, first_dis, first_down, first_area
    
    for i in range(3):
        print(i+1)
        time.sleep(1)

    first_img = take_picture()
    first_dis, first_down, first_area = find_distance(first_img)
  
#준비
predictor = dlib.shape_predictor("./shape_predictor_68_face_landmarks.dat")
detector = dlib.get_frontal_face_detector()

webcam = cv2.VideoCapture(0)

first_img = None
first_dis = first_down = first_area = 0
# 0 : 올바른 자세, 1 : 거북목, 2: 허리무리
send_posture_flag = 0
posture_score = 0

while True : 
    init()
    if first_dis or first_down or first_area :
        break
    
print(first_dis, first_area)

# 기준과 비교하며 자세판단
# send_posture_flag & posture_score를 전송
# mqtt로는 posture_score만 websocket으로는 둘다 전송
try : 
    while webcam.isOpened():
        image = take_picture()
        now_dis, now_down, now_area = find_distance(image)
        
        if now_dis - first_dis > 15 :
            send_posture_flag = 2
            posture_score = int(87-(now_dis-first_dis)/2)
            if posture_score < 60 : posture_score = 60
            print(send_posture_flag, "거북목", posture_score)
        elif now_down - first_down > 12 :
            send_posture_flag = 3
            posture_score = int(80-(now_down - first_down)/4)
            if posture_score < 60 : posture_score = 60
            print(send_posture_flag, "허리무리", posture_score)
        elif now_dis == 0 and now_down == 0 and now_area == 0: 
            posture_score = -1
            send_posture_flag = 4
            print(send_posture_flag, "사람 없음", posture_score)
        else :
            send_posture_flag = 1
            if now_dis - first_dis < 0 :
                posture_score = int(100+(now_dis - first_dis))
            else : 
                posture_score = int(100-(now_dis - first_dis))
            print(send_posture_flag, "올바른 자세", posture_score)
        time.sleep(1)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
except KeyboardInterrupt:
    print("종료")
    pass

webcam.release()
cv2.destroyAllWindows()