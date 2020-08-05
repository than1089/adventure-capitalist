import React from 'react';
import { useSelector } from 'react-redux';

import './App.css';
import Business from './components/Business/Business';

function App() {
  const balance = useSelector(state => state.balance);
  const businesses = useSelector(state => state.businesses);
  return (
    <div className="App">
      <div className="businesses">
        {Object.values(businesses).map(item => 
          <Business {...item} key={item.id} />
        )}
      </div>
      <div>
        {balance.amount}
      </div>
    </div>
  );
}

export default App;
