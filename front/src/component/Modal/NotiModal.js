/** @jsxImportSource @emotion/react */

import { useEffect } from "react";
import { useRecoilState } from "recoil";
import NewPost from "../../asset/nav_icon/newNoti.gif";
import { notiModalState } from "../../store/modal";

const NotiModal = () => {
  const [state, setter] = useRecoilState(notiModalState);

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
      <img src={NewPost} alt="" css={{ width: 250, marginBottom: 10 }} />
      <div css={{ fontWeight: "bold", fontSize: 20 }}>
        새로운 Github 알림이 도착했어요!
      </div>
    </div>
  );
};

export default NotiModal;
