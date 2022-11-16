/** @jsxImportSource @emotion/react */

import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Bad from "../../asset/captureBad.png";
import { captureBadModalState } from "../../store/modal";

const CaptureBadModal = () => {
  const [state, setter] = useRecoilState(captureBadModalState);

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
      <img src={Bad} alt="" css={{ width: 200, marginBottom: 20 }} />
      <div css={{ fontWeight: "bold", fontSize: 20 }}>
        인식에 실패했습니다... 다시 해볼게요!
      </div>
    </div>
  );
};

export default CaptureBadModal;
