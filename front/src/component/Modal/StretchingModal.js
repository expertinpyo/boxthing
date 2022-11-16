/** @jsxImportSource @emotion/react */

import stretch from "../../asset/stretching_images/check.gif";

import { defaultBoxStyle } from "../../style/shared";
import { useEffect, useState } from "react";

import { stretchingList } from "../../store/stretch";
import { useRecoilState } from "recoil";
import { stretchModalState } from "../../store/modal";

const StretchingModal = () => {
  const [state, setter] = useRecoilState(stretchModalState);

  const [choice, setChoice] = useState(0);

  useEffect(() => {
    if (state) {
      setChoice(Math.floor(Math.random() * 10));
      setTimeout(() => {
        setter((pre) => !pre);
      }, 10000);
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
          width: "95%",
          height: "95%",
          ...defaultBoxStyle,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "white",
        }}
      >
        <div
          css={{
            inlineHeight: "0",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
          }}
        >
          <img
            css={{ width: "100%", aspectRatio: "1/1", borderRadius: "16px" }}
            src={stretchingList[choice].image}
            alt="forward"
          ></img>
        </div>
        <div
          css={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <div
            css={{
              width: "100%",
              height: "20%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 32,
              fontWeight: "bold",
            }}
          >
            {stretchingList[choice].name}
          </div>
          <div
            css={{
              width: "100%",
              height: "80%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              paddingLeft: 32,
              flexDirection: "column",
              paddingRight: 16,
            }}
          >
            {stretchingList[choice].explanation.map((item, index) => {
              return (
                <div
                  key={index}
                  css={{
                    display: "flex",
                    position: "relative",
                    height: "20%",
                    width: "100%",
                  }}
                >
                  <div
                    css={{ width: "8%", inlineHeight: 0, marginRight: "2%" }}
                  >
                    <img src={stretch} alt="stretch" css={{ width: "100%" }} />
                  </div>
                  <div css={{ width: "90%", fontSize: 18, marginBottom: 20 }}>
                    {item}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StretchingModal;
