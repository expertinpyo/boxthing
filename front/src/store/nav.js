import { atom } from "recoil";

const ptoggleState = atom({
  key: "ptoggleState",
  default: false,
});

const wtoggleState = atom({
  key: "wtoggleState",
  default: true,
});

export { ptoggleState, wtoggleState };
