import { useEffect, useState } from "react";
import MenuHome from "../../layouts/home/menuHome";
import BannerCarousel from "../../hooks/carrrousel/carrousel";
import Footer from "../../layouts/home/footer";
import  api_url  from "../../services/administrador/api";

import "../../styles/home/paginaInicio.css";

export default function Home() {
  const [banners, setBanners] = useState([]);

  // Cargar banners desde la API
  useEffect(() => {
    api_url
      .get("/api/banners")
      .then((res) => {
        console.log("Banners recibidos:", res.data);
        setBanners(res.data);
      })
      .catch((err) => console.error("Error cargando banners:", err));
  }, []);

  return (
    <div className="allHome">
      <MenuHome />
      <div className="body-color">
        {/* Carrusel de Banners */}
        <BannerCarousel banners={banners} />
        
        <div className="container-fluid">

          {/* Sección: estilo de calzados*/}
          <div className="row mt-5">
            <h1 className="text-center text-white mb-4">Compra por estilos de calzado</h1>

            {/* card 1 */}
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4">
              <div className="card text-center h-100">
                <img src="/iamgenes_prueba/zapato/im11.jpg" className="card-img-top" alt="Zapato 1" />
                <div className="card-body">
                  <h5 className="card-title">Zapato</h5>
                  <p className="card-text">Texto de ejemplo para el producto.</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4">
              <div className="card text-center h-100">
                <img src="/iamgenes_prueba/zapato/im7.jpg" className="card-img-top" alt="Zapato 2" />
                <div className="card-body">
                  <h5 className="card-title">Zapato</h5>
                  <p className="card-text">Texto de ejemplo para el producto.</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4">
              <div className="card text-center h-100">
                <img src="/iamgenes_prueba/zapato/im8.jpg" className="card-img-top" alt="Zapato 3" />
                <div className="card-body">
                  <h5 className="card-title">Zapato</h5>
                  <p className="card-text">Texto de ejemplo para el producto.</p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4">
              <div className="card text-center h-100">
                <img src="/iamgenes_prueba/zapato/im6.jpg" className="card-img-top" alt="Zapato 4" />
                <div className="card-body">
                  <h5 className="card-title">Zapato</h5>
                  <p className="card-text">Texto de ejemplo para el producto.</p>
                </div>
              </div>
            </div>
          </div>

          {/* seccion estilo de bolsos */}
          <div className="row mt-5">
            <h1 className="text-center text-white mb-4">Compra por estilos de bolsos</h1>

            {/* Card 1 */}
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4">
              <div className="card text-center h-100">
                <img src="/iamgenes_prueba/bolso/im13.jpg" className="card-img-top" alt="Bolso 1" />
                <div className="card-body">
                  <h5 className="card-title">Bolso</h5>
                  <p className="card-text">Texto de ejemplo para el producto.</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4">
              <div className="card text-center h-100">
                <img src="/iamgenes_prueba/bolso/im14.jpg" className="card-img-top" alt="Bolso 2" />
                <div className="card-body">
                  <h5 className="card-title">Bolso</h5>
                  <p className="card-text">Texto de ejemplo para el producto.</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4">
              <div className="card text-center h-100">
                <img src="/iamgenes_prueba/bolso/im16.jpg" className="card-img-top" alt="Bolso 3" />
                <div className="card-body">
                  <h5 className="card-title">Bolso</h5>
                  <p className="card-text">Texto de ejemplo para el producto.</p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4">
              <div className="card text-center h-100">
                <img src="/iamgenes_prueba/bolso/im17.jpg" className="card-img-top" alt="Bolso 4" />
                <div className="card-body">
                  <h5 className="card-title">Bolso</h5>
                  <p className="card-text">Texto de ejemplo para el producto.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}