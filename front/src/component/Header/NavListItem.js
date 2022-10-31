/** @jsxImportSource @emotion/react */

import { Link } from "react-router-dom"
import { defaultBoxStyle } from "../../style/shared"
import NavBadge from "./NavBadge"
import NavBang from "./NavBang"

const NavListItem = ({ img, path }) => {
  const setBadge = () => {
    if (path === "/git") return <NavBadge />
    if (path === "/") return <NavBang />
  }
  return (
    <div
      css={{
        ...defaultBoxStyle,
        height: "90%",
        aspectRatio: "1/1",
        borderRadius: 9999,
        padding: "3%",
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
