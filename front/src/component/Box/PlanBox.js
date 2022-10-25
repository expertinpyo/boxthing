/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useRecoilValue, selector } from "recoil"
import { planListState, timeState } from "../../App"

const upcomingPlanListState = selector({
  key: "upcomingPlanList",
  get: ({ get }) => {
    const list = get(planListState)
    const currentTime = get(timeState)

    return list.filter((item) => {
      const temp = new Date(item.start.dateTime) - currentTime
      return temp < 1000 * 60 * 20 && temp > 0 ? true : false
    })
  },
})

const inProgressPlanListState = selector({
  key: "inProgressPlanListState",
  get: ({ get }) => {
    const list = get(planListState)
    const currentTime = get(timeState)

    return list.filter((item) => {
      return currentTime - new Date(item.start.dateTime) >= 0 &&
        currentTime - new Date(item.end.dateTime) < 0
        ? true
        : false
    })
  },
})

function PlanBox() {
  const planList = useRecoilValue(planListState)
  const upcomingPlanList = useRecoilValue(upcomingPlanListState)
  const inProgressPlanList = useRecoilValue(inProgressPlanListState)

  console.log("planList", planList)
  console.log("upcoming", upcomingPlanList)
  console.log("inProgress", inProgressPlanList)
  return <div></div>
}

export default PlanBox
