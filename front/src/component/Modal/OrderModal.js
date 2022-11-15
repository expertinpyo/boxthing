/** @jsxImportSource @emotion/react */

import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { orderModalState } from "../../store/modal";
import { defaultBoxStyle } from "../../style/shared";
import Talk from "../../asset/talk.gif";
import Arrow from "../../asset/right.png";

const OrderModal = () => {
  const [state, setter] = useRecoilState(orderModalState);

  useEffect(() => {
    if (state) {
      setTimeout(() => {
        setter((pre) => !pre);
      }, 6000);
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
        background: "rgba(255, 255, 255, 0.375)",
        zIndex: 3,
        transition: "visibility 0.3s linear,opacity 0.3s linear",
        visibility: state ? "visible" : "hidden",
        opacity: state ? 1 : 0,
      }}
    >
      <div
        css={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          height: "80%",
          display: "flex",
          justifyContent: "center",
          opacity: 0.1,
          zIndex: 3,
        }}
      >
        <img
          src={Talk}
          alt="Talk"
          css={{ height: "100%", aspectRatio: "1/1", borderRadius: 16 }}
        />
      </div>
      <div
        css={{
          position: "relative",
          width: "50%",
          height: "80%",
          ...defaultBoxStyle,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          background: "white",
          padding: 16,
        }}
      >
        <div
          css={{
            width: "100%",
            height: "15%",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            fontSize: 32,
            fontWeight: "bolder",
            zIndex: 4,
          }}
        >
          음성 명령어 리스트
        </div>
        <div
          css={{
            width: "100%",
            height: "85%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 4,
          }}
        >
          <div
            css={{
              width: "90%",
              height: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "column",
              zIndex: 4,
            }}
          >
            <div
              css={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexDirection: "column",
                paddingRight: 16,
                paddingLeft: 16,
                fontSize: "1.1rem",
              }}
            >
              <div css={{ width: "100%" }}>
                <span>깃허브 페이지로 가려면</span>
                <div
                  css={{
                    width: "100%",
                    textAlign: "right",
                    marginTop: 8,
                    fontWeight: "bold",
                  }}
                >
                  <img src={Arrow} alt="" width="20"></img>
                  <span
                    css={{ fontSize: "1.3rem", color: "black", marginLeft: 8 }}
                  >
                    깃허브 페이지 보여줘
                  </span>
                </div>
              </div>
              <div css={{ width: "100%" }}>
                <span>음수 통계를 보려면</span>
                <div
                  css={{
                    width: "100%",
                    textAlign: "right",
                    marginTop: 8,
                    fontWeight: "bold",
                  }}
                >
                  <img src={Arrow} alt="" width="20"></img>
                  <span
                    css={{ fontSize: "1.3rem", color: "black", marginLeft: 8 }}
                  >
                    마신 물량 보여줘
                  </span>
                </div>
              </div>
              <div css={{ width: "100%" }}>
                <span>오늘의 음수량 그래프를 보려면</span>
                <div
                  css={{
                    width: "100%",
                    textAlign: "right",
                    marginTop: 8,
                    fontWeight: "bold",
                  }}
                >
                  <img src={Arrow} alt="" width="20"></img>
                  <span
                    css={{ fontSize: "1.3rem", color: "black", marginLeft: 8 }}
                  >
                    오늘 그래프 보여줘
                  </span>
                </div>
              </div>
              <div css={{ width: "100%" }}>
                <span>최근 15일간의 음수 통계를 보려면</span>
                <div
                  css={{
                    width: "100%",
                    textAlign: "right",
                    marginTop: 8,
                    fontWeight: "bold",
                  }}
                >
                  <img src={Arrow} alt="" width="20"></img>
                  <span
                    css={{ fontSize: "1.3rem", color: "black", marginLeft: 8 }}
                  >
                    통계 그래프 보여줘
                  </span>
                </div>
              </div>
              <div css={{ width: "100%" }}>
                <span>앉아서 하는 스트레칭 팁!</span>
                <div
                  css={{
                    width: "100%",
                    textAlign: "right",
                    marginTop: 8,
                    fontWeight: "bold",
                  }}
                >
                  <img src={Arrow} alt="" width="20"></img>
                  <span
                    css={{ fontSize: "1.3rem", color: "black", marginLeft: 8 }}
                  >
                    스트레칭 보여줘
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
