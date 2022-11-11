import { atom } from "recoil";
import moment from "moment";

const timerState = atom({
  key: "timeState",
  default: moment(),
});

export { timerState };
