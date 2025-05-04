import { useEffect, useState } from "react";

export default function NotificationDot({ show }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (show) {
      const interval = setInterval(() => {
        setIsVisible((prev) => !prev);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [show]);

  if (!show) return null;

  return (
    <span
      className={`absolute -top-1 -right-2 h-3 w-3 rounded-full bg-red-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500`}
    />
  );
}
