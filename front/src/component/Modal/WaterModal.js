/** @jsxImportSource @emotion/react */

import { useEffect } from "react";
import { WaterAnimation } from "../Water/Water";

const WaterModal = ({ state, setter }) => {
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
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // transform: "translate(-50%, -50%)",
        background: "rgba(255, 255, 255, 0.375)",
        zIndex: 3,
        transition: "visibility 0.3s linear,opacity 0.3s linear",
        visibility: state ? "visible" : "hidden",
        opacity: state ? 1 : 0,
      }}
    >
      <WaterAnimation />
      <div css={{ fontWeight: "bold" }}>250ml 섭취하셨습니다!</div>
    </div>
  );
};

export default WaterModal;
