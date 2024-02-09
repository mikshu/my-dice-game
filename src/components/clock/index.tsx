import React, { useEffect, useRef, useState } from "react";
import "./index.scss";

interface CounterProps {
  onTimerEnd: () => void;
  startTimer: boolean;
}

const Counter: React.FC<CounterProps> = ({ onTimerEnd, startTimer }) => {
  const counterRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (startTimer) {
      const interval = setInterval(() => {
        // Update count every 100 milliseconds
        setCount((prevCount) => prevCount + 1);
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        onTimerEnd();
      }, 10000); // Timer duration: 10 seconds

      return () => clearInterval(interval);
    }
  }, [onTimerEnd, startTimer]);

  useEffect(() => {
    // Calculate seconds based on count
    const calculatedSeconds = Math.floor(count / 10);
    setSeconds(calculatedSeconds);
  }, [count]);

  return (
    <div
      ref={counterRef}
      role="progressbar"
      aria-valuenow={count}
      aria-valuemin={0}
      aria-valuemax={100}
      style={
        {
          "--value": count,
          "--seconds": seconds,
        } as React.CSSProperties
      }
    ></div>
  );
};

export default Counter;
