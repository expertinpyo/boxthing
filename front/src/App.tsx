/** @jsxImportSource @emotion/react */

import { useEffect } from "react"
import "./App.css"
import { useSetRecoilState, useRecoilState } from "recoil"
import { timerState } from "./store/timer"
import Layout from "./layout/Layout"
import WaterModal from "./component/Modal/WaterModal"
import StretchingModal from "./component/Modal/StretchingModal"

import { AnimatePresence } from "framer-motion"

import {
  waterModalState,
  stretchModalState,
  postureModalState,
} from "./store/nav"
import PostureModal from "./component/Modal/PostureModal"

function App() {
  const setCurrentTime = useSetRecoilState(timerState)
  const [waterModal, openWaterModal] = useRecoilState(waterModalState)
  const [postureModal, openPostureModal] = useRecoilState(postureModalState)
  const [stretchModal, openStretchModal] = useRecoilState(stretchModalState)

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

    return () => {
      window.removeEventListener("resize", handleResize)
      clearInterval(timer)
    }
  }, [setCurrentTime])

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {stretchModal ? (
          <StretchingModal key="modal" />
        ) : (
          <Layout key="layout" />
        )}
      </AnimatePresence>

      {waterModal ? <WaterModal start={20} end={50} /> : null}
      {postureModal ? <PostureModal /> : null}
    </div>
  )
}

export { App }
