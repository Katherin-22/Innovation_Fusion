
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

import "./styles/home/paginaInicio.css"

import Home from "./pages/home/home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
  <Routes>
    <Route>
      <Route path="/" element={<Home />} />
    </Route>
  </Routes>
  );
}

export default App;
