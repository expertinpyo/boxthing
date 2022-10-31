/** @jsxImportSource @emotion/react */

import StretchingModal from "../component/Modal/StretchingModal"
import WaterModal from "../component/Modal/WaterModal"
import Header from "./Header"
import Main from "./Main"

const Layout = () => {
  return (
    <div css={{ width: "100%", height: "100%", position: "relatve" }}>
      {/* <div
        css={{
          width: "100%",
          height: "100%",
          paddingTop: 16,
          paddingBottom: 16,
        }}
      >
        <StretchingModal />
      </div> */}
      {/* <WaterModal start={20} end={50} /> */}

      <div css={{ width: "100%", height: "15%", paddingTop: 16 }}>
        <Header />
      </div>
      <div css={{ width: "100%", height: "85%" }}>
        <Main />
      </div>
    </div>
  )
}

export default Layout
