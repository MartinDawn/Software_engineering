import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import user from '../../../public/user.png'; 
import arrowDown from '../../../public/arrow-down.svg'; 
import arrowUp from '../../../public/arrow-up.svg';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="navbar">
      <Link to="/manager" className="logo">BK Printer</Link>
      <div className="menu">
        <Link to="/manager">Trang chủ</Link>
        <Link to="/createaccount">Tài khoản sinh viên</Link>
        <Link to="/manageactivity">Quản lý sinh viên</Link>
        <Link to="/buyingpermis">Quản lý mua giấy</Link>
      </div>
      <div className="user-info">
        <img src={user} alt="User" className="user-logo" onClick={toggleDropdown} />
        <img
          src={dropdownOpen ? arrowUp : arrowDown}
          alt="Toggle Dropdown"
          className="dropdown-arrow"
          onClick={toggleDropdown}
        />
        {dropdownOpen && (
          <div className="dropdown-content">
            <Link to="/login">Tài khoản</Link>
            <Link to="/logout">Đăng xuất</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;