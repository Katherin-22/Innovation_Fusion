import "../styles/login.css";
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
          // Guardar la información del usuario
          localStorage.setItem('userData', JSON.stringify(userData));

          setMessage(response.data.message || '¡Inicio de sesión exitoso!');

          let redirectPath;

          if (userData.rol === ROL_ADMIN) {
            redirectPath = '/AdminUsuarios'; // Ruta del Administrador
          } else if (userData.rol === ROL_CLIENTE) {
            redirectPath = '/Principal'; // Ruta del Cliente
          } else {
            redirectPath = '/Principal'; // Por defecto
          }

          setTimeout(() => {
            navigate(redirectPath);
          }, 1000);

        } else {
          setIsError('No se recibió el token o la información de rol.');
        }

      } else {
        setIsError(response.data.message || 'No se pudo iniciar sesión.')
      }

    } catch (err) {

      if (err.response?.data?.message) {
        setIsError(err.response.data.message);
      } else
        if (err.response?.status === 401) {
          setIsError("Credenciales inválidas. Intente de nuevo.");
        } else
          if (err.response?.status === 404) {
            setIsError("El email proporcionado no está registrado.");
          } else {
            if (err.response?.status === 500) {
              setIsError("Error del servidor. Intente más tarde.");
            } else {
              setIsError(err.response.data.message || "Error de conexión . Intente más tarde.");
            }

            console.error("error detallado:", err);

          }
    }
  }
  return (

    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>BIENVENIDOS A INNOVATION FUSION</h2>

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

        <label htmlFor="CorreoElectronico" className="form-label">
          Correo Electrónico:
        </label>
        <input
          type="email"
          id="CorreoElectronico"
          className="form-control"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="Contraseña" className="form-label">
          Contraseña:
        </label>
        <input
          type="password"
          id="Contraseña"
          className="form-control"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="opciones">
          <p>
            <Link to="/RecuperarContraseña"> ¿Olvidó su Contraseña? </Link>
          </p>
        </div>

        <div className="boton-inicio">
          <input
            type="submit"
            className="btn btn-primary btn-1"
            value="Iniciar sesión"
          />
        </div>

        <div className="registro">
          <p className="no-tienes-cuenta">¿No tienes cuenta?</p>
          <Link to="/RegistrarUsuarios" className="btn btn-outline-primary btn-registrarse">  Regístrate </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;