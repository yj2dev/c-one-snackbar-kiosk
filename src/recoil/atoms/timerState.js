import { atom } from "recoil";

export const timerState = atom({
  key: "timerState",
  default: 60,
});
