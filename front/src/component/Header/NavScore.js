/** @jsxImportSource @emotion/react */
import { useRecoilValue } from "recoil";
import Bubble from "../../asset/nav_icon/speech-bubble.png";
import { currentPostureScoreState } from "../../store/posture";

const NavScore = () => {
  const score = useRecoilValue(currentPostureScoreState);
  return (
    <div
      css={{
        position: "absolute",
        width: "70%",
        aspectRatio: "1/1",
        bottom: -15,
        right: -15,
        color: score === 0 ? "black" : score > 70 ? "green" : "red",
        fontSize: 20,
        fontWeight: "bold",
        lineHeight: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={Bubble}
        alt=""
        css={{ width: "100%", position: "relative", transform: "scaleY(-1)" }}
      />
      <div css={{ position: "absolute", zIndex: "1", bottom: 19 }}>{score}</div>
    </div>
  );
};

export default NavScore;
