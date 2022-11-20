/** @jsxImportSource @emotion/react */

import Header from "./Header"
import Main from "./Main"

import { motion } from "framer-motion"

const Layout = () => {
  return (
    <motion.div
      css={{
        width: "100%",
        height: "100%",
        position: "relatve",
        paddingLeft: 16,
        paddingRight: 16,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div css={{ width: "100%", height: "15%", paddingTop: 16 }}>
        <Header />
      </div>
      <div css={{ width: "100%", height: "85%" }}>
        <Main />
      </div>
    </motion.div>
  )
}

export default Layout
