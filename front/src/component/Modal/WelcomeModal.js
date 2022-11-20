/** @jsxImportSource @emotion/react */

import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Hello from "../../asset/hello.gif";
import { welcomeModalState } from "../../store/modal";

const WelcomeModal = () => {
  const [state, setter] = useRecoilState(welcomeModalState);

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
      <img src={Hello} alt="" css={{ width: 250, marginBottom: 10 }} />
      <div css={{ fontWeight: "bold", fontSize: 20 }}>환영합니다!</div>
    </div>
  );
};

export default WelcomeModal;
