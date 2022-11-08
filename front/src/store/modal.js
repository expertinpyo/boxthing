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

const welcomeModalState = atom({
  key: "welcomeModalState",
  default: false,
});

const photoModalState = atom({
  key: "photoModalState",
  default: false,
});

export {
  stretchModalState,
  planModalState,
  notiModalState,
  postureModalState,
  waterModalState,
  welcomeModalState,
  photoModalState,
};
