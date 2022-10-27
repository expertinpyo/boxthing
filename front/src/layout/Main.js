/** @jsxImportSource @emotion/react */

import { useRecoilValue } from "recoil"
import { selectedContentState } from "../store/nav"
import { defaultBoxStyle } from "../style/shared"

const Main = () => {
  const selectedContent = useRecoilValue(selectedContentState)
  return (
    <div
      css={{
        width: "100%",
        height: "100%",
        paddingTop: 16,
      }}
    >
      <div
        css={{
          ...defaultBoxStyle,
          width: "100%",
          height: "100%",
          padding: 16,
          borderRadius: "16px 16px 0px 0px",
        }}
      >
        {selectedContent}
      </div>
    </div>
  )
}

export default Main
