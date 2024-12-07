import React, { useState } from 'react';
import api from '../api';
import NavbarMg from '../layouts/Navbar/NavMg';
import '../styles/ChangedefaultPages.css'; // Import the CSS file

const ScheduleUpdate = () => {
  const [defaultPage, setDefaultPage] = useState(10);
  const [datetime, setDatetime] = useState('2024-11-27T11:47:00');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/spso/changedefaultPages/', {
        default_page: defaultPage,
        datetime: datetime
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        }
      });

      if (response.status === 200) {
        setMessage(response.data.message);
      } else {
        setMessage('Có lỗi xảy ra khi lập lịch.');
      }
    } catch (error) {
      console.error('Error scheduling update:', error);
      setMessage('Có lỗi xảy ra khi lập lịch.');
    }
  };

  return (
    <div>
      <NavbarMg />
      <div className="schedule-update-container">
      <h1>Schedule Update</h1>
      <form onSubmit={handleSubmit} className="schedule-update-form">
        <div className="form-group">
          <label>Default Page:</label>
          <input
            type="number"
            value={defaultPage}
            onChange={(e) => setDefaultPage(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Datetime:</label>
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn-submit">Submit</button>
      </form>
      {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default ScheduleUpdate;