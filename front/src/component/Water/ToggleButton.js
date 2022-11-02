import { useRef, useState } from "react"
import "./ToggleButton.css"

const ToggleButton = ({ onClick }) => {
  const [toggleState, setToggleState] = useState(true)
  const toggleContainer = useRef(null)

  return (
    <div
      id="container"
      onClick={() => {
        onClick()
        setToggleState((pre) => !pre)
      }}
    >
      <div class="inner-container">
        <div class="toggle">
          <p>Today</p>
        </div>
        <div class="toggle">
          <p>Week</p>
        </div>
      </div>
      <div
        class="inner-container"
        id="toggle-container"
        ref={toggleContainer}
        style={{
          clipPath: toggleState ? "inset(0 0 0 50%)" : "inset(0 50% 0 0)",
          backgroundColor: toggleState ? "#D74046" : "dodgerblue",
        }}
      >
        <div class="toggle">
          <p>Today</p>
        </div>
        <div class="toggle">
          <p>Week</p>
        </div>
      </div>
    </div>
  )
}

export default ToggleButton
