import React from "react";
import { Modal, Button } from "react-bootstrap";

interface KiduLogoutModalProps {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const KiduLogoutModal: React.FC<KiduLogoutModalProps> = ({
  show,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal show={show} onHide={onCancel} centered backdrop="static">
      <Modal.Header closeButton>
        {/* <Modal.Title>Confirm Logout</Modal.Title> */}
        <h5 className="fw-bold">Confirm Logout</h5>
      </Modal.Header>

      <Modal.Body>
        Are you sure you want to logout?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Yes, Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default KiduLogoutModal;
