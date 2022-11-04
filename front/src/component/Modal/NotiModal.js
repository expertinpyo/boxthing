/** @jsxImportSource @emotion/react */

import { useEffect } from "react";
import NewPost from "../../asset/nav_icon/newNoti.gif";

const NotiModal = ({ state, setter }) => {
  useEffect(() => {
    if (state) {
      setTimeout(() => {
        setter((pre) => !pre);
      }, 3000);
    }
  }, [state, setter]);
  return (
    <div
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
        zIndex: 3,
        transition: "visibility 0.3s linear,opacity 0.3s linear",
        visibility: state ? "visible" : "hidden",
        opacity: state ? 1 : 0,
      }}
    >
      <img src={NewPost} alt="" css={{ width: 200 }} />
      <div css={{ fontWeight: "bold" }}>새로운 Github 알림이 도착했어요!</div>
    </div>
  );
};

export default NotiModal;
