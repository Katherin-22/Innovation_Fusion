/* eslint-disable jsx-a11y/anchor-is-valid */

import { Link, Outlet } from "react-router-dom";
import "../../styles/home/paginaInicio.css";

const MenuHome = () => {
  return (
    <nav
      className="navbar fixed-top bg-dark navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          InnovationFussion
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {/* --- Catálogo --- */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Catálogo
              </button>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/Catalogo">Mujer</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/Catalogo">Hombre</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/Catalogo">Niño</Link></li>
              </ul>
            </li>

            {/* --- Bolsos --- */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Bolsos
              </button>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="#">Mujer</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="#">Hombre</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="#">Niño</Link></li>
              </ul>
            </li>

            {/* --- Novedades --- */}
            
              <button
                className="nav-link btn btn-link"
                type="button"
              >
                Novedades
              </button>

            {/* Perfil */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-fill"></i>
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li>
                  <Link className="dropdown-item" to="/login">
                    Iniciar sesión
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Perfil
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Pedidos
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/logout">
                    Cerrar sesión
                  </Link>
                </li>
              </ul>
            </li>


            {/* Favoritos */}
            <li className="nav-item">
              <Link className="nav-link" to="/favoritos">
                <i className="bi bi-heart-fill"></i>
              </Link>
            </li>

            {/* Carrito */}
            <li className="nav-item">
              <Link className="nav-link" to="/carrito">
                <i className="bi bi-cart-fill"></i>
              </Link>
            </li>

            {/* Salir */}
            <li className="nav-item">
              <Link className="nav-link btn btn-link" type="button">
                <i className="bi bi-box-arrow-left"></i>
              </Link>
            </li>
          </ul>

          {/* Search */}
            <li className="nav-item">
                <div className="d-flex">
                    <input
                        className="form-control me-2 search"
                        type="search"
                        placeholder="Buscar"
                        aria-label="Buscar"
                    />
                    <button type={"submit"} className={"button-search"}>
                        Buscar
                    </button>
                </div>
            </li>
        </div>
      </div>
      <Outlet />
    </nav>
  );
};

export default MenuHome;
