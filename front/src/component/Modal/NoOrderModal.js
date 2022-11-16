/** @jsxImportSource @emotion/react */

import { useEffect } from "react";
import { useRecoilState } from "recoil";
import DontKnow from "../../asset/dontknow.gif";
import { noOrderModalState } from "../../store/modal";

const NoOrderModal = () => {
  const [state, setter] = useRecoilState(noOrderModalState);

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
        src={DontKnow}
        alt=""
        css={{ width: 300, borderRadius: 8, marginBottom: 10 }}
      />
      <div css={{ fontWeight: "bold", fontSize: 20 }}>
        등록되지 않은 명령입니다!
      </div>
    </div>
  );
};

export default NoOrderModal;
