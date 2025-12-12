// LoginModal.tsx
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { LogIn, Lock, Mail } from "lucide-react";
import "../Style/Auth.css";

interface Props {
  show: boolean;
  onClose: () => void;
  onSignup: () => void;
  onForgot: () => void;
}

const LoginModal: React.FC<Props> = ({ show, onClose, onSignup, onForgot }) => {
  return (
    <Modal show={show} onHide={onClose} centered className="auth-modal">
      <div className="auth-header">
        <div className="auth-icon">
          <LogIn size={32} className="auth-icon-gold" />
        </div>
        <h4 className="auth-title">Welcome Back</h4>
        <p className="auth-sub">Sign in to access your member portal</p>
      </div>

      <Modal.Body className="auth-body">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <div className="input-icon-wrapper">
              <Mail className="input-icon" />
              <Form.Control type="email" placeholder="Enter your email" />
            </div>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Password</Form.Label>
            <div className="input-icon-wrapper">
              <Lock className="input-icon" />
              <Form.Control type="password" placeholder="Enter your password" />
            </div>
          </Form.Group>

          <div className="d-flex justify-content-between mb-3">
            <Form.Check type="checkbox" label="Remember me" />
            <button className="auth-link" type="button" onClick={onForgot}>
              Forgot Password?
            </button>
          </div>

          <Button className="auth-btn w-100">
            <LogIn size={18} className="me-2" /> Sign In
          </Button>
        </Form>

        <div className="auth-footer">
          Not a member yet?{" "}
          <button className="auth-link" onClick={onSignup}>
            Create an account
          </button>
        </div>

        <p className="auth-help">
          Need help? Call <a href="tel:04442035575">044-42035575</a>
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
