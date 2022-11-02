/** @jsxImportSource @emotion/react */

import { defaultBoxStyle } from "../../style/shared"

import { motion } from "framer-motion"
import PostureGraph from "../Posture/PostureGraph"

function PostureBox({ key }) {
  return (
    <motion.div
      key={key}
      css={{
        ...defaultBoxStyle,
        width: "100%",
        height: "100%",
        padding: 16,
        borderRadius: "16px 16px 0px 0px",
        position: "relative",
      }}
      initial={{ transform: "translateY(100%)", opacity: 0 }}
      animate={{ transform: "translateY(0%)", opacity: 1 }}
      exit={{ transform: "translateY(100%)", opacity: 0 }}
      transition={{ duration: 0.5, ease: "circOut" }}
    >
      <div
        css={{
          width: "100%",
          height: "100%",
        }}
      >
        <PostureGraph />
      </div>
      <div
        css={{
          position: "absolute",
          ...defaultBoxStyle,
          width: 250,
          height: 40,
          zIndex: 3,
          top: 16,
          right: 16,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 14,
        }}
      >
        <span css={{ marginRight: 5 }}>{`최근 30분간의 평균 점수 : `}</span>
        <span css={{ fontWeight: "bold", color: "green" }}>79</span>
      </div>
    </motion.div>
  )
}

export default PostureBox
