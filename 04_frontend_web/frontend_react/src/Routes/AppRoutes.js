import { Routes, Route } from "react-router-dom";

import Home from "../pages/home/home";

import Catalogo from "../pages/category/catalogo";

import Inbox from "../pages/administrador/inbox";

import GestionDevoluciones from "../pages/administrador/gestion/gestionDevoluciones";
import GestionCambios from "../pages/administrador/gestion/gestionCambios";
import GestionPagina from "../pages/administrador/gestion/gestionPagina";
import GestionPedido from "../pages/administrador/gestion/gestionPedido";
import GestionUsiuarios from "../pages/administrador/gestion/gestuinUsarios";
import Stock from "../pages/administrador/stock/Stock";
import GetProducto from "../pages/administrador/producto/GetProducto"
import CreateProducto from "../pages/administrador/producto/CreateProducto";
import UpdateProducto from "../pages/administrador/producto/UpdateProducto";
import CreateImagen from "../pages/administrador/imagen/CreateImagen";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Catalogo" element={<Catalogo />} />
      <Route path="/Administrador/stock" element={<Stock />} />
      <Route path="/Administrador/Gestion_Pagina" element={<GestionPagina />} />
      <Route path="/Administrador/Gestion_Pedido" element={<GestionPedido />} />
      <Route path="/Administrador/Usuarios" element={<GestionUsiuarios />} />
      <Route path="/Administrador/Inbox" element={<Inbox />} />
      <Route path="/Adfministrador/Gestion_Devoluciones" element={<GestionDevoluciones />}/>
      <Route path="/Adfministrador/Gestion_Cambios" element={<GestionCambios />}/>
      <Route path="/ver_producto" element={<GetProducto/>}></Route> 
      <Route path="/crear_producto" element={<CreateProducto/>}></Route>
      <Route path="/producto/:idProducto" element={<UpdateProducto/>}></Route>
      <Route path="/producto/:idProducto/imagenes" element={<CreateImagen/>} > </Route>
    </Routes>
  );
}
