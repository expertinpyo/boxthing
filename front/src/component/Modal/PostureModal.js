/** @jsxImportSource @emotion/react */

import { motion } from "framer-motion"
import Angry from "../../asset/angry.gif"

const PostureModal = () => {
  return (
    <motion.div
      css={{
        position: "fixed",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        // transform: "translate(-50%, -50%)",
        background: "rgba(255, 255, 255, 0.375)",
        zIndex: 1,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img src={Angry} alt="" css={{ width: 200 }} />
      <div css={{ fontWeight: "bold" }}>자세를 똑바로 하세요!</div>
    </motion.div>
  )
}

export default PostureModal
