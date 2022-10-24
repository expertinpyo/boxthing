/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"

const basicFontStyle = {
  fontSize: "1.5rem",
  fontWeight: "bold",
}

const activeFontStyle = {
  color: "white",
}

const basicItemStyle = {
  width: "100%",
  height: "20%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "16px",
  padding: "16px",
}
const activeItemStyle = {
  background: "var(--main-gradient-color)",
}

function PlanListItem({ isActive = false, item }) {
  const start = new Date(item.start.dateTime)
  const end = new Date(item.end.dateTime)
  const startHour = start.getHours().toString()
  const endHour = end.getHours().toString()
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
          {item.summary}
        </span>
        <span css={{ ...(isActive && activeFontStyle) }}>
          {item.description}
        </span>
      </div>
      <span css={{ ...basicFontStyle, ...(isActive && activeFontStyle) }}>
        {`${startHour.padStart(2, "0")}:${start
          .getMinutes()
          .toString()
          .padStart(2, "0")} - ${endHour.padStart(2, "0")}:${end
          .getMinutes()
          .toString()
          .padStart(2, "0")} ${end.getHours() >= 12 ? "PM" : "AM"} `}
      </span>
    </div>
  )
}

export default PlanListItem
