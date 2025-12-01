/*-- Bootstrap para react --*/
/*- se descargar con el siguiente comando -- npm install react-bootstrap bootstrap -- -*/

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import './App.css';

import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';


/*--- esto es para el manejo de rutas ---*/
function App() {
  return (
    <CartProvider>
      <Router>
        <AppRoutes />
      </Router>
    </CartProvider>
  );
}

export default App;
