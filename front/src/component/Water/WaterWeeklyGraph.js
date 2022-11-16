/** @jsxImportSource @emotion/react */

import ReactECharts from "echarts-for-react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { socketState } from "../../store/socket";
import { statisticsState } from "../../store/statistics";

const WaterWeeklyGraph = () => {
  const statistics = useRecoilValue(statisticsState);

  const socket = useRecoilValue(socketState);
  useEffect(() => {
    if (socket && socket.readyState === 1) {
      socket.send(JSON.stringify({ type: "log/water/stat", data: null }));
      console.log("send log/water/stat message to server!");
    }
  }, [socket]);

  const option = {
    title: {
      text: "15일간 음수 히스토리",
    },
    grid: {
      top: "10%",
      left: "5%",
      right: "5%",
      bottom: "5%",
    },
    xAxis: {
      boundaryGap: true,
      data: statistics.water
        .map((item) => {
          return Object.keys(item);
        })
        .map((item) => {
          return item[0].substring(5);
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
    series: [
      {
        name: "총 음수량",
        type: "bar",
        data: statistics.water
          .map((item) => {
            return Object.values(item);
          })
          .map((item) => {
            return Number.parseInt(item[0]);
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
    ],
  };
  return <ReactECharts option={option} style={{ height: "100%" }} />;
};

export default WaterWeeklyGraph;
