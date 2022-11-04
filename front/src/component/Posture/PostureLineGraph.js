/** @jsxImportSource @emotion/react */

import ReactECharts from "echarts-for-react"
import cloneDeep from "lodash.clonedeep"
import { sample_data } from "./sampleData"

const PostureLineGraph = () => {
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
      data: sample_data.map((item) => {
        return item[0]
      }),
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
            gt: 0,
            lte: 80,
            color: "red",
          },
          {
            gt: 80,
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
      smooth: 0.5,
      data: sample_data.map((item) => {
        if (item[1] > 100) return item[1] % 100
        else return item[1]
      }),
      markLine: {
        silent: true,
        lineStyle: {
          color: "#333",
        },
        data: [
          {
            yAxis: 80,
          },
        ],
      },
    },
  }

  return <ReactECharts option={DEFAULT_OPTION} style={{ height: "100%" }} />
}

export default PostureLineGraph
