import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import '../styles/Report.css';
import logoBK from '../Image/logo_BK2-removebg.png';
import NavbarMg from '../layouts/Navbar/NavMg';

function Header() {
    return (
      <NavbarMg />
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


function Report() {
    return (
        <>
            <Header />
            <Body />
        </>
    );
}

export default Report;