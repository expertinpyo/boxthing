/** @jsxImportSource @emotion/react */

import Timer from "../component/Header/Timer"
import calendar from "../asset/nav_icon/google-calendar.png"
import github from "../asset/nav_icon/github.png"
import working from "../asset/nav_icon/working-woman.png"
import examine from "../asset/nav_icon/examination.png"

import NavListItem from "../component/Header/NavListItem"

import { motion } from "framer-motion"

const array = [
  { type: "calendar", img: calendar, path: "/" },
  { type: "git", img: github, path: "/git" },
  { type: "work", img: working, path: "/work" },
  { type: "health", img: examine, path: "/health" },
]

const Header = () => {
  return (
    <div
      css={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
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
          return <NavListItem key={item.path} img={item.img} path={item.path} />
        })}
      </div>
    </div>
  )
}

export default Header
