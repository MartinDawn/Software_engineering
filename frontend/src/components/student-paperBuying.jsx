import React, { useState } from 'react';
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
  Modal
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faMapMarkerAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Logo from '../Image/logohcmut.png'
import bg from '../Image/a4.png'

const PaperBuying = () => {
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handlePurchase = async () => {// test postman ở đây
    try {
      const response = await fetch('/student/buypaper/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: quantity,
          user_id: 1,
          cost: quantity * 300
        })
      });

      const data = await response.json();
      setMessage(data.message);
      setShowModal(true);

    } catch (error) {
      console.error('Error:', error);
      setMessage('Có lỗi xảy ra khi xử lý yêu cầu');
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navigation Bar */}
      <Navbar style={{ backgroundColor: '#E8E8E8' }} expand="lg">
        <Container>
          <Navbar.Brand href="#">BK Printer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">In tài liệu</Nav.Link>
              <Nav.Link href="#">Lịch sử in</Nav.Link>
              <Nav.Link href="#">Lịch sử thanh toán</Nav.Link>
              <Nav.Link href="#" className="bg-secondary text-white">Mua trang in</Nav.Link>
            </Nav>
            <div className="d-flex align-items-center">
              <span className="me-3">Số giấy còn lại: 50</span>
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary">
                  <FontAwesomeIcon icon={faUser} /> User
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
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        flex: 1
      }}>
        <Container className="my-5">
          <Row className="justify-content-center">
            <Col md={6} className="text-center p-4" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '10px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <div className="mb-4">
                <h3>Số lượng</h3>
                <div className="d-flex justify-content-center align-items-center gap-3">
                  <Button variant="secondary" onClick={handleDecrement}>-</Button>
                  <Form.Control
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="text-center"
                    style={{ width: '100px' }}
                  />
                  <Button variant="secondary" onClick={handleIncrement}>+</Button>
                </div>
              </div>
              <Button variant="danger" size="lg" onClick={handlePurchase}>Mua ngay</Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Success Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <h4 className={message === "Mua giấy thành công" ? "text-success" : "text-danger"}>
            {message}
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <Container>
          <Row>
            <Col md={4}>
              <h5 className="mb-4" style={{
                marginLeft:11
              }}>
                HCMUT
              </h5>
              <div className="d-flex align-items-center">
                <Image 
                  src={Logo}
                  alt="BK Logo" 
                  width={100}
                  height={100}
                />
              </div>
            </Col>
            <Col md={4}>
              <h5 style={{
                marginLeft:14
              }}>
                DANH MỤC
              </h5>
              <Nav className="flex-column">
                <Nav.Link href="#" className="text-white">Mua thêm giấy</Nav.Link>
                <Nav.Link href="#" className="text-white">Lịch sử in</Nav.Link>
                <Nav.Link href="#" className="text-white">In tài liệu</Nav.Link>
              </Nav>
            </Col>
            <Col md={4}>
              <h5>Liên hệ</h5>
              <div>
                <p><FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                  268 Lý Thường Kiệt, Phường 14, Quận 10, TP.HCM</p>
                <p><FontAwesomeIcon icon={faPhone} className="me-2" />
                  (028) 38 651 670 - (028) 38 647 256</p>
                <p><FontAwesomeIcon icon={faEnvelope} className="me-2" />
                  printermanage@hcmut.edu.vn</p>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default PaperBuying