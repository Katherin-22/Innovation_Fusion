import { Routes, Route } from "react-router-dom";
import { FiltroProvider } from "../utils/FiltroContextx";
/* -----------------------------
   Páginas públicas
----------------------------- */
import Home from "../pages/home/home";
import Catalogo from "../pages/home/category/catalogo";
import ProductoGen from "../pages/home/productoGen";

/* -----------------------------
   Administración - General
----------------------------- */
import Inbox from "../pages/administrador/inbox";
import AdminDevoluciones from "../pages/administrador/gestion/gestiondevoluciones/AdminDevoluciones";
import GestionCambios from "../pages/administrador/gestion/gestionCambios";
import GestionPagina from "../pages/administrador/gestion/gestionPagina";
import GestionPedido from "../pages/administrador/gestion/gestionPedido";
import AdminUserManagement from "../pages/administrador/gestion/gestionusuariosadmin/AdminUserManagement";
/* -----------------------------
   Administración - Stock
----------------------------- */
import Stock from "../pages/administrador/stock/Stock";
import GetIDStock from "../pages/administrador/stock/GetIDStock";
import CreateStock from "../pages/administrador/stock/CreateStock";
import UpdateStock from "../pages/administrador/stock/UpdateStock";

/* -----------------------------
   Administración - Producto
----------------------------- */
import GetProducto from "../pages/administrador/producto/GetProducto";
import CreateProducto from "../pages/administrador/producto/CreateProducto";
import UpdateProducto from "../pages/administrador/producto/UpdateProducto";
import CreateImagen from "../pages/administrador/imagen/CreateImagen";
import UpdateImagen from "../pages/administrador/imagen/UpdateImagen";

/* -----------------------------
   Administración - Categoría
----------------------------- */
import GetCategoria from "../pages/administrador/categoria/GetCategoria";
import CreateCategoria from "../pages/administrador/categoria/CreateCategoria";
import UpdateCategoria from "../pages/administrador/categoria/UpdateCategoria";

/* -----------------------------
   Administración - Promoción
----------------------------- */
import GetPromocion from "../pages/administrador/promocion/GetPromocion";
import CreatePromocion from "../pages/administrador/promocion/CreatePromocion";
import UpdatePromocion from "../pages/administrador/promocion/UpdatePromocion";

/* -----------------------------
   Administración - Color
----------------------------- */
import GetColor from "../pages/administrador/color/GetColor";
import CreateColor from "../pages/administrador/color/CreateColor";
import UpdateColor from "../pages/administrador/color/UpdateColor";

/* -----------------------------
   Administración - Marca
----------------------------- */
import GetMarca from "../pages/administrador/marca/GetMarca";
import CreateMarca from "../pages/administrador/marca/CreateMarca";
import UpdateMarca from "../pages/administrador/marca/UpdateMarca";

/* -----------------------------
   Administración - Material
----------------------------- */
import GetMaterial from "../pages/administrador/material/GetMaterial";
import CreateMaterial from "../pages/administrador/material/CreateMaterial";
import UpdateMaterial from "../pages/administrador/material/UpdateMaterial";

/* -----------------------------
   Componentes de autenticación
----------------------------- */
import LoginPage from '../pages/usuario/LoginPage'
import RegistrarUsuarios from '../pages/usuario/RegistrarUsuarios'
import RecuperarContraseña from '../pages/usuario/RecuperarContraseña'
import Login from '../components/iniciosesion/Login'



/* -----------------------------
   perfil - usuario
----------------------------- */
import PerfilUsuario from '../pages/usuario/PerfilUsuario'

/* -----------------------------
   Carrito de compras
----------------------------- */
import CartPage from '../pages/CartPage'

/* -----------------------------
   Checkout y Pedidos
----------------------------- */
import CheckoutPage from '../pages/CheckoutPage'
import OrderConfirmationPage from '../pages/OrderConfirmationPage'
import OrdersHistoryPage from '../pages/OrdersHistoryPage'

/* -----------------------------
   Favoritos
----------------------------- */
import FavoritesPage from '../pages/FavoritesPage'


function AppRoutes() {
   return (

      <FiltroProvider>
         <Routes>
            {/* Páginas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/Catalogo" element={<Catalogo />} />
            <Route path="/home/:codigoReferencia" element={<ProductoGen />} />

            {/* Administración general */}
            <Route path="/Administrador/Inbox" element={<Inbox />} />
            <Route path="/Administrador/Gestion_Devoluciones" element={<AdminDevoluciones />} />
            <Route path="/Administrador/Gestion_Pagina" element={<GestionPagina />} />
            <Route path="/Administrador/Gestion_Pedido" element={<GestionPedido />} />
            <Route path="/Administrador/Usuarios" element={<AdminUserManagement />} />
            <Route path="/Administrador/Gestion_Cambios" element={<GestionCambios />} />
            <Route path="/Administrador/stock" element={<Stock />} />

            {/* Producto */}
            <Route path="/ver_producto" element={<GetProducto />} />
            <Route path="/crear_producto" element={<CreateProducto />} />
            <Route path="/producto/:idProducto" element={<UpdateProducto />} />
            <Route path="/producto/:idProducto/imagenes" element={<CreateImagen />} />
            <Route path="/producto/:idProducto/imagen/:idImagen" element={<UpdateImagen />} />

            {/* Categoría */}
            <Route path="/ver_categoria" element={<GetCategoria />} />
            <Route path="/categoria" element={<CreateCategoria />} />
            <Route path="/categoria/:idCategoria" element={<UpdateCategoria />} />

            {/* Stock */}
            <Route path="/stock/:idProducto" element={<CreateStock />} />
            <Route path="/stock/producto/:idProducto" element={<GetIDStock />} />
            <Route path="/producto/:idProducto/stock/:idStock" element={<UpdateStock />} />

            {/* Promoción */}
            <Route path="/ver_promocion" element={<GetPromocion />} />
            <Route path="/crear_promocion" element={<CreatePromocion />} />
            <Route path="/promocion/:idPromocion" element={<UpdatePromocion />} />

            {/* Color */}
            <Route path="/ver_color" element={<GetColor />} />
            <Route path="/crear_color" element={<CreateColor />} />
            <Route path="/color/:idColor" element={<UpdateColor />} />

            {/* Marca */}
            <Route path="/ver_marca" element={<GetMarca />} />
            <Route path="/crear_marca" element={<CreateMarca />} />
            <Route path="/marca/:idMarca" element={<UpdateMarca />} />

            {/* Material */}
            <Route path="/ver_material" element={<GetMaterial />} />
            <Route path="/crear_material" element={<CreateMaterial />} />
            <Route path="/material/:idMaterial" element={<UpdateMaterial />} />

            {/* Autenticación */}
            {/* Ruta para el collage y el login */}
            <Route  path='/loginpage' element={<LoginPage/>}/>
            <Route  path='/registrarUsuarios' element={<RegistrarUsuarios/>}/>
            <Route  path='/recuperarContraseña' element={<RecuperarContraseña/>}/>
            <Route  path='/login' element={<Login/>}/>

            {/* Ruta para el perfil*/}
            <Route  path='/perfilUsuario' element={<PerfilUsuario/>}/>

            {/* Carrito de compras */}
            <Route path="/carrito" element={<CartPage />} />

            {/* Checkout y Pedidos */}
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/pedido/:idPedido" element={<OrderConfirmationPage />} />
            <Route path="/pedidos" element={<OrdersHistoryPage />} />

            {/* Favoritos */}
            <Route path="/favoritos" element={<FavoritesPage />} />



         </Routes>
      </FiltroProvider>

   );
}

export default AppRoutes;