import React from 'react';
import { CountDown } from '../CountDown';

function Business(props) {
  return (
    <div className="business">
      <div className="business-icon">
        <img src={`/images/${props.icon}`} alt="icon" width="70"/>
      </div>
      <div>
        <div className="business-progress">
          
        </div>
        <div className="business-buy-and-timer">
          <div className="business-buy">
            <button>Buy</button>
          </div>
          <div className="business-timer">
            <CountDown seconds={props.timeTaken} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Business;
