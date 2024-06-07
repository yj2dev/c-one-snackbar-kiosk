import { atom } from "recoil";

const sec = localStorage.getItem("prod_sec");

export const timerState = atom({
  key: "timerState",
  default: sec === null ? 3 : Math.max(sec, 10),
});
