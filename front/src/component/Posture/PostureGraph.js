/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from "react"
import ReactECharts from "echarts-for-react"
import cloneDeep from "lodash.clonedeep"

const PostureGraph = () => {
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
    visualMap: {
      show: false,
      min: 0,
      max: 100,
      color: [
        "#BE002F",
        "#F20C00",
        "#F00056",
        "#FF2D51",
        "#FF2121",
        "#FF4C00",
        "#FF7500",
        "#FF8936",
        "#FFA400",
        "#F0C239",
        "#FFF143",
        "#FAFF72",
        "#C9DD22",
        "#AFDD22",
        "#9ED900",
        "#00E500",
        "#0EB83A",
        "#0AA344",
        "#0C8918",
        "#057748",
        "#177CB0",
      ].reverse(),
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: (function () {
          let now = new Date()
          let res = []
          let len = 50
          while (len--) {
            res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""))
            now = new Date(now - 1000) // 3초 주기
          }
          return res
        })(),
      },
    ],
    yAxis: [
      {
        type: "value",
        scale: true,
        max: 100,
        min: 0,
      },
    ],
    series: [
      {
        name: "측정값",
        type: "bar",
        xAxisIndex: 0,
        yAxisIndex: 0,
        itemStyle: {
          normal: {
            barBorderRadius: 2,
          },
        },
        animationEasing: "elasticOut",
        animationDelay: function (idx) {
          return idx * 10
        },
        animationDelayUpdate: function (idx) {
          return idx * 10
        },
        data: (function () {
          let res = []
          let len = 50
          while (len--) {
            res.push(Math.round(Math.random() * 100))
          }
          return res
        })(),
      },
    ],
  }

  const [option, setOption] = useState(DEFAULT_OPTION)

  function fetchNewData() {
    const axisData = new Date().toLocaleTimeString().replace(/^\D*/, "")
    const newOption = cloneDeep(option) // immutable
    const data0 = newOption.series[0].data
    data0.shift()
    data0.push(Math.round(Math.random() * 100))

    newOption.xAxis[0].data.shift()
    newOption.xAxis[0].data.push(axisData)

    setOption(newOption)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      fetchNewData()
    }, 1000)

    return () => clearInterval(timer)
  })

  return <ReactECharts option={option} style={{ height: "100%" }} />
}

export default PostureGraph
