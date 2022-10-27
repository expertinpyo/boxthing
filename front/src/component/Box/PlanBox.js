/** @jsxImportSource @emotion/react */
import { defaultBoxStyle } from "../../style/shared"
import { useRecoilValue } from "recoil"
import {
  planState,
  upcomingPlanState,
  inProgressPlanState,
} from "../../store/plan"
import PlanUpcoming from "../Plan/PlanUpcoming"
import PlanInProgress from "../Plan/PlanInProgress"
import PlanListItem from "../Plan/PlanListItem"

function PlanBox() {
  const plan = useRecoilValue(planState)
  const upcomingPlan = useRecoilValue(upcomingPlanState)
  const inProgressPlan = useRecoilValue(inProgressPlanState)

  // console.log("planList", plan)
  // console.log("upcoming", upcomingPlan)
  // console.log("inProgress", inProgressPlan)
  return (
    <div
      css={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        css={{
          width: "29%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div css={{ ...defaultBoxStyle, width: "100%", height: "48%" }}>
          <PlanUpcoming item={upcomingPlan} />
        </div>
        <div css={{ ...defaultBoxStyle, width: "100%", height: "48%" }}>
          <PlanInProgress item={inProgressPlan} />
        </div>
      </div>
      <div css={{ width: "69%", height: "100%" }}>
        {plan.map((item) => {
          return <PlanListItem key={item.id} item={item} />
        })}
      </div>
    </div>
  )
}

export default PlanBox
