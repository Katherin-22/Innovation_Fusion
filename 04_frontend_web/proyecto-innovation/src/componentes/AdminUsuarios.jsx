import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import {
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
  X,
  AlertTriangle,
  Search,
} from "lucide-react";
import "../styles/adminUsuarios.css";

const initialUsers = [
  {
    id: 1,
    nombreUsuario: "Ana García",
    primerApellido: "García",
    segundoApellido: "Lopez",
    numeroDocumento: "1023456",
    telefono: "310456789",
    correoElectronico: "ana.g@example.com",
    rol: "cliente",
    activo: true,
  },
  {
    id: 2,
    nombreUsuario: "Juan Pérez",
    primerApellido: "Pérez",
    segundoApellido: "Diaz",
    numeroDocumento: "7890123",
    telefono: "312987654",
    correoElectronico: "juan.p@example.com",
    rol: "administrador",
    activo: true,
  },
];

const ROLES = [
  { id: 1, nombre: "cliente" },
  { id: 2, nombre: "administrador" },
];

// ----------------------------------------------------------------------
// Modal para crear o editar usuario
// ----------------------------------------------------------------------
const UserFormModal = ({ isOpen, onClose, onSave, userToEdit }) => {
  const [formData, setFormData] = useState({
    nombreUsuario: "",
    primerApellido: "",
    segundoApellido: "",
    numeroDocumento: "",
    telefono: "",
    password: "",
    confirmPassword: "",
    correoElectronico: "",
    idRol: 1,
    idTipoDeDocumento: 1,
    idEstadoUsuario: 1,
    activo: true,
  });

  const [isError, setIsError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        ...userToEdit,
        idRol: ROLES.find((r) => r.nombre === userToEdit.rol)?.id || 1,
        password: "",
        confirmPassword: "",
      });
    } else {
      setFormData({
        nombreUsuario: "",
        primerApellido: "",
        segundoApellido: "",
        numeroDocumento: "",
        telefono: "",
        password: "",
        confirmPassword: "",
        correoElectronico: "",
        idRol: 1,
        idTipoDeDocumento: 1,
        idEstadoUsuario: 1,
        activo: true,
      });
    }
    setIsError("");
    setMessage("");
  }, [userToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ----------------------------------------------------------------------
  // Crear o editar usuario (con token)
  // ----------------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError("");
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setIsError("Las contraseñas no coinciden.");
      return;
    }

    // 💡 PASO 1: TRADUCCIONES DE IDs (como acordamos) 💡
    // 🔑 CORRECCIÓN ID: idTipoDeDocumento siempre es 1 (Cédula de Ciudadanía)
    const idTipoDeDocumento = 1; 
    
    // 🔑 CORRECCIÓN ID: idEstadoUsuario es 1 (Activo) si el checkbox es true, 2 (Inactivo) si es false
    const idEstadoUsuario = formData.activo ? 1 : 2; 

    try {
      const token = localStorage.getItem("authToken")?.replace(/"/g, ""); // ✅ Token correcto
      console.log("Token actual:", token);

      if (!token) {
        setIsError("No se encontró el token de autenticación. Inicia sesión nuevamente.");
        return;
      }

      let response;

      if (userToEdit) {
        // 🔹 Actualizar usuario existente
        
        console.log("ID que envío:", userToEdit?.id); 
        const userId = userToEdit.id;

        if (!userId || isNaN(Number(userId))) {
          setIsError("❌ Error: No se encontró el ID del usuario a editar o es inválido. Intenta recargar la página.");
          // Log para debug
          console.error("ID de usuario no válido para edición:", userId, userToEdit);
          return;
        }

        response = await axios.put(
          // ➡️ Usa userId verificado
          `http://localhost:8080/api/usuarios/${userId}`,
          {
            // Asegúrate de enviar el número de documento como número
            numeroDocumento: parseInt(formData.numeroDocumento, 10),
            nombreUsuario: formData.nombreUsuario,
            primerApellido: formData.primerApellido,
            segundoApellido: formData.segundoApellido,
            telefono: formData.telefono,
            password: formData.password,
            correoElectronico: formData.correoElectronico,
            direccion: "Calle 123 #45-67, Bogotá, Colombia",
            idRol: formData.idRol,
            idTipoDeDocumento: idTipoDeDocumento, // 🔑 USANDO VARIABLE CORREGIDA
            idEstadoUsuario: idEstadoUsuario,     // 🔑 USANDO VARIABLE CORREGIDA
          },
          {
            headers: {
              Authorization: `Bearer ${token}` ,
              "Content-Type": "application/json", 
            },
          }
        );

        if (response.status === 200) {
          setMessage("✅ Usuario actualizado correctamente.");
        } else {
          setIsError("No se pudo actualizar el usuario.");
          return;
        }

      } else {
        // 🔹 Crear nuevo usuario
        response = await axios.post(
          "http://localhost:8080/api/auth/register",
          {
            numeroDocumento: parseInt(formData.numeroDocumento, 10),
            nombreUsuario: formData.nombreUsuario,
            primerApellido: formData.primerApellido,
            segundoApellido: formData.segundoApellido,
            telefono: formData.telefono,
            password: formData.password,
            correoElectronico: formData.correoElectronico,
            direccion: "Calle 123 #45-67, Bogotá, Colombia",
            idRol: formData.idRol,
            idTipoDeDocumento: idTipoDeDocumento, // 🔑 USANDO VARIABLE CORREGIDA
            idEstadoUsuario: idEstadoUsuario,     // 🔑 USANDO VARIABLE CORREGIDA
          }
        );

        if (response.status === 200 && response.data.success === true) {
          setMessage("✅ ¡Usuario creado exitosamente!");
        } else {
          setIsError(response.data.message || "Error al registrar usuario.");
          return;
        }
      }

      // 🔹 Actualiza la tabla visual del frontend

      const backendId = userToEdit
      ? userToEdit.id
      : Number(response.data.data.id); 

      onSave({
        id: backendId ,
        nombreUsuario: formData.nombreUsuario,
        primerApellido: formData.primerApellido,
        segundoApellido: formData.segundoApellido,
        numeroDocumento: formData.numeroDocumento,
        telefono: formData.telefono,
        correoElectronico: formData.correoElectronico,
        // ✅ CORRECCIÓN FINAL: Convertimos formData.idRol a Number
        rol: ROLES.find((r) => r.id === Number(formData.idRol))?.nombre || "cliente",
        activo: formData.activo,
      });

      setTimeout(() => onClose(), 1200);

    } catch (err) {
      console.error("Error detallado:", err);

      if (err.response) {
        if (err.response.status === 403) {
          // Si el ID es 'undefined' el backend lo ve como 403 Forbidden o 400 Bad Request
          setIsError("🚫 Acceso Denegado (403): Revisa el ID o permisos del token.");
        } else if (err.response.status === 404) {
          setIsError("❌ Usuario no encontrado (404).");
        } else if (err.response.status === 500) {
          setIsError("⚙️ Error interno del servidor (500). Intenta más tarde.");
        } else {
          setIsError(err.response.data?.message || `Error al conectar con el servidor (Estado: ${err.response.status}).`);
        }
      } else {
        setIsError("❌ No se pudo conectar con el servidor. Verifica tu conexión o el backend.");
      }
    }
  };

  // ----------------------------------------------------------------------
  // Render del formulario modal
  // ----------------------------------------------------------------------
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>{userToEdit ? "Editar Usuario" : "Registrar Nuevo Usuario"}</h3>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Nombre y Apellido */}
          <div className="form-group">
            <div className="field">
              <label>Nombres *</label>
              <input
                type="text"
                name="nombreUsuario"
                value={formData.nombreUsuario}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label>Primer Apellido *</label>
              <input
                type="text"
                name="primerApellido"
                value={formData.primerApellido}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Segundo Apellido y Documento */}
          <div className="form-group">
            <div className="field">
              <label>Segundo Apellido *</label>
              <input
                type="text"
                name="segundoApellido"
                value={formData.segundoApellido}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label>Cédula *</label>
              <input
                type="text"
                name="numeroDocumento"
                value={formData.numeroDocumento}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Teléfono y Correo */}
          <div className="form-group">
            <div className="field">
              <label>Teléfono *</label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label>Correo Electrónico *</label>
              <input
                type="email"
                name="correoElectronico"
                value={formData.correoElectronico}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Contraseña y Confirmación */}
          <div className="form-group">
            <div className="field">
              <label>Contraseña *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required={!userToEdit}
              />
            </div>
            <div className="field">
              <label>Confirmar Contraseña *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required={!userToEdit}
              />
            </div>
          </div>

          {/* Rol y Estado */}
          <div className="form-group">
            <div className="field">
              <label>Rol</label>
              <select name="idRol" value={formData.idRol} onChange={handleChange}>
                {ROLES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.nombre.charAt(0).toUpperCase() + r.nombre.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="field checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="activo"
                  checked={formData.activo}
                  onChange={handleChange}
                />{" "}
                Usuario Activo
              </label>
            </div>
          </div>

          {isError && <p className="error-text">{isError}</p>}
          {message && <p className="success-text">{message}</p>}

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-cancelar">
              Cancelar
            </button>
            <button type="submit" className="btn-guardar">
              {userToEdit ? "Guardar Cambios" : "Crear Usuario"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Confirmar eliminación (Este componente no cambia, solo su uso en el padre)
// ----------------------------------------------------------------------
const DeleteConfirmModal = ({ isOpen, onClose, userName, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-container confirm-delete">
        <AlertTriangle className="icon-warning" />
        <h3>Confirmar Eliminación</h3>
        <p>
          ¿Deseas eliminar al usuario <strong>{userName}</strong>?
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
// Panel principal
// ----------------------------------------------------------------------
const AdminUserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    const lower = searchTerm.toLowerCase();
    return users.filter(
      (u) =>
        (u.nombreUsuario || '').toLowerCase().includes(lower) ||
        (u.correoElectronico || '').toLowerCase().includes(lower) ||
        (u.rol || '').toLowerCase().includes(lower)
    );
  }, [users, searchTerm]);

  const handleSaveUser = (newUser) => {
    if (userToEdit) {
      setUsers(users.map((u) => (u.id === newUser.id ? newUser : u)));
    } else {
      setUsers([...users, newUser]);
    }
  };

  // 🗑️ FUNCIÓN DE ELIMINACIÓN REAL (NUEVA) 
  const handleDeleteUser = async () => {
    if (!userToDelete) return; 
    const userId = userToDelete.id;
    const userName = userToDelete.nombreUsuario;

    try {
        const token = localStorage.getItem("authToken")?.replace(/"/g, "");

        if (!token) {
            alert("No se encontró el token de autenticación. Inicia sesión nuevamente.");
            return;
        }

        // Llamada DELETE al endpoint con el token de administrador
        await axios.delete(`http://localhost:8080/api/usuarios/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Éxito: Actualizamos el estado de la tabla 
        setUsers(users.filter((u) => u.id !== userId));
        console.log(`Usuario ${userName} (ID ${userId}) eliminado correctamente en la DB.`);

    } catch (err) {
        console.error("❌ Error al eliminar usuario:", err.response || err);
        alert(`Error al eliminar a ${userName}: ${err.response?.data?.message || 'No se pudo conectar con el servidor.'}`);
        
    } finally {
        setUserToDelete(null); // Cerramos el modal
    }
  };
  // --------------------------------------------------------------------

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Panel de Gestión de Usuarios</h2>
        <p>Vista de Administrador: Control total sobre los registros.</p>
      </div>

      <div className="admin-actions">
        <button
          className="btn-crear"
          onClick={() => {
            setUserToEdit(null);
            setIsModalOpen(true);
          }}
        >
          <UserPlusIcon size={18} /> Crear Usuario
        </button>

        <div className="search-box">
          <Search className="icon-search" size={18} />
          <input
            type="text"
            placeholder="Buscar usuario..."
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
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.nombreUsuario}</td>
                  <td>{user.correoElectronico}</td>
                  <td>{user.rol}</td>
                  <td>
                    <span
                      className={
                        user.activo ? "estado-activo" : "estado-inactivo"
                      }
                    >
                      {user.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-editar"
                      onClick={() => {
                        console.log("Usuario a editar:", user); 
                        setUserToEdit(user);
                        setIsModalOpen(true);
                      }}
                    >
                      <PencilIcon size={16} />
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() => setUserToDelete(user)}
                    >
                      <TrashIcon size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-users">
                  No se encontraron usuarios.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setUserToEdit(null);
        }}
        onSave={handleSaveUser}
        userToEdit={userToEdit}
      />

      <DeleteConfirmModal
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        userName={userToDelete?.nombreUsuario || ""}
        // 🔑 CORRECCIÓN: Usamos la función real de eliminación
        onConfirm={handleDeleteUser} 
      />
    </div>
  );
};

export default AdminUserManagement;