/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import PlanListItem from "../Plan/PlanListItem"
import { planState } from "../../App"
import { useRecoilValue } from "recoil"

function PlanContent() {
  const planList = useRecoilValue(planState)
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
        {planList.map((item, index) => {
          return (
            <PlanListItem
              key={index}
              isActive={item.isActive}
              item={item.item}
            ></PlanListItem>
          )
        })}
      </div>
    </div>
  )
}

export default PlanContent
