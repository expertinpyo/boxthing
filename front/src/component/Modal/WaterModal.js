/** @jsxImportSource @emotion/react */

import { defaultBoxStyle } from "../../style/shared";
import { WaterAnimation } from "../Health/Water";

import { motion } from "framer-motion";

const WaterModal = ({ start, end }) => {
  return (
    <motion.div
      css={{
        ...defaultBoxStyle,
        width: 300,
        height: 300,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <WaterAnimation start={start} end={end} />
    </motion.div>
  );
};

export default WaterModal;
