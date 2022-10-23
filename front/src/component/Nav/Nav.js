/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import BottomNav from "./BottomNav";
import TopNav from "./TopNav";

function Nav() {
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      `}
    >
      <TopNav></TopNav>
      <BottomNav></BottomNav>
    </div>
  );
}

export default Nav;
