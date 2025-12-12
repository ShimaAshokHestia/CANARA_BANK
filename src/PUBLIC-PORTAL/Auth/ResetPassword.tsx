// ResetPasswordModal.tsx
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ArrowLeft, KeyRound, Mail } from "lucide-react";
import "../Style/Auth.css";

interface Props {
  show: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const ResetPasswordModal: React.FC<Props> = ({ show, onClose, onLogin }) => {
  return (
    <Modal show={show} onHide={onClose} centered className="auth-modal">
      <div className="auth-header">
        <div className="auth-icon">
          <KeyRound size={32} className="auth-icon-gold" />
        </div>
        <h4 className="auth-title">Reset Password</h4>
        <p className="auth-sub">We'll send you a reset link</p>
      </div>

      <Modal.Body className="auth-body">
        <button className="back-link" onClick={onLogin}>
          <ArrowLeft size={16} /> Back to login
        </button>

        <Form className="mt-3">
          <Form.Group className="mb-4">
            <Form.Label>Email Address</Form.Label>
            <div className="input-icon-wrapper">
              <Mail className="input-icon" />
              <Form.Control type="email" placeholder="Enter your email" />
            </div>
          </Form.Group>

          <Button className="auth-btn w-100">
            <Mail className="me-2" size={18} /> Send Reset Link
          </Button>
        </Form>

        <div className="auth-footer">
          Remember your password?{" "}
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

export default ResetPasswordModal;
