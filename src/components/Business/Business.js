import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CountDown } from '../CountDown';
import { Progress } from '../Progress';
import { v4 as uuidv4 } from 'uuid';
import { increaseBalance, decreaseBalance, buyBusiness, completeBusiness } from '../../redux/actions';
import './Business.css';

export function Business({id, name, price, timeTaken, hasManager, quantityPurchased, icon, profit}) {
  const [uuid, setUuid] = useState(uuidv4());
  const [autoStart, setAutoStart] = useState(hasManager);
  const dispatch = useDispatch();
  const balance = useSelector(state => state.balance);

  const runBusiness = (e) => {
    e.preventDefault();
    if (!autoStart) {
      setUuid(uuidv4());
      setAutoStart(true);
    }
  }

  const onComplete = () => {
    setUuid(uuidv4());
    setAutoStart(hasManager);
    dispatch(increaseBalance(profit));
    dispatch(completeBusiness(id));
  }

  const buy = () => {
    if (balance.amount >= price) {
      dispatch(buyBusiness(id, 1));
      dispatch(decreaseBalance(price));
    }
  }

  useEffect(() => {
    if (hasManager) {
      setUuid(uuidv4());
      setAutoStart(true);
    }
  }, [hasManager]);

  return (
    <div className="business">
      {!!quantityPurchased &&
        <>
        <div className="business-icon" onClick={runBusiness}>
          <img src={`/images/${icon}`} alt="icon" width="60"/>
          <div className="business-quantity">{quantityPurchased}</div>
        </div>
        <div className="business-content">
          <div className="business-progress" onClick={runBusiness}>
            <Progress timeTaken={timeTaken} uuid={uuid} autoStart={autoStart}/>
            <span className="business-profit">${profit.toLocaleString()}</span>
          </div>
          <div className="business-buy-and-timer">
            <div className={'business-buy' + (balance.amount >= price ? ' active' : '')}
              onClick={buy}>
              <span>Buy</span><span>${price.toLocaleString()}</span>
            </div>
            <div className="business-timer">
              <CountDown timeTaken={timeTaken} autoStart={autoStart} uuid={uuid} onComplete={onComplete}/>
            </div>
          </div>
        </div>
        </>
      }
      {!quantityPurchased &&
        <div className={'business-unpurchased' + (balance.amount >= price ? ' active' : '')}
          onClick={buy}>
          <span>{name}</span><br/>
          <span className="price">${price.toLocaleString()}</span>
        </div>
      }
    </div>
  );
}
