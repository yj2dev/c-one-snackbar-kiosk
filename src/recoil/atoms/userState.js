import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: { number: null, sex: null },
});
