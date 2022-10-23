/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import PlanListItem from "../Plan/PlanListItem";

function PlanContent() {
  const array = [
    {
      isActive: true,
      item: {
        title: "즐거운 점심 시간",
        subtitle: "순두부 짬뽕 or 날치알 비빔밥",
        time: "11:30 - 12:30 AM",
      },
    },
    {
      isActive: false,
      item: {
        title: "기능 회의",
        subtitle: "기능 상세 회의",
        time: "12:30 - 2:30 PM",
      },
    },
    {
      isActive: false,
      item: {
        title: "사전학습 및 자료조사",
        subtitle: "HW 센서 및 API 조사",
        time: "2:30 - 5:30 PM",
      },
    },
  ];
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
        {array.map((item, index) => {
          return (
            <PlanListItem
              key={index}
              isActive={item.isActive}
              item={item.item}
            ></PlanListItem>
          );
        })}
      </div>
    </div>
  );
}

export default PlanContent;
