import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/devoluciones.css";

function Devoluciones() {
    // 1. Estados para la solicitud de devolución (POST)
    const [formData, setFormData] = useState({
        motivo: "",
        tipoSolicitud: "DEVOLUCION", // Valor por defecto
    });

    // 2. Estado para almacenar el ID del usuario logeado (necesario para el POST)
    const [idUsuario, setIdUsuario] = useState(null);

    // 3. Estados de UI y Mensajes
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    // 4. Estado para listar devoluciones (inicialmente vacío)
    const [returnsList, setReturnsList] = useState([]);

    // --- A. Obtención de Datos del Usuario y Listado de Devoluciones ---
    useEffect(() => {
        const fetchUserDataAndReturns = async () => {
            try {
                const token = localStorage.getItem("authToken")?.replace(/"/g, "");

                if (!token) {
                    setError("No se encontró el token de autenticación. Inicie sesión.");
                    setLoading(false);
                    return;
                }

                // 1. Obtener el ID del usuario logeado.
                const userResponse = await axios.get(
                    "http://localhost:8080/api/usuarios/perfil",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const loggedInUserId = userResponse.data.idUsuario;
                setIdUsuario(loggedInUserId);

                // 2. Llamar al nuevo endpoint del cliente (GET /mis-devoluciones)

                const listResponse = await axios.get(
                    "http://localhost:8080/api/devoluciones/mis-devoluciones",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setReturnsList(listResponse.data);
            } catch (err) {
                console.error("Error al cargar datos del usuario/devoluciones:", err);
                setError(
                    "No se pudo cargar la información esencial del usuario o sus devoluciones."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchUserDataAndReturns();
    }, []);

    // --- B. Manejo de Cambios en el Formulario ---
    const handleChange = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage("");
        setError(null);

        if (!idUsuario) {
            setError(
                "Error: No se pudo obtener el ID del usuario. No se puede enviar la solicitud."
            );
            setLoading(false);
            return;
        }

        try {
            // 1. Obtener el token de autenticación 
            const token = localStorage.getItem("authToken")?.replace(/"/g, "");

            if (!token) {
                setError("No se encontró el token de autenticación. Inicie sesión.");
                setLoading(false);
                return;
            }

            const requestData = {
                motivo: formData.motivo,
                tipoSolicitud: formData.tipoSolicitud,
                estadoSolicitud: "SOLICITADA",
                fechaSolicitud: new Date().toISOString().split("T")[0],
                fechaRespuesta: null,
                idUsuario: idUsuario,
            };

            await axios.put("http://localhost:8080/api/devoluciones/3", requestData, { 
                headers: {
                    Authorization: `Bearer ${token}`, 
                    "Content-Type": "application/json",
                }
            });

            setSuccessMessage(
                "Cambio de devolución enviada con éxito. Revisa tu historial."
            );
            setLoading(false);

            setFormData({ motivo: "", tipoSolicitud: "DEVOLUCION" });
        } catch (err) {
            console.error("Error al cambiar  la devolución:", err);
            const message =
                err.response?.data?.message ||
                "Error al procesar la solicitud. Intente más tarde.";
            setError(message);
            setLoading(false);
        }
    };

    // --- C. Manejo del Envío (POST) para nueva devolución ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage("");
        setError(null);

        if (!idUsuario) {
            setError(
                "Error: No se pudo obtener el ID del usuario. No se puede enviar la solicitud."
            );
            setLoading(false);
            return;
        }

        try {
            // 1. Construir el DTO que espera DevolucionesCambiosController.java
            const requestData = {
                motivo: formData.motivo,
                tipoSolicitud: formData.tipoSolicitud,
                estadoSolicitud: "SOLICITADA",
                fechaSolicitud: new Date().toISOString().split("T")[0],
                fechaRespuesta: null,
                idUsuario: idUsuario,
            };

            await axios.post("http://localhost:8080/api/devoluciones", requestData);

            setSuccessMessage(
                "Solicitud de devolución enviada con éxito. Revisa tu historial."
            );
            setLoading(false);

            setFormData({ motivo: "", tipoSolicitud: "DEVOLUCION" });
        } catch (err) {
            console.error("Error al solicitar la devolución:", err);
            const message =
                err.response?.data?.message ||
                "Error al procesar la solicitud. Intente más tarde.";
            setError(message);
            setLoading(false);
        }
    };

    // --- D. Lógica de Renderizado ---
    if (loading && !idUsuario) {
        return <div className="loading-state">Cargando datos esenciales...</div>;
    }

    if (error && !idUsuario) {
        return <div className="error-state">Error: {error}</div>;
    }

    return (
        <div className="devoluciones-container">
            <h1>Solicitar Devolución o Cambio</h1>

            {successMessage && (
                <div className="success-message">{successMessage}</div>
            )}
            {error && <div className="error-message">{error}</div>}

            {/* Formulario de Solicitud de Devolución (POST) */}
            <section className="solicitud-form-section">
                <h2>1. Nueva Solicitud</h2>
                <form onSubmit={handleSubmit} className="devolucion-form">
                    <div className="form-group">
                        <label htmlFor="tipoSolicitud">Tipo de Solicitud:</label>
                        <select
                            name="tipoSolicitud"
                            value={formData.tipoSolicitud}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        >
                            <option value="DEVOLUCION">Devolución</option>
                            <option value="CAMBIO">Cambio</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="motivo">Motivo (Máx. 255 caracteres):</label>
                        <textarea
                            name="motivo"
                            value={formData.motivo}
                            onChange={handleChange}
                            maxLength="255"
                            rows="4"
                            placeholder="Ej: La talla es incorrecta o el producto llegó dañado."
                            required
                            disabled={loading}
                        />
                    </div>

                    <button type="submit" disabled={loading || !formData.motivo}>
                        {loading
                            ? "Enviando..."
                            : `Enviar Solicitud de ${formData.tipoSolicitud}`}
                    </button>
                </form>
            </section>

            <hr />

            {/* Historial de Devoluciones (GET) */}
            <section className="historial-section">
                <h2>2. Mis Devoluciones Anteriores</h2>
                {returnsList.length === 0 ? (
                    <div className="info-message">
                        No has realizado solicitudes de devolución.
                    </div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tipo</th>
                                <th>Motivo</th>
                                <th>Estado</th>
                                <th>Fecha Solicitud</th>
                            </tr>
                        </thead>
                        <tbody>
                            {returnsList.map((item) => (
                                <tr key={item.id_devolucion}>
                                    <td>{item.id_devolucion}</td>
                                    <td>{item.tipoSolicitud}</td>
                                    <td>{item.motivo}</td>
                                    <td>{item.estadoSolicitud}</td>
                                    <td>{item.fechaSolicitud}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
}

export default Devoluciones;
