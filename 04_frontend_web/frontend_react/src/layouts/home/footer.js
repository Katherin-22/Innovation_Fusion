import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <div className="container-fluid">
        <div className="row finPag">
          <div className="col-12">
            <div className="row finPag">
              {/* Sobre nosotros */}
              <div className="col-4">
                <h4 className="text-center">Sobre Nosotros</h4>
                <ul className="list-unstyled">
                  <li className="text-center">
                    <Link to="#" className="text-white text-decoration-none">
                      Innovation Fusion
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contacto */}
              <div className="col-4">
                <h4 className="text-center">Contacto</h4>
                <ul className="list-unstyled">
                  <li className="text-center">
                    <a
                      href="mailto:innovationFusion@gmail.com"
                      className="text-white text-decoration-none"
                    >
                      innovationFusion@gmail.com
                    </a>
                  </li>
                  <li className="text-center">
                    <a
                      href="tel:3655462742"
                      className="text-white text-decoration-none"
                    >
                      3655462742
                    </a>
                  </li>
                </ul>
              </div>

              {/* Redes Sociales */}
              <div className="col-4">
                <h4 className="text-center">Redes Sociales</h4>
                <ul className="list-unstyled">
                  <li className="text-center">
                    <a href="#" className="text-white text-decoration-none mx-2">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="#" className="text-white text-decoration-none mx-2">
                      <i className="bi bi-whatsapp"></i>
                    </a>
                    <a href="#" className="text-white text-decoration-none mx-2">
                      <i className="bi bi-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Derechos reservados */}
          <div className="col-12 mt-3">
            <hr className="my-2 bg-light border-2" />
            <p className="text-center reserve mb-0">
              © 2025 Innovation Fusion. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
