import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/PrintHis.css';
import logoBK from '../Image/logo_BK2-removebg.png';
import NavbarMg from '../layouts/Navbar/NavMg';

function Header() {
    return (
        <NavbarMg />
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


function PrintHistory() {
    return (
        <>
            <Header />
            <PrintHistoryFilter />
        </>
    );
}

export default PrintHistory;
