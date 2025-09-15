import { Routes , Route } from "react-router-dom";


// aqui importar cada archivo al que le querememos hacewr rutas en otras palabras cada vista
import Home from "../pages/home/home";


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    )
}

