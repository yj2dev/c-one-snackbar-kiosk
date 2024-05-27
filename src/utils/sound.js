import alertSoundSrc from "../../public/assets/sounds/alert_sound.wav";

export const playAlertSound = () => {
  const audio = new Audio(alertSoundSrc);
  audio.play();
};
