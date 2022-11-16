/** @jsxImportSource @emotion/react */

import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Good from "../../asset/captureGood.png";
import { captureGoodModalState } from "../../store/modal";

const CaptureGoodModal = () => {
  const [state, setter] = useRecoilState(captureGoodModalState);

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
      <img src={Good} alt="" css={{ width: 250, marginBottom: 10 }} />
      <div css={{ fontWeight: "bold", fontSize: 20 }}>
        성공적으로 촬영했습니다!
      </div>
    </div>
  );
};

export default CaptureGoodModal;
