/** @jsxImportSource @emotion/react */

import { useRecoilValue } from "recoil";
import Break from "../../asset/plan/Break.gif";
import { upcomingPlanTimerState } from "../../store/plan";
import Ready from "../../asset/ready.gif";

const PlanUpcoming = ({ item }) => {
  const upcomingPlanTimer = useRecoilValue(upcomingPlanTimerState);

  return (
    <div
      css={{
        width: "100%",
        height: "100%",
        padding: 16,
      }}
    >
      {item.length !== 0 ? (
        <div
          css={{
            width: "100%",
            height: " 100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            position: "relative",
          }}
        >
          <div css={{ fontSize: 14, color: "var(--font-sub-color)" }}>
            임박한 일정
          </div>
          <div
            css={{
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              opacity: 0.6,
              zIndex: -1,
            }}
          >
            <img
              src={Ready}
              alt="Ready"
              css={{ height: "100%", aspectRatio: "1/1", borderRadius: 16 }}
            />
          </div>
          <div
            css={{
              width: "100%",
              fontSize: 44,
              fontWeight: "bold",
              color: upcomingPlanTimer[1] ? "red" : "black",
            }}
          >
            {upcomingPlanTimer[0]}
          </div>

          <div css={{ width: "100%" }}>
            <div
              css={{
                fontSize: "1.5rem",
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item[0].summary}
            </div>
            <div
              css={{
                fontSize: "1rem",
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item[0].description}
            </div>
          </div>
        </div>
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
