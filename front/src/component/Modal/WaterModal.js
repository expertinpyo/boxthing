/** @jsxImportSource @emotion/react */

import { WaterAnimation } from "../Water/Water"

import { motion } from "framer-motion"

const WaterModal = ({ start, end }) => {
  return (
    <motion.div
      css={{
        position: "fixed",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // transform: "translate(-50%, -50%)",
        background: "rgba(255, 255, 255, 0.375)",
        zIndex: 1,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <WaterAnimation start={start} end={end} />
      <div css={{ fontWeight: "bold" }}>250ml 섭취하셨습니다!</div>
    </motion.div>
  )
}

export default WaterModal
