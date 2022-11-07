import { atom } from "recoil";

const stretchModalState = atom({
  key: "stretchModalState",
  default: false,
});

const planModalState = atom({
  key: "planModalState",
  default: false,
});

const notiModalState = atom({
  key: "notiModalState",
  default: false,
});

const postureModalState = atom({
  key: "postureModalState",
  default: false,
});

const waterModalState = atom({
  key: "waterModalState",
  default: false,
});

export {
  stretchModalState,
  planModalState,
  notiModalState,
  postureModalState,
  waterModalState,
};
