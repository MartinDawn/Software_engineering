import React, { useState } from 'react';
import './BuyingPermis.css'; 

const BuyingPermis = () => {
  const [buyingPeriods, setBuyingPeriods] = useState([]);
  const [newPeriod, setNewPeriod] = useState({
    name: '',
    startDate: '',
    endDate: '',
    isEnabled: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPeriod({
      ...newPeriod,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAddPeriod = () => {
    setBuyingPeriods([...buyingPeriods, newPeriod]);
    setNewPeriod({
      name: '',
      startDate: '',
      endDate: '',
      isEnabled: false,
    });
  };

  return (
    <div className="manage-buying">
      <h2>Manage Buying Periods</h2>
      <div className="new-period-form">
        <input
          type="text"
          name="name"
          placeholder="Period Name"
          value={newPeriod.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          value={newPeriod.startDate}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="endDate"
          placeholder="End Date"
          value={newPeriod.endDate}
          onChange={handleInputChange}
          required
        />
        <label>
          <input
            type="checkbox"
            name="isEnabled"
            checked={newPeriod.isEnabled}
            onChange={handleInputChange}
          /> Enable Buying
        </label>
        <button onClick={handleAddPeriod}>Add Period</button>
      </div>
      <div className="period-list">
        {buyingPeriods.map((period, index) => (
          <div key={index} className="period-item">
            <h3>{period.name}</h3>
            <p>Start Date: {period.startDate}</p>
            <p>End Date: {period.endDate}</p>
            <p>Status: {period.isEnabled ? 'Enabled' : 'Disabled'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyingPermis;