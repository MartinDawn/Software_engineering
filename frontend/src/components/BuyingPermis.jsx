import React, { useState } from 'react';
import '../styles/BuyingPermis.css'; 
import api from '../api';

const BuyingPermis = () => {
  const [newPeriod, setNewPeriod] = useState({
    startDate: '',
    endDate: '',
  });
  const [buyingPeriods, setBuyingPeriods] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPeriod((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAddPeriod = async () => {
    console.log(newPeriod); // Log the entered data
    console.log(newPeriod.startDate);
    console.log(newPeriod.endDate);
    try {
      // First API call to add start time
      const startResponse = await api.post('/manager/enable/', {datetime: newPeriod.startDate}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        }
      });

      if (startResponse.status === 200) {
        // Second API call to add end time
        const endResponse = await api.post('/manager/disable/', {datetime: newPeriod.endDate} , {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
          }
        });

        if (endResponse.status === 200) {
          setBuyingPeriods((prevPeriods) => [...prevPeriods, newPeriod]);
          setNewPeriod({ startDate: '', endDate: '' }); // Reset the form
          alert('Buying period created successfully');
        } else {
          alert('Error creating end time for buying period');
        }
      } else {
        alert('Error creating start time for buying period');
      }
    } catch (error) {
      console.error('Error creating buying period:', error);
      alert('Error creating buying period');
    }
  };

  return (
    <div className="manage-buying">
      <h2>Manage Buying Periods</h2>
      <div className="new-period-form">
        <input
          type="datetime-local"
          name="startDate"
          placeholder="Start Date"
          value={newPeriod.startDate}
          onChange={handleInputChange}
          required
        />
        <input
          type="datetime-local"
          name="endDate"
          placeholder="End Date"
          value={newPeriod.endDate}
          onChange={handleInputChange}
          required
        />
        <button onClick={handleAddPeriod}>Add Period</button>
      </div>
      <div className="period-list">
        {buyingPeriods.map((period, index) => (
          <div key={index} className="period-item">
            <h3>Buying Period {index + 1}</h3>
            <p>Start Date: {period.startDate}</p>
            <p>End Date: {period.endDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyingPermis;