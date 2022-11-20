/** @jsxImportSource @emotion/react */

import { useRecoilValue } from "recoil";
import Mic from "../../asset/mic.gif";
import { micModalState } from "../../store/modal";

const MicModal = () => {
  const state = useRecoilValue(micModalState);

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
        zIndex: 50,
        background: "rgba(255, 255, 255, 0.375)",
        transition: "visibility 0.3s linear,opacity 0.3s linear",
        visibility: state ? "visible" : "hidden",
        opacity: state ? 1 : 0,
      }}
    >
      <img
        src={Mic}
        alt=""
        css={{
          width: 250,
          backgroundColor: "white",
          borderRadius: 8,
          marginBottom: 10,
        }}
      />
      <div css={{ fontWeight: "bold", fontSize: 20 }}>
        네! 음성 인식 중입니다!
      </div>
    </div>
  );
};

export default MicModal;
