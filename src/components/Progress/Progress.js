import React, { useEffect, useState, useRef } from 'react';
import './Progress.css';

export function Progress({timeTaken, uuid, running}) {
  const [animateStyle, setAnimateStyle] = useState({});
  const timeOutRef = useRef();
  
  useEffect(() => {
    setAnimateStyle({
      width: 0
    });
    if (running) {
      timeOutRef.current = setTimeout(() => {
        setAnimateStyle({
          animation: `expandWidth ${timeTaken}s linear`
        });
      }, 50);
    }
    return () => {
      clearTimeout(timeOutRef.current);
    }
  }, [timeTaken, running, uuid]);

  return (
    <div className="progress-bar">
      <span style={animateStyle}></span>
    </div>
  );
}
