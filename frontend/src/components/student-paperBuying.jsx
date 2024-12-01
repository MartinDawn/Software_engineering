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
import Navbarst from '../layouts/Navbar/NavSt';

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
      {/* Navbar with light gray background */}
      <Navbarst />

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

     
    </div>
  );
};

export default PaperBuying