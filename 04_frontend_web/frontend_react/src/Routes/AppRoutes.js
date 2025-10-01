import { Routes , Route } from "react-router-dom";


// aqui importar cada archivo al que le querememos hacewr rutas en otras palabras cada vista
import Home from "../pages/home/home";
import Catalog from "../pages/category/catalogo";
import Stock from "../pages/administrador/stock/Stock";
import GetProducto from "../pages/administrador/producto/GetProducto"
import CreateProducto from "../pages/administrador/producto/CreateProducto";
import UpdateProducto from "../pages/administrador/producto/UpdateProducto";


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Catalog" element={<Catalog />} />
            <Route path="/Administrador/stock" element={<Stock />} />
            <Route path="/ver_producto" element={<GetProducto/>}></Route> 
            <Route path="/crear_producto" element={<CreateProducto/>}></Route>
            <Route path="/producto/:idProducto" element={<UpdateProducto/>}></Route>
        </Routes>
    )
}

