import React, { useEffect, useState, useRef } from 'react';

export function CountDown({timeTaken, onComplete = () => {}, autoStart, uuid}) {
  const [totalSeconds, setTotalSeconds] = useState(timeTaken);
  const intervalRef = useRef();
  
  useEffect(() => {
    setTotalSeconds(timeTaken);
    if (!autoStart) {
      return;
    }
    const startTime = (new Date()).getTime();
    const endTime = startTime + timeTaken * 1000;

    intervalRef.current = setInterval(() => {
      const currentTime = (new Date()).getTime();
      if (endTime > currentTime) {
        setTotalSeconds(Math.ceil((endTime - currentTime)/1000));
      } else {
        clearInterval(intervalRef.current);
        onComplete();
      }
    }, 10);

    return () => {
      clearInterval(intervalRef.current);
    }
  // eslint-disable-next-line
  }, [uuid, autoStart]);

  return (
    <div className="count-down-timer">
      {formatTime(totalSeconds)}
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