/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Break from "../../asset/plan/Break.gif";
import { planModalState } from "../../store/modal";
import { upcomingPlanTimerState } from "../../store/plan";

const PlanUpcoming = ({ item }) => {
  const upcomingPlanTimer = useRecoilValue(upcomingPlanTimerState);
  const [current, setCurrent] = useState(0);
  const setPlanModal = useSetRecoilState(planModalState);

  useEffect(() => {
    if (item.length > current) {
      setPlanModal(true);
      setCurrent(item.length);
    } else {
      setCurrent(item.length);
    }
  }, [item, setPlanModal, current]);
  return (
    <div
      css={{
        width: "100%",
        height: "100%",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      {item.length !== 0 ? (
        <>
          <div css={{ fontSize: 14, color: "var(--font-sub-color)" }}>
            임박한 일정
          </div>
          <div
            css={{
              width: "100%",
              fontSize: 48,
              fontWeight: "bold",
              color: upcomingPlanTimer[1] ? "red" : "black",
            }}
          >
            {upcomingPlanTimer[0]}
          </div>

          <div>
            <div css={{ fontSize: "1.5rem" }}>{item[0].summary}</div>
            <div css={{ fontSize: "1rem" }}>{item[0].description}</div>
          </div>
        </>
      ) : (
        <div
          css={{
            width: "100%",
            height: "100%",
            lineHeight: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={Break}
            alt="Break"
            css={{ height: "100%", aspectRatio: "1/1", borderRadius: 16 }}
          />
        </div>
      )}
    </div>
  );
};

export default PlanUpcoming;
