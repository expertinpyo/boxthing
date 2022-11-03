import cv2, dlib, math
import cvlib as cv
import time
import threading

def take_picture():  # 사진 찍고 크기 조정
    global webcam
    
    status, frame = webcam.read()
    
    image = cv2.resize(frame, dsize=(640, 480), interpolation=cv2.INTER_AREA)
    #img_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    return image

def find_people(img):
    faces, confidence = cv.detect_face(img)
    
    if len(faces)>0 : return 1
    else : return 0

def startTimer():
    global now_time
    now_time -= 1
    timer = threading.Timer(1, startTimer)
    timer.start()    

  
#준비
predictor = dlib.shape_predictor("./shape_predictor_68_face_landmarks.dat")
detector = dlib.get_frontal_face_detector()

webcam = cv2.VideoCapture(0)
now_time = 6

org=(50,100)
font=cv2.FONT_HERSHEY_SIMPLEX

startTimer()

try : 
    while webcam.isOpened():
        if now_time > 0 :
            image = take_picture()
            cv2.putText(image,str(now_time),org,font,1,(255,0,0),2)
            cv2.imshow("go",image)
        else : 
            image = take_picture()
            count = find_people(image)
            if count :
                text = "good posture"
                cv2.putText(image,text,org,font,1,(255,0,0),2)
                cv2.imshow("go",image)
                print("여기")
                time.sleep(3)
                break
            else :
                text = "사용자 인식 안됨"
                cv2.putText(image,text,org,font,1,(255,0,0),2)
                cv2.imshow("go",image)
                time.sleep(2)
                text = "다시 찍겠습니다"
                cv2.putText(image,text,org,font,1,(255,0,0),2)
                cv2.imshow("go",image)
                time.sleep(2)
                now_time = 4
        
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
except KeyboardInterrupt:
    print("종료")
    pass

webcam.release()
cv2.destroyAllWindows()