import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../Style/AboutUs.css";

const AboutUs: React.FC = () => {
  return (
    <div className="about-wrapper">

      {/* HEADER */}
      <div className="about-header text-center py-5">
        <h2 className="about-title text-white">
          <i className="bi bi-people-fill me-2"></i>
          About Us
        </h2>
        <p className="about-subtitle">
          50 years of dedicated service to bank employees and their families
        </p>
      </div>

      <Container className="py-5">

        {/* MISSION + VISION */}
        <Row className="g-4 mb-4">
          <Col md={6}>
            <Card className="about-card p-4">

              {/* Icon beside heading */}
              <div className="heading-row d-flex align-items-center mb-3">
                <div className="icon-box me-2">
                  <i className="bi bi-heart-fill"></i>
                </div>
                <h5 className="section-heading mb-0">Our Mission</h5>
              </div>

              <p className="section-text">
                To extend a helping hand to the families of our deceased colleagues by providing
                financial assistance through lumpsum relief and monthly pension, ensuring their
                welfare and dignity during difficult times.
              </p>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="about-card p-4">

              {/* Icon beside heading */}
              <div className="heading-row d-flex align-items-center mb-3">
                <div className="icon-box me-2">
                  <i className="bi bi-bullseye"></i>
                </div>
                <h5 className="section-heading mb-0">Our Vision</h5>
              </div>

              <p className="section-text">
                To create a strong community of bank employees united in their commitment to support
                one another, ensuring that no family is left without support in their hour of need.
              </p>
            </Card>
          </Col>
        </Row>

        {/* HISTORY */}
        <Row>
          <Col md={12}>
            <Card className="history-card p-4">

              {/* Icon beside heading */}
              <div className="heading-row d-flex align-items-center mb-3">
                <div className="icon-box me-2">
                  <i className="bi bi-clock-history"></i>
                </div>
                <h5 className="section-heading mb-0">Our History</h5>
              </div>

              <p className="section-text">
                The Scheme was launched at Thiruvananthapuram on December 18, 2002 by the then
                General Secretary of Canara Bank Employees’ Union Com A N Balasubramanian…
              </p>

              <p className="section-text">
                The Rules and Regulations for the Scheme were formulated by the Central Committee
                held at Goa on 29th and 30th June 2002…
              </p>

              <p className="section-text">
                The Scheme was launched with a humble refundable contribution of Rs. 50/- per month…
              </p>

              <p className="section-text">
                The Scheme also gives monthly pension of upto Rs. 1250/-…
              </p>

              <p className="section-text">
                We salute all the members of the Scheme who have joined in this noble task…
              </p>

              <p className="section-text fw-bold">News Update</p>
            </Card>
          </Col>
        </Row>

      </Container>
    </div>
  );
};

export default AboutUs;
