import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hireManager } from './redux/actions';

import './App.css';
import Business from './components/Business/Business';

function App() {
  const balance = useSelector(state => state.balance);
  const businesses = useSelector(state => state.businesses);
  const managers = useSelector(state => state.managers);

  const dispatch = useDispatch();

  const hire = (item) => {
    if (item.price <= balance.amount) {
      dispatch(hireManager(item));
    }
  }
  return (
    <div className="App">
      <div className="side-bar">
        <img src="/images/capitalist.png" width="150" alt="Capitalist"/>
        <div>
          {managers.filter(item => !item.hired).map(item => 
            <div key={item.businessId}>
              <span>{item.name}</span>
              <button disabled={item.price > balance.amount} onClick={() => { hire(item) }}>
                Hire
              </button>
            </div>
          )}
      </div>
      </div>
      <div className="main">
        <div className="balance">
          <span>${balance.amount.toLocaleString()}</span>
        </div>
        <div className="businesses">
          {Object.values(businesses).map(item => 
            <Business {...item} key={item.id} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
