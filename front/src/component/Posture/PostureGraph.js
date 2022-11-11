/** @jsxImportSource @emotion/react */

// import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
// import cloneDeep from "lodash.clonedeep";
import moment from "moment";
const PostureGraph = ({ data }) => {
  const DEFAULT_OPTION = {
    title: {
      text: "실시간 자세 분석 그래프",
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
    xAxis: {
      type: "time",
    },
    yAxis: {
      type: "value",
      scale: true,
      max: 100,
      min: 0,
    },
    series: {
      name: "측정값",
      type: "bar",
      xAxisIndex: 0,
      yAxisIndex: 0,
      itemStyle: {
        normal: {
          barBorderRadius: 4,
        },
      },
      animationEasing: "elasticOut",
      animationDelay: function (idx) {
        return idx * 10;
      },
      animationDelayUpdate: function (idx) {
        return idx * 10;
      },
      data: data.map((item) => {
        return [
          moment(item.timestamp) - 0,
          item["posture_score"] === 0 ? null : item["posture_score"],
        ];
      }),
    },
  };

  return <ReactECharts option={DEFAULT_OPTION} style={{ height: "100%" }} />;
};

export default PostureGraph;
