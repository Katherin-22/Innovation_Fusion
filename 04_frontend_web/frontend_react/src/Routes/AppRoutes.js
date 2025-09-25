import { Routes , Route } from "react-router-dom";


// aqui importar cada archivo al que le querememos hacewr rutas en otras palabras cada vista
import Home from "../pages/home/home";
import Catalog from "../pages/category/catalogo";
import Stock from "../pages/admi/Stock";


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Catalog" element={<Catalog />} />
            <Route path="/stock" element={<Stock />} />
        </Routes>
    )
}

