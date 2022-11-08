/** @jsxImportSource @emotion/react */
import { useRecoilValue } from "recoil";
import PostIt from "../../asset/nav_icon/post-it.png";
import { currentPostureScoreState } from "../../store/posture";

const NavScore = () => {
  const score = useRecoilValue(currentPostureScoreState);
  return (
    <div
      css={{
        position: "absolute",
        width: "40%",
        aspectRatio: "1/1",
        bottom: 0,
        right: -5,
        color: score === 0 ? "white" : score > 80 ? "green" : "red",
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={PostIt} alt="" css={{ width: "100%", position: "relative" }} />
      <div css={{ position: "absolute", zIndex: "1" }}>{score}</div>
    </div>
  );
};

export default NavScore;
