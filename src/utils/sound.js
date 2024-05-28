import alertSoundSrc from "../../public/assets/sounds/alert_sound.wav";

export const playSound = {
  alert: () => {
    const audio = new Audio(alertSoundSrc);
    audio.play();
  },
};
