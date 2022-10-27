/** @jsxImportSource @emotion/react */
import { useRecoilValue } from "recoil"
import { notiState, unreadNotiState } from "../../store/noti"

function GitBox() {
  const noti = useRecoilValue(notiState)
  const unreadNoti = useRecoilValue(unreadNotiState)

  console.log("noti", noti)
  console.log("unreadNoti", unreadNoti)
  return <div></div>
}

export default GitBox
