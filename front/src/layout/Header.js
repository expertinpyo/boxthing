/** @jsxImportSource @emotion/react */

import Timer from "../component/Header/Timer";
import calendar from "../asset/nav_icon/google-calendar.png";
import github from "../asset/nav_icon/github.png";
import pain from "../asset/nav_icon/pain.png";

import NavListItem from "../component/Header/NavListItem";
import WaterNavItem from "../component/Header/WaterNavItem";
import OpenHelpModal from "../component/Header/OpenHelpModal";

const array = [
  { type: "calendar", img: calendar, path: "/" },
  { type: "git", img: github, path: "/git" },
  { type: "posture", img: pain, path: "/posture" },
  // { type: "water", img: drinkWater, path: "/water" },
];

const Header = () => {
  return (
    <div
      css={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div css={{ width: "20%", height: "100%" }}>
        <Timer />
      </div>
      <div
        css={{
          width: "50%",
          height: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <OpenHelpModal />
        {array.map((item) => {
          return (
            <NavListItem key={item.path} img={item.img} path={item.path} />
          );
        })}
        <WaterNavItem />
      </div>
    </div>
  );
};

export default Header;
