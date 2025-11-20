import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './componentes/Login'
import RegistrarUsuarios from './componentes/RegistrarUsuarios';
import RecuperarContraseña from './componentes/RecuperarContraseña';
import Principal from './componentes/Principal';
import Dashboard from './componentes/Admin/Dashboard';
import AdminUsuarios from './componentes/AdminUsuarios';
import Collage from './componentes/Collage';
import PerfilUsuario from './componentes/PerfilUsuario';
import AdminDevoluciones from './componentes/AdminDevoluciones';
import LoginPage from './pages/LoginPage'

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

        {/* Ruta administrador*/}
        <Route  path='/Admin/Dashboard' element={<Dashboard/>}/>

        {/* Ruta administrador gestion usuarios*/}
        <Route  path='/adminUsuarios' element={<AdminUsuarios/>}/>

        {/* Ruta principal*/}
        <Route  path='/principal' element={<Principal/>}/>

        {/* Ruta para el collage y el login */}
        <Route  path='/loginpage' element={<LoginPage/>}/>

        {/* Ruta para solo el collage*/}
        <Route  path='/collage' element={<Collage/>}/>

        {/* Ruta para el perfil del usuario*/}
        <Route  path='/perfilusuario' element={<PerfilUsuario/>}/>

        {/* Ruta para gestionar las  devoluciones administrador */}
        <Route  path='/admindevoluciones' element={<AdminDevoluciones/>}/>

      </Routes>

    </div>
   
  </Router>
  );

}

export default App;
