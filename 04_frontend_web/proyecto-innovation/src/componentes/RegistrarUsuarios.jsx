import "../styles/registrarusuarios.css";
import img1 from '../assets/ModuloUsuarios/RegistrarUsuarios/img/img1.png'
import axios from 'axios';
import { useState } from 'react';


function RegistrarUsuarios() {

    const [nombreUsuario, setNombreUsuario] = useState("");
    const [primerApellido, setPrimerApellido] = useState("");
    const [segundoApellido, setSegundoApellido] = useState("");
    const [numeroDocumento, setNumeroDocumento] = useState("");
    const [telefono, setTelefono] = useState("");
    const [password, setPassword] = useState("");
    const [correoElectronico, setCorreoElectronico] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // IDs fijos
    const ID_ROL_CLIENTE = 1;
    const ID_TIPO_DOCUMENTO_CC = 1;
    const ID_ESTADO_ACTIVO = 1;

    const [idRol] = useState(ID_ROL_CLIENTE);
    const [idTipoDeDocumento] = useState(ID_TIPO_DOCUMENTO_CC);
    const [idEstadoUsuario] = useState(ID_ESTADO_ACTIVO);

    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState("");

    async function save(event) {
        event.preventDefault();
        setIsError("");
        setMessage("");

        if (password !== confirmPassword) {
            setIsError('Error: Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/auth/register", {

                nombreUsuario: nombreUsuario,
                primerApellido: primerApellido,
                segundoApellido: segundoApellido,
                numeroDocumento: parseInt(numeroDocumento, 10), 
                telefono: telefono,
                password: password,
                correoElectronico: correoElectronico,
                direccion: "",
                idTipoDeDocumento: idTipoDeDocumento,
                idRol: idRol,
                idEstadoUsuario: idEstadoUsuario

            });

            if (response.status === 200 && response.data.success === true) {

                setMessage(response.data.message || '¡Registro exitoso!');

                setTimeout(() => {
                    window.location = '/Login';
                }, 2000);

            } else {
                setIsError(response.data.message || 'No se pudo completar el registro')
            }

        } catch (err) {

            if (err.response?.data?.message) {
                setIsError(err.response.data.message);
            } else
                if (err.response?.status === 400) {
                setIsError("Solicitud inválida. Verifique los datos.");
            } else 
                if (err.response?.status === 500){
                setIsError("Error del servidor. Intente más tarde.");
            }else{
                setIsError("No se pudo crear el usuario. Por favor, intente más tarde.");
            }

            console.error("error detallado:", err);

        }
    }


return (
    <div>

        <div className="container">
            <div className="form-container">
                <div className="form-content">
                    <form onSubmit={save}>
                        <h2>Crear una cuenta</h2>
                        <p>Únete a nuestra tienda y disfruta de una experiencia de compra única.
                            Descubre nuestra exclusiva colección de calzado y bolsos, guarda tus artículos favoritos,
                            compra fácilmente y recibe ofertas personalizadas. ¡Haz realidad tus compras
                            hoy mismo!</p>

                        {isError && (
                        <div className="alert alert-danger" role="alert">
                            {isError}
                        </div>
                        )}

                        {message && (
                        <div className="alert alert-message" role="alert">
                            {message}
                        </div>
                        )}

                        <div className="form-group">
                            <div className="field">
                                <label htmlFor="nombres" className="form-label"> Nombres * </label>
                                <input type="text" id="nombres" className="form-control" placeholder="Nombres"
                                value={nombreUsuario}
                                onChange={(e) => setNombreUsuario (e.target.value)}
                                required />
                            </div>

                            <div className="field">
                                <label htmlFor="primer apellido" className="form-label"> Primer Apellido * </label>
                                <input type="text" id="primer apellido" className="form-control" placeholder="Apellidos"
                                value={primerApellido}
                                onChange={(e) => setPrimerApellido (e.target.value)}
                                required />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="field">
                                <label htmlFor="segundo apellido" className="form-label"> Segundo Apellido * </label>
                                <input type="text" id="segundo apellido" className="form-control" placeholder="Apellidos"
                                value={segundoApellido}
                                onChange={(e) => setSegundoApellido (e.target.value)}
                                required />
                            </div>

                            <div className="field">
                                <label htmlFor="cedula" className="form-label"> Cédula * </label>
                                <input type="text" id="cedula" className="form-control" placeholder="Cédula"
                                value={numeroDocumento}
                                onChange={(e) => setNumeroDocumento (e.target.value)} 
                                required />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="field">
                                <label htmlFor="telefono" className="form-label"> Teléfono * / Móvil</label>
                                <input type="text" id="telefono" className="form-control" placeholder="Teléfono / Móvil" 
                                value={telefono}
                                onChange={(e) => setTelefono (e.target.value)}
                                required />
                            </div>

                            <div className="field">
                                <label htmlFor="contraseña" className="form-label"> Contraseña * </label>
                                <input type="password" id="contraseña" className="form-control" placeholder="Contraseña" 
                                value={password}
                                onChange={(e) => setPassword (e.target.value)}
                                required />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="field">
                                <label htmlFor="confirmacion_de_contraseña" className="form-label"> Confirmación de Contraseña * </label>
                                <input type="password" id="confirmacion_de_contraseña" className="form-control" placeholder="Confirmación de Contraseña"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword  (e.target.value)}
                                required />
                            </div>

                            <div className="field" >
                                <label htmlFor="correo_electronico" className="form-label"> Correo Electrónico * </label>
                                <input type="email" id="correo_electronico" className="form-control" placeholder="Correo Electrónico" 
                                value={correoElectronico}
                                onChange={(e) => setCorreoElectronico (e.target.value)}
                                required />
                            </div>
                        </div>

                        <div className="registro">
                            <button type="submit" className="btn btn-1">Registrarse</button>
                            <button type="button" className="btn btn-outline-secondary btn-1">Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="image-container">
                <img src={img1} alt="Calzado y Bolsos" />
            </div>
        </div>

    </div>
)
};
export default RegistrarUsuarios;