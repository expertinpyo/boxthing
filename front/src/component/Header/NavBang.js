/** @jsxImportSource @emotion/react */

import { useRecoilValue } from "recoil";
import { upcomingPlanState } from "../../store/plan";
import Exclamation from "../../asset/nav_icon/warningex.png";
import { motion } from "framer-motion";

const NavBang = () => {
  const upcoming = useRecoilValue(upcomingPlanState);
  return (
    <>
      {upcoming.length !== 0 ? (
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
          <img src={Exclamation} alt="" css={{ width: "100%" }} />
        </motion.div>
      ) : (
        false
      )}
    </>
  );
};

export default NavBang;
