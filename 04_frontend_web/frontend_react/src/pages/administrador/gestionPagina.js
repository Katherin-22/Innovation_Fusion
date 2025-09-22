import { useState } from "react";
import MenuAdmin from "../../layouts/Administrador/Menu/menuAdmin";
import "../../styles/Administrador/gestion_producto.css";
import "../../styles/Administrador/inventario.css";

import BannerForm from "../../layouts/menuHome/carrousel/BannerForm";
import Banner from "../../layouts/menuHome/carrousel/carrousel";

const GestionPagina = () => {
  const [banners, setBanners] = useState([]);

  const handleUpload = (url) => {
    setBanners([...banners, url]);
  };

  return (
    <div className="all">
      <MenuAdmin />
      <div className="main-content">
        <div className="container">
          <div className="row border-bottom border-1 border-black p-2">
            <h1 className="d-flex justify-content-center fs-1">Gestión página</h1>
          </div>

          {/* Formulario para subir banner */}
          <BannerForm onUpload={handleUpload} />

          {/* Carrusel con banners */}
          <div className="row mt-4">
            <h2 className="d-flex justify-content-center">Banners actuales</h2>
            <Banner banners={banners} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionPagina;
