import React from "react";
import Galeria from "../../components/iniciosesion/Collage";
import Login from "../../components/iniciosesion/Login";
import "../../styles/gestionusuarios/formulario final.css"; // para controlar la posición

const LoginPage = () => {
  return (
    <div className="login-page">
      {/* Fondo del collage */}
      <div className="grid-container-collage">
        <Galeria />
      </div>

      {/* Formulario superpuesto */}
      <div className="overlay-login">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
