/** @jsxImportSource @emotion/react */

import { defaultBoxStyle } from "../../style/shared";

import { motion } from "framer-motion";
import PostureGraph from "../Posture/PostureGraph";
import PostureLineGraph from "../Posture/PostureLineGraph";
import ToggleButton from "../Water/ToggleButton";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { postureAvgState } from "../../store/posture";
import { socketState } from "../../store/socket";

function PostureBox({ key }) {
  const [state, setState] = useState(false);
  const [first, setFirst] = useState(true);
  const avg = useRecoilValue(postureAvgState);

  const socket = useRecoilValue(socketState);
  useEffect(() => {
    if (socket && socket.readyState === 1 && first) {
      socket.send(JSON.stringify({ type: "log/posture/today", data: null }));
      console.log("send log/posture/today message to server!");
      setFirst(false);
    }
  }, [socket, first, setFirst]);
  return (
    <motion.div
      key={key}
      css={{
        ...defaultBoxStyle,
        width: "100%",
        height: "100%",
        padding: 16,
        borderRadius: "16px 16px 0px 0px",
        position: "relative",
      }}
      initial={{ transform: "translateY(100%)", opacity: 0 }}
      animate={{ transform: "translateY(0%)", opacity: 1 }}
      exit={{ transform: "translateY(100%)", opacity: 0 }}
      transition={{ duration: 0.5, ease: "circOut" }}
    >
      <div css={{ position: "relative", width: "100%", height: "100%" }}>
        <div css={{ position: "absolute", top: 0, right: 0, zIndex: 10 }}>
          <ToggleButton
            leftText={"RUNTIME"}
            rightText={"TODAY"}
            onClick={() => {
              setState((pre) => !pre);
            }}
          />
        </div>
        <div
          css={{
            width: "100%",
            height: "100%",
          }}
        >
          {state ? (
            <PostureGraph />
          ) : (
            <div css={{ width: "100%", height: "100%" }}>
              <PostureLineGraph />
              <div
                css={{
                  position: "absolute",
                  ...defaultBoxStyle,
                  width: 250,
                  height: 40,
                  zIndex: 3,
                  top: 0,
                  right: 176,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 14,
                }}
              >
                <span
                  css={{ marginRight: 5 }}
                >{`오늘 하루 자세 평균 점수 : `}</span>
                <span css={{ fontWeight: "bold", color: "green" }}>{avg}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default PostureBox;