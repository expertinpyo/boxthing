import { atom } from "recoil";

const ptoggleState = atom({
  key: "ptoggleState",
  default: false,
});

const wtoggleState = atom({
  key: "wtoggleState",
  default: false,
});

export { ptoggleState, wtoggleState };
