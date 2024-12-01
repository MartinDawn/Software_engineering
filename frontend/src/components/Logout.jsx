import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear local storage
    localStorage.clear();
    // Navigate to the home page
    navigate('/');
  }, [navigate]);

  return null;
};

export default Logout;