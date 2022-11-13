/** @jsxImportSource @emotion/react */

import { useEffect, useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { useRecoilState, useRecoilValue } from "recoil";
import { captureFuncState, captureModalState } from "../../store/modal";
import { socketState } from "../../store/socket";
import { motion } from "framer-motion";
import One from "../../asset/number-one.png";
import Two from "../../asset/number-2.png";
import Three from "../../asset/number-3.png";

const numberStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const CaptureModal = () => {
  const state = useRecoilValue(captureModalState);
  const [captureFunc, setCaptureFunc] = useRecoilState(captureFuncState);
  const socket = useRecoilValue(socketState);
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    return imageSrc;
  }, [webcamRef]);
  const [count, setCount] = useState(6);

  const sendCaptureImg = useCallback(() => {
    if (state && webcamRef.current) {
      if (count > 0) {
        setTimeout(() => {
          setCount(count - 1);
        }, 1000);
      } else {
        if (socket && socket.readyState === 1) {
          socket.send(
            JSON.stringify({ type: "posture/capture", data: capture() })
          );
          setCaptureFunc(false);
          setCount(6);
        }
      }
    }
  }, [count, setCount, socket, state, capture, setCaptureFunc]);

  useEffect(() => {
    if (captureFunc) sendCaptureImg();
  }, [captureFunc, sendCaptureImg]);

  return (
    <motion.div
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
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div>
        <Webcam
          audio={false}
          height={480}
          screenshotFormat="image/jpeg"
          width={640}
          ref={webcamRef}
          videoConstraints={{ facingMode: "user" }}
          style={{ borderRadius: 16 }}
        />
      </div>
      {count === 1 && (
        <div css={numberStyle}>
          <img src={One} alt="" css={{ width: 200 }} />
        </div>
      )}
      {count === 2 && (
        <div css={numberStyle}>
          <img src={Two} alt="" css={{ width: 200 }} />
        </div>
      )}
      {count === 3 && (
        <div css={numberStyle}>
          <img src={Three} alt="" css={{ width: 200 }} />
        </div>
      )}
    </motion.div>
  );
};

export default CaptureModal;
