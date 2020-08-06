import React, { useEffect, useState, useRef } from 'react';

export function CountDown({timeTaken, onComplete = () => {}, autoStart, uuid}) {
  const [totalSeconds, setTotalSeconds] = useState(timeTaken);

  const timeOutRef = useRef();

  useEffect(() => {
    setTotalSeconds(timeTaken);
  }, [timeTaken, uuid])

  useEffect(() => {
    if (!autoStart) {
      return;
    }
    timeOutRef.current = setTimeout(() => {
      if (totalSeconds > 1) {
        setTotalSeconds(totalSeconds - 1);
      } else {
        clearTimeout(timeOutRef.current);
        onComplete();
      }
    }, 1000);

    return () => {
      clearTimeout(timeOutRef.current);
    }
  }, [totalSeconds, autoStart, uuid, onComplete]);

  return (
    <div className="count-down-timer">
      {formatTime(autoStart ? totalSeconds : 0)}
    </div>
  );
}

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return String(hours).padStart(2, '0') + ':' +
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0');
}