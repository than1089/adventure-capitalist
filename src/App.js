import React from 'react';
import './App.css';
import Business from './components/Business/Business';
import businesses from './data/businesses';

function App() {
  return (
    <div className="App">
      {businesses.map(item => 
        <Business {...item} />
      )}
    </div>
  );
}

export default App;
