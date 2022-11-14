/** @jsxImportSource @emotion/react */

import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Mic from "../../asset/mic.gif";
import { micModalState } from "../../store/modal";

const MicModal = () => {
  const [state, setter] = useRecoilState(micModalState);

  useEffect(() => {
    if (state) {
      setTimeout(() => {
        setter((pre) => !pre);
      }, 2000);
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
        zIndex: 50,
        transition: "visibility 0.3s linear,opacity 0.3s linear",
        visibility: state ? "visible" : "hidden",
        opacity: state ? 1 : 0,
      }}
    >
      <img src={Mic} alt="" css={{ width: 200 }} />
      <div css={{ fontWeight: "bold", fontSize: 20 }}>
        네! 음성 인식 중입니다!
      </div>
    </div>
  );
};

export default MicModal;
