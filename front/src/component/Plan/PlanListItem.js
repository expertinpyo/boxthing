/** @jsxImportSource @emotion/react */
import moment from "moment";

const PlanListItem = ({ item }) => {
  const start = moment(item.start.dateTime);
  const end = moment(item.end.dateTime);

  return (
    <div
      css={{
        width: "100%",
        height: "20%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 8,
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "60%",
        }}
      >
        <div
          css={{
            width: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: "1.2rem",
          }}
        >
          {item.summary}
        </div>
        <div
          css={{
            color: "var(--font-sub-color)",
            fontSize: "1rem",
            width: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.description}
        </div>
      </div>
      <div
        css={{
          width: "30%",
          display: "flex",
          justifyContent: "flex-end",
          fontSize: "1.1rem",
        }}
      >
        {`${start.hours().toString().padStart(2, "0")}:${start
          .minutes()
          .toString()
          .padStart(2, "0")} - ${end.hours().toString().padStart(2, "0")}:${end
          .minutes()
          .toString()
          .padStart(2, "0")} ${end.hours() >= 12 ? "PM" : "AM"} `}
      </div>
    </div>
  );
};

export default PlanListItem;
