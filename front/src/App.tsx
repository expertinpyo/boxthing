/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react"
import "./App.css"
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil"
import { timerState } from "./store/timer"
import Layout from "./layout/Layout"
import WaterModal from "./component/Modal/WaterModal"
import StretchingModal from "./component/Modal/StretchingModal"

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

const bounce = cssTransition({
  enter: "animate__animated animate__bounceIn",
  exit: "animate__animated animate__bounceOut",
})

function App() {
  const setCurrentTime = useSetRecoilState(timerState)
  const [waterModal, openWaterModal] = useRecoilState(waterModalState)
  const [postureModal, openPostureModal] = useRecoilState(postureModalState)
  const [stretchModal, openStretchModal] = useRecoilState(stretchModalState)

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

    toast("캘린더가 업데이트 되었습니다!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    })

    return () => {
      window.removeEventListener("resize", handleResize)
      clearInterval(timer)
    }
  }, [setCurrentTime])

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {login ? <Layout key="logined" /> : <Welcome key="not-logined" />}
        {waterModal ? <WaterModal start={20} end={50} /> : null}
        {postureModal ? <PostureModal /> : null}
        {stretchModal ? <StretchingModal /> : null}
      </AnimatePresence>
      <ToastContainer />
    </div>
  )
}

export { App }
