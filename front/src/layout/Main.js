/** @jsxImportSource @emotion/react */

import { useRecoilValue } from "recoil"
import { navState } from "../store/nav"
import { AnimatePresence } from "framer-motion"
import PlanBox from "../component/Box/PlanBox"
import GitBox from "../component/Box/GitBox"
import WorkBox from "../component/Box/WorkBox"
import HealthBox from "../component/Box/HealthBox"

const Main = () => {
  const selectedContent = useRecoilValue(navState)
  return (
    <div
      css={{
        width: "100%",
        height: "100%",
        paddingTop: 16,
        overflow: "hidden",
      }}
    >
      <AnimatePresence>
        {selectedContent === 0 ? <PlanBox key="plan" /> : null}
        {selectedContent === 1 ? <GitBox key="git" /> : null}
        {selectedContent === 2 ? <WorkBox key="work" /> : null}
        {selectedContent === 3 ? <HealthBox key="health" /> : null}
      </AnimatePresence>
    </div>
  )
}

export default Main
