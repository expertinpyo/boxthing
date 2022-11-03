import axios from "axios"

const apiKey = "a6256b2e993b89b81def7b40ddc6b8ad"

function getWeather(lat, lon) {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
      {}
    )
    .then((response) => {
      console.log(response)
    })
    .catch((error) => console.log(error))
}

export { getWeather }
