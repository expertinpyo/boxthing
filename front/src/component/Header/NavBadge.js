/** @jsxImportSource @emotion/react */

import { useRecoilValue } from "recoil";
import { unreadNotiState } from "../../store/noti";
import WarningFrame from "../../asset/nav_icon/warning.png";
import { motion } from "framer-motion";

const NavBadge = () => {
  const unread = useRecoilValue(unreadNotiState);

  return (
    <>
      {unread.length !== 0 ? (
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
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
            lineHeight: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={WarningFrame}
            alt=""
            css={{ width: "100%", position: "relative" }}
          />
          <div css={{ marginTop: 5, position: "absolute", zIndex: "1" }}>
            {unread.length}
          </div>
        </motion.div>
      ) : (
        false
      )}
    </>
  );
};

export default NavBadge;
