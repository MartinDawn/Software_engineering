import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import '../styles/Manage.css';
import { useState, useEffect } from 'react';
import logoBK from '../Image/logo_BK2-removebg.png';
import api from '../api';
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


function Body() {
    const [showForm, setShowForm] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showPrinter, setShowPrinter] = useState({
        name: '',
        manufacturer: '',
        type: '',
        description: '',
        location: '',
        status: ''
    });
    const [printerDetails, setPrinterDetails] = useState({
        enable_type : '',
        enable_printing : '',
        location : '',
    });
    const [printers, setPrinters] = useState([]);
    // const [printer, setPrinter] = useState({});

    const handleAddPrinter = () => {
        setPrinterDetails({
            enable_type : '',
            enable_printing : '',
            location : '',
        });
        setShowForm(true);
        setShowDetails(false);
    };

    useEffect(() => {
        fetchPrinters();
      }, []);
    
      const fetchPrinters = async () => {
        const token = localStorage.getItem('ACCESS_TOKEN'); // Retrieve the access token from local storage
        try {
          const response = await api.get('/spso/printer/printerActivity/', {
            headers: {
              Authorization: `Bearer ${token}` // Add the token to the Authorization header
            }
          });
          setPrinters(response.data.printers);
        } catch (error) {
          console.error("There was an error fetching the printer data:", error);
        }
      };

      const handlePrinterClick = async (printerId) => {
        const token = localStorage.getItem('ACCESS_TOKEN'); // Retrieve the access token from local storage
        // console.log("Printer ID:", printerId.id);
        try {
          const response = await api.post('/spso/printer/printerActivity/', { id: printerId.id }, {
            headers: {
              Authorization: `Bearer ${token}` // Add the token to the Authorization header
            }
          });
        //   setPrinter(response.data.printer);
          console.log("Response from API:", response.data.printer.id);
        //   console.log("Printer details:", printer.id);
          const printerInfo = {
            name: `Máy in ${response.data.printer.id}`,
            manufacturer: 'Hãng A',
            type: response.data.printer.enable_type,
            description: 'Mô tả máy in',
            location: response.data.printer.location,
            status: response.data.printer.enable_printing ? 'Kích hoạt' : 'Vô hiệu'
          };
          setShowPrinter(printerInfo);
          setShowDetails(true);
          setShowForm(false);
        } catch (error) {
          console.error("There was an error fetching the printer details:", error);
        }
      };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('ACCESS_TOKEN'); // Retrieve the access token from local storage
        try {
          const response = await api.post('/spso/printer/addPrinter/', printerDetails, {
            headers: {
              Authorization: `Bearer ${token}` // Add the token to the Authorization header
            }
          });
          console.log("Response from API:", response.data);
        } catch (error) {
          console.error("There was an error submitting the printer details:", error);
        }
        setShowForm(false);
      };

    return (
        <div>
            <main className="container my-5">
                <div className="header">
                    <h1>Danh sách máy in</h1>
                    <div className="actions">
                        <button className="btn-add" onClick={handleAddPrinter}>Thêm máy in</button>
                        <input type="text" placeholder="Tìm kiếm" className="search-input" />
                    </div>
                </div>

               {showForm && (
        <form onSubmit={handleSubmit} className="add-printer-form">
          <div>
            <label htmlFor="enable_type">Enable Type:</label>
            <input
              type="text"
              id="enable_type"
              value={printerDetails.enable_type}
              onChange={(e) => setPrinterDetails({ ...printerDetails, enable_type: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="enable_printing">Enable Printing:</label>
            <select
              type="text"
              id="enable_printing"
              value={printerDetails.enable_printing}
              onChange={(e) => setPrinterDetails({ ...printerDetails, enable_printing: e.target.value === "kichhoat" })}
              required
            >
            <option value="" disabled>Chọn trạng thái</option>
            <option value="kichhoat">Kích hoạt</option>
            <option value="vohieu">Vô hiệu</option>
            </select>
          </div>
          <div>
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              value={printerDetails.location}
              onChange={(e) => setPrinterDetails({ ...printerDetails, location: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn-primary">Lưu máy in</button>
          <button type="button" onClick={() => setShowForm(false)}>Hủy</button>
        </form>
      )}
{showDetails && (
                    <div className="printer-details">
                        <h2>Thông tin máy in</h2>
                        <p><strong>Tên máy in:</strong> {showPrinter.name}</p>
                        <p><strong>Hãng sản xuất:</strong> {showPrinter.manufacturer}</p>
                        <p><strong>Loại máy:</strong> {showPrinter.type}</p>
                        <p><strong>Mô tả:</strong> {showPrinter.description}</p>
                        <p><strong>Cơ sở:</strong> {showPrinter.location}</p>
                        <p><strong>Trạng thái:</strong> {showPrinter.status}</p>
                        <button className="btn-activate" onClick={() => alert('Kích hoạt máy in')}>Kích hoạt</button>
                        <button className="btn-disable" onClick={() => alert('Vô hiệu hóa máy in')}>Vô hiệu hóa</button>
                        <button onClick={() => setShowDetails(false)}>Trở lại</button>
                    </div>
                )}

                <div className="printer-list">
                {printers.map((printer) => (
            <div key={printer.id} className="printer-item">
              <img src="https://phucanhcdn.com/media/product/23196_may_in_canon_lbp6230dn_03.jpg" alt={`Máy in ${printer.id}`} className="mx-auto mb-2" />
              <button className="btn-primary" onClick={() => handlePrinterClick(printer)}>Máy in {printer.id}</button>
            </div>
          ))}
                </div>
            </main>
        </div>
    );
}
function Footer() {
    return (
        <>
              <footer className="footer">
                <div className="left d-flex align-items-center">
                    <img src={logoBK} alt="HCMUT logo" />
                    <span className="info">HCMUT</span>
                </div>
                <div className="center">
                    <div className="info"><span>DANH MỤC</span></div>
                    <div className="info">Báo cáo</div>
                    <div className="info">Quản lý</div>
                    <div className="info">Lịch sử dịch vụ</div>
                </div>
                <div className="right">
                    <div className="info"><span>LIÊN HỆ</span></div>
                    <div className="info">268 Lý Thường Kiệt, phường 14, quận 10, TP.HCM</div>
                    <div className="info">(028) 38 651 670 - (028) 38 647 256 (Ext: 5258, 5234)</div>
                </div>
            </footer>
        </>
    );
}
function Manage() {
    return (
        <>
            <Header />
            <Body />
            <Footer />
        </>
    );
}
export default Manage;
