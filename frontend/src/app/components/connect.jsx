import React, { useState } from 'react';
import BuyingPermis from './BuyingPermis'; 
import ManageActivity from './ManageActivity'; 

const Connect = () => {
  const [isBuyingEnabled, setIsBuyingEnabled] = useState(false); 

  const handleNewPeriodAdded = (isEnabled) => {
    setIsBuyingEnabled(isEnabled); 
  };

  return (
    <div className="app">
      <BuyingPermis onPeriodAdded={handleNewPeriodAdded} /> 
      <ManageActivity isBuyingEnabled={isBuyingEnabled} /> 
    </div>
  );
};

export default Connect;
