import "../styles/ManageActivity.css";
import React, {useEffect, useState} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/PrintHis.css';
import ViewPrintButton from '../app/buttons/ViewPrintHistoryButton/ViewPrintButton';
import ViewPaymentButton from '../app/buttons/ViewPaymentButton/ViewPay';
import api from '../api';

const ManageActivity = ({ isBuyingEnabled }) => {
  const statusClass = isBuyingEnabled ? "status on" : "status off";
  const statusText = isBuyingEnabled ? "On" : "Off";

  const [selectedPrinter, setSelectedPrinter] = useState('');
  const [printHistoryData, setPrintHistoryData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [endDate, setEndDate] = useState(null);
  const [userId, setUserId] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const printers = ["Printer 1", "Printer 2", "Printer 3", "Printer 4"];


  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await api.get('/spso/printer/studentActivity/', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
            }
          });
  
          const data = response.data;
          setPrintHistoryData(data.students);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

  const handleFetchUserInfo = async () => {
      try {
          const response = await fetch(`https://api.example.com/users/${userId}`);
          const data = await response.json();
          setUserInfo(data.student);
      } catch (error) {
          console.error('Error fetching user info:', error);
      }
  };

  return (
      <div className="his-container">
          <h2>Lịch sử in</h2>
          <div className="filter-container">
              <div className='sub-filter'>
                  
                  <input
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder='Nhập ID người dùng'
                  />
                  <button onClick={handleFetchUserInfo}>Tìm</button>
              </div>
        
          
          </div>
          {userInfo && (
              <div className="user-info">
                  <h3>Thông tin người dùng</h3>
                  <p>ID: {userInfo.id}</p>
                  <p>Tên đăng nhập: {userInfo.username}</p>
                  <p>Email: {userInfo.email}</p>
                  <p>Họ và tên: {userInfo.full_name}</p>
                  <p>Vai trò: {userInfo.role}</p>
                  <p>Số trang còn lại: {userInfo.availablePages}</p>
                  <p>Ngành học: {userInfo.major}</p>
                  <p>Năm nhập học: {userInfo.enrollment_year}</p>
              </div>
          )}
          <table className="print-history-table">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Tên người dùng</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Số trang còn lại</th>
                      <th>Ngành</th>
                      <th>Năm nhập học</th>
                      <th>Xem lịch sử mua giấy </th>
                      <th>Xem lịch sử in </th>
                  </tr>
              </thead>
              <tbody>
                  {printHistoryData.map((item) => (
                      <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.username}</td>
                          <td>{item.email}</td>
                          <td>{item.role}</td>
                          <td>{item.availablePages}</td>
                          <td>{ item.major}</td>
                          <td>{ item.enrollment_year}</td>
                          <th> <ViewPaymentButton paymentHistory={item.payment_history}/></th>
                          <th> <ViewPrintButton printHistory={item.print_history} /> </th>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
};

export default ManageActivity;
