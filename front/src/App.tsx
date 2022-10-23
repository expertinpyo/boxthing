/** @jsxImportSource @emotion/react */

import { useEffect } from "react";
import "./App.css";
import Header from "./component/Header/Header";
import Nav from "./component/Nav/Nav";
import { css } from "@emotion/react";
import PlanContent from "./component/Content/PlanContent";

function App() {
  const handleResize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="App">
      <div
        css={css`
          width: 12.5%;
          height: 100%;
        `}
      >
        <Nav></Nav>
      </div>
      <div
        css={css`
          width: 87.5%;
          height: 100%;
        `}
      >
        <Header></Header>
        <PlanContent></PlanContent>
      </div>
    </div>
  );
}

export default App;
