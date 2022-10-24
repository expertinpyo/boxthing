/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { useRecoilValue } from "recoil"
import { timeState } from "../../App"

function Timer() {
  const currentTime = useRecoilValue(timeState)
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
      `}
    >
      {currentTime}
    </div>
  )
}

export default Timer
