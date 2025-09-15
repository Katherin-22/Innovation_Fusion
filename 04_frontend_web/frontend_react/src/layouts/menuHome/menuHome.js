
import { Link } from "react-router-dom";

const MenuHome = () => {
  return (
    <nav
      className="navbar fixed-top bg-dark navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand"  to="#">
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
              <buttom
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Catálogo
              </buttom>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="#">
                    Mujer
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link className="dropdown-item" too="#">
                    Hombre
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <buttom className="dropdown-item" href="#">
                    Niño
                  </buttom>
                </li>
              </ul>
            </li>

            {/* --- Bolsos --- */}
            <li className="nav-item dropdown">
              <buttom
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Bolsos
              </buttom>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="#">Mujer</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="#">Hombre</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="#">Niño</Link></li>
              </ul>
            </li>

            {/* --- Novedades --- */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Novedades
              </button>
              <ul className="dropdown-menu">
                <li><buttom className="dropdown-item" href="#">Mujer</buttom></li>
                <li><hr className="dropdown-divider" /></li>
                <li><buttom className="dropdown-item" href="#">Hombre</buttom></li>
                <li><hr className="dropdown-divider" /></li>
                <li><buttom className="dropdown-item" href="#">Niño</buttom></li>
              </ul>
            </li>

            {/* --- Descuentos --- */}
            <li className="nav-item dropdown">
              <buttom
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Descuentos
              </buttom>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="../../catalogo/html/CatalogoZapato.html">Mujer</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="../../catalogo/html/CatalogoZapato.html">Hombre</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="../../catalogo/html/CatalogoZapato.html">Niño</a></li>
              </ul>
            </li>

            {/* Perfil */}
            <li className="nav-item">
              <a className="nav-link" href="../../seccionusuario/html/usuario.html">
                <i className="bi bi-person-fill"></i>
              </a>
            </li>

            {/* Favoritos */}
            <li className="nav-item">
              <a className="nav-link" href="../../seccionusuario/html/favoritos.html">
                <i className="bi bi-heart-fill"></i>
              </a>
            </li>

            {/* Carrito */}
            <li className="nav-item">
              <button className="nav-link btn btn-link" type="button" style={{ padding: 0 }}>
                <i className="bi bi-cart-fill"></i>
              </button>
            </li>

            {/* Salir */}
            <li className="nav-item">
              <button className="nav-link btn btn-link" type="button" style={{ padding: 0 }}>
                <i className="bi bi-box-arrow-left"></i>
              </button>
            </li>
          </ul>

          {/* Search */}
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default MenuHome;
