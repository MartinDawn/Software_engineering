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

const PrintHistory = () => {
  const [studentData, setStudentData] = useState(null);
  const [printHistory, setPrintHistory] = useState([]);
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
  /*useEffect(() => { // fetch data thì bỏ cái comment này
    const fetchStudentData = async () => {
      try {
        const response = await fetch('/spso/printer/studentActivity/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "id": "3"  // Hard-coded ID for now
          })
        });
        
        const data = await response.json();
        setStudentData(data.student);
        
        if (data.student && data.student.print_history) {
          setPrintHistory(data.student.print_history);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, []);*/
  useEffect(() => {
    // Giả lập việc load dữ liệu, test thì bỏ đi
    setStudentData(mockStudentData);
    setPrintHistory(mockStudentData.print_history);
  }, []);

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
      <Navbar 
        style={{ 
          backgroundColor: '#E8E8E8',
          position: 'fixed',
          width: '100%',
          top: 0,
          zIndex: 1000,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
        expand="lg"
      >
        <Container>
          <Navbar.Brand href="#">BK Printer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">In tài liệu</Nav.Link>
              <Nav.Link href="#" className="bg-secondary text-white">Lịch sử in</Nav.Link>
              <Nav.Link href="#">Lịch sử thanh toán</Nav.Link>
              <Nav.Link href="#">Mua trang in</Nav.Link>
            </Nav>
            <div className="d-flex align-items-center">
              <span className="me-3">Số giấy còn lại: {studentData?.availablePages || 0}</span>
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary">
                  <FontAwesomeIcon icon={faUser} /> {studentData?.username || 'User'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Thông tin</Dropdown.Item>
                  <Dropdown.Item href="#">Đăng xuất</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

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
                      <td className="p-3">{formatDateTime(record.datetime)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </div>

      {/* Footer */}
      <footer 
        style={{ 
          backgroundColor: '#E8E8E8',
          position: 'fixed',
          bottom: 0,
          width: '100%',
          zIndex: 1000,
          boxShadow: '0 -2px 4px rgba(0,0,0,0.1)'
        }}
        className="py-4"
      >
        <Container>
          <div className="row align-items-center">
            <div className="col-md-8 text-center text-md-start">
              <small className="text-muted">
                Địa chỉ: 268 Lý Thường Kiệt, Phường 14, Quận 10, Hồ Chí Minh
              </small>
            </div>
            <div className="col-md-4 text-center text-md-end mt-3 mt-md-0">
              <span className="text-muted me-2">Liên Hệ</span>
              <button className="btn btn-link text-dark p-1">
                <Facebook size={20} />
              </button>
              <button className="btn btn-link text-dark p-1">
                <Twitter size={20} />
              </button>
              <button className="btn btn-link text-dark p-1">
                <Instagram size={20} />
              </button>
            </div>
          </div>
        </Container>
      </footer>
    </>
  )
}

export default PrintHistory;