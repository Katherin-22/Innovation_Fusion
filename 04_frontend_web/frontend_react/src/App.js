import './App.css';

/*-- Bootstrap para react --*/
/*- se descargar con el siguiente comando -- npm install react-bootstrap bootstrap -- -*/

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import AppRoutes from "./routes/AppRoutes"; 
import { BrowserRouter } from "react-router-dom";

/*--- esto es para el manejo de rutas ---*/
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
