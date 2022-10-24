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
  default: new Date(),
})

const planListState = atom({
  key: "planListState",
  default: [
    {
      kind: "calendar#event",
      etag: '"3333189635762000"',
      id: "5curjtaj80idbjt1i46vtgimfq",
      status: "confirmed",
      htmlLink:
        "https://www.google.com/calendar/event?eid=NWN1cmp0YWo4MGlkYmp0MWk0NnZ0Z2ltZnEgZGlkbmxpZUBt",
      created: "2022-10-24T07:00:17.000Z",
      updated: "2022-10-24T07:00:17.881Z",
      summary: "뭐냐뭐냐",
      description: "뭐냐뭐냐설명",
      creator: {
        email: "didnlie@gmail.com",
        self: true,
      },
      organizer: {
        email: "didnlie@gmail.com",
        self: true,
      },
      start: {
        dateTime: "2022-10-24T16:15:00+09:00",
        timeZone: "Asia/Seoul",
      },
      end: {
        dateTime: "2022-10-24T16:45:00+09:00",
        timeZone: "Asia/Seoul",
      },
      iCalUID: "5curjtaj80idbjt1i46vtgimfq@google.com",
      sequence: 0,
      reminders: {
        useDefault: true,
      },
      eventType: "default",
    },
    {
      kind: "calendar#event",
      etag: '"3333189684532000"',
      id: "3q67nteuc6h3jn6o7jljokfdr9",
      status: "confirmed",
      htmlLink:
        "https://www.google.com/calendar/event?eid=M3E2N250ZXVjNmgzam42bzdqbGpva2ZkcjkgZGlkbmxpZUBt",
      created: "2022-10-24T07:00:42.000Z",
      updated: "2022-10-24T07:00:42.266Z",
      summary: "냐뭐냐뭐",
      description: "냐뭐냐뭐설명",
      creator: {
        email: "didnlie@gmail.com",
        self: true,
      },
      organizer: {
        email: "didnlie@gmail.com",
        self: true,
      },
      start: {
        dateTime: "2022-10-24T17:00:00+09:00",
        timeZone: "Asia/Seoul",
      },
      end: {
        dateTime: "2022-10-24T18:00:00+09:00",
        timeZone: "Asia/Seoul",
      },
      iCalUID: "3q67nteuc6h3jn6o7jljokfdr9@google.com",
      sequence: 0,
      reminders: {
        useDefault: true,
      },
      eventType: "default",
    },
    {
      kind: "calendar#event",
      etag: '"3333189719942000"',
      id: "5kdtfcmv5qhuj6qas12need0ct",
      status: "confirmed",
      htmlLink:
        "https://www.google.com/calendar/event?eid=NWtkdGZjbXY1cWh1ajZxYXMxMm5lZWQwY3QgZGlkbmxpZUBt",
      created: "2022-10-24T07:00:59.000Z",
      updated: "2022-10-24T07:00:59.971Z",
      summary: "킹뭐킹뭐",
      description: "킹뭐킹뭐",
      creator: {
        email: "didnlie@gmail.com",
        self: true,
      },
      organizer: {
        email: "didnlie@gmail.com",
        self: true,
      },
      start: {
        dateTime: "2022-10-24T16:30:00+09:00",
        timeZone: "Asia/Seoul",
      },
      end: {
        dateTime: "2022-10-24T17:30:00+09:00",
        timeZone: "Asia/Seoul",
      },
      iCalUID: "5kdtfcmv5qhuj6qas12need0ct@google.com",
      sequence: 0,
      reminders: {
        useDefault: true,
      },
      eventType: "default",
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
      setCurrentTime(new Date())
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

export { App, timeState, planListState }
