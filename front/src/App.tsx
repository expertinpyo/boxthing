/** @jsxImportSource @emotion/react */

import { useEffect } from "react"
import "./App.css"
import { useSetRecoilState } from "recoil"
import { timerState } from "./store/timer"
import Layout from "./layout/Layout"

function App() {
  const setCurrentTime = useSetRecoilState(timerState)

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
      <Layout />
    </div>
  )
}

export { App }
