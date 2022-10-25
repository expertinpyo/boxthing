/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useRecoilValue, selector } from "recoil"
import { notiListState } from "../../App"

const unreadNotiListState = selector({
  key: "unreadNotiListState",
  get: ({ get }) => {
    const list = get(notiListState)

    return list.filter((item) => {
      return item.unread
    })
  },
})

function GitBox() {
  const notiList = useRecoilValue(notiListState)
  const unreadNotiList = useRecoilValue(unreadNotiListState)

  console.log("notiList", notiList)
  console.log("unread", unreadNotiList)
  return <div></div>
}

export default GitBox
