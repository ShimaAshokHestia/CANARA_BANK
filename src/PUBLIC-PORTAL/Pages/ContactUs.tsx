import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "../Style/ContactUs.css";
import { PublicService } from "../../Services/PublicService";

const ContactUs: React.FC = () => {
  const contact = PublicService.contact
  return (
    <div className="contact-page-wrapper">

      {/* Header Section */}
      <div className="contact-header text-center py-4">
        <h2 className="contact-title">{contact?.header.title}</h2>
        <p className="contact-subtitle">
          {contact?.header.subtitle}
        </p>
      </div>

      <Container className="my-5">
        <Row className="g-4">

          {/* LEFT FORM CARD */}
          <Col lg={7} md={12}>
            <Card className="contact-card p-4">
              <h5 className="fw-bold mb-4">{contact?.form.title}</h5>

              <Form>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Label>{contact?.form.fields.fullName.label}</Form.Label>
                    <Form.Control placeholder={contact?.form.fields.fullName.placeholder} />
                  </Col>

                  <Col md={6}>
                    <Form.Label>{contact?.form.fields.phone.label}</Form.Label>
                    <Form.Control placeholder={contact?.form.fields.phone.placeholder} />
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>{contact?.form.fields.email.label}</Form.Label>
                  <Form.Control placeholder={contact?.form.fields.email.placeholder} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>{contact?.form.fields.subject.label}</Form.Label>
                  <Form.Control placeholder={contact?.form.fields.subject.placeholder} />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>{contact?.form.fields.message.label}</Form.Label>
                  <Form.Control as="textarea" rows={contact?.form.fields.message.rows} placeholder={contact?.form.fields.message.placeholder} />
                </Form.Group>

                <Button className="send-btn w-100">
                  <i className={contact?.form.submitButton.iconclass}></i> {contact?.form.submitButton.label}
                </Button>
              </Form>
            </Card>
          </Col>

          {/* RIGHT INFO COLUMN */}
          <Col lg={5} md={12}>
            <Card className="contact-card p-4 mb-4">
              <h5 className="fw-bold mb-4">{contact?.officeInfo.title}</h5>

              <div className="info-block d-flex align-items-start gap-3 mb-3">
                <div className="icon-circle">
                  <i className={contact?.officeInfo.address.iconclass}></i>
                </div>
                <div>
                  <strong>{contact?.officeInfo.address.label}</strong>
                  <p className="mb-0 small">
                    {contact?.officeInfo.address.lines.line1}<br />
                    {contact?.officeInfo.address.lines.line2}
                  </p>
                </div>
              </div>

              <div className="info-block d-flex align-items-start gap-3 mb-3">
                <div className="icon-circle">
                  <i className={contact?.officeInfo.phone.iconclass}></i>
                </div>
                <div>
                  <strong>{contact?.officeInfo.phone.label}</strong>
                  <p className="mb-0 small">{contact?.officeInfo.phone.value}</p>
                </div>
              </div>

              <div className="info-block d-flex align-items-start gap-3">
                <div className="icon-circle">
                  <i className={contact?.officeInfo.email.iconclass}></i>
                </div>
                <div>
                  <strong>{contact?.officeInfo.email.label}</strong>
                  <p className="mb-0 small">{contact?.officeInfo.email.value}</p>
                </div>
              </div>
            </Card>

            {/* OFFICE HOURS */}
            <Card className="office-hours-card p-4">
              <h5 className="fw-bold mb-4 text-white">{contact?.officeHours.title}</h5>

              {contact?.officeHours.timings.map((item, index) => (
                <Row key={index} className={index !== contact.officeHours.timings.length - 1 ? "mb-3" : ""}>
                  <Col xs={6} className="text-white">
                    {item.day}
                  </Col>
                  <Col xs={6} className="text-end fw-bold text-white">
                    {item.time}
                  </Col>
                </Row>
              ))}
            </Card>
          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default ContactUs;
