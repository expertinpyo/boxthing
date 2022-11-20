/** @jsxImportSource @emotion/react */

import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Capture from "../../asset/capture.png";
import { captureStartModalState } from "../../store/modal";

const CaptureStartModal = () => {
  const [state, setter] = useRecoilState(captureStartModalState);

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
        background: "rgba(255, 255, 255, 0.375)",
        transition: "visibility 0.3s linear,opacity 0.3s linear",
        visibility: state ? "visible" : "hidden",
        opacity: state ? 1 : 0,
      }}
    >
      <img
        src={Capture}
        alt=""
        css={{
          width: 250,
          marginBottom: 10,
        }}
      />
      <div css={{ fontWeight: "bold", fontSize: 20 }}>
        자세 측정 기준을 위한 사진을 촬영합니다!
      </div>
    </div>
  );
};

export default CaptureStartModal;
