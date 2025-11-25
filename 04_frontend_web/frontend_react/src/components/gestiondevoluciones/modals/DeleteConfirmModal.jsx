import React from "react";
import { AlertTriangle } from "lucide-react";

const DeleteConfirmModal = ({ isOpen, onClose, devolucionName, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="admin2-theme">
      <div className="modal-overlay">
        <div className="modal-container confirm-delete">
          <AlertTriangle className="icon-warning" size={36} />
          <h3>Confirmar Eliminación</h3>
          <p>¿Deseas eliminar la devolución con ID <strong>{devolucionName}</strong>?</p>
          <div className="modal-footer">
            <button onClick={onClose} className="btn-cancelar">Cancelar</button>
            <button onClick={onConfirm} className="btn-eliminar">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
