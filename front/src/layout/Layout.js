/** @jsxImportSource @emotion/react */

import Header from "./Header"
import Main from "./Main"

const Layout = () => {
  return (
    <div css={{ width: "100%", height: "100%" }}>
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
