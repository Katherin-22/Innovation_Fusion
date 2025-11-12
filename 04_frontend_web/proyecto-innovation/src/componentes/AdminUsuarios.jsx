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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError("");
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setIsError("Las contraseñas no coinciden.");
      return;
    }

    try {
      if (userToEdit) {
        // 🔹 Actualizar usuario
        await axios.put(`http://localhost:8080/api/usuarios/${userToEdit.id}`, {
          nombreUsuario: formData.nombreUsuario,
          primerApellido: formData.primerApellido,
          segundoApellido: formData.segundoApellido,
          numeroDocumento: parseInt(formData.numeroDocumento, 10),
          telefono: formData.telefono,
          correoElectronico: formData.correoElectronico,
          idRol: formData.idRol,
          idEstadoUsuario: formData.idEstadoUsuario,
          activo: formData.activo,
        });
        setMessage("Usuario actualizado correctamente.");
      } else {
        // 🔹 Crear nuevo usuario
        const response = await axios.post(
          "http://localhost:8080/api/auth/register",
          {
            nombreUsuario: formData.nombreUsuario,
            primerApellido: formData.primerApellido,
            segundoApellido: formData.segundoApellido,
            numeroDocumento: parseInt(formData.numeroDocumento, 10),
            telefono: formData.telefono,
            password: formData.password,
            correoElectronico: formData.correoElectronico,
            direccion: "Calle 123 #45-67, Bogotá, Colombia",
            idTipoDeDocumento: formData.idTipoDeDocumento,
            idRol: formData.idRol,
            idEstadoUsuario: formData.idEstadoUsuario,
          }
        );

        if (response.status === 200 && response.data.success === true) {
          setMessage("¡Usuario creado exitosamente!");
        } else {
          setIsError(response.data.message || "Error al registrar usuario.");
          return;
        }
      }

      onSave({
        id: userToEdit ? userToEdit.id : Date.now(),
        nombreUsuario: formData.nombreUsuario,
        primerApellido: formData.primerApellido,
        segundoApellido: formData.segundoApellido,
        numeroDocumento: formData.numeroDocumento,
        telefono: formData.telefono,
        correoElectronico: formData.correoElectronico,
        rol: ROLES.find((r) => r.id === formData.idRol)?.nombre || "cliente",
        activo: formData.activo,
      });

      setTimeout(() => onClose(), 1200);
    } catch (err) {
      console.error("Error detallado:", err);
      setIsError("No se pudo conectar con el servidor.");
    }
  };

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
              <select
                name="idRol"
                value={formData.idRol}
                onChange={handleChange}
              >
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
// Confirmar eliminación
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
        u.nombreUsuario.toLowerCase().includes(lower) ||
        u.correoElectronico.toLowerCase().includes(lower) ||
        u.rol.toLowerCase().includes(lower)
    );
  }, [users, searchTerm]);

  const handleSaveUser = (newUser) => {
    if (userToEdit) {
      setUsers(users.map((u) => (u.id === newUser.id ? newUser : u)));
    } else {
      setUsers([...users, newUser]);
    }
  };

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
        onConfirm={() => {
          setUsers(users.filter((u) => u.id !== userToDelete.id));
          setUserToDelete(null);
        }}
      />
    </div>
  );
};

export default AdminUserManagement;
