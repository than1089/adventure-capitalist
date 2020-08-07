import React from 'react';
import { useSelector } from 'react-redux';

import './App.css';
import { Business } from './components/Business';
import { Managers } from './components/Managers';

function App() {
  const balance = useSelector(state => state.balance);
  const businesses = useSelector(state => state.businesses);

  return (
    <div className="App">
      <div className="side-bar">
        <img src="/images/capitalist.png" width="150" alt="Capitalist"/>
        <Managers/>
      </div>
      <div className="main">
        <div className="balance">
          <span>${balance.amount.toLocaleString()}</span>
        </div>
        <div className="businesses">
          {Object.values(businesses).map(item => 
            <Business {...item} timeTaken={item.timeTaken*1000} key={item.id} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
