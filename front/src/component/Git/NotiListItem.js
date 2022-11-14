/** @jsxImportSource @emotion/react */

import "./NotiListItem.css";
import moment from "moment";

const noti_type_object = {
  assign: {
    color: "#00DBC1",
    background: "#D9FFEB",
  },
  author: {
    color: "#F26600",
    background: "#FFBA6A",
  },
  comment: {
    color: "#71FF5A",
    background: "#E8FFC2",
  },
  "ci-activity": {
    color: "#747474",
    background: "#C7C7C7",
  },
  invitation: {
    color: "#5A92FF",
    background: "#C2E2FF",
  },
  manual: {
    color: "#1CC700",
    background: "#B4FF85",
  },
  mention: {
    color: "#B65AFF",
    background: "#E8C2FF",
  },
  review_requested: {
    color: "#E200CC",
    background: "#FF98EF",
  },
  security_alert: {
    color: "#FF1717",
    background: "#FF8383",
  },
  state_change: {
    color: "#0013C0",
    background: "#858AFF",
  },
  subscribed: {
    color: "#8F00B2",
    background: "#D67FFF",
  },
  team_mention: {
    color: "#E29500",
    background: "#FFE76B",
  },
};

const calculateLeftTime = (updated_at) => {
  const temp = moment() - moment(updated_at);
  const years = temp / (1000 * 60 * 60 * 24 * 365);
  if (years >= 1) return `${Math.floor(years)} years ago`;
  const days = (temp % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24);
  if (days >= 1) return `${Math.floor(days)} days ago`;
  const hours = (temp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);
  if (hours >= 1) return `${Math.floor(hours)} hours ago`;
  const minutes = (temp % (1000 * 60 * 60)) / (1000 * 60);
  return `${Math.floor(minutes)} minutes ago`;
};

const NotiListItem = ({ item }) => {
  console.log(item.unread);
  return (
    <div
      css={{
        background: item.unread ? "white" : "rgba(255,255,255,0.375)",
        position: "relative",
        width: "100%",
        height: "15%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 16,
        paddingLeft: 16,
        marginBottom: 8,
        borderRadius: 8,
        // ...defaultBoxStyle,
        // borderRadius: 8,
        // marginTop: 10,
        // marginBottom: 24,
      }}
      className={item.unread ? "gradient-border" : null}
    >
      <div
        css={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "60%",
        }}
      >
        <div
          css={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div
            css={{
              fontSize: "1rem",
              color: "var(--font-sub-color)",
              width: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.repository.full_name}
          </div>
          <div
            css={{
              fontSize: "1.2rem",
              width: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.subject.title}
          </div>
        </div>
      </div>
      <div
        css={{
          width: "30%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          css={{
            // position: "absolute",
            // flex: "none",
            // left: 10,
            // top: -20,
            // zIndex: 1,
            fontSize: "1rem",
            background: noti_type_object[item.reason].background,
            color: noti_type_object[item.reason].color,
            border: `${noti_type_object[item.reason].color} 2px solid`,
            padding: "4px 8px",
            borderRadius: 8,
          }}
        >
          {item.reason}
        </div>
        <div css={{ color: "var(--font-sub-color)", fontSize: "1.1rem" }}>
          {calculateLeftTime(item.updated_at)}
        </div>
      </div>
    </div>
  );
};

export default NotiListItem;
