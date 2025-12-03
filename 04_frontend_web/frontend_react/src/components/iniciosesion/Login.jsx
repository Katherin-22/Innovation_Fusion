import styles from "../../styles/gestionusuarios/login.module.css"; // <-- CSS Module
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();

  const ROL_CLIENTE = 1;
  const ROL_ADMIN = 2;

  async function handleLogin(event) {
    event.preventDefault();
    setIsError("");
    setMessage("");

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email: email,
        password: password,
      });

      if (response.status === 200 && response.data.success === true) {

        const token = response.data.token;
        const userData = response.data.data;

        if (token && userData && userData.rol) {
          localStorage.setItem('authToken', token);
          localStorage.setItem('userData', JSON.stringify(userData));
          setMessage(response.data.message || '¡Inicio de sesión exitoso!');

          let redirectPath = '/';
          if (userData.rol === ROL_ADMIN) redirectPath = '/Administrador/Stock';
          if (userData.rol === ROL_CLIENTE) redirectPath = '/';

          setTimeout(() => navigate(redirectPath), 1000);

        } else {
          setIsError('No se recibió el token o la información de rol.');
        }

      } else {
        setIsError(response.data.message || 'No se pudo iniciar sesión.');
      }

    } catch (err) {
      if (err.response?.data?.message) setIsError(err.response.data.message);
      else if (err.response?.status === 401) setIsError("Credenciales inválidas. Intente de nuevo.");
      else if (err.response?.status === 404) setIsError("El email proporcionado no está registrado.");
      else if (err.response?.status === 500) setIsError("Error del servidor. Intente más tarde.");
      else setIsError(err.response?.data?.message || "Error de conexión. Intente más tarde.");

      console.error("error detallado:", err);
    }
  }

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h2 className={styles.title}>BIENVENIDOS A INNOVATION FUSION</h2>

        {isError && (
          <div className={styles.alertDanger} role="alert">
            {isError}
          </div>
        )}

        {message && (
          <div className={styles.alertMessage} role="alert">
            {message}
          </div>
        )}

        <label htmlFor="CorreoElectronico" className={styles.label}>
          Correo Electrónico:
        </label>
        <input
          type="email"
          id="CorreoElectronico"
          className={styles.input}
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="Contraseña" className={styles.label}>
          Contraseña:
        </label>
        <input
          type="password"
          id="Contraseña"
          className={styles.input}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className={styles.opciones}>
          <p>
            <Link to="/recuperarContraseña">¿Olvidó su Contraseña?</Link>
          </p>
        </div>

        <div className={styles.botonInicio}>
          <input
            type="submit"
            className={styles.btn1}
            value="Iniciar sesión"
          />
        </div>

        <div className={styles.registro}>
          <p className={styles.noTienesCuenta}>¿No tienes cuenta?</p>
          <Link to="/RegistrarUsuarios" className={styles.btnRegistrarse}>
            Regístrate
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
