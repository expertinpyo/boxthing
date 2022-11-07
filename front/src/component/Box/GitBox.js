/** @jsxImportSource @emotion/react */
import { useRecoilValue } from "recoil";
import { notiState } from "../../store/noti";
import { defaultBoxStyle } from "../../style/shared";
import NotiListItem from "../Git/NotiListItem";

import { motion } from "framer-motion";
import { gitAuthenticationState } from "../../store/gitauth";
import QrcodeBox from "../Welcome/QrcodeBox";
import { useEffect } from "react";
import { socketState } from "../../store/socket";

function GitBox() {
  const gitAuthenticated = useRecoilValue(gitAuthenticationState);
  const socket = useRecoilValue(socketState);

  const noti = useRecoilValue(notiState);
  // const unreadNoti = useRecoilValue(unreadNotiState);

  useEffect(() => {
    if (socket && socket.readyState === 1 && !gitAuthenticated) {
      socket.send(JSON.stringify({ type: "github/qr", data: null }));
      console.log("send github/qr message to server!");
    }

    return () => {
      if (socket && socket.readyState === 1 && gitAuthenticated) {
        socket.send(JSON.stringify({ type: "github/read", data: null }));
        console.log("send github/read message to server!");
      }
    };
  }, [socket, gitAuthenticated]);

  return (
    <motion.div
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
      {gitAuthenticated ? (
        <div css={{ width: "100%", height: "100%" }}>
          {noti.map((item) => {
            return <NotiListItem key={item.id} item={item} />;
          })}
        </div>
      ) : (
        <div
          css={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <QrcodeBox />
        </div>
      )}
    </motion.div>
  );
}

export default GitBox;
