import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/PrintHis.css';
import logoBK from '../Image/logo_BK2-removebg.png';

function Header() {
    return (
        <div className="tt-navbar">
            <div className="tt-logo-SPSS">
                <span>
                    <img src={logoBK} alt="Logo đh BK" /> 
                </span>
                <span className="tt-SPSS">SPSS</span>
            </div>
            <ul className="tt-nav-links">
                <li><a href="/" className="tt-active">Trang chủ</a></li>
                <li><a href="/manage">Quản Lý</a></li>
                <li><a href="/printhistory">Lịch sử hệ thống</a></li>
                <li><a href="/report">Báo Cáo</a></li>
            </ul>
            <div className="tt-notification">
                <span className="tt-iconbell">🔔</span>
                <span className="notification-badge">3</span>
            </div>
            <div className="tt-user">
                <span className="tt-iconuser">👤</span>
                <span>SPSO</span>
                <span className="tt-angledown">▼</span>
            </div>
        </div>
    );
}

function PrintHistoryFilter() {
    const [selectedPrinter, setSelectedPrinter] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [endDate, setEndDate] = useState(null);
    const [userId, setUserId] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const printers = ["Printer 1", "Printer 2", "Printer 3", "Printer 4"];
    const printHistoryData = [
        { id: 16, name: "CanNguyen", email: "cannguyentest@gmail.com", role: "Student", availablePages: "100", major:"Computer Science" ,enrollmentYear: "2022" },
        { id: 15, name: "Leo", email: "leotest@gmail.com", role: "Manager", availablePages: "150",major:"Computer Science", enrollmentYear: "2020" },
        // Add more rows as needed
    ];

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
           
                <div className='sub-filter'>
                    
                    <select
                        value={selectedPrinter}
                        onChange={(e) => setSelectedPrinter(e.target.value)}
                    >
                        <option value="">Chọn máy in</option>
                        {printers.map((printer, index) => (
                            <option key={index} value={printer}>{printer}</option>
                        ))}
                    </select>
                    <button>Xác nhận</button>
                </div>
                <button className="viewallUser">Xem tất cả người dùng</button>
            
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
                    </tr>
                </thead>
                <tbody>
                    {printHistoryData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                            <td>{item.availablePages}</td>
                            <td>{ item.major}</td>
                            <td>{ item.enrollmentYear}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-left d-flex align-items-center">
                <img src={logoBK} alt="HCMUT logo" />
                <span className="info">HCMUT</span>
            </div>
            <div className="footer-center">
                <div className="info"><span>DANH MỤC</span></div>
                <div className="info">Báo cáo</div>
                <div className="info">Quản lý</div>
                <div className="info">Lịch sử dịch vụ</div>
            </div>
            <div className="footer-right">
                <div className="info"><span>LIÊN HỆ</span></div>
                <div className="info">268 Lý Thường Kiệt, phường 14, quận 10, TP.HCM</div>
                <div className="info">(028) 38 651 670 - (028) 38 647 256 (Ext: 5258, 5234)</div>
            </div>
        </footer>
    );
}

function PrintHistory() {
    return (
        <>
            <Header />
            <PrintHistoryFilter />
            <Footer />
        </>
    );
}

export default PrintHistory;
