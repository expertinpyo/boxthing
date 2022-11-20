import { useRef } from "react";
import "./ToggleButton.css";

const ToggleButton = ({ onClick, leftText, rightText, state }) => {
  const toggleContainer = useRef(null);

  return (
    <div
      id="container"
      onClick={() => {
        onClick();
      }}
    >
      <div className="inner-container">
        <div className="toggle">
          <p>{rightText}</p>
        </div>
        <div className="toggle">
          <p>{leftText}</p>
        </div>
      </div>
      <div
        className="inner-container"
        id="toggle-container"
        ref={toggleContainer}
        style={{
          clipPath: state ? "inset(0 0 0 50%)" : "inset(0 50% 0 0)",
          backgroundColor: state ? "#11D200" : "dodgerblue",
        }}
      >
        <div className="toggle">
          <p>{rightText}</p>
        </div>
        <div className="toggle">
          <p>{leftText}</p>
        </div>
      </div>
    </div>
  );
};

export default ToggleButton;
