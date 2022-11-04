/** @jsxImportSource @emotion/react */

import ReactECharts from "echarts-for-react"

const WaterDailyGraph = () => {
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
      data: [
        "8-9",
        "9-10",
        "10-11",
        "11-12",
        "12-13",
        "13-14",
        "14-15",
        "15-16",
        "16-17",
        "17-18",
        "18-19",
        "19-20",
      ],
    },
    yAxis: {
      splitLine: {
        show: false,
      },
    },
    series: {
      symbol: "none",
      name: "누적 음수량",
      type: "line",
      smooth: 0.5,
      data: [100, 300, 500, 1300],
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
  }
  return <ReactECharts option={option} style={{ height: "100%" }} />
}

export default WaterDailyGraph
