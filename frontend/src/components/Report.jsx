import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import '../styles/Report.css';
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
                <li><a href="/" className={({ isActive }) => isActive ? 'tt-active' : 'tt-noactive'}>Trang chủ</a></li>
                <li><a href="/SPSO/manage" className={({ isActive }) => isActive ? 'tt-active' : 'tt-noactive'} >Quản Lý</a></li>
                <li><a href="/printhistory" className={({ isActive }) => isActive ? 'tt-active' : 'tt-noactive'}>Lịch sử hệ thống</a></li>
                <li><a href="/report" className={({ isActive }) => isActive ? 'tt-active' : 'tt-noactive'}>Báo Cáo</a></li>
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

function Body() {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from({ length: 10 }, (_, i) => 2024 - i); // Hiển thị từ 2024 đến 2015

    const [selectedReportType, setSelectedReportType] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="flex-grow-1">
                <div className="container py-4">
                    <div className="card">
                        <div className="header">
                            <div className="col">
                                <label className="text-gray-700">Chọn loại báo cáo</label>
                                <select 
                                    className="form-select" 
                                    value={selectedReportType} 
                                    onChange={(e) => setSelectedReportType(e.target.value)}
                                >
                                    <option value="" disabled>Chọn loại báo cáo</option>
                                    <option value="thang">Theo tháng</option>
                                    <option value="nam">Theo năm</option>
                                    <option value="tatca">Tất cả</option>
                                </select>
                            </div>
                            <div className="col">
                                <label className="text-gray-700">Chọn tháng</label>
                                <select 
                                    className="form-select" 
                                    value={selectedMonth} 
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                >
                                    <option value="" disabled>Chọn tháng</option>
                                    {months.map(month => (
                                        <option key={month} value={month}>Tháng {month}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col">
                                <label className="text-gray-700">Chọn năm</label>
                                <select 
                                    className="form-select" 
                                    value={selectedYear} 
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                >
                                    <option value="" disabled>Chọn năm</option>
                                    {years.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Số thứ tự</th>
                                    <th>Tháng</th>
                                    <th>Năm</th>
                                    <th>Chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { id: 1, month: 10, year: 2024, detail: "Báo cáo tháng 10/2024" },
                                    { id: 2, month: 9, year: 2024, detail: "Báo cáo tháng 9/2024" },
                                    { id: 3, month: 8, year: 2024, detail: "Báo cáo tháng 8/2024" },
                                    { id: 4, month: 7, year: 2024, detail: "Báo cáo tháng 7/2024" },
                                    { id: 5, month: 6, year: 2024, detail: "Báo cáo tháng 6/2024" },
                                    { id: 6, month: 5, year: 2024, detail: "Báo cáo tháng 5/2024" },
                                    { id: 7, month: 4, year: 2024, detail: "Báo cáo tháng 4/2024" },
                                    { id: 8, month: 3, year: 2024, detail: "Báo cáo tháng 3/2024" },
                                    { id: 9, month: 2, year: 2024, detail: "Báo cáo tháng 2/2024" },
                                ].map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.month}</td>
                                        <td>{item.year}</td>
                                        <td className="text-primary">
                                            <a href="#">{item.detail}</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
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

function Report() {
    return (
        <>
            <Header />
            <Body />
            <Footer />
        </>
    );
}

export default Report;