/** @jsxImportSource @emotion/react */
import Work from "../../asset/plan/Work.gif";
import Break2 from "../../asset/plan/Break2.gif";

const PlanInProgress = ({ item }) => {
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
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            position: "relative",
          }}
        >
          <div css={{ fontSize: 14, color: "var(--font-sub-color)" }}>
            진행 중인 일정
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
              src={Work}
              alt="Work"
              css={{ height: "100%", aspectRatio: "1/1", borderRadius: 16 }}
            />
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
            src={Break2}
            alt="Break2"
            css={{ height: "100%", aspectRatio: "1/1", borderRadius: 16 }}
          />
        </div>
      )}
    </div>
  );
};

export default PlanInProgress;
