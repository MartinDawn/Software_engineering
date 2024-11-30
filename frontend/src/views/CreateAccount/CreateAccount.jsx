import React, { useState } from 'react';
import './CreateAccount.css'; 

const CreateAccount = () => {
  const [activeForm, setActiveForm] = useState('student');

  const handleFormSwitch = (form) => {
    setActiveForm(form);
  };

  return (
    <div className="create-account">
      <div className="form-switch">
        <button
          className={`form-switch-button ${activeForm === 'student' ? 'active' : ''}`}
          onClick={() => handleFormSwitch('student')}
        >
          Student
        </button>
        <button
          className={`form-switch-button ${activeForm === 'spso' ? 'active' : ''}`}
          onClick={() => handleFormSwitch('spso')}
        >
          SPSO
        </button>
      </div>
      <div className="form-container">
        <h2>Create Account</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" placeholder="Enter Username" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Enter Email" required />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <input type="text" id="role" placeholder="Enter Role" required />
          </div>
          <div className="form-group">
            <label htmlFor="fullname">Full Name:</label>
            <input type="text" id="fullname" placeholder="Enter Full Name" required />
          </div>
          <div className="form-group">
            <label htmlFor="available-pages">Available Pages:</label>
            <input
              type="number"
              id="available-pages"
              placeholder="Enter Available Pages"
              required
              disabled={activeForm === 'spso'}
            />
          </div>
          <div className="form-group">
            <label htmlFor="major">Major:</label>
            <input
              type="text"
              id="major"
              placeholder="Enter Major"
              required
              disabled={activeForm === 'spso'}
            />
          </div>
          <div className="form-group">
            <label htmlFor="enrollment-year">Enrollment Year:</label>
            <input
              type="date"
              id="enrollment-year"
              placeholder="Enter Enrollment Year"
              required
              disabled={activeForm === 'spso'}
            />
          </div>
          <div className="form-group">
            <label htmlFor="working-location">Working Location:</label>
            <input
              type="text"
              id="working-location"
              placeholder="Enter Working Location"
              required
              disabled={activeForm === 'student'}
            />
          </div>
          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
