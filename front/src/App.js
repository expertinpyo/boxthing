/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import "./App.css";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { timerState } from "./store/timer";
import Layout from "./layout/Layout";

import { apiKey } from "./component/API/Weather";

import { AnimatePresence } from "framer-motion";

import { loginState } from "./store/nav";

// import modals
import PostureModal from "./component/Modal/PostureModal";
import WaterModal from "./component/Modal/WaterModal";
import StretchingModal from "./component/Modal/StretchingModal";

import Welcome from "./layout/Welcome";

import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { weatherState, weatherVideoState } from "./store/weather";
import axios from "axios";
import PlanModal from "./component/Modal/PlanModal";
import NotiModal from "./component/Modal/NotiModal";
import { drinkedState } from "./store/water";

function App() {
  //test
  const drinkMoreWater = useSetRecoilState(drinkedState);

  const setCurrentTime = useSetRecoilState(timerState);

  const weather = useRecoilValue(weatherVideoState);
  const setWeather = useSetRecoilState(weatherState);

  const login = useRecoilValue(loginState);

  const handleResize = () => {
    const vh = window.innerHeight;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  const [stretchModalVisible, setStretchModalVisible] = useState(false);
  const [planModalVisible, setPlanModalVisible] = useState(false);
  const [notiModalVisible, setNotiModalVisible] = useState(false);
  const [postureModalVisible, setPostureModalVisible] = useState(false);
  const [waterModalVisible, setWaterModalVisible] = useState(false);

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
          .catch((error) => "Clear");
      },
      () => {
        console.log("Unable to retrieve your location");
      }
    );
  });

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {login ? <Layout key="logined" /> : <Welcome key="not-logined" />}
      </AnimatePresence>
      <StretchingModal
        state={stretchModalVisible}
        setter={setStretchModalVisible}
      />
      <NotiModal state={notiModalVisible} setter={setNotiModalVisible} />
      <WaterModal state={waterModalVisible} setter={setWaterModalVisible} />

      <PlanModal state={planModalVisible} setter={setPlanModalVisible} />
      <PostureModal
        state={postureModalVisible}
        setter={setPostureModalVisible}
      />
      <ToastContainer />

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
      <div>
        <button
          onClick={() => {
            setStretchModalVisible(true);
          }}
        >
          스트레칭
        </button>
        <button
          onClick={() => {
            setPostureModalVisible(true);
          }}
        >
          자세
        </button>
        <button
          onClick={() => {
            setWaterModalVisible(true);
            drinkMoreWater((pre) => pre + 200);
          }}
        >
          물
        </button>
        <button
          onClick={() => {
            setNotiModalVisible(true);
          }}
        >
          노티
        </button>
        <button
          onClick={() => {
            setPlanModalVisible(true);
          }}
        >
          계획
        </button>
      </div>
    </div>
  );
}

export { App };
