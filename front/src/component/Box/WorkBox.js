/** @jsxImportSource @emotion/react */
import { defaultBoxStyle } from "../../style/shared";

import { motion } from "framer-motion";

function WorkBox({ key }) {
  return (
    <motion.div
      key={key}
      css={{
        ...defaultBoxStyle,
        width: "100%",
        height: "100%",
        padding: 16,
        borderRadius: "16px 16px 0px 0px",
      }}
      initial={{ transform: "translateY(100%)", opacity: 0 }}
      animate={{ transform: "translateY(0%)", opacity: 1 }}
      exit={{ transform: "translateY(100%)", opacity: 0 }}
      transition={{ duration: 0.5, ease: "circOut" }}
    >
      <div css={{ ...defaultBoxStyle }}></div>
    </motion.div>
  );
}

export default WorkBox;
