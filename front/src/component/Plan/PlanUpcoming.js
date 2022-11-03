/** @jsxImportSource @emotion/react */

import { useRecoilValue } from "recoil"
import Break from "../../asset/plan/Break.gif"
import { upcomingPlanTimerState } from "../../store/plan"

const PlanUpcoming = ({ item }) => {
  const upcomingPlanTimer = useRecoilValue(upcomingPlanTimerState)
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
          <div css={{ fontSize: 12, color: "var(--font-sub-color)" }}>
            임박한 일정
          </div>
          <div
            css={{
              width: "100%",
              fontSize: 32,
              fontWeight: "bold",
              color: upcomingPlanTimer[1] ? "red" : "black",
            }}
          >
            {upcomingPlanTimer[0]}
          </div>

          <div>
            <div css={{ fontSize: 20 }}>{item[0].summary}</div>
            <div css={{ fontSize: 12 }}>{item[0].description}</div>
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
  )
}

export default PlanUpcoming
