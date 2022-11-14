/** @jsxImportSource @emotion/react */
import moment from "moment";
import { useRecoilValue } from "recoil";
import { inProgressPlanState } from "../../store/plan";
import "./PlanListItem.css";

const PlanListItem = ({ item, type = "" }) => {
  const inprogress = useRecoilValue(inProgressPlanState);
  const start = moment(item.start.dateTime);
  const end = moment(item.end.dateTime);

  return (
    <div
      css={{
        width: "100%",
        height: "15%",
        display: "flex",
        justifyContent: "space-between",
        background: "rgba(255,255,255,0.375)",
        alignItems: "center",
        paddingRight: 16,
        paddingLeft: 16,
        marginBottom: 8,
        borderRadius: 8,
        border: `${item.calendar.backgroundColor} 3px solid`,
      }}
      className={
        inprogress.some((progress) => progress.id === item.id)
          ? "inprogressItem"
          : ""
      }
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
          alignItems: "center",
          fontSize: "1.1rem",
        }}
      >
        <div>
          {`${start.hours().toString().padStart(2, "0")}:${start
            .minutes()
            .toString()
            .padStart(2, "0")} - ${end
            .hours()
            .toString()
            .padStart(2, "0")}:${end.minutes().toString().padStart(2, "0")} ${
            end.hours() >= 12 ? "PM" : "AM"
          } `}
        </div>
      </div>
    </div>
  );
};

export default PlanListItem;
