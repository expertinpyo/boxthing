/** @jsxImportSource @emotion/react */

import Qrcode from "../component/Start/Qrcode"
import { defaultBoxStyle } from "../style/shared"

import { motion } from "framer-motion"

const QrcodeBox = () => {
  return (
    <motion.div
      css={{
        width: 250,
        ...defaultBoxStyle,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        padding: 16,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Qrcode link={"https://github.com/didnlie23"} />
      <div css={{ marginTop: 16 }}>스캔하면 우째되는지에 대한 멘트</div>
    </motion.div>
  )
}

export default QrcodeBox
