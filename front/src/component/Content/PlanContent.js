/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import PlanListItem from "../Plan/PlanListItem"
import { planListState, timeState } from "../../App"
import { selector, useRecoilValue } from "recoil"

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

function PlanContent() {
  const planList = useRecoilValue(planListState)
  const upcomingPlanList = useRecoilValue(upcomingPlanListState)
  const inProgressPlanList = useRecoilValue(inProgressPlanListState)

  return (
    <div
      css={css`
        width: 100%;
        height: 80%;
        // padding-left: 6.25%;
        // padding-right: 6.25%;
      `}
    >
      <div
        css={css`
          width: 100%;
          height: 100%;
          border-radius: 16px 16px 0px 0px;
          background: white;
          padding: 16px;
          display: flex;
          justify-content: flex-start;
          flex-direction: column;
        `}
      >
        {planList.map((item) => {
          return <PlanListItem key={item.id} item={item}></PlanListItem>
        })}
      </div>
    </div>
  )
}

export default PlanContent
