import React from "react";
import Galeria from "../componentes/Collage";
import Login from "../componentes/Login";
import "../styles/formulario final.css"; // para controlar la posición

const LoginPage = () => {
  return (
    <div className="login-page">
      {/* Fondo del collage */}
      <Galeria />

      {/* Formulario superpuesto */}
      <div className="overlay-login">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
