import requests
import json

city = "Suwon"
apiKey = "92f01d05b2f1563ddb839a8221dd2bc4"
lang = 'kr'
units = 'metric'
api = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}&units={units}&lang={lang}"

result = requests.get(api)
result = json.loads(result.text)
print(result)


