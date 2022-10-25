/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import Timer from "./Timer"

function Header() {
  return (
    <div
      css={css`
        width: 100%;
        height: 20%;
        // padding-left: 6.25%;
        // padding-right: 6.25%;
      `}
    >
      <div
        css={css`
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          padding: 16px;
          align-items: center;
        `}
      >
        <Timer></Timer>
      </div>
    </div>
  )
}

export default Header
