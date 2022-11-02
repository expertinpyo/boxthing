/** @jsxImportSource @emotion/react */

import ReactECharts from "echarts-for-react"

const WaterDailyGraph = () => {
  const option = {
    title: {
      text: "오늘의 음수",
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
    series: [
      {
        name: "销量",
        type: "line",
        data: [5, 0, 2],
      },
    ],
  }
  return <ReactECharts option={option} style={{ height: "100%" }} />
}

export default WaterDailyGraph
