/** @jsxImportSource @emotion/react */

import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import QrcodeBox from "./QrcodeBox"
import WelcomeBox from "./WelcomeBox"

const Welcome = () => {
  const [complete, setComplete] = useState(true)
  return (
    <div
      css={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <AnimatePresence mode="wait">
        {complete ? <WelcomeBox /> : <QrcodeBox />}
      </AnimatePresence>
    </div>
  )
}

export default Welcome
