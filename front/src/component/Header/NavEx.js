/** @jsxImportSource @emotion/react */

import CameraWarning from "../../asset/camerawarning.png";
import { motion } from "framer-motion";

const NavEx = () => {
  return (
    <motion.div
      animate={{ scale: [1, 1.2, 1, 1.1, 1] }}
      transition={{
        repeat: Infinity,
        duration: 2,
        times: [0, 0.2, 0.3, 0.4, 1],
      }}
      css={{
        position: "absolute",
        width: "60%",
        aspectRatio: "1/1",
        top: -10,
        right: -10,
        lineHeight: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={CameraWarning} alt="" css={{ width: "100%" }} />
    </motion.div>
  );
};

export default NavEx;
