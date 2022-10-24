/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import weather from "../../asset/nav_icon/weather.png"
import github from "../../asset/nav_icon/github.png"
import working from "../../asset/nav_icon/working.png"
import water from "../../asset/nav_icon/water.png"

function TopNav() {
  const array = [
    { img: weather, alt: "weather" },
    { img: github, alt: "github" },
    { img: working, alt: "working" },
    { img: water, alt: "water" },
  ]
  return (
    <div
      css={css`
        width: 100%;
        height: 80%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      `}
    >
      {array.map((item, index) => {
        return (
          <div
            key={index}
            css={css`
              width: 50%;
              aspect-ratio: 1/1;
              position: relative;
            `}
          >
            <div
              css={css`
                width: 100%;
                height: 100%;
                position: relative;
                z-index: 2;
              `}
            >
              <div
                key={index}
                css={css`
                  position: relative;
                  width: 100%;
                  height: 100%;
                  padding: 5px;
                  background: white;
                  border-radius: 16px;
                  line-height: 0;
                `}
              >
                <img
                  css={css`
                    width: 100%;
                  `}
                  src={item.img}
                  alt={item.alt}
                ></img>
              </div>
            </div>
            <div
              css={css`
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                aspect-ratio: 1 / 1;
                background: var(--main-gradient-color);
                filter: blur(7.5px);
                border-radius: 16px;
                z-index: 1;
              `}
            ></div>
          </div>
        )
      })}
    </div>
  )
}

export default TopNav
