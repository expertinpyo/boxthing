/** @jsxImportSource @emotion/react */

import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { cameraConnectionState } from "../../store/posture";
import { defaultBoxStyle } from "../../style/shared";
import NavBadge from "./NavBadge";
import NavBang from "./NavBang";
import NavEx from "./NavEx";
import NavScore from "./NavScore";

const NavListItem = ({ img, path }) => {
  const cameraConnection = useRecoilValue(cameraConnectionState);
  const setBadge = () => {
    if (path === "/git") return <NavBadge />;
    else if (path === "/") return <NavBang />;
    else if (path === "/posture") {
      if (cameraConnection) return <NavScore />;
      else return <NavEx />;
    }
  };
  return (
    <div
      css={{
        ...defaultBoxStyle,
        background: "#fff",
        height: "90%",
        aspectRatio: "1/1",
        borderRadius: 9999,
        padding: 8,
        lineHeight: 0,
        position: "relative",
      }}
    >
      <Link to={path}>
        <img src={img} alt={""} css={{ width: "100%" }} />
      </Link>
      {setBadge()}
    </div>
  );
};

export default NavListItem;
