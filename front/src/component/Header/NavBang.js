/** @jsxImportSource @emotion/react */

import { useRecoilValue } from "recoil"
import { upcomingPlanState } from "../../store/plan"
import Exclamation from "../../asset/nav_icon/warning.png"
const NavBang = () => {
  const upcoming = useRecoilValue(upcomingPlanState)
  return (
    <>
      {upcoming.length !== 0 ? (
        <div
          css={{
            position: "absolute",
            width: "40%",
            aspectRatio: "1/1",
            top: -5,
            right: -5,
            fontSize: 12,
            lineHeight: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={Exclamation} alt="" css={{ width: "100%" }} />
        </div>
      ) : (
        false
      )}
    </>
  )
}

export default NavBang
