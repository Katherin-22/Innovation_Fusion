import styles from "../../styles/gestionusuarios/registrarusuarios.module.css"; // CSS Module
import img1 from "../../assets/ModuloUsuarios/RegistrarUsuarios/img/img1.png";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegistrarUsuarios() {

  const [nombreUsuario, setNombreUsuario] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState("");

  const navigate = useNavigate();

  const ID_ROL_CLIENTE = 1;
  const ID_TIPO_DOCUMENTO_CC = 1;
  const ID_ESTADO_ACTIVO = 1;

  async function save(event) {
    event.preventDefault();
    setIsError("");
    setMessage("");

    if (password !== confirmPassword) {
      setIsError("Error: Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        nombreUsuario,
        primerApellido,
        segundoApellido,
        numeroDocumento: parseInt(numeroDocumento, 10),
        telefono,
        password,
        correoElectronico,
        direccion: "Calle 123 #45-67, Bogotá, Colombia",
        idTipoDeDocumento: ID_TIPO_DOCUMENTO_CC,
        idRol: ID_ROL_CLIENTE,
        idEstadoUsuario: ID_ESTADO_ACTIVO,
      });

      if (response.status === 200 && response.data.success === true) {
        setMessage(response.data.message || "¡Registro exitoso!");
        setTimeout(() => navigate("/Login"), 2000);
      } else {
        setIsError(response.data.message || "No se pudo completar el registro.");
      }
    } catch (err) {
      if (err.response?.data?.message) setIsError(err.response.data.message);
      else if (err.response?.status === 400)
        setIsError("Solicitud inválida. Verifique los datos.");
      else if (err.response?.status === 500)
        setIsError("Error del servidor. Intente más tarde.");
      else setIsError("No se pudo crear el usuario. Por favor, intente más tarde.");

      console.error("error detallado:", err);
    }
  }

  return (
    <div className={styles["contenedor-principal"]}>
      <div className={styles.container}>
        
        {/* Columna izquierda: Formulario */}
        <div className={styles.formContainer}>
          <div className={styles.formContent}>
            
            <form onSubmit={save} className={styles.form}>
              <h2 className={styles.title}>Crear una cuenta</h2>
              <p className={styles.description}>
                Únete a nuestra tienda y disfruta de una experiencia de compra única.
                Descubre nuestra exclusiva colección de calzado y bolsos, guarda tus artículos favoritos,
                compra fácilmente y recibe ofertas personalizadas. ¡Haz realidad tus compras hoy mismo!
              </p>

              {isError && <div className={styles.alertDanger}>{isError}</div>}
              {message && <div className={styles.alertMessage}>{message}</div>}

              <div className={styles.formGroup}>
                <div className={styles.field}>
                  <label className={styles.label}>Nombres *</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Nombres"
                    value={nombreUsuario}
                    onChange={(e) => setNombreUsuario(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Primer Apellido *</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Primer Apellido"
                    value={primerApellido}
                    onChange={(e) => setPrimerApellido(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <div className={styles.field}>
                  <label className={styles.label}>Segundo Apellido *</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Segundo Apellido"
                    value={segundoApellido}
                    onChange={(e) => setSegundoApellido(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Cédula *</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Cédula"
                    value={numeroDocumento}
                    onChange={(e) => setNumeroDocumento(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <div className={styles.field}>
                  <label className={styles.label}>Teléfono *</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Teléfono / Móvil"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Contraseña *</label>
                  <input
                    type="password"
                    className={styles.input}
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <div className={styles.field}>
                  <label className={styles.label}>Confirmación de Contraseña *</label>
                  <input
                    type="password"
                    className={styles.input}
                    placeholder="Confirmación de Contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Correo Electrónico *</label>
                  <input
                    type="email"
                    className={styles.input}
                    placeholder="Correo Electrónico"
                    value={correoElectronico}
                    onChange={(e) => setCorreoElectronico(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className={styles.registro}>
                <button type="submit" className={styles.btn1}>Registrarse</button>
                <button type="button" className={styles["btn-cancel"]}>Cancelar</button>
              </div>

            </form>
          </div>
        </div>

        {/* Columna derecha: Imagen */}
        <div className={styles.imageContainer}>
          <img src={img1} alt="Calzado y Bolsos" />
        </div>

      </div>
    </div>
  );
}

export default RegistrarUsuarios;
