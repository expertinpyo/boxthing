/** @jsxImportSource @emotion/react */
import { defaultBoxStyle } from "../../style/shared";

import { motion } from "framer-motion";
import { Water } from "../Health/Water";
import WaterInfo from "../Health/WaterInfo";

function HealthBox({ key }) {
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
      initial={{ transform: "translateY(100%)" }}
      animate={{ transform: "translateY(0%)" }}
      exit={{ transform: "translateY(100%)" }}
      transition={{ duration: 0.5, ease: "circOut" }}
    >
      <div
        css={{
          ...defaultBoxStyle,
          width: "50%",
          height: "100%",
          padding: 16,
          borderRadius: 16,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Water />
        <WaterInfo />
      </div>
    </motion.div>
  );
}

export default HealthBox;
