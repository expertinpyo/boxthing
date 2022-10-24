/** @jsxImportSource @emotion/react */

import { useEffect } from "react"
import "./App.css"
import Header from "./component/Header/Header"
import Nav from "./component/Nav/Nav"
import { css } from "@emotion/react"
import PlanContent from "./component/Content/PlanContent"
import { atom, useSetRecoilState } from "recoil"

const timeState = atom({
  key: "timeState",
  default: new Date().toLocaleString(),
})

const planState = atom({
  key: "planState",
  default: [
    {
      isActive: true,
      item: {
        title: "즐거운 점심 시간",
        subtitle: "순두부 짬뽕 or 날치알 비빔밥",
        time: "11:30 - 12:30 AM",
      },
    },
    {
      isActive: false,
      item: {
        title: "기능 회의",
        subtitle: "기능 상세 회의",
        time: "12:30 - 2:30 PM",
      },
    },
    {
      isActive: false,
      item: {
        title: "사전학습 및 자료조사",
        subtitle: "HW 센서 및 API 조사",
        time: "2:30 - 5:30 PM",
      },
    },
  ],
})

function App() {
  const setCurrentTime = useSetRecoilState(timeState)

  const handleResize = () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty("--vh", `${vh}px`)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    let timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString())
    }, 1000)

    return () => {
      window.removeEventListener("resize", handleResize)
      clearInterval(timer)
    }
  }, [setCurrentTime])

  return (
    <div className="App">
      <div
        css={css`
          width: 12.5%;
          height: 100%;
        `}
      >
        <Nav></Nav>
      </div>
      <div
        css={css`
          width: 87.5%;
          height: 100%;
        `}
      >
        <Header></Header>
        <PlanContent></PlanContent>
      </div>
    </div>
  )
}

export { App, timeState, planState }
