/** @jsxImportSource @emotion/react */

import { useEffect } from "react";
import "./App.css";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { timerState } from "./store/timer";
import Layout from "./layout/Layout";

import { apiKey } from "./component/API/Weather";

import { AnimatePresence } from "framer-motion";

import { authenticationState } from "./store/auth";

// import modals
import PostureModal from "./component/Modal/PostureModal";
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
import PhotoModal from "./component/Modal/PhotoModal";

import moment from "moment";
import CaptureModal from "./component/Modal/CaptureModal";
import {
  captureModalState,
  neckPainModalState,
  postureModalState,
  spinePainModalState,
} from "./store/modal";

import { runtimePostureState } from "./store/posture";
import CaptureBadModal from "./component/Modal/CaptureBadModal";
import CaptureStartModal from "./component/Modal/CaptureStartModal";
import CaptureGoodModal from "./component/Modal/CaptureGoodModal";
import NeckPainModal from "./component/Modal/NeckPainModal";
import SpinePainModal from "./component/Modal/SpinePainModal";

function App() {
  const setCurrentTime = useSetRecoilState(timerState);

  const weather = useRecoilValue(weatherVideoState);
  const setWeather = useSetRecoilState(weatherState);

  const authenticated = useRecoilValue(authenticationState);

  const captureModal = useRecoilValue(captureModalState);
  const [neckModal, setNeckModal] = useRecoilState(neckPainModalState);
  const [spineModal, setSpineModal] = useRecoilState(spinePainModalState);
  const runtime = useRecoilValue(runtimePostureState);

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
    const copy = [...runtime];
    const cut = copy.splice(runtime.length - 5);
    if (!neckModal && runtime.length >= 5) {
      const neck = cut.every((item) => {
        const result = item["posture_flag"];
        return result && Number.parseInt(result) === 2;
      });

      if (neck) setNeckModal(true);
    }
    if (!spineModal && runtime.length >= 5) {
      const spine = cut.every((item) => {
        const result = item["posture_flag"];
        return result && Number.parseInt(result) === 3;
      });

      if (spine) setSpineModal(true);
    }
  }, [runtime, neckModal, setNeckModal, spineModal, setSpineModal]);

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
      <PostureModal />
      <WelcomeModal />
      <PhotoModal />
      <CaptureBadModal />
      <CaptureStartModal />
      <CaptureGoodModal />
      <NeckPainModal />
      <SpinePainModal />
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