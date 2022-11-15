import { atom } from "recoil";

const gitAuthenticationState = atom({
  key: "gitAuthenticationState",
  default: false,
});

export { gitAuthenticationState };
