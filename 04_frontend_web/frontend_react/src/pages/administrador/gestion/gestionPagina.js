import MenuAdmin from "../../../layouts/administrador/menuAdmin";
import "../../../styles/administrador/gestion_producto.css";
import "../../../styles/administrador/inventario.css";

import { useEffect, useState } from "react";
import BannerForm from "../../../components/form/BannerForm.js";
import BannerCarousel from "../../../hooks/carrrousel/carrousel.js";


const GestionPagina = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/banners")
      .then((res) => res.json())
      .then((data) => setBanners(data))
      .catch((err) => console.error("Error cargando banners:", err));
  }, []);

  const handleUpload = (newBanner) => {
    setBanners((prev) => [...prev, newBanner]);
  };

  return (
    <div className="all">
      <MenuAdmin />
      <div className="main-content">
        <div className="container py-4">
          <h2 className="text-center mb-4">Gestión de Banners</h2>

          <BannerForm onUpload={handleUpload} />

          <div className="mt-5">
            <BannerCarousel banners={banners} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionPagina;




