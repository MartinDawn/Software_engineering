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

function PrintHistoryFilter()
{
    const [selectedPrinter, setSelectedPrinter] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [endDate, setEndDate] = useState(null);
    const printers = ["Printer 1", "Printer 2", "Printer 3", "Printer 4"];
    const printHistoryData = [
        { id: 16, name: "BIG DATA ANALYSIS_Nhom 17.pdf", printer: "Máy in 1", startTime: "09/12/2023, 22:40:46", endTime: "09/12/2023, 22:40:46", status: "Chưa in" },
        { id: 15, name: "Assignment_2__Computer_Network.pdf", printer: "Máy in 2", startTime: "09/12/2023, 22:37:54", endTime: "09/12/2023, 22:37:54", status: "Chưa in" },
        // Add more rows as needed
    ];
    return(

        <div className="his-container">
            <h2>Lịch sử in</h2>
            
            <div className="filter-container">
                <div className='sub-filter'>
                    <span>Tên</span>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder='Nhập tên sinh viên'
                    />
                </div>
                <div className='sub-filter'>
                    <label>Chọn máy in</label>
                    <select
                        value={selectedPrinter}
                        onChange={(e) => setSelectedPrinter(e.target.value)}
                    >
                        <option value="">Chọn máy in</option>
                        {printers.map((printer, index) => (
                            <option key={index} value={printer}>{printer}</option>
                        ))}
                    </select>
                </div>
                <div className='sub-filter' >
                    <label>Chọn ngày bắt đầu</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd/mm/yyyy"
                    />
                </div>
                <div className='sub-filter'>
                    <label>Chọn ngày kết thúc</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd/mm/yyyy"
                    />
                </div>
            </div>
            
            <table className="print-history-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên tài liệu</th>
                        <th>Máy in</th>
                        <th>Thời gian bắt đầu</th>
                        <th>Thời gian kết thúc</th>
                        <th>Trạng thái</th>
                        <th>Xem chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {printHistoryData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.printer}</td>
                            <td>{item.startTime}</td>
                            <td>{item.endTime}</td>
                            <td><span className="status-badge">{item.status}</span></td>
                            <td><button className="details-button">🔍</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
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