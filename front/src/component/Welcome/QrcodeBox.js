/** @jsxImportSource @emotion/react */

import Qrcode from "../Start/Qrcode";
import { defaultBoxStyle } from "../../style/shared";

import { useRecoilValue } from "recoil";
import { linkState } from "../../store/qrcode";

const QrcodeBox = () => {
  const link = useRecoilValue(linkState);

  return (
    <div
      css={{
        width: 250,
        ...defaultBoxStyle,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        padding: 16,
      }}
    >
      {link ? (
        <>
          <Qrcode link={link} />
          <div css={{ marginTop: 16 }}>연동을 위한</div>
          <div>
            <span css={{ color: "blue" }}>QR 스캔</span> 부탁드립니다!
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default QrcodeBox;
