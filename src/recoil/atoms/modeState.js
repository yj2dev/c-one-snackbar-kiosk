import { atom } from "recoil";

export const modeState = atom({
  key: "modeState",
  default: {
    qrUrl: "",
    token: [],
    isQr: false,
  },
});
