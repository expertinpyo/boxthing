/** @jsxImportSource @emotion/react */
import { defaultBoxStyle } from "../../style/shared";
import { useRecoilValue } from "recoil";
import {
  planState,
  upcomingPlanState,
  inProgressPlanState,
} from "../../store/plan";
import PlanUpcoming from "../Plan/PlanUpcoming";
import PlanInProgress from "../Plan/PlanInProgress";
import PlanListItem from "../Plan/PlanListItem";

import { motion } from "framer-motion";

function PlanBox({ key }) {
  const plan = useRecoilValue(planState);
  const upcomingPlan = useRecoilValue(upcomingPlanState);
  const inProgressPlan = useRecoilValue(inProgressPlanState);

  // console.log("planList", plan)
  // console.log("upcoming", upcomingPlan)
  // console.log("inProgress", inProgressPlan)
  return (
    <motion.div
      key={key}
      css={{
        ...defaultBoxStyle,
        width: "100%",
        height: "100%",
        padding: 16,
        borderRadius: "16px 16px 0px 0px",
      }}
      initial={{ transform: "translateY(100%)", opacity: 0 }}
      animate={{ transform: "translateY(0%)", opacity: 1 }}
      exit={{ transform: "translateY(100%)", opacity: 0 }}
      transition={{ duration: 0.5, ease: "circOut" }}
    >
      <div
        css={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 3 }}
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
            return <PlanListItem key={item.id} item={item} />;
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default PlanBox;
