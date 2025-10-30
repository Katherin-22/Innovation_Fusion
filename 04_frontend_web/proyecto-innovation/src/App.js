import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './componentes/Login'
import RegistrarUsuarios from './componentes/RegistrarUsuarios';
import RecuperarContraseña from './componentes/RecuperarContraseña';
import Principal from './componentes/Principal';
import CollageLogin from './pages/Collage-Login'

function App() {
  return (
  <Router>

    <div className="App">
     
      <Routes>
        {/* Ruta para el Login*/}
        <Route  path='/login' element={<Login/>}/>

        {/* Ruta para el Registro*/}
        <Route  path='/registrarusuarios' element={<RegistrarUsuarios/>}/>

        {/* Ruta para Restablecer contraseña*/}
        <Route  path='/recuperarcontraseña' element={<RecuperarContraseña/>}/>

        {/* Ruta principal*/}
        <Route  path='/principal' element={<Principal/>}/>

        {/* Ruta para el collage*/}
        <Route  path='/collage-login' element={<CollageLogin/>}/>
      </Routes>

    </div>
   
  </Router>
  );

}

export default App;
