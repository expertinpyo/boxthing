/** @jsxImportSource @emotion/react */

import { useRecoilValue } from "recoil"
import { timerState } from "../../store/timer"

const dayNames = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
]

function Timer() {
  const today = useRecoilValue(timerState)
  return (
    <div
      css={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div css={{ fontSize: "1.5rem" }}>{`${today.getHours()} : ${today
        .getMinutes()
        .toString()
        .padStart(2, "0")} ${today.getHours() >= 12 ? "PM" : "AM"}`}</div>
      <div>{`${today.getFullYear()} ${today
        .getMonth()
        .toString()
        .padStart(2, "0")} ${today.getDate().toString().padStart(2, "0")} ${
        dayNames[today.getDay()]
      }`}</div>
    </div>
  )
}

export default Timer
