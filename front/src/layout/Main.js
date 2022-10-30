/** @jsxImportSource @emotion/react */

import { useRecoilValue } from "recoil";
import { navState } from "../store/nav";
import { AnimatePresence } from "framer-motion";
import PlanBox from "../component/Box/PlanBox";
import GitBox from "../component/Box/GitBox";
import WorkBox from "../component/Box/WorkBox";
import HealthBox from "../component/Box/HealthBox";
import { Route, Routes, useLocation } from "react-router-dom";

const Main = () => {
  const location = useLocation();
  const selectedContent = useRecoilValue(navState);
  return (
    <div
      css={{
        width: "100%",
        height: "100%",
        paddingTop: 16,
        overflow: "hidden",
      }}
    >
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" exact element={<PlanBox />} />
          <Route path="/git" element={<GitBox />} />
          <Route path="/work" element={<WorkBox />} />
          <Route path="/health" element={<HealthBox />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default Main;
