import { Link } from "react-router-dom";
import "../../styles/home/footer.css"

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 py-4 footer-container" id="footer-container">
      <div className="container-fluid footer-wrapper">
        <div className="row finPag footer-row">
          <div className="col-12 footer-main-col">
            <div className="row finPag footer-content-row">
              
              {/* Sobre nosotros */}
              <div className="col-4 footer-about">
                <h4 className="text-center footer-title" id="sobre-nosotros" >Sobre Nosotros</h4>
                <ul className="list-unstyled footer-list">
                  <li className="text-center footer-item">
                    <Link
                      to="#"
                      className="text-white text-decoration-none footer-link"
                    >
                      Innovation Fusion
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contacto */}
              <div className="col-4 footer-contact">
                <h4 className="text-center footer-title" id="contacto-footer">Contacto</h4>
                <ul className="list-unstyled footer-list">
                  <li className="text-center footer-item">
                    <a
                      href="mailto:innovationFusion@gmail.com"
                      className="text-white text-decoration-none footer-link"
                    >
                      innovationFusion@gmail.com
                    </a>
                  </li>
                  <li className="text-center footer-item">
                    <a
                      href="tel:3655462742"
                      className="text-white text-decoration-none footer-link"
                    >
                      3655462742
                    </a>
                  </li>
                </ul>
              </div>

              {/* Redes Sociales */}
              <div className="col-4 footer-social">
                <h4 className="text-center footer-title" id="redes-footer">Redes Sociales</h4>
                <ul className="list-unstyled footer-list">
                  <li className="text-center footer-item">
                    <a
                      href="#"
                      className="text-white text-decoration-none mx-2 footer-social-link"
                    >
                      <i className="bi bi-facebook footer-icon"></i>
                    </a>
                    <a
                      href="#"
                      className="text-white text-decoration-none mx-2 footer-social-link"
                    >
                      <i className="bi bi-whatsapp footer-icon"></i>
                    </a>
                    <a
                      href="#"
                      className="text-white text-decoration-none mx-2 footer-social-link"
                    >
                      <i className="bi bi-instagram footer-icon"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Derechos reservados */}
          <div className="col-12 mt-3 footer-rights">
            <hr className="my-2 bg-light border-2 footer-divider" />
            <p className="text-center reserve mb-0 footer-text">
              © 2025 Innovation Fusion. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
