import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "../Style/Navbar.css";
import emblem from "../Assets/Images/AIBEA_logo.jpg"
import goldenLogo from "../Assets/Images/Golden-Jubliee-logo.jpg"

const PublicNavbar: React.FC = () => {
  return (
    <>
      {/* Top Ticker Bar */}
      <div className="top-ticker-bar">
        Tuesday, 09 December 2025 ; 1987 - Mass Organisations takes out morcha
        to Parliament including AIBEA on Trade Union rights, minimum wages,
        communalism, corruption at high places etc. 2009 - IBA/
      </div>

      {/* Main Navbar */}
      <Navbar expand="lg" bg="white" className="shadow-sm py-2">
        <Container>

          {/* Left Logo + Text */}
          <div className="d-flex align-items-center gap-2">
            <img
            src={emblem}
              alt="Main Logo"
              className="logo-main"
            />
            <div className="d-flex flex-column lh-sm">
              <span className="fw-semibold text-primary-emphasis">
                Canara Bank Employees’ Union
              </span>
              <span className="small text-warning">
                Golden Jubilee Family Welfare Scheme
              </span>
              <span className="mini-subtitle">
                A Unit of Canara Bank Employees’ Union
              </span>
            </div>

            {/* 50 years logo */}
            <img
                src={goldenLogo}
              alt="Golden Jubilee Logo"
              className="logo-50"
            />
          </div>

          <Navbar.Toggle />

          {/* Navigation Links */}
          <Navbar.Collapse className="justify-content-end">
            <Nav className="align-items-center gap-4 me-3">
              <Nav.Link className="nav-text">Home</Nav.Link>
              <Nav.Link className="nav-text">Rules & Regulations</Nav.Link>
              <Nav.Link className="nav-text">Managing Committee</Nav.Link>
              <Nav.Link className="nav-text">Downloads</Nav.Link>
              <Nav.Link className="nav-text">Claims Settled</Nav.Link>
            </Nav>

            <Button className="login-btn px-4">Login</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default PublicNavbar;
