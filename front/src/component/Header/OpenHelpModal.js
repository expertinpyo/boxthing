/** @jsxImportSource @emotion/react */

import { defaultBoxStyle } from "../../style/shared";
import Help from "../../asset/nav_icon/help.png";
import { useSetRecoilState } from "recoil";
import { orderModalState, orderSecondModalState } from "../../store/modal";

const OpenHelpModal = () => {
  const setOrderModal = useSetRecoilState(orderModalState);
  const setOrderSecondModal = useSetRecoilState(orderSecondModalState);
  return (
    <div
      css={{
        ...defaultBoxStyle,
        background: "#fff",
        height: "90%",
        aspectRatio: "1/1",
        borderRadius: 9999,
        padding: 8,
        lineHeight: 0,
        position: "relative",
      }}
      onClick={() => {
        setOrderSecondModal(true);
        setTimeout(() => {
          setOrderModal(true);
        }, 6000);
      }}
    >
      <img src={Help} alt={""} css={{ width: "100%" }} />
    </div>
  );
};

export default OpenHelpModal;
