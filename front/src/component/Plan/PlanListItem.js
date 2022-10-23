/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

const basicFontStyle = {
  fontSize: "1.5rem",
  fontWeight: "bold",
};

const activeFontStyle = {
  color: "white",
};

const basicItemStyle = {
  width: "100%",
  height: "20%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "16px",
  padding: "16px",
};
const activeItemStyle = {
  background: "var(--main-gradient-color)",
};

function PlanListItem({ isActive, item }) {
  return (
    <div css={{ ...basicItemStyle, ...(isActive && activeItemStyle) }}>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
        `}
      >
        <span css={{ ...basicFontStyle, ...(isActive && activeFontStyle) }}>
          {item.title}
        </span>
        <span css={{ ...(isActive && activeFontStyle) }}>{item.subtitle}</span>
      </div>
      <span css={{ ...basicFontStyle, ...(isActive && activeFontStyle) }}>
        {item.time}
      </span>
    </div>
  );
}

export default PlanListItem;
