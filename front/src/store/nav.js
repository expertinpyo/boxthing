import { atom } from "recoil";

const waterModalState = atom({
  key: "waterModalState",
  default: false,
});

const stretchModalState = atom({
  key: "stretchModalState",
  default: false,
});

const postureModalState = atom({
  key: "postureModalState",
  default: false,
});

const notiModalState = atom({
  key: "notiModalState",
  default: false,
});

const planModalState = atom({
  key: "planModalState",
  default: false,
});

const loginState = atom({
  key: "loginState",
  default: true,
});

export { loginState };
