/** @jsxImportSource @emotion/react */
import { useRecoilValue } from "recoil"
import { notiState, unreadNotiState } from "../../store/noti"
import { defaultBoxStyle } from "../../style/shared"
import NotiListItem from "../Git/NotiListItem"

import { motion } from "framer-motion"

function GitBox() {
  const noti = useRecoilValue(notiState)
  const unreadNoti = useRecoilValue(unreadNotiState)

  console.log("noti", noti)
  console.log("unreadNoti", unreadNoti)
  return (
    <motion.div
      css={{
        ...defaultBoxStyle,
        width: "100%",
        height: "100%",
        padding: 16,
        borderRadius: "16px 16px 0px 0px",
      }}
      initial={{ transform: "translateY(100%)" }}
      animate={{ transform: "translateY(0%)" }}
      exit={{ transform: "translateY(100%)" }}
      transition={{ duration: 1 }}
    >
      <div css={{ width: "100%", height: "100%" }}>
        {noti.map((item) => {
          return <NotiListItem key={item.id} item={item} />
        })}
      </div>
    </motion.div>
  )
}

export default GitBox
