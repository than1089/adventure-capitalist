import React, { useEffect, useState, useRef } from 'react';
import './Progress.css';

export function Progress({timeTaken, uuid, autoStart}) {
  const [width, setWidth] = useState(0);
  const intervalRef = useRef();
  
  useEffect(() => {
    setWidth(0);
    if (!autoStart) {
      return;
    }
    const startTime = (new Date()).getTime();

    intervalRef.current = setInterval(() => {
      const currentTime = (new Date()).getTime();

      const width = (currentTime - startTime)/(timeTaken * 10);
      setWidth(`${width}%`);
      if (width >= 100) {
        clearInterval(intervalRef.current);
      }
    });

    return () => {
      clearInterval(intervalRef.current);
    }
  // eslint-disable-next-line
  }, [uuid, autoStart]);

  return (
    <div className="progress-bar">
      <span style={{width}}></span>
    </div>
  );
}
