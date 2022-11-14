/** @jsxImportSource @emotion/react */

import ReactECharts from "echarts-for-react";
// import cloneDeep from "lodash.clonedeep";
import { useRecoilValue } from "recoil";
import { postureState } from "../../store/posture";
// import { sample_data } from "./sampleData";
import moment from "moment";

const PostureLineGraph = ({ data }) => {
  const DEFAULT_OPTION = {
    title: {
      text: "자세 데이터 통계 분석",
    },
    tooltip: {
      trigger: "axis",
    },
    grid: {
      top: "10%",
      left: "5%",
      right: "5%",
      bottom: "5%",
    },
    xAxis: {
      type: "time",
    },
    yAxis: {
      splitLine: {
        show: false,
      },
    },
    visualMap: [
      {
        pieces: [
          {
            gt: 1,
            lte: 70,
            color: "red",
          },
          {
            gt: 70,
            lte: 100,
            color: "green",
          },
          {
            gt: 1,
            lt: 4,
            color: "rgba(0, 0, 180, 0.4)",
          },
        ],
        show: false,
        outOfRange: {
          color: "transparent",
        },
      },
    ],
    series: {
      symbol: "none",
      name: "자세 점수",
      type: "line",
      smooth: true,
      animationEasing: "elasticOut",
      // animationDelay: function (idx) {
      //   return idx * 10;
      // },
      // animationDelayUpdate: function (idx) {
      //   return idx * 10;
      // },
      data:
        data.length !== 0 &&
        data.map((item) => {
          return [
            moment(item.timestamp) - 0,
            item["posture_score"] === 0 ? null : item["posture_score"],
          ];
        }),
      markLine: {
        silent: true,
        lineStyle: {
          color: "#333",
        },
        data: [
          {
            yAxis: 70,
          },
        ],
      },
    },
  };

  return <ReactECharts option={DEFAULT_OPTION} style={{ height: "100%" }} />;
};

export default PostureLineGraph;
