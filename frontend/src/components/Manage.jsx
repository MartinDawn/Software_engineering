import '../styles/Manage.css';
import { useState, useEffect } from 'react';
import api from '../api';
import NavbarMg from '../layouts/Navbar/NavMg';
import { setLineJoin } from 'pdf-lib';
import ViewPrinterHistoryButton from '../app/buttons/ViewPrinterHistoryButton/ViewPrinterHistoryButton';
function Header() {
    return (
        <NavbarMg />
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
        console.log("Printer ID:", printerId);
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
            name: response.data.printer.id,
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

      const handleEnablePrinting = async (printerId) => {
        try {
          const response = await api.post('/spso/printer/enablePrinting/', {
            id: printerId
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`, // Add the token to the Authorization header
            }
          });
    
          if (response.status === 200) {
            alert('Máy in đã được kích hoạt thành công');
          } else {
            alert('Có lỗi xảy ra khi kích hoạt máy in');
          }
        } catch (error) {
          console.error('Error enabling printer:', error);
          alert('Có lỗi xảy ra khi kích hoạt máy in');
        }
      };

      const handleDisablePrinting = async (printerId) => {
        try {
          const response = await api.post('/spso/printer/disablePrinting/', {
            id: printerId
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
            }
          });
          if (response.status === 200) {
            alert('Máy in đã được vô hiệu hoá');
          } else {
            alert('Có lỗi xảy ra khi kích hoạt máy in');
          }
        } catch (error) {
          console.error('Error enabling printer:', error);
          alert('Có lỗi xảy ra khi kích hoạt máy in');
        }
      };

      const handleDeletePrinter = async (printerId) => {
        console.log("Printer ID:", printerId);
        try {
          const response = await api.delete(`/spso/printer/deletePrinting/${printerId}/`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
            }
          });
          if (response.status === 200) {
            alert('Máy in đã được xóa');
          } else {
            alert('Có lỗi xảy ra khi xóa máy in');
          }
        } catch (error) {
          console.error('Error deleting printer:', error);
          alert('Có lỗi xảy ra khi xóa máy in');
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
                        <p><strong>Loại tài liệu cho phép:</strong> {showPrinter.type}</p>
                        <p><strong>Mô tả:</strong> {showPrinter.description}</p>
                        <p><strong>Cơ sở:</strong> {showPrinter.location}</p>
                        <p><strong>Trạng thái:</strong> {showPrinter.status}</p>
                        <button className="btn-activate" onClick={() => handleEnablePrinting(showPrinter.name)}>Kích hoạt</button>
                        <button className="btn-disable" onClick={() => handleDisablePrinting(showPrinter.name)}>Vô hiệu hóa</button>
                        <button className="btn-disable"  onClick={() => handleDeletePrinter(showPrinter.name)}>Xóa máy in</button>
                        <button onClick={() => setShowDetails(false)}>Trở lại</button>
                    </div>
                )}

                <div className="printer-list">
                {printers.map((printer) => (
            <div key={printer.id} className="printer-item">
              <img src="https://phucanhcdn.com/media/product/23196_may_in_canon_lbp6230dn_03.jpg" alt={`Máy in ${printer.id}`} className="mx-auto mb-2" />
              <button className="btn-primary" onClick={() => handlePrinterClick(printer)}>Máy in {printer.id}</button>
              <ViewPrinterHistoryButton  printerHistory={printer.print_history}/>
            </div>
          ))}
                </div>
            </main>
        </div>
    );
}
function Manage() {
    return (
        <>
            <Header />
            <Body />
        </>
    );
}
export default Manage;
