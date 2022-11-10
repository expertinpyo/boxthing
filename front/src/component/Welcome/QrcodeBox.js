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
          <div css={{ marginTop: 16 }}>스캔하면 우째되는지에 대한 멘트</div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default QrcodeBox;