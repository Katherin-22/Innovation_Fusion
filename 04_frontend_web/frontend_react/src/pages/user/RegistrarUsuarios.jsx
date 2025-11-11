import { useState } from "react";
import api_url from "../../services/administrador/api";
import img1 from "../../assets/RegistrarUsuarios/img/img1.png";
import "../../styles/user/RegistrarUsuarios.css";

function RegistrarUsuarios() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      setIsError("Error: Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await api_url.post("/api/auth/register", {
        nombreUsuario,
        primerApellido,
        segundoApellido,
        numeroDocumento: parseInt(numeroDocumento, 10),
        telefono,
        password,
        correoElectronico,
        direccion: "Calle 123 #45-67, Bogotá, Colombia",
        idTipoDeDocumento,
        idRol,
        idEstadoUsuario,
      });

      if (response.status === 200 && response.data.success === true) {
        setMessage(response.data.message || "¡Registro exitoso!");

        setTimeout(() => {
          window.location = "/Login";
        }, 2000);
      } else {
        setIsError(response.data.message || "No se pudo completar el registro.");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setIsError(err.response.data.message);
      } else if (err.response?.status === 400) {
        setIsError("Solicitud inválida. Verifique los datos.");
      } else if (err.response?.status === 500) {
        setIsError("Error del servidor. Intente más tarde.");
      } else {
        setIsError("No se pudo crear el usuario. Por favor, intente más tarde.");
      }
      console.error("Error detallado:", err);
    }
  }

  return (
    <div className="all-login">
      <div className="row form-register-container">
        <div className="col-form col-8">
        <div className="form-content">
          <form onSubmit={save}>
            <h2>Crear una cuenta</h2>
            <p>
              Regístrate y descubre nuestra exclusiva colección de calzado y
              bolsos. ¡Compra fácil y recibe ofertas únicas!
            </p>

            {isError && <div className="alert alert-danger">{isError}</div>}
            {message && <div className="alert alert-message">{message}</div>}

            <div className="row form-group form-group-register">
              <div className="col field">
                <label htmlFor="nombres">Nombres *</label>
                <input
                  type="text"
                  id="nombres"
                  className=" form-control form-control-register"
                  placeholder="Nombres"
                  value={nombreUsuario}
                  onChange={(e) => setNombreUsuario(e.target.value)}
                  required
                />
              </div>

              <div className="col field">
                <label htmlFor="primer-apellido">Primer Apellido *</label>
                <input
                  type="text"
                  id="primer-apellido"
                  className=" form-control form-control-register"
                  placeholder="Apellido"
                  value={primerApellido}
                  onChange={(e) => setPrimerApellido(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row form-group form-group-register">
              <div className="col field">
                <label htmlFor="segundo-apellido">Segundo Apellido *</label>
                <input
                  type="text"
                  id="segundo-apellido"
                  className="form-control form-control-register"
                  placeholder="Apellido"
                  value={segundoApellido}
                  onChange={(e) => setSegundoApellido(e.target.value)}
                  required
                />
              </div>

              <div className="col field">
                <label htmlFor="cedula">Cédula *</label>
                <input
                  type="text"
                  id="cedula"
                  className="form-control form-control-register"
                  placeholder="Cédula"
                  value={numeroDocumento}
                  onChange={(e) => setNumeroDocumento(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row form-group form-group-register">
              <div className="col field">
                <label htmlFor="telefono">Teléfono / Móvil *</label>
                <input
                  type="text"
                  id="telefono"
                  className="form-control form-control-register"
                  placeholder="Teléfono / Móvil"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                />
              </div>

              <div className="col field">
                <label htmlFor="password">Contraseña *</label>
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-register"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row form-group form-group-register">
              <div className="col field">
                <label htmlFor="confirmPassword">
                  Confirmación de Contraseña *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control form-control-register"
                  placeholder="Confirmar contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="col field">
                <label htmlFor="correo_electronico">Correo Electrónico *</label>
                <input
                  type="email"
                  id="correo_electronico"
                  className="form-control form-control-register"
                  placeholder="Correo Electrónico"
                  value={correoElectronico}
                  onChange={(e) => setCorreoElectronico(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row registro-buttons">
              <button type="submit" className="col btn btn-registro">
                Registrarse
              </button>
              <button
                type="button"
                className="col btn btn-outline-secondary btn-cancelar"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
    </div>

    <div className="col-image col-4">
        <div className="image-container-register">
          <img className="image-register" src={img1} alt="Calzado y Bolsos" />
        </div>
    </div>

      </div>
    </div>
  );
}

export default RegistrarUsuarios;
