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
import Logo from '../../Image/logohcmut.png'

function Footer() {
  return (
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
  );
}

export default Footer;