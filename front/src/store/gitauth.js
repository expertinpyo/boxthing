import { atom } from "recoil";

const gitAuthenticationState = atom({
  key: "gitAuthenticationState",
  default: true,
});

export { gitAuthenticationState };
