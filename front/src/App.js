/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import "./App.css";
import { useSetRecoilState, useRecoilValue } from "recoil";
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

function App() {
  const setCurrentTime = useSetRecoilState(timerState);

  const weather = useRecoilValue(weatherVideoState);
  const setWeather = useSetRecoilState(weatherState);

  const authenticated = useRecoilValue(authenticationState);

  const handleResize = () => {
    const vh = window.innerHeight;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    let timer = setInterval(() => {
      setCurrentTime(new Date());
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
  });

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
