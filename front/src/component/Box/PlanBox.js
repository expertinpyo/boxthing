/** @jsxImportSource @emotion/react */
import { defaultBoxStyle } from "../../style/shared";
import { useRecoilValue } from "recoil";
import {
  upcomingPlanState,
  inProgressPlanState,
  filterPastPlanState,
} from "../../store/plan";
import PlanUpcoming from "../Plan/PlanUpcoming";
import PlanInProgress from "../Plan/PlanInProgress";
import PlanListItem from "../Plan/PlanListItem";

import { motion } from "framer-motion";

function PlanBox({ key }) {
  const plan = useRecoilValue(filterPastPlanState);
  const upcomingPlan = useRecoilValue(upcomingPlanState);
  const inProgressPlan = useRecoilValue(inProgressPlanState);

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
          {plan.length !== 0 ? (
            plan.map((item) => {
              return upcomingPlan.some(
                (upcoming) => upcoming.id === item.id
              ) ? (
                <PlanListItem key={item.id} item={item} type={"upcoming"} />
              ) : inProgressPlan.some((progress) => progress.id === item.id) ? (
                <PlanListItem key={item.id} item={item} type={"inprogress"} />
              ) : (
                <PlanListItem key={item.id} item={item} />
              );
            })
          ) : (
            <div
              css={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                fontSize: 24,
              }}
            >
              <div css={{ marginBottom: 8, marginRight: "40%" }}>
                오늘의 일정을
              </div>
              <div css={{ fontSize: 48, fontWeight: "bold", marginBottom: 8 }}>
                <span css={{ color: "#4285F4" }}>G</span>
                <span css={{ color: "#DB4437" }}>o</span>
                <span css={{ color: "#F4B400" }}>o</span>
                <span css={{ color: "#4285F4" }}>g</span>
                <span css={{ color: "#0F9D58" }}>l</span>
                <span css={{ color: "#DB4437" }}>e</span>
                <span css={{ color: "#DB4437" }}> </span>
                <span css={{ color: "#4285F4" }}>C</span>
                <span css={{ color: "#F4B400" }}>a</span>
                <span css={{ color: "#DB4437" }}>l</span>
                <span css={{ color: "#0F9D58" }}>e</span>
                <span css={{ color: "#F4B400" }}>n</span>
                <span css={{ color: "#DB4437" }}>d</span>
                <span css={{ color: "#0F9D58" }}>a</span>
                <span css={{ color: "#4285F4" }}>r</span>

                <span css={{ fontSize: 24, fontWeight: "normal" }}>에</span>
              </div>
              <div css={{ marginLeft: "40%" }}>추가해보세요!</div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default PlanBox;
