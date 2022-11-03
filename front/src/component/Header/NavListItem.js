/** @jsxImportSource @emotion/react */

import { Link } from "react-router-dom"
import { defaultBoxStyle } from "../../style/shared"
import NavBadge from "./NavBadge"
import NavBang from "./NavBang"
import NavScore from "./NavScore"

const NavListItem = ({ img, path }) => {
  const setBadge = () => {
    if (path === "/git") return <NavBadge />
    else if (path === "/") return <NavBang />
    else if (path === "/posture") return <NavScore />
  }
  return (
    <div
      css={{
        ...defaultBoxStyle,
        background: "#fff",
        height: "90%",
        aspectRatio: "1/1",
        borderRadius: 9999,
        padding: 16,
        lineHeight: 0,
        position: "relative",
      }}
    >
      <Link to={path}>
        <img src={img} alt={""} css={{ width: "100%" }} />
      </Link>
      {setBadge()}
    </div>
  )
}

export default NavListItem
