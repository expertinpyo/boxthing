/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import "./App.css";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { timerState } from "./store/timer";
import Layout from "./layout/Layout";

import { apiKey } from "./component/API/Weather";

import { AnimatePresence } from "framer-motion";

import { authenticationState } from "./store/auth";

// import modals
import WaterModal from "./component/Modal/WaterModal";
import StretchingModal from "./component/Modal/StretchingModal";

import Welcome from "./layout/Welcome";

import "react-toastify/dist/ReactToastify.css";

import { weatherState, weatherVideoState } from "./store/weather";
import axios from "axios";
import PlanModal from "./component/Modal/PlanModal";
import NotiModal from "./component/Modal/NotiModal";

import { Subscriber } from "./shared/WebSocket";
import WelcomeModal from "./component/Modal/WelcomeModal";

import moment from "moment";
import CaptureModal from "./component/Modal/CaptureModal";
import {
  captureModalState,
  neckPainModalState,
  notiModalState,
  planModalState,
} from "./store/modal";

import { postureState } from "./store/posture";
import CaptureBadModal from "./component/Modal/CaptureBadModal";
import CaptureStartModal from "./component/Modal/CaptureStartModal";
import CaptureGoodModal from "./component/Modal/CaptureGoodModal";
import NeckPainModal from "./component/Modal/NeckPainModal";
import MicModal from "./component/Modal/MicModal";
import NoOrderModal from "./component/Modal/NoOrderModal";
import { upcomingPlanState } from "./store/plan";
import { unreadNotiState } from "./store/noti";
import { useNavigate } from "react-router-dom";
import OrderModal from "./component/Modal/OrderModal";
import OrderSecondModal from "./component/Modal/OrderSecondModal";

function App() {
  const setCurrentTime = useSetRecoilState(timerState);

  const weather = useRecoilValue(weatherVideoState);
  const setWeather = useSetRecoilState(weatherState);

  const authenticated = useRecoilValue(authenticationState);

  const captureModal = useRecoilValue(captureModalState);
  const [neckModal, setNeckModal] = useRecoilState(neckPainModalState);
  const [runtime, setRuntime] = useRecoilState(postureState);
  const upcomingPlan = useRecoilValue(upcomingPlanState);
  const setPlanModal = useSetRecoilState(planModalState);
  const unreadNoti = useRecoilValue(unreadNotiState);
  const setGitModal = useSetRecoilState(notiModalState);

  const [upcomingCount, setUpcomingCount] = useState(0);
  const [unreadNotiCount, setUnreadNotiCount] = useState(0);

  const navi = useNavigate();

  const handleResize = () => {
    const vh = window.innerHeight;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    let timer = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    // toast("캘린더가 업데이트 되었습니다!", {
    //   position: toast.POSITION.BOTTOM_RIGHT,
    // })
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(timer);
    };
  }, [setCurrentTime, setWeather]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`,
            {}
          )
          .then((response) => {
            setWeather(response.data.weather[0].id);
          })
          .catch((error) => console.log(error));
      },
      () => {
        console.log("Unable to retrieve your location");
      }
    );
  }, []);

  useEffect(() => {
    if (runtime) {
      const copy = [...runtime];
      const cut = copy.splice(runtime.length - 5);
      if (!neckModal && runtime.length >= 5) {
        const neck = cut.every((item) => {
          const result = item["posture_flag"];
          return result && Number.parseInt(result) === 2;
        });

        if (neck) setNeckModal(true);
      }
    } else {
      setRuntime([]);
    }
  }, [runtime, neckModal, setNeckModal, setRuntime]);

  useEffect(() => {
    if (upcomingPlan.length !== upcomingCount) {
      if (upcomingPlan.length > 0) {
        setPlanModal(true);
        navi("/");
      }
      setUpcomingCount(upcomingPlan.length);
    }
  }, [upcomingPlan, setPlanModal, upcomingCount, setUpcomingCount, navi]);

  useEffect(() => {
    if (unreadNoti.length !== unreadNotiCount) {
      if (unreadNoti.length > 0) {
        setGitModal(true);
        navi("/git");
      }
      setUnreadNotiCount(unreadNoti.length);
    }
  }, [unreadNoti, setGitModal, unreadNotiCount, setUnreadNotiCount, navi]);

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {authenticated ? (
          <Layout key="authenticated" />
        ) : (
          <Welcome key="nonAuthenticated" />
        )}
      </AnimatePresence>
      <StretchingModal />
      <NotiModal />
      <WaterModal />
      <PlanModal />
      <WelcomeModal />
      <CaptureBadModal />
      <CaptureStartModal />
      <CaptureGoodModal />
      <NeckPainModal />
      <MicModal />
      <NoOrderModal />
      <OrderModal />
      <OrderSecondModal />
      <AnimatePresence mode="wait">
        {captureModal ? <CaptureModal /> : false}
      </AnimatePresence>
      <div className="video-container">
        <video
          autoPlay
          muted
          loop
          id="myVideo"
          // style={{ height: "100%", width: "100%", objectFit: "cover" }}
        >
          <source src={weather} type="video/mp4" />
        </video>
      </div>
      <Subscriber />
    </div>
  );
}

export { App };
