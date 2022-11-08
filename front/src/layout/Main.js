/** @jsxImportSource @emotion/react */

import { AnimatePresence } from "framer-motion"
import PlanBox from "../component/Box/PlanBox"
import GitBox from "../component/Box/GitBox"
import { Route, Routes, useLocation } from "react-router-dom"
import PostureBox from "../component/Box/PostureBox"
import WaterBox from "../component/Box/WaterBox"

const Main = () => {
  const location = useLocation()
  return (
    <div
      css={{
        width: "100%",
        height: "100%",
        paddingTop: 16,
        overflow: "hidden",
      }}
    >
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" exact element={<PlanBox />} />
          <Route path="/git" element={<GitBox />} />
          <Route path="/posture" element={<PostureBox />} />
          <Route path="/water" element={<WaterBox />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default Main
