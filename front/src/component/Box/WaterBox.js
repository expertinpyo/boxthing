/** @jsxImportSource @emotion/react */
import { defaultBoxStyle } from "../../style/shared"

import { motion } from "framer-motion"
import { Water } from "../Water/Water"
import WaterInfo from "../Water/WaterInfo"
import { useState } from "react"
import WaterDailyGraph from "../Water/WaterDailyGraph"
import WaterWeeklyGraph from "../Water/WaterWeeklyGraph"
import ToggleButton from "../Water/ToggleButton"

function WaterBox({ key }) {
  const [state, setState] = useState(true)
  return (
    <motion.div
      key={key}
      css={{
        ...defaultBoxStyle,
        width: "100%",
        height: "100%",
        padding: 16,
        borderRadius: "16px 16px 0px 0px",
        display: "flex",
      }}
      initial={{ transform: "translateY(100%)" }}
      animate={{ transform: "translateY(0%)" }}
      exit={{ transform: "translateY(100%)" }}
      transition={{ duration: 0.5, ease: "circOut" }}
    >
      {/* <div
        css={{
          ...defaultBoxStyle,
          width: "35%",
          height: "100%",
          padding: 16,
          borderRadius: 16,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Water />
        <WaterInfo />
      </div> */}
      <div
        css={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          flexDirection: "column",
        }}
      >
        <div css={{ position: "absolute", top: 0, right: 0, zIndex: 10 }}>
          <ToggleButton
            onClick={() => {
              setState((pre) => !pre)
            }}
          />
        </div>

        <div css={{ width: "100%", height: "100%" }}>
          {state ? (
            <div css={{ width: "100%", height: "100%" }}>
              <Water size={{ boxwidth: "300px", boxheight: "300px" }} />
              <WaterDailyGraph />
            </div>
          ) : (
            <WaterWeeklyGraph />
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default WaterBox
