/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

function Content() {
  return (
    <div
      css={css`
        width: 100%;
        height: 80%;
        padding-left: 6.25%;
        padding-right: 6.25%;
      `}
    >
      <div
        css={css`
          width: 100%;
          height: 100%;
          border-radius: 16px 16px 0px 0px;
          border: 1px solid black;
        `}
      ></div>
    </div>
  );
}

export default Content;
