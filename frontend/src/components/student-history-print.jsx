import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  
  Container, 
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Navbarst from '../layouts/Navbar/NavSt';
import api from '../api';

const SPrintHistory = () => {
  const [studentData, setStudentData] = useState(null);
  const [printHistory, setPrintHistory] = useState([]);
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  const mockStudentData = { //dữ liệu mẫu để test, test thì bỏ đi
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
    print_history: [
      {
        file_name: "Báo cáo đồ án.pdf",
        file_size: 2500000, // 2.5MB
        owner_id: "tri@",
        numberOfPages: 15,
        page_id: "1",
        printerId: "Printer_1",
        datetime: "2024-03-15 14:30:00"
      },
      {
        file_name: "Slide bài giảng.pdf",
        file_size: 1800000, // 1.8MB
        owner_id: "tri@",
        numberOfPages: 45,
        page_id: "2",
        printerId: "Printer_2",
        datetime: "2024-03-14 10:15:00"
      },
      {
        file_name: "Bài tập lớn.docx",
        file_size: 850000, // 850KB
        owner_id: "tri@",
        numberOfPages: 8,
        page_id: "3",
        printerId: "Printer_3",
        datetime: "2024-03-13 16:45:00"
      },
      {
        file_name: "Tài liệu tham khảo.pdf",
        file_size: 3500000, // 3.5MB
        owner_id: "tri@",
        numberOfPages: 72,
        page_id: "4",
        printerId: "Printer_3",
        datetime: "2024-03-12 09:20:00"
      },
      {
        file_name: "Tài liệu tham khảo.pdf",
        file_size: 3500000, // 3.5MB
        owner_id: "tri@",
        numberOfPages: 72,
        page_id: "4",
        printerId: "Printer_3",
        datetime: "2024-03-12 09:20:00"
      }
    ]
  };
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem('ACCESS_TOKEN'); // Retrieve the access token from local storage
        const response = await api.get('/student/printhistory/', {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        });

        const data = response.data;

        if (data.print_histories) {
          setPrintHistory(data.print_histories);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, []);
  /*
  useEffect(() => {
    // Giả lập việc load dữ liệu, test thì bỏ đi
    setStudentData(mockStudentData);
    setPrintHistory(mockStudentData.print_history);
  }, []);
*/
  const formatDateTime = (dateTimeStr) => {
    return new Date(dateTimeStr).toLocaleString('vi-VN');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
        minHeight: 'calc(100vh - 160px)', // Điều chỉnh chiều cao để tránh overflow
        overflow: 'auto' // Thêm overflow để có thể scroll
      }}>
        <Container>
          <div className="bg-white rounded shadow">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead style={{ 
                  backgroundColor: '#e9d5ff',
                  position: 'sticky',
                  top: '0', // Thay đổi giá trị top
                  zIndex: 100
                }}>
                  <tr>
                    <th className="p-3">Tên tài liệu</th>
                    <th className="p-3">Kích thước</th>
                    <th className="p-3">Số trang</th>
                    <th className="p-3">Máy in</th>
                    <th className="p-3">Thời gian in</th>
                  </tr>
                </thead>
                <tbody>
                  {printHistory.map((record, index) => (
                    <tr key={index}>
                      <td className="p-3">{record.file_name}</td>
                      <td className="p-3">{formatFileSize(record.file_size)}</td>
                      <td className="p-3">{record.numberOfPages}</td>
                      <td className="p-3">{record.printerId}</td>
                      <td className="p-3">{formatTimestamp(record.timestamp)}</td>
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

export default SPrintHistory;