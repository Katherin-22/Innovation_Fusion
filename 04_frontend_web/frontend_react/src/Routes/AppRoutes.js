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
import ProductoGen from "../pages/home/productoGen";
import CreateImagen from "../pages/administrador/imagen/CreateImagen";
import GetCategoria from "../pages/administrador/categoria/GetCategoria";
import CreateCategoria from "../pages/administrador/categoria/CreateCategoria";
import GetIDStock from "../pages/administrador/stock/GetIDStock";
import GetPromocion from "../pages/administrador/promocion/GetPromocion";
import Login from '../components/Login';
import RegistrarUsuarios from '../components/RegistrarUsuarios';
import RecuperarContraseña from '../components/RecuperarContraseña';
import Principal from '../components/Principal';
import CollageLogin from '../pages/Collage-Login';
import UpdateCategoria  from "../pages/administrador/categoria/UpdateCategoria";
import CreatePromocion from "../pages/administrador/promocion/CreatePromocion";
import CreateStock from "../pages/administrador/stock/CreateStock";
import UpdateStock from "../pages/administrador/stock/UpdateStock";
import UpdatePromocion from "../pages/administrador/promocion/UpdatePromocion";
import UpdateImagen from "../pages/administrador/imagen/UpdateImagen";  
import GetColor from "../pages/administrador/color/GetColor";
import CreateColor from "../pages/administrador/color/CreateColor";
import UpdateColor from "../pages/administrador/color/UpdateColor";
import GetMarca from "../pages/administrador/marca/GetMarca";
import CreateMarca from "../pages/administrador/marca/CreateMarca";
import UpdateMarca from "../pages/administrador/marca/UpdateMarca";
import GetMaterial from "../pages/administrador/material/GetMaterial";
import CreateMaterial from "../pages/administrador/material/CreateMaterial";
import UpdateMaterial from "../pages/administrador/material/UpdateMaterial";

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
      <Route path="/home/:codigoReferencia" element={<ProductoGen />} />
      <Route path="/producto/:idProducto/imagenes" element={<CreateImagen/>} > </Route>
      <Route path="/ver_categoria" element={<GetCategoria/>}></Route>
      <Route path="/categoria" element={<CreateCategoria/>}></Route> 
      <Route path="/stock/producto/:idProducto" element={<GetIDStock/>}></Route> 
      <Route path="/ver_promocion" element={<GetPromocion/>}></Route> 
        {/* Ruta para el Login*/}
        <Route  path='/login' element={<Login/>}/>

        {/* Ruta para el Registro*/}
        <Route  path='/registrarusuarios' element={<RegistrarUsuarios/>}/>

        {/* Ruta para Restablecer contraseña*/}
        <Route  path='/recuperarcontraseña' element={<RecuperarContraseña/>}/>

        {/* Ruta para el collage*/}
        <Route  path='/collage-login' element={<CollageLogin/>}/>

      <Route path="/categoria/:idCategoria" element={<UpdateCategoria/>}></Route> 
      <Route path="/crear_promocion" element={<CreatePromocion/>}></Route> 
      <Route path="/stock/:idProducto" element={<CreateStock/>}></Route> 
      <Route path="/producto/:idProducto/stock/:idStock" element={<UpdateStock/>}></Route> 
      <Route path="/promocion/:idPromocion" element={<UpdatePromocion/>}></Route> 
      <Route path="/producto/:idProducto/imagen/:idImagen" element={<UpdateImagen/>}></Route> 
      <Route path="/ver_color" element={<GetColor/>}></Route> 
      <Route path="/crear_color" element={<CreateColor/>}></Route> 
      <Route path="/color/:idColor" element={<UpdateColor/>}></Route> 
      <Route path="/ver_marca" element={<GetMarca/>}></Route> 
      <Route path="/crear_marca" element={<CreateMarca/>}></Route> 
      <Route path="/marca/:idMarca" element={<UpdateMarca/>}></Route> 
      <Route path="/ver_material" element={<GetMaterial/>}></Route> 
      <Route path="/crear_material" element={<CreateMaterial/>}></Route>
      <Route path="/material/:idMaterial" element={<UpdateMaterial/>}></Route>  

    </Routes>
  );
}
