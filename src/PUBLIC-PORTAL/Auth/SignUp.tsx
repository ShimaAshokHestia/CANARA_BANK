import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { UserPlus, Mail, Lock } from "lucide-react";
import "../Style/Auth.css";

interface Props {
  show: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const SignupModal: React.FC<Props> = ({ show, onClose, onLogin }) => {
  return (
    <Modal show={show} onHide={onClose} centered className="auth-modal">
      {/* Header Section (No Change) */}
      <div className="auth-header">
        <div className="auth-icon">
          <UserPlus size={32} className="auth-icon-gold" />
        </div>
        <h4 className="auth-title">New User Registration</h4>
        <p className="auth-sub">Join our community of members</p>
      </div>

      {/* Body Starts */}
      <Modal.Body className="auth-body">
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>User Name *</Form.Label>
                <Form.Control placeholder="Enter your name" />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Employee Id *</Form.Label>
                <Form.Control placeholder="Enter employee id" />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Password *</Form.Label>
                <div className="input-icon-wrapper">
                  <Lock className="input-icon" />
                  <Form.Control type="password" placeholder="Enter password" />
                </div>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password *</Form.Label>
                <div className="input-icon-wrapper">
                  <Lock className="input-icon" />
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                  />
                </div>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email Id *</Form.Label>
                <div className="input-icon-wrapper">
                  <Mail className="input-icon" />
                  <Form.Control type="email" placeholder="Enter email" />
                </div>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label>Phone No *</Form.Label>
                <Form.Control placeholder="Enter phone number" />
              </Form.Group>
            </Col>
          </Row>

          {/* Register Button (No Change) */}
          <Button className="auth-btn w-100">
            <UserPlus size={18} className="me-2" /> Register
          </Button>
        </Form>

        {/* Footer Section (No Change) */}
        <div className="auth-footer">
          Already have an account?{" "}
          <button className="auth-link" onClick={onLogin}>
            Sign in
          </button>
        </div>

        <p className="auth-help">
          Need help? Call <a href="tel:04442035575">044-42035575</a>
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default SignupModal;
