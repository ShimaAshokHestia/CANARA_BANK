import React from "react";
import { Navbar, Nav, Container, Button, Offcanvas } from "react-bootstrap";
import "../Style/Navbar.css";
import { useNavigate } from "react-router-dom";

const PublicNavbar: React.FC = () => {
   const navigate = useNavigate();
  return (
    <>
      {/* MAIN NAVBAR */}
      <Navbar expand="lg" className="py-2 bg-white shadow-sm" sticky="top">
        <Container>

          {/* LEFT LOGO + TITLE */}
          <Navbar.Brand className="d-flex align-items-center gap-2">
            <img className="nav-logo" alt="50 Years Logo" />
            <div className="d-flex flex-column lh-sm">
              <span className="fw-semibold nav-title">
                Canara Bank Employees’ Union
              </span>
              <span className="nav-subtitle">
                Golden Jubilee Family Welfare Scheme
              </span>
            </div>
          </Navbar.Brand>

          {/* TOGGLE FOR MOBILE */}
          <Navbar.Toggle aria-controls="offcanvasNavbar" />

          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            className="p-3"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
              {/* NAV LINKS */}
              <Nav className="mx-auto align-items-center gap-lg-4 gap-2">
                <Nav.Link className="nav-item active">Home</Nav.Link>
                <Nav.Link className="nav-item">About Us</Nav.Link>
                <Nav.Link className="nav-item">Rules & Regulations</Nav.Link>
                <Nav.Link className="nav-item">Downloads</Nav.Link>
                <Nav.Link className="nav-item">Managing Committee</Nav.Link>
                <Nav.Link className="nav-item">Claims Settled</Nav.Link>
                <Nav.Link  onClick={() => navigate("/contact-us")} className="nav-item">Contact</Nav.Link>
              </Nav>

              {/* LOGIN BUTTON */}
              <Button className="login-btn ms-lg-4 mt-3 mt-lg-0">
                <i className="bi bi-box-arrow-in-right me-2"></i> Members Login
              </Button>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      {/* BOTTOM CONTACT STRIP */}
      <div className="contact-strip text-white py-1 px-3">
        <Container className="d-flex gap-4 small">
          <span>
            <i className="bi bi-telephone-fill me-1"></i> +91 98765 43210
          </span>
          <span>
            <i className="bi bi-envelope-fill me-1"></i> info@cbfws.org
          </span>
        </Container>
      </div>
    </>
  );
};

export default PublicNavbar;
