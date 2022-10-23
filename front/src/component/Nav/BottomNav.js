/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import setting from "../../asset/nav_icon/setting.png";

function BottomNav() {
  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 15%;
      `}
    >
      <div
        css={css`
          width: 50%;
          aspect-ratio: 1/1;
          position: relative;
        `}
      >
        <div
          css={css`
            position: relative;
            width: 100%;
            height: 100%;
            padding: 5px;
            background: white;
            border-radius: 16px;
            line-height: 0;
            z-index: 2;
          `}
        >
          <img
            css={css`
              width: 100%;
            `}
            src={setting}
            alt="setting"
          ></img>
        </div>
        <div
          css={css`
            width: 100%;
            aspect-ratio: 1/1;
            position: absolute;
            top: 0;
            left: 0;
            background: var(--main-gradient-color);
            filter: blur(7.5px);
            border-radius: 16px;
            z-index: 1;
          `}
        ></div>
      </div>
    </div>
  );
}

export default BottomNav;
