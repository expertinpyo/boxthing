import json
import paho.mqtt.client as mqtt
from datetime import datetime, timedelta, timezone
from random import random, randint

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("connected OK")
    else:
        print("Bad connection Returned code=", rc)


def on_disconnect(client, userdata, flags, rc=0):
    print(str(rc))


def on_message(client, userdata, msg):
    payload = json.loads(msg.payload)
    print(payload)


# 새로운 클라이언트 생성
# client = mqtt.Client(transport="websockets")
client = mqtt.Client()
# 콜백 함수 설정
# on_connect(브로커에 접속)
# on_disconnect(브로커에 접속중료)
# on_message(발행된 메세지가 들어왔을 때)
client.on_connect = on_connect
client.on_disconnect = on_disconnect
client.on_message = on_message

client.tls_set()
client.connect("k7a408.p.ssafy.io", 8883)

client.subscribe("boxthing-local/device/somelongid/#")

client.publish(
    "boxthing-local/server/init",
    json.dumps(
        {
            "device_id": "somelongid",
        }
    ),
)

client.publish(
    "boxthing-local/server/qr/google",
    json.dumps(
        {
            "device_id": "somelongid"
        }
    ),
)

# for i in range(100):
#     date = datetime.now(tz=timezone(timedelta(hours=0))) - timedelta(days=randint(0, 15))
#     date = date.isoformat()
#     client.publish(
#         "boxthing-local/server/posture",
#         json.dumps(
#             {
#                 "device_id": "somelongid",
#                 "data":{
#                     "timestamp": date,
#                     "posture_score": randint(1, 100)
#                 }
#             }
#         ),
#     )



client.loop_forever()