import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { PencilIcon, TrashIcon, UserPlusIcon, Search } from "lucide-react";
import "../../../../styles/gestionardevoluciones/adminDevoluciones.css";
import DevolucionFormModal from "../../../../components/gestiondevoluciones/modals/DevolucionFormModal";
import DeleteConfirmModal from "../../../../components/gestiondevoluciones/modals/DeleteConfirmModal";

const AdminDevoluciones = () => {
  const [devoluciones, setDevoluciones] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [devolucionToEdit, setDevolucionToEdit] = useState(null);
  const [devolucionToDelete, setDevolucionToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const fetchDevoluciones = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const token = localStorage.getItem("authToken")?.replace(/"/g, "");
      if (!token) { setFetchError("Token no encontrado."); setLoading(false); return; }

      const response = await axios.get("http://localhost:8080/api/devoluciones", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDevoluciones(response.data);

    } catch (err) {
      console.error(err.response || err);
      setFetchError(`❌ Error al cargar datos: ${err.response?.statusText || 'No se pudo conectar con el servidor.'}`);
      setDevoluciones([]);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchDevoluciones(); }, []);
  const handleSaveDevolucion = () => fetchDevoluciones();

  const handleDeleteDevolucion = async () => {
    if (!devolucionToDelete) return;
    const devolucionId = devolucionToDelete.id_devolucion;
    try {
      const token = localStorage.getItem("authToken")?.replace(/"/g, "");
      if (!token) { alert("Token no encontrado."); return; }

      await axios.delete(`http://localhost:8080/api/devoluciones/${devolucionId}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchDevoluciones();
      console.log(`Devolución ${devolucionId} eliminada correctamente.`);

    } catch (err) {
      console.error(err.response || err);
      alert(`Error al eliminar: ${err.response?.data?.message || 'No se pudo conectar con el servidor.'}`);
    } finally { setDevolucionToDelete(null); }
  };

  const filteredDevoluciones = useMemo(() => {
    if (!searchTerm) return devoluciones;
    const lower = searchTerm.toLowerCase();
    return devoluciones.filter(d =>
      (d.motivo || '').toLowerCase().includes(lower) ||
      (d.tipoSolicitud || '').toLowerCase().includes(lower) ||
      (d.estadoSolicitud || '').toLowerCase().includes(lower) ||
      (d.usuario?.idUsuario?.toString() || '').includes(lower)
    );
  }, [devoluciones, searchTerm]);

  if (loading) return <div className="admin-container"><p className="loading-text">Cargando devoluciones...</p></div>;
  if (fetchError) return <div className="admin-container"><p className="error-text">{fetchError}</p><button className="btn-recargar" onClick={fetchDevoluciones}>Recargar</button></div>;

  return (
    <div className="admin2-theme">
      <div className="admin-container">
        <div className="admin-header">
          <h2>Panel de Gestión de Devoluciones</h2>
          <p>Vista de Administrador: Control total sobre los registros de devoluciones y cambios.</p>
        </div>

        <div className="admin-actions">
          <button className="btn-crear" onClick={() => { setDevolucionToEdit(null); setIsModalOpen(true); }}>
            <UserPlusIcon size={18} /> Crear Nueva Devolución
          </button>
          <div className="search-box">
            <Search className="icon-search" size={18} />
            <input type="text" placeholder="Buscar por motivo, estado, o ID de usuario..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
              {filteredDevoluciones.length > 0 ? filteredDevoluciones.map(d => (
                <tr key={d.id_devolucion}>
                  <td>{d.id_devolucion}</td>
                  <td>{d.usuario.idUsuario}</td>
                  <td>{d.motivo.substring(0, 50) + (d.motivo.length > 50 ? '...' : '')}</td>
                  <td><span className={d.tipoSolicitud.toLowerCase() === 'cambio' ? 'tipo-cambio' : 'tipo-devolucion'}>{d.tipoSolicitud}</span></td>
                  <td><span className={`estado-${d.estadoSolicitud.toLowerCase().replace(' ', '-')}`}>{d.estadoSolicitud}</span></td>
                  <td>{d.fechaSolicitud}</td>
                  <td>
                    <button className="btn-editar" onClick={() => { setDevolucionToEdit(d); setIsModalOpen(true); }}><PencilIcon size={16} /></button>
                    <button className="btn-eliminar" onClick={() => setDevolucionToDelete(d)}><TrashIcon size={16} /></button>
                  </td>
                </tr>
              )) : <tr><td colSpan="7" className="no-users">No se encontraron devoluciones.</td></tr>}
            </tbody>
          </table>
        </div>

        <DevolucionFormModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setDevolucionToEdit(null); }} onSave={handleSaveDevolucion} devolucionToEdit={devolucionToEdit} />
        <DeleteConfirmModal isOpen={!!devolucionToDelete} onClose={() => setDevolucionToDelete(null)} devolucionName={devolucionToDelete?.id_devolucion || ""} onConfirm={handleDeleteDevolucion} />
      </div>
    </div>
  );
};

export default AdminDevoluciones;
