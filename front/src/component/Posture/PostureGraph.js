/** @jsxImportSource @emotion/react */

// import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
// import cloneDeep from "lodash.clonedeep";
import moment from "moment";
import { useEffect, useState } from "react";
const PostureGraph = ({ data }) => {
  const [runtime, setRuntime] = useState([]);

  useEffect(() => {
    if (data.length !== 0) {
      setRuntime((old) => [...old, data[data.length - 1]]);
    }
  }, [data, setRuntime]);

  useEffect(() => {
    setRuntime([]);

    return () => {
      setRuntime([]);
    };
  }, []);

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
      splitLine: {
        show: false,
      },
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
      data:
        runtime.length !== 0 &&
        runtime.map((item) => {
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

export default PostureGraph;
