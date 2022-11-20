/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { reachState } from "../../store/water";
import "./Water.css";

const WaterSVG = () => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      style={{ display: "none" }}
    >
      <symbol id="wave">
        <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"></path>
        <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"></path>
        <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"></path>
        <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"></path>
      </symbol>
    </svg>
  );
};

const Water = ({
  size = { boxwidth: "200px", boxheight: "200px" },
  opacity = "0.5",
  wrapperposition = "absolute",
  text = 80,
}) => {
  const reach = useRecoilValue(reachState);

  return (
    <div
      css={{
        width: "100%",
        height: "100%",
        position: wrapperposition,
        opacity: opacity,
      }}
    >
      <WaterSVG />
      <div
        className="box"
        css={{ width: size.boxwidth, height: size.boxheight }}
      >
        <div className="percent">
          <div className="percentNum" id="count" css={{ fontSize: text }}>
            {reach}
          </div>
          <div className="percentB" css={{ fontSize: text }}>
            %
          </div>
        </div>
        <div
          id="water"
          className="water"
          style={{
            transform: `translate(0, ${100 - (reach <= 100 ? reach : 100)}%)`,
          }}
        >
          <svg viewBox="0 0 560 20" className="water_wave water_wave_back">
            <use xlinkHref="#wave"></use>
          </svg>
          <svg viewBox="0 0 560 20" className="water_wave water_wave_front">
            <use xlinkHref="#wave"></use>
          </svg>
        </div>
      </div>
    </div>
  );
};

const WaterAnimation = () => {
  const [current, setCurrent] = useState(0);
  const reach = useRecoilValue(reachState);

  useEffect(() => {
    if (current < reach) {
      setTimeout(() => {
        setCurrent((current) => current + 1);
      }, 60);
    }
  }, [current, setCurrent, reach]);

  return (
    <div css={{ width: 250, height: 250, position: "relative" }}>
      <WaterSVG />
      <div className="box">
        <div className="percent">
          <div className="percentNum" id="_count">
            {current}
          </div>
          <div className="percentB">%</div>
        </div>
        <div
          id="_water"
          className="water"
          style={{
            transform: `translate(0, ${
              100 - (current <= 100 ? current : 100)
            }%)`,
          }}
        >
          <svg viewBox="0 0 560 20" className="water_wave water_wave_back">
            <use xlinkHref="#wave"></use>
          </svg>
          <svg viewBox="0 0 560 20" className="water_wave water_wave_front">
            <use xlinkHref="#wave"></use>
          </svg>
        </div>
      </div>
    </div>
  );
};

export { Water, WaterAnimation };
