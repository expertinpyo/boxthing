import { atom } from "recoil";

const authenticationState = atom({
  key: "authenticationState",
  default: true,
});

export { authenticationState };
