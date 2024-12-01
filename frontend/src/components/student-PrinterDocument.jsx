import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import bg from '../Image/printer.jpg'
import { PDFDocument } from 'pdf-lib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faMapMarkerAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { 
  Navbar, 
  Nav, 
  Container, 
  Row, 
  Col, 
  Button, 
  Dropdown,
  Form,
  Image,
} from 'react-bootstrap';
import Navbarst from '../layouts/Navbar/NavSt';

const Print = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState(null);
  
  // Dữ liệu mẫu cho danh sách máy in
  const printerList = [
    {
      id: "1",
      name: "HP LaserJet P1102w", 
      location: "Library Floor 1",
    },
    {
      id: "2",
      name: "Canon iX6550",
      location: "Lab Room 202", 
    },
    {
      id: "3",
      name: "Epson L3110",
      location: "Office 305",
    }
  ];

  // State for storing fetched printer list
  const [printers, setPrinters] = useState(printerList);

  // Fetch printer list when component mounts
  // bỏ comment này đi khi test
  /* useEffect(() => {
    const fetchPrinters = async () => {
      try {
        const response = await fetch('/spso/printer/list/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setPrinters(data);
      } catch (error) {
        console.error('Error fetching printer list:', error);
        // Fallback to default printer list if fetch fails
        setPrinters(printerList);
      }
    };

    fetchPrinters();
  }, []); */

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const getFileExtension = (filename) => {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2).toLowerCase();
  };

  const handlePrint = async () => {
    if (selectedFile && selectedPrinter) {
      try {
        // Đọc file để lấy số trang nếu là PDF
        let numberOfPages = 1;
        const fileExt = getFileExtension(selectedFile.name);
        
        if (fileExt === 'pdf') {
          const arrayBuffer = await selectedFile.arrayBuffer();
          const pdfDoc = await PDFDocument.load(arrayBuffer);
          numberOfPages = pdfDoc.getPageCount();
        }

        // Chuẩn bị dữ liệu để gửi
        const printData = {
          student_id: 1, 
          file_name: selectedFile.name,
          file_size: selectedFile.size,
          number_of_pages: numberOfPages,
          printer_id: parseInt(selectedPrinter.id),
          page_type: "A3",
          document_type: getFileExtension(selectedFile.name)
        };

        // Gọi API để in ( test postman ở đây)
        const response = await fetch('http://127.0.0.1:8000/spso/printer/printDocument/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(printData)
        });

        const data = await response.json();
        alert(data.message);

        if (data.message === "Document printed successfully") {
          setSelectedFile(null);
          setSelectedPrinter(null); 
        }

      } catch (error) {
        console.error('Error printing:', error);
        alert('Có lỗi xảy ra khi in tài liệu. Vui lòng thử lại!');
      }
    } else {
      alert('Vui lòng chọn tài liệu và máy in');
    }
  };

  const handlePrinterSelect = (printerId) => {
    const printer = printers.find(p => p.id === printerId);
    setSelectedPrinter(printer);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar with light gray background */}
      <Navbarst />

      {/* Main Content with background */}
      <div style={{
        backgroundImage: `url(${bg})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        flex: '1 0 auto'
      }}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div 
                className={`card shadow-sm ${isDragging ? 'border-primary' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="card-body text-center p-5">
                  <div className="mb-4">
                    <div className="bg-primary text-white p-4 rounded-circle d-inline-block mb-3">
                      <svg 
                        width="48" 
                        height="48" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <h4 className="mb-2">Kéo thả tài liệu vào đây hoặc</h4>
                    <p className="text-muted mb-4">
                      {selectedFile ? selectedFile.name : '-Chọn tài liệu-'}
                    </p>
                    <div className="d-flex justify-content-center gap-3 mb-3">
                      <input
                        type="file"
                        id="fileInput"
                        className="d-none"
                        onChange={handleFileSelect}
                      />
                      <label 
                        htmlFor="fileInput" 
                        className="btn btn-primary px-4"
                      >
                        Chọn tài liệu
                      </label>
                      <Dropdown>
                        <Dropdown.Toggle variant="primary" id="printer-dropdown">
                          {selectedPrinter ? `Printer ${selectedPrinter.id}` : 'Chọn máy in'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {printers.map((printer) => (
                            <Dropdown.Item
                              key={printer.id}
                              onClick={() => handlePrinterSelect(printer.id)}
                            >
                              Printer {printer.id}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    {selectedFile && (
                      <div className="mt-3">
                        <button 
                          className="btn btn-success"
                          onClick={handlePrint}
                          disabled={!selectedPrinter}
                        >
                          In
                        </button>
                        <button 
                          className="btn btn-danger ms-2"
                          onClick={() => {
                            setSelectedFile(null);
                            setSelectedPrinter(null);
                          }}
                        >
                          Hủy
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Print;