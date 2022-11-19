import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authenticationState } from "../store/auth";
import { gitAuthenticationState } from "../store/gitauth";
import {
  captureBadModalState,
  captureFuncState,
  captureGoodModalState,
  captureModalState,
  captureStartModalState,
  micModalState,
  noOrderModalState,
  notiModalState,
  orderModalState,
  orderSecondModalState,
  stretchModalState,
  waterModalState,
  welcomeModalState,
} from "../store/modal";
import { ptoggleState, wtoggleState } from "../store/nav";
import { notiState } from "../store/noti";
import { planState } from "../store/plan";
import { cameraConnectionState, postureState } from "../store/posture";
import { linkState } from "../store/qrcode";
import { socketState } from "../store/socket";
import { statisticsState } from "../store/statistics";
import { drinkedState } from "../store/water";

const Subscriber = () => {
  const [socket, setSocket] = useRecoilState(socketState);

  //setState about data
  const setAuthenticationState = useSetRecoilState(authenticationState);
  const setGitAuthenticationState = useSetRecoilState(gitAuthenticationState);
  const setLinkState = useSetRecoilState(linkState);
  const setPlanState = useSetRecoilState(planState);
  const setNotiState = useSetRecoilState(notiState);
  const setStatisticsState = useSetRecoilState(statisticsState);
  const setDrinkedState = useSetRecoilState(drinkedState);
  const setPostureState = useSetRecoilState(postureState);

  //setState about modal
  const setStretchModalState = useSetRecoilState(stretchModalState);
  const setNotiModalState = useSetRecoilState(notiModalState);
  const setWaterModalState = useSetRecoilState(waterModalState);
  const setCaptureModalState = useSetRecoilState(captureModalState);

  const setCaptureFunc = useSetRecoilState(captureFuncState);

  const setCaptureGoodModal = useSetRecoilState(captureGoodModalState);
  const setCaptureBadModal = useSetRecoilState(captureBadModalState);
  const setCaptureStartModal = useSetRecoilState(captureStartModalState);

  const setPostureToggle = useSetRecoilState(ptoggleState);
  const setWaterToggle = useSetRecoilState(wtoggleState);

  const setMicModal = useSetRecoilState(micModalState);
  const setNoOrderModal = useSetRecoilState(noOrderModalState);

  const setOrderModal = useSetRecoilState(orderModalState);
  const setOrderSecondModal = useSetRecoilState(orderSecondModalState);
  const setCameraConnection = useSetRecoilState(cameraConnectionState);

  const setWelcomeModal = useSetRecoilState(welcomeModalState);

  const navi = useNavigate();

  useEffect(() => {
    if (socket == null) {
      console.log("try to connect with server!");
      setSocket(new WebSocket("ws://localhost:8765"));
    }
  }, [socket, setSocket]);

  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        console.log("socket opened!");
      };

      socket.onclose = () => {
        console.log("socket closed!");
        setSocket(null);
      };
    }

    return () => {
      if (socket) socket.close();
    };
  }, [socket, setSocket]);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        const type = message.type;
        switch (type) {
          case "init":
            if (message.data.google["is_login"]) {
              setAuthenticationState(true);
              if (socket && socket.readyState === 1) {
                socket.send(
                  JSON.stringify({ type: "log/water/today", data: null })
                );
                console.log("send log/water/stat message to server!");
                socket.send(
                  JSON.stringify({ type: "log/posture/today", data: null })
                );
                console.log("send lo g/posture/today message to server!");
              }
            } else {
              setLinkState(message.data.google.link);
            }
            if (message.data.github["is_login"])
              setGitAuthenticationState(true);
            break;
          case "login":
            setAuthenticationState(true);
            setWelcomeModal(true);
            if (socket && socket.readyState === 1) {
              socket.send(
                JSON.stringify({ type: "log/water/today", data: null })
              );
              console.log("send log/water/stat message to server!");
              socket.send(
                JSON.stringify({ type: "log/posture/today", data: null })
              );
              console.log("send lo g/posture/today message to server!");
            }
            break;
          case "github/qr":
            setLinkState(message.data.link);
            break;
          case "github/login":
            setGitAuthenticationState(true);
            break;
          case "calendar":
            setPlanState(message.data);
            break;
          case "github/noti":
            setNotiState((old) => [...message.data, ...old]);
            break;
          case "log/water/stat":
            setStatisticsState({ water: message.data });
            break;
          case "log/water/today":
            setDrinkedState(message.data);
            break;
          case "log/posture/today":
            setPostureState(message.data);
            break;
          case "stretch":
            setStretchModalState(true);
            break;
          case "water":
            setWaterModalState(true);
            setDrinkedState((old) => [...old, message.data]);
            break;
          case "posture":
            setPostureState((old) => [...old, message.data]);
            break;
          case "posture/ready":
            setCaptureStartModal(true);
            setCaptureModalState(true);
            setCaptureFunc(true);
            break;
          case "posture/nope":
            setCaptureBadModal(true);
            setCaptureFunc(true);
            break;
          case "posture/complete":
            setCaptureGoodModal(true);
            setCaptureModalState(false);
            if (socket && socket.readyState === 1) {
              socket.send(
                JSON.stringify({ type: "posture/complete", data: null })
              );
              console.log("send close capture modal message to server!");
            }
            setCameraConnection(true);
            break;
          case "route/calendar":
            navi("/");
            break;
          case "route/git":
            navi("/git");
            break;
          case "route/posture":
            navi("/posture");
            break;
          case "route/water":
            navi("/water");
            break;
          case "toggle/posture/today":
            setPostureToggle(false);
            break;
          case "toggle/posture/runtime":
            setPostureToggle(true);
            break;
          case "toggle/water/today":
            setWaterToggle(true);
            break;
          case "toggle/water/week":
            setWaterToggle(false);
            break;
          case "send/cmd":
            setMicModal(true);
            break;
          case "success/cmd":
            setMicModal(false);
            break;
          case "fail/cmd":
            setMicModal(false);
            setNoOrderModal(true);
            break;
          case "posture/re":
            if (socket && socket.readyState === 1) {
              setCameraConnection(false);
              socket.send(
                JSON.stringify({ type: "posture/reset", data: null })
              );
              console.log("send close capture modal message to server!");
            }
            break;
          case "show/cmd":
            setOrderSecondModal(true);
            setTimeout(() => {
              setOrderModal(true);
            }, 6000);
            break;
          default:
            console.log("I can't distinguish the type of message...");
        }
      };
    }
  }, [
    socket,
    setPlanState,
    setNotiState,
    setAuthenticationState,
    setGitAuthenticationState,
    setLinkState,
    setStatisticsState,
    setWaterModalState,
    setStretchModalState,
    setNotiModalState,
    setDrinkedState,
    setPostureState,
    setCaptureFunc,
    setCaptureModalState,
    navi,
    setCaptureBadModal,
    setCaptureGoodModal,
    setCaptureStartModal,
    setPostureToggle,
    setWaterToggle,
    setMicModal,
    setNoOrderModal,
    setOrderModal,
    setOrderSecondModal,
    setCameraConnection,
    setWelcomeModal,
  ]);
};

export { Subscriber };
