/** @jsxImportSource @emotion/react */

import { motion } from "framer-motion";

import QrcodeBox from "../component/Welcome/QrcodeBox";
const Welcome = () => {
  return (
    <motion.div
      css={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <QrcodeBox />
    </motion.div>
  );
};

export default Welcome;
