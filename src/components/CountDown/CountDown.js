import React, { useEffect, useState, useCallback } from 'react';


function CountDown(props) {
  const [totalSeconds, setTotalSeconds] = useState(props.seconds);
  const { onComplete = () => {} } = props;
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const calculateTimeLeft = useCallback(() => {
    let secondsToCalculate = totalSeconds;
    setHours(Math.floor(secondsToCalculate / 3600));
    secondsToCalculate %= 3600;
    setMinutes(Math.floor(secondsToCalculate / 60));
    setSeconds(secondsToCalculate % 60);
  }, [totalSeconds]);

  useEffect(() => {
    const inverval = setInterval(() => {
      calculateTimeLeft();
      if (totalSeconds > 0) {
        setTotalSeconds(totalSeconds - 1);
      } else {
        clearInterval(inverval);
        onComplete();
      }
    }, 1000);

    return () => {
      clearInterval(inverval);
    }
  }, [totalSeconds, onComplete, calculateTimeLeft]);

  return (
    <div className="timer">
      {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
}

export { CountDown };