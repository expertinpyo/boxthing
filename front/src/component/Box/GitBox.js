/** @jsxImportSource @emotion/react */
import { useRecoilValue } from "recoil"
import { notiState, unreadNotiState } from "../../store/noti"
import NotiListItem from "../Git/NotiListItem"

function GitBox() {
  const noti = useRecoilValue(notiState)
  const unreadNoti = useRecoilValue(unreadNotiState)

  console.log("noti", noti)
  console.log("unreadNoti", unreadNoti)
  return (
    <div css={{ width: "100%", height: "100%" }}>
      {noti.map((item) => {
        return <NotiListItem key={item.id} item={item} />
      })}
    </div>
  )
}

export default GitBox
