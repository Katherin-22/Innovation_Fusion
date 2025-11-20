import { Link, Outlet, useNavigate } from "react-router-dom";
import { useFiltro } from "../../utils/FiltroContextx";
import "../../styles/home/paginaInicio.css";

const MenuHome = () => {
  const { setFiltro } = useFiltro();
  const navigate = useNavigate();

  const handleFiltro = (nuevoFiltro) => {
    console.log("🔄 Cambiando filtro a:", nuevoFiltro);
    setFiltro(nuevoFiltro);
    navigate('/Catalogo');
  };

  return (
    <nav className="navbar fixed-top bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={() => setFiltro('todos')}>
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

            {/* --- CATÁLOGO DROPDOWN --- */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Calzado
              </button>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item" onClick={() => handleFiltro('calzado')}>Todo el Calzado</button></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item" onClick={() => handleFiltro('mujer')}>Para Mujer</button></li>
                <li><button className="dropdown-item" onClick={() => handleFiltro('hombre')}>Para Hombre</button></li>
                <li><button className="dropdown-item" onClick={() => handleFiltro('nino')}>Para Niño</button></li>
              </ul>
            </li>

            {/* --- BOLSOS --- */}
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                type="button"
                onClick={() => handleFiltro('bolsos')}
              >
                Bolsos
              </button>
            </li>

            {/* --- NOVEDADES --- */}
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                type="button"
                onClick={() => handleFiltro('todos')}
              >
                Novedades
              </button>
            </li>

            {/* PERFIL */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-fill"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item" to="/login">Iniciar sesión</Link></li>
                <li><Link className="dropdown-item" to="/profile">Perfil</Link></li>
                <li><Link className="dropdown-item" to="/profile">Pedidos</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/logout">Cerrar sesión</Link></li>
              </ul>
            </li>

            {/* FAVORITOS */}
            <li className="nav-item">
              <Link className="nav-link" to="/favoritos">
                <i className="bi bi-heart-fill"></i>
              </Link>
            </li>

            {/* CARRITO */}
            <li className="nav-item">
              <Link className="nav-link" to="/carrito">
                <i className="bi bi-cart-fill"></i>
              </Link>
            </li>

          </ul>

          {/* BUSCADOR */}
          <div className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar productos..."
              aria-label="Buscar"
            />
            <button className="btn btn-outline-light" type="submit">
              Buscar
            </button>
          </div>
        </div>
      </div>
      <Outlet />
    </nav>
  );
};

export default MenuHome;