import React, { useState, useEffect } from 'react'
import axios from 'axios';


function PerfilUsuario() {

    const [formData, setFormData] = useState(null);

    // 2. Estado separado para la nueva contraseña (siempre inicia vacío).
    const [newPassword, setNewPassword] = useState('');

    // 3. Estado para manejar la UI
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // --- A. Obtención de Datos (GET) ---
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Endpoint: GET /api/usuarios/perfil
                const response = await axios.get('/api/usuarios/perfil');

                // Usamos esta data para pre-llenar los campos.
                setFormData(response.data);

            } catch (err) {
                console.error("Error al cargar el perfil:", err);
                setError("No se pudo cargar el perfil del usuario. Intente más tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    // --- B. Manejo de Cambios en el Formulario ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'password') {
            // Maneja el campo de password en su estado separado
            setNewPassword(value);
        } else {
            // Maneja los demás campos en el estado principal
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
        // Limpiar mensajes al empezar a editar
        setSuccessMessage('');
        setError(null);
    };

    // --- C. Manejo del Envío (PUT) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setError(null);

        try {
            // 1. Crear el DTO a enviar al backend
            const requestData = {
                ...formData,
                // Incluimos la nueva contraseña solo si se ha escrito algo.
                password: newPassword || null,

                // Eliminamos los objetos de relación anidados para el DTO.
                rol: undefined,
                tipo_de_documento: undefined,
                estado_usuario: undefined,
            };

            // Endpoint: PUT /api/usuarios/perfil
            await axios.put('/api/usuarios/perfil', requestData);

            // Éxito
            setSuccessMessage("¡Perfil actualizado con éxito!");
            setLoading(false);
            setNewPassword(''); // Limpiar el campo de contraseña tras el éxito

        } catch (err) {
            console.error("Error al actualizar:", err);
            setError("Error al actualizar el perfil. Revisa los datos.");
            setLoading(false);
        }
    };

    // --- D. Lógica de Renderizado ---
    if (loading && !formData) {
        return <div className="loading-state">Cargando perfil... 🔄</div>;
    }

    if (error && !formData) {
        return <div className="error-state">Error: {error}</div>;
    }

    if (!formData) return null;

    return (
        <div className="user-profile-container">
            <h1>Editar Mi Perfil</h1>

            {successMessage && <div className="success-message">{successMessage}</div>}
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="profile-form">

                {/* Campos de texto y email */}
                <div className="form-group">
                    <label htmlFor="nombreUsuario">Nombre:</label>
                    <input type="text" name="nombreUsuario" value={formData.nombreUsuario || ''} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="primerApellido">Primer Apellido:</label>
                    <input type="text" name="primerApellido" value={formData.primerApellido || ''} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="segundoApellido">Segundo Apellido:</label>
                    <input type="text" name="segundoApellido" value={formData.segundoApellido || ''} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="correoElectronico">Correo Electrónico:</label>
                    <input type="email" name="correoElectronico" value={formData.correoElectronico || ''} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="telefono">Teléfono:</label>
                    <input type="text" name="telefono" value={formData.telefono || ''} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="direccion">Dirección:</label>
                    <input type="text" name="direccion" value={formData.direccion || ''} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="numeroDocumento">Número de Documento:</label>
                    <input type="number" name="numeroDocumento" value={formData.numeroDocumento || ''} onChange={handleChange} required />
                </div>

                {/* Campo de Contraseña (Manejado por separado) */}
                <div className="form-group password-group">
                    <label htmlFor="password">Nueva Contraseña (Opcional):</label>
                    <input
                        type="password"
                        name="password"
                        value={newPassword}
                        onChange={handleChange}
                        placeholder="Dejar vacío para no cambiarla"
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : 'Actualizar Perfil'}
                </button>
            </form>

            <div className="read-only-info">
                {/* Muestra el Rol y Tipo de Documento actual (solo lectura) */}
                <p><strong>Rol:</strong> {formData.rol?.nombreRol || 'N/A'}</p>
                <p><strong>Tipo de Documento:</strong> {formData.tipo_de_documento?.nombreTipoDeDocumento || 'N/A'}</p>
            </div>
        </div>
    )
}

export default PerfilUsuario;