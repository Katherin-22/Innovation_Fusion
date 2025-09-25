
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./styles/home/paginaInicio.css"

import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './Routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
