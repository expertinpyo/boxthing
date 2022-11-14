/** @jsxImportSource @emotion/react */

import ReactECharts from "echarts-for-react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { socketState } from "../../store/socket";
import { drinkedHistoryState } from "../../store/water";

const WaterDailyGraph = () => {
  const drinkedHistory = useRecoilValue(drinkedHistoryState);

  const socket = useRecoilValue(socketState);
  useEffect(() => {
    if (socket && socket.readyState === 1) {
      socket.send(JSON.stringify({ type: "log/water/today", data: null }));
      console.log("send log/water/today message to server!");
    }
  }, [socket]);

  const option = {
    title: {
      text: "오늘의 음수",
    },
    grid: {
      top: "10%",
      left: "5%",
      right: "5%",
      bottom: "5%",
    },
    xAxis: {
      boundaryGap: true,
      data: drinkedHistory.map((item) => {
        return item.when;
      }),
    },
    yAxis: {
      splitLine: {
        show: false,
      },
      type: "value",
      scale: true,
      max: 1500,
      min: 0,
    },
    series: {
      symbol: "none",
      name: "누적 음수량",
      type: "line",
      smooth: 0.5,
      data: drinkedHistory.map((item) => {
        return item.value;
      }),
      markLine: {
        silent: true,
        lineStyle: {
          color: "#333",
        },
        data: [
          {
            yAxis: 1300,
          },
        ],
      },
    },
  };
  return <ReactECharts option={option} style={{ height: "100%" }} />;
};

export default WaterDailyGraph;
