/** @jsxImportSource @emotion/react */

const PlanListItem = ({ item }) => {
  const start = new Date(item.start.dateTime)
  const end = new Date(item.end.dateTime)

  return (
    <div
      css={{
        width: "100%",
        height: "15%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div css={{}}>{item.summary}</div>
        <div css={{ color: "var(--font-sub-color)", fontSize: "0.75rem" }}>
          {item.description}
        </div>
      </div>
      <div>
        {`${start.getHours().toString().padStart(2, "0")}:${start
          .getMinutes()
          .toString()
          .padStart(2, "0")} - ${end
          .getHours()
          .toString()
          .padStart(2, "0")}:${end.getMinutes().toString().padStart(2, "0")} ${
          end.getHours() >= 12 ? "PM" : "AM"
        } `}
      </div>
    </div>
  )
}

export default PlanListItem
