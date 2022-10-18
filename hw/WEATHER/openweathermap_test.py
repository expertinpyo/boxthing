import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()
city = "Seoul"
apiKey = os.environ.get('weather_key')
lang = 'kr'
units = 'metric'
geocode_api = f"http://api.openweathermap.org/geo/1.0/direct?q={city},{lang}&limit={3}&appid={apiKey}"

geo_result = requests.get(geocode_api)
geo_result = json.loads(geo_result.text)
lat = geo_result[0]['lat']
lon = geo_result[0]['lon']

api = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={apiKey}&units={units}&lang={lang}"

air_api = f"http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={apiKey}"

# result = requests.get(api)
# result = json.loads(result.text)
# print(result)


result = requests.get(air_api)
result = json.loads(result.text)
print(result)
