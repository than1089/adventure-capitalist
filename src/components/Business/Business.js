import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CountDown } from '../CountDown';
import { Progress } from '../Progress';
import { v4 as uuidv4 } from 'uuid';
import { increaseBalance, decreaseBalance, buyBusiness } from '../../redux/actions';
import './Business.css';

function Business({id, name, price, timeTaken, hasManager, quantityPurchased, icon, profit}) {
  const [uuid, setUuid] = useState(uuidv4());
  const [running, setRunning] = useState(hasManager);
  const dispatch = useDispatch();
  const balance = useSelector(state => state.balance);

  const runBusiness = (e) => {
    e.preventDefault();
    if (!running) {
      setUuid(uuidv4());
      setRunning(true);
    }
  }

  const onComplete = () => {
    if (!hasManager) {
      setRunning(false);
    } else {
      setUuid(uuidv4());
      setRunning(true);
    }
    dispatch(increaseBalance(profit));
  }

  const buy = () => {
    if (balance.amount >= price) {
      dispatch(buyBusiness(id, 1));
      dispatch(decreaseBalance(price));
    }
  }

  return (
    <div className="business">
      {!!quantityPurchased &&
        <>
        <div className="business-icon" onClick={runBusiness}>
          <img src={`/images/${icon}`} alt="icon" width="60"/>
          <div className="business-quantity">{quantityPurchased}</div>
        </div>
        <div>
          <div className="business-progress" onClick={runBusiness}>
            <Progress timeTaken={timeTaken} uuid={uuid} running={running}/>
            <span className="business-profit">{profit}</span>
          </div>
          <div className="business-buy-and-timer">
            <div className={'business-buy' + (balance.amount >= price ? ' active' : '')}
              onClick={buy}>
              <span>Buy</span><span>{price.toLocaleString()}</span>
            </div>
            <div className="business-timer">
              <CountDown timeTaken={timeTaken} autoStart={running} uuid={uuid} onComplete={onComplete}/>
            </div>
          </div>
        </div>
        </>
      }
      {!quantityPurchased &&
        <div className={'business-unpurchased' + (balance.amount >= price ? ' active' : '')}
          onClick={buy}>
          {name}
        </div>
      }
    </div>
  );
}

export default Business;
