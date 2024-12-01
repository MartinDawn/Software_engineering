import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import user from '../../../public/user.png'; 
import arrowDown from '../../../public/arrow-down.svg'; 
import arrowUp from '../../../public/arrow-up.svg';

const Navbarst = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="navbar">
      <Link to="/student" className="logo">BK Printer</Link>
      <div className="menu">
        <Link to="/student">Trang chủ</Link>
        <Link to="/student-PrintDocument" >In tài liệu</Link>
        <Link to="/sprintHistory">Lịch sử in</Link>
        <Link to="/paymentHistory">Lịch sử thanh toán</Link>
        <Link to="/paperBuying">Mua trang in</Link>
      </div>

      <div className="user-info">
      <span className="me-3">Số giấy còn lại: 50</span>
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

export default Navbarst;