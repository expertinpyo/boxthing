import { atom, selector } from "recoil"

import Sunny from "../asset/weather/sunny.mp4"
import Authum from "../asset/weather/authum.mp4"
import Night from "../asset/weather/night.mp4"
import Snowy from "../asset/weather/snowy.mp4"
import Rainy from "../asset/weather/rainy.mp4"

const weatherState = atom({
  key: "weatherState",
  default: 800,
})

const weatherVideoState = selector({
  key: "weatherVideoState",
  get: ({ get }) => {
    const weather = get(weatherState) / 100
    const hours = new Date().getHours()
    const isNight = hours < 6 || hours >= 18

    switch (weather) {
      case 8:
        return isNight ? Night : Sunny
      case 3:
      case 2:
      case 5:
        return Rainy
      case 6:
        return Snowy
      default:
        return isNight ? Night : Authum
    }
  },
})

export { weatherState, weatherVideoState }
