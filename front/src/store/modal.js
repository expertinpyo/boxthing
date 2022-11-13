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

const captureModalState = atom({
  key: "captureModalState",
  default: false,
});

const captureFuncState = atom({
  key: "captureFuncState",
  default: false,
});

const captureGoodModalState = atom({
  key: "captureGoodModalState",
  default: false,
});

const captureBadModalState = atom({
  key: "captureBadModalState",
  default: false,
});

const captureStartModalState = atom({
  key: "captureStartModalState",
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
  captureModalState,
  captureFuncState,
  captureGoodModalState,
  captureBadModalState,
  captureStartModalState,
};
