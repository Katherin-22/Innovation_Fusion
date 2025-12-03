import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { PencilIcon, TrashIcon, UserPlusIcon, Search } from "lucide-react";
import "../../../../styles/gestionusuarios/adminUsuarios.css";

// 🔑 Importamos los subcomponentes y las constantes
import UserFormModal from "../../../../components/gestionusuarios/modals/UserFormModal";
import DeleteConfirmModal from "../../../../components/gestionusuarios/modals/DeleteConfirmModal";

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // 🆕 FUNCIÓN PARA CARGAR USUARIOS DESDE LA API (CORREGIDA)
  const fetchUsers = async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      // 🔑 Obtener token de autenticación y limpiar las comillas
      const token = localStorage.getItem("authToken")?.replace(/"/g, "");

      if (!token) {
        setFetchError("No se encontró el token de autenticación. Inicia sesión para ver los usuarios.");
        setIsLoading(false);
        return;
      }

      // ➡️ Llamada GET al endpoint de usuarios
      const response = await axios.get(
        "http://localhost:8080/api/usuarios",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //CORRECCIÓN CLAVE EN EL MAPEO: NORMALIZACIÓN DE DATOS 
      const usersFromApi = response.data.map(user => ({
        // 1. Mapeamos 'idUsuario' del backend al 'id' local
        id: user.idUsuario,

        // Campos directos
        nombreUsuario: user.nombreUsuario,
        primerApellido: user.primerApellido,
        segundoApellido: user.segundoApellido,
        numeroDocumento: user.numeroDocumento,
        telefono: user.telefono,
        correoElectronico: user.correoElectronico,
        direccion: user.Direccion, // Corregido a 'Direccion' según tu clase Usuario.java

        // 2. Extracción de IDs anidados (necesarios para el POST/PUT en el modal)
        idRol: user.rol.idRol,
        idTipoDeDocumento: user.tipo_de_documento.idTipoDeDocumento,
        idEstadoUsuario: user.estado_usuario.idestado_usuario, // Corregido a 'idestado_usuario'

        // 3. Propiedades derivadas para la visualización en la tabla
        rol: user.rol.nombreRol, // Usamos el nombre del Rol del objeto anidado
        tipoDocumento: user.tipo_de_documento.nombreTipoDeDocumento,
        estadoUsuario: user.estado_usuario.nombre_Estado_usuario,
        activo: user.estado_usuario.idestado_usuario === 1,
      }));
      // 

      setUsers(usersFromApi);

    } catch (err) {
      console.error("❌ Error al cargar usuarios:", err.response || err);
      // Mostrar un mensaje de error más claro al usuario
      setFetchError(err.response?.data?.message || "No se pudo conectar con el servidor para cargar usuarios.");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Llama a fetchUsers una vez al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔎 Función para filtrar usuarios (optimizada con useMemo)
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    const lower = searchTerm.toLowerCase();
    return users.filter(
      (u) =>
        (u.nombreUsuario || '').toLowerCase().includes(lower) ||
        (u.correoElectronico || '').toLowerCase().includes(lower) ||
        (u.rol || '').toLowerCase().includes(lower) ||
        (u.numeroDocumento || '').includes(lower) // Búsqueda por documento
    );
  }, [users, searchTerm]);

  // 💾 Actualiza la lista localmente después de crear/editar
  const handleSaveUser = (newUser) => {
    if (userToEdit) {
      // Edición: Reemplaza el usuario por el nuevo/actualizado
      setUsers(users.map((u) => (u.id === newUser.id ? newUser : u)));
    } else {
      // Creación: Añade el nuevo usuario a la lista
      setUsers([...users, newUser]);
    }
  };

  // 🗑️ FUNCIÓN DE ELIMINACIÓN REAL
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

      // Esta línea funciona porque userToDelete.id ya está NORMALIZADO
      await axios.delete(`http://localhost:8080/api/usuarios/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Éxito: Actualizamos el estado de la tabla localmente
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
    <div className="admin-theme">
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
              {/* Manejo de estados: Carga, Error, Vacío */}
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="no-users">
                    Cargando usuarios... 🔄
                  </td>
                </tr>
              ) : fetchError ? (
                <tr>
                  <td colSpan="6" className="no-users error-text">
                    {fetchError} ⚠️
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      {user.nombreUsuario} {user.primerApellido}
                    </td>
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
          onConfirm={handleDeleteUser}
        />
      </div>
    </div>
  );
};

export default AdminUserManagement;