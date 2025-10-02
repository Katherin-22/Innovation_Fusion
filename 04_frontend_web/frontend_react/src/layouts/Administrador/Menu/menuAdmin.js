import { useState } from "react";
import logo from "../../../assets/imagenes/logo.png"; 
import { Link } from "react-router-dom";

const MenuAdmin = () => {
  const [isClosed, setIsClosed] = useState(false);

  const toggleSidebar = () => {
    setIsClosed(!isClosed);
  };

  return (
    <>
      <nav className={`slidebar ${isClosed ? "close" : ""}`}>
        <header>
          <div className="image-text">
            <span className="image">
              <img src={logo} alt="logo" />
            </span>
            <div className="text header-text">
              <span className="name">ADMINISTRADOR</span>
            </div>
          </div>

          {/* botón toggle */}
          <i
            className="toggle bi bi-caret-right-fill"
            onClick={toggleSidebar}
          ></i>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              <li className="nav link">
                <Link to="/Administrador/stock">
                  <i className="bi bi-bag-fill"></i>
                  <span className="text nav-text">Inventario</span>
                </Link>
              </li>

              <li className="nav link">
                <Link to="/Administrador/Gestion_Pagina">
                  <i className="bi bi-card-heading"></i>
                  <span className="text nav-text">Gestionar Página</span>
                </Link>
              </li>

              <li className="nav link">
                <Link to="/Administrador/Usuarios">
                  <i className="bi bi-person-rolodex"></i>
                  <span className="text nav-text">Gestion Usuarios</span>
                </Link>
              </li>

              <li className="nav link">
                <Link to="/Administrador/Gestion_Pedido">
                  <i className="bi bi-box2-fill"></i>
                  <span className="text nav-text">Gestion Pedidos</span>
                </Link>
              </li>

              <li className="nav link">
                <Link to="/Administrador/Inbox">
                  <i className="bi bi-chat-dots-fill"></i>
                  <span className="text nav-text">Chat</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="botton-content">
            <li className="nav link">
              <Link to="/">
                {/* usamos Bootstrap Icons para simular puerta cerrada */}
                <i className="bi bi-door-closed"></i>
                <span className="text nav-text">Cerrar sesión</span>
              </Link>
            </li>
          </div>
        </div>
      </nav>

    </>
  );
};

export default MenuAdmin;

