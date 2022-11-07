import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authenticationState } from "../store/auth";
import { gitAuthenticationState } from "../store/gitauth";
import {
  notiModalState,
  planModalState,
  postureModalState,
  stretchModalState,
  waterModalState,
} from "../store/modal";
import { notiState } from "../store/noti";
import { planState } from "../store/plan";
import { linkState } from "../store/qrcode";
import { socketState } from "../store/socket";
import { statisticsState } from "../store/statistics";
import { drinkedState } from "../store/water";

const Subscriber = () => {
  const [socket, setSocket] = useRecoilState(socketState);
  console.log(socket);

  //setState about data
  const setAuthenticationState = useSetRecoilState(authenticationState);
  const setGitAuthenticationState = useSetRecoilState(gitAuthenticationState);
  const setLinkState = useSetRecoilState(linkState);
  const setPlanState = useSetRecoilState(planState);
  const [noti, setNotiState] = useRecoilState(notiState);
  const setStatisticsState = useSetRecoilState(statisticsState);
  const [drinked, setDrinkedState] = useRecoilState(drinkedState);

  //setState about modal
  const setStretchModalState = useSetRecoilState(stretchModalState);
  const setPlanModalState = useSetRecoilState(planModalState);
  const setNotiModalState = useSetRecoilState(notiModalState);
  const setWaterModalState = useSetRecoilState(waterModalState);
  const setPostureModalState = useSetRecoilState(postureModalState);

  useEffect(() => {
    setSocket(new WebSocket("ws://localhost:8765"));
  }, [setSocket]);

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
            } else {
              setLinkState(message.data.google.link);
            }
            if (message.data.github["is_login"])
              setGitAuthenticationState(true);
            break;
          case "login":
            setAuthenticationState(true);
            break;
          case "github/qr":
            setLinkState(message.data.link);
            break;
          case "github/login":
            setGitAuthenticationState(true);
            break;
          case "calendar":
            setPlanState(message.data);
            console.log("planState updated!");
            break;
          case "github/noti":
            setNotiState([...noti, ...message.data]);
            setNotiModalState(true);
            console.log("notiState updated!");
            break;
          case "log/water/stat":
            setStatisticsState({ water: message.data });
            //setStatisticsState(message.data.reverse());
            break;
          case "log/water/today":
            setDrinkedState(message.data);
            break;
          case "log/posture/today":
            break;
          case "stretching":
            setStretchModalState(true);
            break;
          case "water":
            setWaterModalState(true);
            setDrinkedState([...drinked, message.data]);
            break;
          case "posture":
            setPostureModalState(true);
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
    noti,
    setAuthenticationState,
    setGitAuthenticationState,
    setLinkState,
    setStatisticsState,
    setWaterModalState,
    setPostureModalState,
    setStretchModalState,
    setNotiModalState,
    drinked,
    setDrinkedState,
  ]);
};

export { Subscriber };
