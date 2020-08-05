import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CountDown } from '../CountDown';
import { v4 as uuidv4 } from 'uuid';
import { increaseBalance, decreaseBalance, buyBusiness } from '../../redux/actions';
import { round } from '../../utils/number';
import './Business.css';

function Business({id, price, timeTaken, hasManager, quantityPurchased, icon, profit}) {
  const [uuid, setUuid] = useState(uuidv4());
  const [running, setRunning] = useState(hasManager);
  const dispatch = useDispatch();
  const balance = useSelector(state => state.balance);
  const buyQuantity = 1;

  const runBusiness = (e) => {
    e.preventDefault();
    if (!hasManager && !running) {
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
    if (balance.amount >= price * buyQuantity) {
      dispatch(buyBusiness(id, buyQuantity));
      const totalPrice = round(price * buyQuantity);
      dispatch(decreaseBalance(totalPrice));
    }
  }

  return (
    <div className="business">
      <div className="business-icon">
        <a href="!#" type="button" onClick={runBusiness}>
          <img src={`/images/${icon}`} alt="icon" width="60"/>
        </a>
        <div className="business-quantity">{quantityPurchased}</div>
      </div>
      <div>
        <div className="business-progress">
          {profit}
        </div>
        <div className="business-buy-and-timer">
          <div className={'business-buy' + (balance.amount >= price * buyQuantity ? ' active' : '')}
            onClick={buy}>
            <span>Buy</span><span>{price.toLocaleString()}</span>
          </div>
          <div className="business-timer">
            <CountDown timeTaken={timeTaken} autoStart={running} uuid={uuid} onComplete={onComplete}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Business;
