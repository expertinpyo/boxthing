/** @jsxImportSource @emotion/react */

import { useRecoilValue } from "recoil"
import { unreadNotiState } from "../../store/noti"
import WarningFrame from "../../asset/nav_icon/warning.png"
const NavBadge = () => {
  const unread = useRecoilValue(unreadNotiState)

  return (
    <>
      {unread.length !== 0 ? (
        <div
          css={{
            position: "absolute",
            width: "40%",
            aspectRatio: "1/1",
            top: -5,
            right: -5,
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
            lineHeight: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={WarningFrame}
            alt=""
            css={{ width: "100%", position: "relative" }}
          />
          <div css={{ marginTop: 5, position: "absolute", zIndex: "1" }}>
            {unread.length}
          </div>
        </div>
      ) : (
        false
      )}
    </>
  )
}

export default NavBadge
