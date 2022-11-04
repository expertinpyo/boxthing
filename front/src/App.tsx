/** @jsxImportSource @emotion/react */

import { useEffect } from "react"
import "./App.css"
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil"
import { timerState } from "./store/timer"
import Layout from "./layout/Layout"
import WaterModal from "./component/Modal/WaterModal"
import StretchingModal from "./component/Modal/StretchingModal"

import { apiKey } from "./component/API/Weather"

import { AnimatePresence } from "framer-motion"

import {
  waterModalState,
  stretchModalState,
  postureModalState,
  loginState,
} from "./store/nav"
import PostureModal from "./component/Modal/PostureModal"
import Welcome from "./layout/Welcome"

import { ToastContainer, toast, cssTransition } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { weatherState, weatherVideoState } from "./store/weather"
import axios from "axios"

function App() {
  const setCurrentTime = useSetRecoilState(timerState)
  const [waterModal, openWaterModal] = useRecoilState(waterModalState)
  const [postureModal, openPostureModal] = useRecoilState(postureModalState)
  const [stretchModal, openStretchModal] = useRecoilState(stretchModalState)
  const weather = useRecoilValue(weatherVideoState)
  const setWeather = useSetRecoilState(weatherState)

  const login = useRecoilValue(loginState)

  const handleResize = () => {
    const vh = window.innerHeight
    document.documentElement.style.setProperty("--vh", `${vh}px`)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    let timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // toast("캘린더가 업데이트 되었습니다!", {
    //   position: toast.POSITION.BOTTOM_RIGHT,
    // })

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`,
            {}
          )
          .then((response) => {
            console.log(response.data.weather[0].id)
            setWeather(response.data.weather[0].id)
          })
          .catch((error) => "Clear")
      },
      () => {
        console.log("Unable to retrieve your location")
      }
    )

    return () => {
      window.removeEventListener("resize", handleResize)
      clearInterval(timer)
    }
  }, [setCurrentTime, setWeather])

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {login ? <Layout key="logined" /> : <Welcome key="not-logined" />}
        {waterModal ? <WaterModal start={20} end={50} /> : null}
        {postureModal ? <PostureModal /> : null}
        {stretchModal ? <StretchingModal /> : null}
      </AnimatePresence>
      <ToastContainer />
      <div className="video-container">
        <video
          autoPlay
          muted
          loop
          id="myVideo"
          // style={{ height: "100%", width: "100%", objectFit: "cover" }}
        >
          <source src={weather} type="video/mp4" />
        </video>
      </div>
    </div>
  )
}

export { App }
