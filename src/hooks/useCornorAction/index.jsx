import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const useCornorAction = () => {
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseDown = (e) => {
    if (e.clientX < 50 && e.clientY < 50) {
      timerRef.current = setTimeout(() => {
        navigate("/admin");
      }, 1000);
    }
  };

  const handleMouseUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    if (touch.clientX < 50 && touch.clientY < 50) {
      timerRef.current = setTimeout(() => {
        navigate("/admin");
      }, 1000);
    }
  };

  const handleTouchEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return [handleMouseDown, handleMouseUp, handleTouchStart, handleTouchEnd];
};

export default useCornorAction;
