import { Link, Outlet, useNavigate } from "react-router-dom";
import { useFiltro } from "../../utils/FiltroContextx";
import "../../styles/home/menuHome.css";

const MenuHome = () => {
  const { setFiltro } = useFiltro();
  const navigate = useNavigate();

  const handleFiltro = (nuevoFiltro) => {
    console.log("🔄 Cambiando filtro a:", nuevoFiltro);
    setFiltro(nuevoFiltro);
    navigate('/Catalogo');
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg" id="navBarHome" data-bs-theme="dark">
      <div className="container-fluid" id="navBarHome-container">
        
        {/* MARCA / LOGO */}
        <Link className="navbar-brand" id="navBarHome-brand" to="/" onClick={() => setFiltro('todos')}>
          Zéfiro
        </Link>

        {/* BOTÓN TOGGLER MÓVIL */}
        <button
          className="navbar-toggler"
          id="navBarHome-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navBarHome-content"
          aria-controls="navBarHome-content"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" id="navBarHome-toggler-icon"></span>
        </button>

        {/* CONTENIDO DEL NAVBAR */}
        <div className="collapse navbar-collapse" id="navBarHome-content">
          
          {/* MENÚ PRINCIPAL */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="navBarHome-mainMenu">

            {/* --- CATÁLOGO CALZADO --- */}
            <li className="nav-item dropdown" id="navBarHome-calzado-dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link"
                id="navBarHome-calzado-btn"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Calzado
              </button>
              <ul className="dropdown-menu" id="navBarHome-calzado-menu">
                <li><button className="dropdown-item" id="navBarHome-calzado-all" onClick={() => handleFiltro('calzado')}>Todo el Calzado</button></li>
                <li><hr className="dropdown-divider" id="navBarHome-calzado-divider" /></li>
                <li><button className="dropdown-item" id="navBarHome-calzado-mujer" onClick={() => handleFiltro('mujer')}>Para Mujer</button></li>
                <li><button className="dropdown-item" id="navBarHome-calzado-hombre" onClick={() => handleFiltro('hombre')}>Para Hombre</button></li>
                <li><button className="dropdown-item" id="navBarHome-calzado-nino" onClick={() => handleFiltro('nino')}>Para Niño</button></li>
              </ul>
            </li>

            {/* --- BOLSOS --- */}
            <li className="nav-item" id="navBarHome-bolsos-item">
              <button
                className="nav-link btn btn-link"
                id="navBarHome-bolsos-btn"
                type="button"
                onClick={() => handleFiltro('bolsos')}
              >
                Bolsos
              </button>
            </li>

            {/* --- NOVEDADES --- */}
            <li className="nav-item" id="navBarHome-novedades-item">
              <button
                className="nav-link btn btn-link"
                id="navBarHome-novedades-btn"
                type="button"
                onClick={() => handleFiltro('todos')}
              >
                Novedades
              </button>
            </li>

          </ul>

          {/* MENÚ USUARIO */}
          <ul className="navbar-nav" id="navBarHome-userMenu">

            {/* PERFIL */}
            <li className="nav-item dropdown" id="navBarHome-profile-dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link"
                id="navBarHome-profile-btn"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-fill" id="navBarHome-profile-icon"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" id="navBarHome-profile-menu">
                <li><Link className="dropdown-item" id="navBarHome-login" to="/loginpage">Iniciar sesión</Link></li>
                <li><Link className="dropdown-item" id="navBarHome-profile" to="/profile">Perfil</Link></li>
                <li><Link className="dropdown-item" id="navBarHome-orders" to="/profile">Pedidos</Link></li>
                <li><hr className="dropdown-divider" id="navBarHome-profile-divider" /></li>
                <li><Link className="dropdown-item" id="navBarHome-logout" to="/logout">Cerrar sesión</Link></li>
              </ul>
            </li>

            {/* FAVORITOS */}
            <li className="nav-item" id="navBarHome-favorites-item">
              <Link className="nav-link" id="navBarHome-favorites-link" to="/favoritos">
                <i className="bi bi-heart-fill" id="navBarHome-favorites-icon"></i>
              </Link>
            </li>

            {/* CARRITO */}
            <li className="nav-item" id="navBarHome-cart-item">
              <Link className="nav-link" id="navBarHome-cart-link" to="/carrito">
                <i className="bi bi-cart-fill" id="navBarHome-cart-icon"></i>
              </Link>
            </li>

          </ul>

          {/* BUSCADOR */}
          <div className="d-flex" id="navBarHome-search">
            <input
              className="form-control me-2"
              id="navBarHome-search-input"
              type="search"
              placeholder="Buscar productos..."
              aria-label="Buscar"
            />
            <button className="btn btn-outline-light" id="navBarHome-search-btn" type="submit">
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