import { atom } from "recoil"

const timerState = atom({
  key: "timeState",
  default: new Date(),
})

export { timerState }
