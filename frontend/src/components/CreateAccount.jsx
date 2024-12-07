import React, { useState } from 'react';
import '../styles/CreateAccount.css'; 
import api from '../api';

const CreateAccount = () => {
  const [activeForm, setActiveForm] = useState('student');
  const [accountData, setAccountData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student',
    full_name: '',
    availablePages: '',
    working_location: '',
    major: '',
    enrollment_year: '',
  });

  const handleFormSwitch = (form) => {
    setAccountData({
      username: '',
      email: '',
      password: '',
      role: form,
      full_name: '',
      availablePages: '',
      working_location: '',
      major: '',
      enrollment_year: '',
    });
    setActiveForm(form);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setAccountData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(accountData); // Log the entered data

    try {
      const response = await api.post('/signup/', accountData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        }
      });

      if (response.status === 201) {
        alert('Account created successfully');
      } else {
        alert('Error creating account');
      }
    } catch (error) {
      console.error('Error creating account:', error);
      alert('Error creating account');
    }
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
          className={`form-switch-button ${activeForm === 'SPSO' ? 'active' : ''}`}
          onClick={() => handleFormSwitch('SPSO')}
        >
          SPSO
        </button>
      </div>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter Username"
            value={accountData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            value={accountData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={accountData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fullname">Full Name:</label>
          <input
            type="text"
            id="full_name"
            placeholder="Enter Full Name"
            value={accountData.full_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="availablePages">Available Pages:</label>
          <input
            type="number"
            id="availablePages"
            placeholder="Enter Available Pages"
            value={accountData.availablePages}
            onChange={handleInputChange}
          />
        </div>
            <div className="form-group">
              <label htmlFor="major">Major:</label>
              <input
                type="text"
                id="major"
                placeholder="Enter Major"
                value={accountData.major}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="enrollment_year">Enrollment Year:</label>
              <input
                type="date"
                id="enrollment_year"
                placeholder="Enter Enrollment Year"
                value={accountData.enrollment_year}
                onChange={handleInputChange}
                required
              />
            </div>
          <div className="form-group">
            <label htmlFor="workingLocation">Working Location:</label>
            <input
              type="text"
              id="working_location"
              placeholder="Enter Working Location"
              value={accountData.working_location}
              onChange={handleInputChange}
              // required
            />
          </div>
        <button type="submit" className="btn-submit">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;