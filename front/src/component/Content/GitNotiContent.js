/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { useRecoilValue } from "recoil"
import { notiListState } from "../../App"

function GitNotiContent() {
  const notiList = useRecoilValue(notiListState)
  console.log(notiList)
  return <></>
}

export default GitNotiContent
