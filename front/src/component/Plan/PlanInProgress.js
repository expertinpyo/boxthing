/** @jsxImportSource @emotion/react */
import Work from "../../asset/plan/Work.gif"
import Break2 from "../../asset/plan/Break2.gif"

const PlanInProgress = ({ item }) => {
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
            진행 중인 일정
          </div>
          <div
            css={{
              width: "100%",
              height: "50%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={Work}
              alt="Work"
              css={{ height: "100%", aspectRatio: "1/1", borderRadius: 16 }}
            />
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
            src={Break2}
            alt="Break2"
            css={{ height: "100%", aspectRatio: "1/1", borderRadius: 16 }}
          />
        </div>
      )}
    </div>
  )
}

export default PlanInProgress
