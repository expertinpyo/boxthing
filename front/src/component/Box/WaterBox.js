/** @jsxImportSource @emotion/react */
import { defaultBoxStyle } from "../../style/shared";

import { motion } from "framer-motion";
import { Water } from "../Water/Water";
import WaterDailyGraph from "../Water/WaterDailyGraph";
import WaterWeeklyGraph from "../Water/WaterWeeklyGraph";
import ToggleButton from "../Water/ToggleButton";
import { useRecoilState } from "recoil";
import { wtoggleState } from "../../store/nav";

function WaterBox({ key }) {
  const [state, setState] = useRecoilState(wtoggleState);
  return (
    <motion.div
      key={key}
      css={{
        ...defaultBoxStyle,
        width: "100%",
        height: "100%",
        padding: 16,
        borderRadius: "16px 16px 0px 0px",
        display: "flex",
      }}
      initial={{ transform: "translateY(100%)" }}
      animate={{ transform: "translateY(0%)" }}
      exit={{ transform: "translateY(100%)" }}
      transition={{ duration: 0.5, ease: "circOut" }}
    >
      <div
        css={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          flexDirection: "column",
        }}
      >
        <div css={{ position: "absolute", top: 0, right: 0, zIndex: 10 }}>
          <ToggleButton
            leftText={"WEEK"}
            rightText={"TODAY"}
            onClick={() => {
              setState((pre) => !pre);
            }}
            state={state}
          />
        </div>

        <div css={{ width: "100%", height: "100%" }}>
          {state ? (
            <div css={{ width: "100%", height: "100%" }}>
              <Water size={{ boxwidth: "300px", boxheight: "300px" }} />
              <WaterDailyGraph />
            </div>
          ) : (
            <WaterWeeklyGraph />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default WaterBox;
