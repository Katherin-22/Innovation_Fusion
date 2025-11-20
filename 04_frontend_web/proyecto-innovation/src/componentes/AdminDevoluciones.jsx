import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import {PencilIcon, TrashIcon, UserPlusIcon, X, AlertTriangle, Search, } from "lucide-react";
import '../styles/adminDevoluciones.css';


// ======================================================================
// Constantes y Tipos de Solicitud
// ======================================================================

// Estados posibles para la solicitud
const ESTADOS = [
  'Pendiente',
  'En proceso',
  'Aprobada',
  'Rechazada',
  'Completada'
];

const TIPOS_SOLICITUD = [
  'Cambio',
  'Devolución'
];

// ----------------------------------------------------------------------
// Modal para crear o editar devolucion
// ----------------------------------------------------------------------
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
        id: devolucionToEdit.id,
        motivo: devolucionToEdit.motivo || "",
        tipoSolicitud: devolucionToEdit.tipoSolicitud || TIPOS_SOLICITUD[0],
        estadoSolicitud: devolucionToEdit.estadoSolicitud || ESTADOS[0],
        fechaSolicitud: devolucionToEdit.fechaSolicitud || new Date().toISOString().substring(0, 10),
        fechaRespuesta: devolucionToEdit.fechaRespuesta || null,
        idUsuario: devolucionToEdit.idUsuario || "",
      });
    } else {
      // Estado inicial para crear nueva devolución
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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ----------------------------------------------------------------------
  // Crear o editar devolucion (con token)
  // ----------------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError("");
    setMessage("");

    // Validación básica
    if (formData.idUsuario === "" || isNaN(Number(formData.idUsuario))) {
        setIsError("❌ Error: El ID de Usuario es obligatorio y debe ser un número.");
        return;
    }
    if (formData.motivo.trim() === "") {
        setIsError("❌ Error: El motivo de la solicitud es obligatorio.");
        return;
    }

    try {
      const token = localStorage.getItem("authToken")?.replace(/"/g, "");
      const now = new Date().toISOString().substring(0, 10); // Formato YYYY-MM-DD para el backend

      if (!token) {
        setIsError("No se encontró el token de autenticación. Inicia sesión nuevamente.");
        return;
      }

      let response;

      // lo común para ambas operaciones (POST y PUT)
      const payload = {
        motivo: formData.motivo,
        tipoSolicitud: formData.tipoSolicitud,
        estadoSolicitud: formData.estadoSolicitud,
        // El backend espera las fechas en formato YYYY-MM-DD
        fechaSolicitud: formData.fechaSolicitud || now,
        
        // Lógica para fechaRespuesta: Si el estado es 'Pendiente', es null. Si no, es la fecha del form o la actual.
        fechaRespuesta: (formData.estadoSolicitud === 'Pendiente')
                            ? null
                            : (formData.fechaRespuesta || now),
                            
        idUsuario: Number(formData.idUsuario),
      };


      if (devolucionToEdit) {
        // 🔹 Actualizar devolución existente (PUT)
        const devolucionId = devolucionToEdit.id;

        if (!devolucionId || isNaN(Number(devolucionId))) {
          setIsError("❌ Error: No se encontró el ID de la devolución a editar o es inválido.");
          console.error("ID de devolución no válido para edición:", devolucionId);
          return;
        }

        response = await axios.put(
          `http://localhost:8080/api/devoluciones/${devolucionId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}` ,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setMessage("✅ Devolución actualizada correctamente.");
        } else {
          setIsError("No se pudo actualizar la devolución.");
          return;
        }

      } else {
        // 🔹 Crear nueva devolución (POST)
        response = await axios.post(
          "http://localhost:8080/api/devoluciones",
          // Usamos el payload, pero forzamos el estado y fechaRespuesta para una nueva creación
          {
            ...payload,
            estadoSolicitud: ESTADOS[0], // Se envía 'Pendiente'
            fechaRespuesta: null
          },
          {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
          }
        );

        if (response.status === 201 || response.status === 200) {
          setMessage("✅ ¡Devolución creada exitosamente!");
        } else {
          setIsError(response.data.message || "Error al registrar la devolución.");
          return;
        }
      }

      // 🔹 Notificar al padre para que recargue los datos
      onSave(); 

      setTimeout(() => onClose(), 1200);

    } catch (err) {
      console.error("Error detallado:", err.response || err);
      // ... manejo de errores
      if (err.response) {
        setIsError(err.response.data?.message || `Error al conectar con el servidor (Estado: ${err.response.status}).`);
      } else {
        setIsError("❌ No se pudo conectar con el servidor. Verifica tu conexión o el backend.");
      }
    }
  };

  // ----------------------------------------------------------------------
  // Render del formulario modal (sin cambios)
  // ----------------------------------------------------------------------
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>{devolucionToEdit ? "Editar Devolución" : "Registrar Nueva Devolución"}</h3>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          
          {/* Motivo */}
          <div className="form-group full-width">
            <div className="field">
              <label>Motivo *</label>
              <textarea
                name="motivo"
                value={formData.motivo}
                onChange={handleChange}
                required
                rows="3"
                placeholder="Ej: Cambio de talla, producto dañado, etc."
              ></textarea>
            </div>
          </div>

          {/* Tipo de Solicitud y Estado */}
          <div className="form-group">
            <div className="field">
              <label>Tipo de Solicitud *</label>
              <select name="tipoSolicitud" value={formData.tipoSolicitud} onChange={handleChange} required>
                {TIPOS_SOLICITUD.map((tipo) => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Estado de la Solicitud *</label>
              <select name="estadoSolicitud" value={formData.estadoSolicitud} onChange={handleChange} required>
                {ESTADOS.map((estado) => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ID de Usuario y Fecha de Solicitud (Editable por Admin) */}
          <div className="form-group">
            <div className="field">
              <label>ID de Usuario *</label>
              <input
                type="number"
                name="idUsuario"
                value={formData.idUsuario}
                onChange={handleChange}
                required
                min="1"
              />
            </div>
            <div className="field">
              <label>Fecha de Solicitud *</label>
              <input
                type="date"
                name="fechaSolicitud"
                value={formData.fechaSolicitud}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          {/* Fecha de Respuesta (Solo para Admin) */}
          {formData.estadoSolicitud !== 'Pendiente' && (
              <div className="form-group full-width">
                  <div className="field">
                      <label>Fecha de Respuesta</label>
                      <input
                          type="date"
                          name="fechaRespuesta"
                          value={formData.fechaRespuesta || new Date().toISOString().substring(0, 10)}
                          onChange={handleChange}
                      />
                  </div>
              </div>
          )}


          {isError && <p className="error-text">{isError}</p>}
          {message && <p className="success-text">{message}</p>}

          <div className="modal-footer full-width">
            <button type="button" onClick={onClose} className="btn-cancelar">
              Cancelar
            </button>
            <button type="submit" className="btn-guardar">
              {devolucionToEdit ? "Guardar Cambios" : "Crear Devolución"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// ----------------------------------------------------------------------
// Confirmar eliminación
// ----------------------------------------------------------------------
const DeleteConfirmModal = ({ isOpen, onClose, devolucionName, onConfirm }) => {
    if (!isOpen) return null;
    return (
      <div className="modal-overlay">
        <div className="modal-container confirm-delete">
          <AlertTriangle className="icon-warning" size={36} />
          <h3>Confirmar Eliminación</h3>
          <p>
            ¿Deseas eliminar la devolución con ID <strong>{devolucionName}</strong>?
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
    );
};


// ----------------------------------------------------------------------
// Panel principal de las devoluciones
// ----------------------------------------------------------------------
const AdminDevoluciones = () => {

  const [devoluciones, setDevoluciones] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [devolucionToEdit, setDevolucionToEdit] = useState(null);
  const [devolucionToDelete, setDevolucionToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); 
  const [fetchError, setFetchError] = useState(null); 

  // ----------------------------------------------------------------------
  // 2.  FUNCIÓN PARA CARGAR LAS DEVOLUCIONES DE LA API
  // ----------------------------------------------------------------------
  const fetchDevoluciones = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const token = localStorage.getItem("authToken")?.replace(/"/g, "");

      if (!token) {
        setFetchError("❌ Error: Token de autenticación no encontrado. Inicia sesión.");
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:8080/api/devoluciones", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

  
      setDevoluciones(response.data);
      
    } catch (err) {
      console.error("Error al cargar devoluciones:", err.response || err);
      setFetchError(`❌ Error al cargar datos: ${err.response?.statusText || 'No se pudo conectar con el servidor.'}`);
      setDevoluciones([]); 
    } finally {
      setLoading(false);
    }
  };

  // 4.  LLAMAR A LA FUNCIÓN AL MONTAR EL COMPONENTE
  useEffect(() => {
    fetchDevoluciones();
  }, []); 

  const handleSaveDevolucion = () => {
    fetchDevoluciones();
  };

 // la función de eliminación para llamar a fetchDevoluciones en caso de éxito
  const handleDeleteDevolucion = async () => {
    if (!devolucionToDelete) return;
    const devolucionId = devolucionToDelete.id;

    try {
        const token = localStorage.getItem("authToken")?.replace(/"/g, "");

        if (!token) {
            alert("No se encontró el token de autenticación. Inicia sesión nuevamente.");
            return;
        }

        // Llamada DELETE al endpoint de devoluciones
        await axios.delete(`http://localhost:8080/api/devoluciones/${devolucionId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Éxito: Llamamos a la función de carga para refrescar la lista
        fetchDevoluciones();
        console.log(`Devolución (ID ${devolucionId}) eliminada correctamente en la DB.`);

    } catch (err) {
        console.error("❌ Error al eliminar devolución:", err.response || err);
        alert(`Error al eliminar la devolución: ${err.response?.data?.message || 'No se pudo conectar con el servidor.'}`);
        
    } finally {
        setDevolucionToDelete(null); // Cerramos el modal
    }
  };


  // 🔑 Adaptamos el filtro para buscar en campos relevantes de Devolución
  const filteredDevoluciones = useMemo(() => {
    if (!searchTerm) return devoluciones;
    const lower = searchTerm.toLowerCase();
    return devoluciones.filter(
      (d) =>
        (d.motivo || '').toLowerCase().includes(lower) ||
        (d.tipoSolicitud || '').toLowerCase().includes(lower) ||
        (d.estadoSolicitud || '').toLowerCase().includes(lower) ||
        (d.idUsuario?.toString() || '').includes(lower)
    );
  }, [devoluciones, searchTerm]);

  // --------------------------------------------------------------------
  // 5. 🛠️ Mostrar estado de carga o error en el renderizado
  if (loading) {
    return (
        <div className="admin-container">
            <p className="loading-text">Cargando devoluciones...</p>
        </div>
    );
  }

  if (fetchError) {
    return (
        <div className="admin-container">
            <p className="error-text">{fetchError}</p>
            <button className="btn-recargar" onClick={fetchDevoluciones}>Recargar</button>
        </div>
    );
  }

  // --------------------------------------------------------------------
  // Renderizado principal
  return (
    <div className="admin-container">
      {/* Bloque de <style> eliminado */}

      <div className="admin-header">
        <h2>Panel de Gestión de Devoluciones</h2>
        <p>Vista de Administrador: Control total sobre los registros de devoluciones y cambios.</p>
      </div>

      <div className="admin-actions">
        <button
          className="btn-crear"
          onClick={() => {
            setDevolucionToEdit(null);
            setIsModalOpen(true);
          }}
        >
          <UserPlusIcon size={18} /> Crear Nueva Devolución
        </button>

        <div className="search-box">
          <Search className="icon-search" size={18} />
          <input
            type="text"
            placeholder="Buscar por motivo, estado, o ID de usuario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario ID</th>
              <th>Motivo</th>
              <th>Tipo Solicitud</th>
              <th>Estado</th>
              <th>Fecha Solicitud</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevoluciones.length > 0 ? (
              filteredDevoluciones.map((devolucion) => (
                <tr key={devolucion.id}>
                  <td>{devolucion.id}</td>
                  <td>{devolucion.idUsuario}</td>
                  <td>{devolucion.motivo.substring(0, 50) + (devolucion.motivo.length > 50 ? '...' : '')}</td>
                  <td>
                    <span
                        className={devolucion.tipoSolicitud.toLowerCase() === 'cambio' ? 'tipo-cambio' : 'tipo-devolucion'}
                    >
                        {devolucion.tipoSolicitud}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`estado-${devolucion.estadoSolicitud.toLowerCase().replace(' ', '-')}`}
                    >
                      {devolucion.estadoSolicitud}
                    </span>
                  </td>
                  <td>{devolucion.fechaSolicitud}</td>
                  <td>
                    <button
                      className="btn-editar"
                      onClick={() => {
                        console.log("Devolución a editar:", devolucion);
                        setDevolucionToEdit(devolucion);
                        setIsModalOpen(true);
                      }}
                    >
                      <PencilIcon size={16} />
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() => setDevolucionToDelete(devolucion)}
                    >
                      <TrashIcon size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-users">
                  No se encontraron devoluciones.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <DevolucionFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setDevolucionToEdit(null);
        }}
        onSave={handleSaveDevolucion} // Llama a la recarga de datos
        devolucionToEdit={devolucionToEdit}
      />

      <DeleteConfirmModal
        isOpen={!!devolucionToDelete}
        onClose={() => setDevolucionToDelete(null)}
        devolucionName={devolucionToDelete?.id || ""}
        onConfirm={handleDeleteDevolucion} // Llama a la función de eliminación y recarga
      />
    </div>
  );
};

export default AdminDevoluciones;