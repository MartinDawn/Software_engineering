import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  Navbar, 
  Nav, 
  Container, 
  Dropdown,
} from 'react-bootstrap';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Navbarst from '../layouts/Navbar/NavSt';
import api from '../api';

const PaymentHistory = () => {
  const [studentData, setStudentData] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const mockStudentData = { //dữ liệu mẫu để test, test postman thì bỏ đi
    id: 3,
    username: "Doan Ngoc Hoang son",
    email: "123testuser@example.com",
    full_name: "Test User",
    role: "student",
    availablePages: 100,
    major: "Computer Science",
    enrollment_year: "2024-01-01",
    working_location: "",
    department_name: "",
    is_able_buying: false,
    payment_history: [
      {
        owner_id: "tri@",
        transaction_amount: 50000,
        date_payment: "2024-03-15 14:30:00"
      },
      {
        owner_id: "tri@",
        transaction_amount: 100000,
        date_payment: "2024-03-10 09:15:00"
      },
      {
        owner_id: "tri@",
        transaction_amount: 75000,
        date_payment: "2024-03-05 16:45:00"
      }
    ]
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem('ACCESS_TOKEN'); // Retrieve the access token from local storage
        const response = await api.get('/student/buypaper/', {
          headers: {
            'Authorization': `Bearer ${token}` // Add the token to the Authorization header
          }
        });

        const data = response.data;
        // console.log('Student data:', data.payment_histories);
        if (data.payment_histories) {
          setPaymentHistory(data.student.payment_histories);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, []);

  // useEffect(() => {// test postman thì  bỏ đi
  //   // Giả lập việc load dữ liệu
  //   setStudentData(mockStudentData);
  //   setPaymentHistory(mockStudentData.payment_history);
  // }, []);

  const formatDateTime = (dateTimeStr) => {
    return new Date(dateTimeStr).toLocaleString('vi-VN');
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(amount);
  };

  return (
    <>
      {/* Navbar - Fixed at top */}
      {/* Navbar with light gray background */}
      <Navbarst />

      {/* Main Content */}
      <div style={{ 
        paddingTop: '80px',
        paddingBottom: '100px',
        minHeight: 'calc(100vh - 160px)',
        overflow: 'auto'
      }}>
        <Container>
          <div className="bg-white rounded shadow" style={{ overflowX: 'auto' }}>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead style={{ 
                  backgroundColor: '#e9d5ff',
                  position: 'sticky',
                  top: '0',
                  zIndex: 100
                }}>
                  <tr>
                    <th className="p-3">Số tiền giao dịch</th>
                    <th className="p-3">Thời gian thanh toán</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((record, index) => (
                    <tr key={index}>
                      <td className="p-3">{formatAmount(record.transaction_amount)}</td>
                      <td className="p-3">{formatDateTime(record.date_payment)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </div>


    </>
  )
}

export default PaymentHistory;