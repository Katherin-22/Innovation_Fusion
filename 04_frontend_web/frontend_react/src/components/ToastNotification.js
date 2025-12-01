import React, { useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const ToastNotification = ({ show, onClose, title, message, variant = 'success', delay = 3000 }) => {
  useEffect(() => {
    if (show && delay > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [show, onClose, delay]);

  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast show={show} onClose={onClose} bg={variant}>
        <Toast.Header>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body className="text-white">
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastNotification;