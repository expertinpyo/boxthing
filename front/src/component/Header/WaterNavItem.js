/** @jsxImportSource @emotion/react */

import { Link } from "react-router-dom"
import { defaultBoxStyle } from "../../style/shared"
import { Water } from "../Water/Water"

const WaterNavItem = () => {
  return (
    <div
      css={{
        ...defaultBoxStyle,
        background: "#fff",
        height: "90%",
        aspectRatio: "1/1",
        borderRadius: 9999,
        padding: 8,
        // lineHeight: 0,
        position: "relative",
      }}
    >
      <Link to="/water">
        <Water
          size={{ boxwidth: "100%", boxheight: "100%" }}
          opacity={"1"}
          wrapperposition={"relative"}
          text={"1rem"}
        />
      </Link>
    </div>
  )
}

export default WaterNavItem
