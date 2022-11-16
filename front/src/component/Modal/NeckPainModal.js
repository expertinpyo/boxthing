/** @jsxImportSource @emotion/react */

import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Turtle from "../../asset/turtle.gif";
import { neckPainModalState } from "../../store/modal";

const NeckPainModal = () => {
  const [state, setter] = useRecoilState(neckPainModalState);

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
        zIndex: 50,
        background: "rgba(255, 255, 255, 0.375)",
        transition: "visibility 0.3s linear,opacity 0.3s linear",
        visibility: state ? "visible" : "hidden",
        opacity: state ? 1 : 0,
      }}
    >
      <img
        src={Turtle}
        alt=""
        css={{ width: 300, borderRadius: 8, marginBottom: 10 }}
      />
      <div css={{ fontWeight: "bold", fontSize: 20 }}>
        거북목이 될 수 있어요!
      </div>
    </div>
  );
};

export default NeckPainModal;
