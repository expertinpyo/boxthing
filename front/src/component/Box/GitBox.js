/** @jsxImportSource @emotion/react */
import { useRecoilState, useRecoilValue } from "recoil";
import { notiState } from "../../store/noti";
import { defaultBoxStyle } from "../../style/shared";
import NotiListItem from "../Git/NotiListItem";

import { motion } from "framer-motion";
import { gitAuthenticationState } from "../../store/gitauth";
import QrcodeBox from "../Welcome/QrcodeBox";
import { useEffect } from "react";
import { socketState } from "../../store/socket";
import clonedeep from "lodash.clonedeep";
import PaperPlane from "../../asset/paperplan.png";

function GitBox() {
  const gitAuthenticated = useRecoilValue(gitAuthenticationState);
  const socket = useRecoilValue(socketState);

  const [noti, setNoti] = useRecoilState(notiState);
  // const unreadNoti = useRecoilValue(unreadNotiState);

  useEffect(() => {
    if (socket && socket.readyState === 1 && !gitAuthenticated) {
      socket.send(JSON.stringify({ type: "github/qr", data: null }));
      console.log("send github/qr message to server!");
    }
    return () => {
      if (socket && socket.readyState === 1 && gitAuthenticated) {
        socket.send(JSON.stringify({ type: "github/read", data: null }));
        setNoti((old) => {
          const list = old.map((item) => {
            const temp = clonedeep(item);
            temp.unread = false;
            return temp;
          });
          return list;
        });
      }
    };
  }, [socket, gitAuthenticated, setNoti]);

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
          {noti.length !== 0 ? (
            noti.map((item) => {
              return <NotiListItem key={item.id} item={item} />;
            })
          ) : (
            <div
              css={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                fontSize: 24,
                position: "relative",
              }}
            >
              <div css={{ marginBottom: 8, marginRight: "30%" }}>새로운</div>
              <div css={{ marginBottom: 8 }}>
                <span css={{ fontSize: 48, fontWeight: "bold" }}>
                  Notification
                </span>
                이
              </div>
              <div css={{ marginBottom: 8, marginLeft: "30%" }}>
                도착하지 않았습니다!
              </div>
              <div css={{ position: "absolute", top: "30%", right: "35%" }}>
                <img src={PaperPlane} alt="" width={80}></img>
              </div>
            </div>
          )}
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
