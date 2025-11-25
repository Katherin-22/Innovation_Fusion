import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { ESTADOS, TIPOS_SOLICITUD } from "../constants/devolucionesConstants";

const DevolucionFormModal = ({ isOpen, onClose, onSave, devolucionToEdit }) => {
  const [formData, setFormData] = useState({
    id: null,
    motivo: "",
    tipoSolicitud: TIPOS_SOLICITUD[0],
    estadoSolicitud: ESTADOS[0],
    fechaSolicitud: new Date().toISOString().substring(0, 10),
    fechaRespuesta: null,
    idUsuario: "",
  });

  const [isError, setIsError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (devolucionToEdit) {
      setFormData({
        id: devolucionToEdit.id_devolucion,
        motivo: devolucionToEdit.motivo || "",
        tipoSolicitud: devolucionToEdit.tipoSolicitud || TIPOS_SOLICITUD[0],
        estadoSolicitud: devolucionToEdit.estadoSolicitud || ESTADOS[0],
        fechaSolicitud: devolucionToEdit.fechaSolicitud || new Date().toISOString().substring(0, 10),
        fechaRespuesta: devolucionToEdit.fechaRespuesta || null,
        idUsuario: devolucionToEdit.usuario?.idUsuario || "",
      });
    } else {
      setFormData({
        id: null,
        motivo: "",
        tipoSolicitud: TIPOS_SOLICITUD[0],
        estadoSolicitud: ESTADOS[0],
        fechaSolicitud: new Date().toISOString().substring(0, 10),
        fechaRespuesta: null,
        idUsuario: "",
      });
    }
    setIsError("");
    setMessage("");
  }, [devolucionToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError("");
    setMessage("");

    if (!formData.idUsuario || isNaN(Number(formData.idUsuario))) {
      setIsError("❌ El ID de Usuario es obligatorio y debe ser un número.");
      return;
    }
    if (!formData.motivo.trim()) {
      setIsError("❌ El motivo de la solicitud es obligatorio.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken")?.replace(/"/g, "");
      if (!token) {
        setIsError("No se encontró el token de autenticación.");
        return;
      }

      const now = new Date().toISOString().substring(0, 10);
      const payload = {
        motivo: formData.motivo,
        tipoSolicitud: formData.tipoSolicitud,
        estadoSolicitud: formData.estadoSolicitud,
        fechaSolicitud: formData.fechaSolicitud || now,
        fechaRespuesta: formData.estadoSolicitud === 'Pendiente' ? null : (formData.fechaRespuesta || now),
        idUsuario: Number(formData.idUsuario),
      };

      if (devolucionToEdit) {
        const devolucionId = devolucionToEdit.id_devolucion;
        await axios.put(
          `http://localhost:8080/api/devoluciones/${devolucionId}`,
          payload,
          { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
        );
        setMessage("✅ Devolución actualizada correctamente.");
      } else {
        await axios.post(
          "http://localhost:8080/api/devoluciones",
          { ...payload, estadoSolicitud: ESTADOS[0], fechaRespuesta: null },
          { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
        );
        setMessage("✅ ¡Devolución creada exitosamente!");
      }

      onSave();
      setTimeout(() => onClose(), 1200);

    } catch (err) {
      console.error(err.response || err);
      setIsError(err.response?.data?.message || "❌ Error al conectar con el servidor.");
    }
  };

  return (
    <div className="admin2-theme">
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-header">
            <h3>{devolucionToEdit ? "Editar Devolución" : "Registrar Nueva Devolución"}</h3>
            <button onClick={onClose} className="close-btn"><X size={20} /></button>
          </div>

          <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-group full-width">
              <label>Motivo *</label>
              <textarea name="motivo" value={formData.motivo} onChange={handleChange} rows="3" required placeholder="Ej: Cambio de talla, producto dañado, etc." />
            </div>

            <div className="form-group">
              <div className="field">
                <label>Tipo de Solicitud *</label>
                <select name="tipoSolicitud" value={formData.tipoSolicitud} onChange={handleChange} required>
                  {TIPOS_SOLICITUD.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Estado de la Solicitud *</label>
                <select name="estadoSolicitud" value={formData.estadoSolicitud} onChange={handleChange} required>
                  {ESTADOS.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="field">
                <label>ID de Usuario *</label>
                <input type="number" name="idUsuario" value={formData.idUsuario} onChange={handleChange} required min="1" />
              </div>
              <div className="field">
                <label>Fecha de Solicitud *</label>
                <input type="date" name="fechaSolicitud" value={formData.fechaSolicitud} onChange={handleChange} required />
              </div>
            </div>

            {formData.estadoSolicitud !== 'Pendiente' && (
              <div className="form-group full-width">
                <label>Fecha de Respuesta</label>
                <input type="date" name="fechaRespuesta" value={formData.fechaRespuesta || new Date().toISOString().substring(0, 10)} onChange={handleChange} />
              </div>
            )}

            {isError && <p className="error-text">{isError}</p>}
            {message && <p className="success-text">{message}</p>}

            <div className="modal-footer full-width">
              <button type="button" onClick={onClose} className="btn-cancelar">Cancelar</button>
              <button type="submit" className="btn-guardar">{devolucionToEdit ? "Guardar Cambios" : "Crear Devolución"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DevolucionFormModal;