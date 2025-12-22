import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../Style/Footer.css";
import logo from "../Assets/Images/AIBEA_logo.jpg"
import { useNavigate } from "react-router-dom";
import { PublicService } from "../../Services/PublicService";

const Footer: React.FC = () => {
  const navigate = useNavigate()
  const footer = PublicService.footer
  return (
    <footer className="footer-wrapper mt-auto">
      <Container className="py-5">

        <Row className="g-4 text-white">

          {/* Logo + About */}
          <Col md={4} sm={12}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <img src={logo} className="footer-logo" alt={footer?.brand.logoAlt} />
              <div>
                <h6 className="fw-bold mb-0">{footer?.brand.shortName}</h6>
                <span className="small text-muted-gold">{footer?.brand.subtitle}</span>
              </div>
            </div>

            <p className="footer-desc mt-2">
              {footer?.brand.description}
            </p>
          </Col>

          {/* Contact */}
          <Col md={4} sm={12}>
            <h6 className="fw-bold mb-3">{footer?.contact.contacthead}</h6>

            <p className="mb-1 footer-light">
              {footer?.contact.address.line1}<br />
              &nbsp;&nbsp;&nbsp;{footer?.contact.address.line2}
            </p>

            <div className="d-flex align-items-center gap-2 footer-light">
              <i className="bi bi-telephone-fill text-gold"></i>
              <span>{footer?.contact.phone.value}</span>
            </div>

            <div className="d-flex align-items-center gap-2 footer-light mt-2">
              <i className={footer?.contact.email.iconclass}></i>
              <span>{footer?.contact.email.value}</span>
            </div>
          </Col>

          {/* Quick Links */}
          <Col md={2} sm={6} xs={6}>
            <h6 className="fw-bold mb-3">{footer?.quickhead}</h6>
            <ul className="footer-links">
              {footer.quickLinks.map((link, index) => (
                <li key={index} onClick={() => navigate(link.route)}>
                  {link.label}
                </li>
              ))}
            </ul>

          </Col>

          {/* Office Hours */}
          <Col md={2} sm={6} xs={6}>
            <h6 className="fw-bold mb-3">{footer?.officeHours.officehead}</h6>

            <div className="d-flex align-items-start gap-2 footer-light">
              <i className="bi bi-clock text-gold"></i>
              <div>
                <span>{footer?.officeHours.weekdays.label}</span><br />
                <strong>{footer?.officeHours.weekdays.time}</strong>
              </div>
            </div>

            <div className="mt-3 footer-light">
              <span>{footer?.officeHours.saturday.label}</span><br />
              <strong>{footer?.officeHours.saturday.time}</strong>
            </div>

            <Button className="mt-3 schedule-btn">{footer?.officeHours.actionButton.label}</Button>
          </Col>

        </Row>

      </Container>

      {/* Bottom Bar */}
      <div className="footer-bottom text-white py-3 px-3">
        <Container className="d-flex justify-content-between flex-wrap text-center">
          <div className="small">
            {footer?.bottomBar.copyright}
          </div>

          <div className="small footer-links d-flex gap-3">
            <div className="small footer-links d-flex gap-3">
              {footer.bottomBar.links.map((link, index) => (
                <span key={index} onClick={() => navigate(link.route)}>
                  {link.label}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
