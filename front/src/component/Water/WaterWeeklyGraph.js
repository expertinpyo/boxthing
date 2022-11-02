/** @jsxImportSource @emotion/react */

import ReactECharts from "echarts-for-react"

const WaterWeeklyGraph = () => {
  const option = {
    title: {
      text: "15일간 음수 히스토리",
    },
    xAxis: {
      data: ["10", "11", "12", "13", "14", "15", "16", "17", "18", "19"],
    },
    yAxis: {
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 0, 2, 1, 3, 2, 5, 7, 8, 9],
      },
    ],
  }
  return <ReactECharts option={option} style={{ height: "100%" }} />
}

export default WaterWeeklyGraph
