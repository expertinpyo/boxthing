/** @jsxImportSource @emotion/react */

import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Spine from "../../asset/spine.gif";
import { spinePainModalState } from "../../store/modal";

const SpinePainModal = () => {
  const [state, setter] = useRecoilState(spinePainModalState);

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
        transition: "visibility 0.3s linear,opacity 0.3s linear",
        visibility: state ? "visible" : "hidden",
        opacity: state ? 1 : 0,
      }}
    >
      <img src={Spine} alt="" css={{ width: 200 }} />
      <div css={{ fontWeight: "bold", fontSize: 20 }}>허리를 곧게 피세요!</div>
    </div>
  );
};

export default SpinePainModal;
