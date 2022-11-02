import { atom } from "recoil"

const waterModalState = atom({
  key: "waterModalState",
  default: false,
})

const stretchModalState = atom({
  key: "stretchModalState",
  default: false,
})

const postureModalState = atom({
  key: "postureModalState",
  default: false,
})

const loginState = atom({
  key: "loginState",
  default: true,
})

export { waterModalState, stretchModalState, postureModalState, loginState }
