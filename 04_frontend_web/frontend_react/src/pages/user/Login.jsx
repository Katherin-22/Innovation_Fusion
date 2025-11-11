import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import api_url from "../../services/administrador/api";
import '../../styles/user/Login.css'; 

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    setIsError("");
    setMessage("");

    try {
      const response = await api_url.post("/api/auth/login", { email, password });

      if (response.status === 200 && response.data.success) {
        setMessage(response.data.message || '¡Inicio de sesión exitoso!');
        const token = response.data.token;
        if (token) {
          localStorage.setItem('authToken', token);
          localStorage.setItem('userData', JSON.stringify(response.data.data));
        }
        setTimeout(() => navigate('/'), 1000);
      } else {
        setIsError(response.data.message || 'No se pudo iniciar sesión.');
      }
    } catch (err) {
      if (err.response?.data?.message) setIsError(err.response.data.message);
      else if (err.response?.status === 401) setIsError("Credenciales inválidas.");
      else if (err.response?.status === 404) setIsError("Email no registrado.");
      else if (err.response?.status === 500) setIsError("Error del servidor.");
      else setIsError(`Error de conexión: ${err.response?.status}`);
      console.error("Error detallado:", err);
    }
  }

  return (
    <div className='all-login'>
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <h2>BIENVENIDOS A INNOVATION FUSION</h2>

          {isError && <div className="alert alert-danger">{isError}</div>}
          {message && <div className="alert alert-message">{message}</div>}

          <label htmlFor="CorreoElectronico" className="form-label">Correo Electrónico:</label>
          <input
            type="email"
            id="CorreoElectronico"
            className="form-control"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="Contraseña" className="form-label">Contraseña:</label>
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
            <p><Link className='recuperarContraseña' to="/RecuperarContraseña">¿Olvidó su Contraseña?</Link></p>
          </div>
            
          <div className="btn-inicio">
            <input type="submit" className="btn btn-primary btn-1" value="Iniciar sesión" />
          </div>
          <div className="registro">
            <p className="no-tienes-cuenta">¿No tienes cuenta?</p>
            <Link to="/RegistrarUsuarios" className="btn btn-outline-primary btn-registrarse">Regístrate</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
