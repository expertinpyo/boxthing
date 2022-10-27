/** @jsxImportSource @emotion/react */

import Timer from "../component/Header/Timer"
import { defaultBoxStyle } from "../style/shared"
import calendar from "../asset/nav_icon/google-calendar.png"
import github from "../asset/nav_icon/github.png"
import working from "../asset/nav_icon/working-woman.png"
import examine from "../asset/nav_icon/examination.png"
import { useSetRecoilState } from "recoil"

import { navState } from "../store/nav"

const array = [
  { value: 0, img: calendar },
  { value: 1, img: github },
  { value: 2, img: working },
  { value: 3, img: examine },
]

const Header = () => {
  const setNavState = useSetRecoilState(navState)
  return (
    <div
      css={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div css={{ width: "20%", height: "100%" }}>
        <Timer />
      </div>
      <div
        css={{
          width: "40%",
          height: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {array.map((item) => {
          return (
            <div
              key={item.value}
              css={{
                ...defaultBoxStyle,
                height: "90%",
                aspectRatio: "1/1",
                borderRadius: 9999,
                padding: "4%",
                lineHeight: 0,
              }}
              onClick={() => {
                setNavState(item.value)
              }}
            >
              <img src={item.img} alt={""} css={{ width: "100%" }} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Header
