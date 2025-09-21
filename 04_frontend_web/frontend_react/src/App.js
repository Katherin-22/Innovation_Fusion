
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./styles/home/paginaInicio.css"

import Home from "./pages/home/home";
import Catalogo from "./pages/category/catalogo";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
  <Routes>
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/Catalogo" element={<Catalogo />} />
    </Route>
  </Routes>
  );
}

export default App;
