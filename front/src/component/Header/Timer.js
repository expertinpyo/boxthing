/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { useRecoilValue } from "recoil"
import { timeState } from "../../App"

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
  const today = useRecoilValue(timeState)
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
      `}
    >
      <div>{`${today.getHours()} : ${today.getMinutes()} ${
        today.getHours() >= 12 ? "PM" : "AM"
      }`}</div>
      <div>{`${today.getFullYear()} ${today.getMonth()} ${today.getDate()} ${
        dayNames[today.getDay()]
      }`}</div>
    </div>
  )
}

export default Timer
