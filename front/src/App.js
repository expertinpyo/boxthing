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
import { captureModalState, postureModalState } from "./store/modal";

import { useNavigate } from "react-router-dom";
import { runtimePostureState } from "./store/posture";

function App() {
  const setCurrentTime = useSetRecoilState(timerState);

  const weather = useRecoilValue(weatherVideoState);
  const setWeather = useSetRecoilState(weatherState);

  const authenticated = useRecoilValue(authenticationState);

  const captureModal = useRecoilValue(captureModalState);
  const [pmodalState, setter] = useRecoilState(postureModalState);
  const runtime = useRecoilValue(runtimePostureState);
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
    if (!pmodalState && runtime.length >= 5) {
      const copy = [...runtime];
      const temp = copy.splice(runtime.length - 5).every((item) => {
        const result = item["posture_flag"];
        return (
          result &&
          (Number.parseInt(result) === 2 || Number.parseInt(result) === 3)
        );
      });
      if (temp) setter(true);
    }
  }, [runtime, pmodalState, setter]);

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
