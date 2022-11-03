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
        name: "총 음수량",
        type: "bar",
        data: [1200, 1300, 1350, 2000, 1300, 1400],
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
  }
  return <ReactECharts option={option} style={{ height: "100%" }} />
}

export default WaterWeeklyGraph
