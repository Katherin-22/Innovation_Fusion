import React from "react";
import { AlertTriangle } from "lucide-react";
import "../../../styles/gestionusuarios/adminUsuarios.css";

const DeleteConfirmModal = ({ isOpen, onClose, userName, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="admin-theme">
      <div className="modal-overlay">
        <div className="modal-container confirm-delete">
          <AlertTriangle className="icon-warning" />
          <h3>Confirmar Eliminación</h3>
          <p>
            ¿Deseas eliminar al usuario <strong>{userName}</strong>? Esta acción no se puede deshacer.
          </p>
          <div className="modal-footer">
            <button onClick={onClose} className="btn-cancelar">
              Cancelar
            </button>
            <button onClick={onConfirm} className="btn-eliminar">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;