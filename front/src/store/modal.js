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

const waterModalState = atom({
  key: "waterModalState",
  default: false,
});

const welcomeModalState = atom({
  key: "welcomeModalState",
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

const neckPainModalState = atom({
  key: "neckPainModalState",
  default: false,
});

const micModalState = atom({
  key: "micModalState",
  default: false,
});

const noOrderModalState = atom({
  key: "noOrderModalState",
  default: false,
});

const orderModalState = atom({
  key: "orderModalState",
  default: false,
});

const orderSecondModalState = atom({
  key: "orderSecondModal",
  default: false,
});

export {
  stretchModalState,
  planModalState,
  notiModalState,
  waterModalState,
  welcomeModalState,
  captureModalState,
  captureFuncState,
  captureGoodModalState,
  captureBadModalState,
  captureStartModalState,
  neckPainModalState,
  micModalState,
  orderModalState,
  noOrderModalState,
  orderSecondModalState,
};
