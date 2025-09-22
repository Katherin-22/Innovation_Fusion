import { Routes, Route } from "react-router-dom";

import Home from "../pages/home/home";
import Catalogo from "../pages/category/catalogo";
import PrincipalPage from "../pages/administrador/principalPage";
import GestionPagina from "../pages/administrador/gestionPagina";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Catalogo" element={<Catalogo />} />
      <Route path="/Administrador" element={<PrincipalPage />} />
      <Route path="/Administrador/Gestion_Pagina" element={<GestionPagina />} />
    </Routes>
  );
}
