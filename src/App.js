import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './App.css';
import { Business } from './components/Business';
import { Managers } from './components/Managers';
import { AwayEarningModal } from './components/AwayEarningModal';

function App() {
  const balance = useSelector(state => state.balance);
  const businesses = useSelector(state => state.businesses);
  const awayEarning = useSelector(state => state.awayEarning);
  const [awayEarningShow, setAwayEarningShow] = useState(false);

  useEffect(() => {
    if (awayEarning && awayEarning.amount) {
      setAwayEarningShow(true);
    }
  }, [awayEarning]);

  return (
    <>
      <div className="App">
        <div className="side-bar">
          <img src={process.env.PUBLIC_URL + '/images/capitalist.png'} alt="Capitalist"/>
          <Managers/>
        </div>
        <div className="main">
          <div className="balance">
            <span>${balance.amount.toLocaleString()}</span>
          </div>
          <div className="businesses">
            {Object.entries(businesses).map(([key, item]) => 
              <Business {...item} timeTaken={item.timeTaken*1000} key={key} />
            )}
          </div>
        </div>
      </div>
      {awayEarningShow &&
        <AwayEarningModal onClose={setAwayEarningShow}/>
      }
    </>
  );
}

export default App;
