import { atom } from "recoil";

const authenticationState = atom({
  key: "authenticationState",
  default: false,
});

export { authenticationState };
