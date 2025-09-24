import { Link, Outlet } from "react-router-dom";
import "../../styles/admi/INVENTARIO.CSS";
import logo from "../../assets/logo.png";
import flecha from "../../assets/caret-right-fill.svg";
import inventario from "../../assets/bag-fill.svg";
import pagina from "../../assets/card-heading.svg";
import usuario from "../../assets/person-rolodex.svg";
import pedido from "../../assets/box2-fill.svg";
import chat from "../../assets/chat-dots-fill.svg";
import door from "../../assets/door-closed.svg";

export default function MenuAdmi() {
  return (  
    <nav className="slidebar close">
        <header>
            <div className="image-text">
                <span className="image">
                    <img src={logo} alt="logo"/>
                </span>

                <div className="text header-text">
                    <span className="name">ADMINISTRADOR</span>
                </div>
            </div>

            <i className="arrow toggle">
                <img src={flecha} alt=""/></i>
        </header>

        <div className="menu-bar">
            <div className="menu">
                <ul className="menu-links">
                    <li className="nav link">
                        <Link to="../../pages/home/home.html">
                        <img src={inventario} alt="inventario"/>
                        <span className="text nav-text">Inventario</span>
                    </Link>
                    </li>

                     <li className="nav link">
                        <Link to="./CONTROL_CONTENIDO.HTML">
                        <img src={pagina} alt="pagina"/>
                        <span className="text nav-text">Gestionar Pagina</span>
                    </Link>
                    </li>

                     <li className="nav link">
                        <Link to="./GESTION_USUARIOS.HTML">
                        <img src={usuario} alt="usuario"/>
                        <span className="text nav-text">Gestion Usuarios</span>
                    </Link>
                    </li>

                     <li className="nav link">
                        <Link to="./GESTION_PEDIDO.HTML">
                        <img src={pedido} alt="pedido"/>
                        <span className="text nav-text">Gestion Pedidos</span>
                    </Link>
                    </li>


                     <li className="nav link">
                        <Link to="./CHAT.HTML">
                        <img src={chat} alt="chat"/>
                        <span className="text nav-text">Chat</span>
                    </Link>
                    </li>

                </ul>
            </div>

            <div className="botton-content">
                  <li className="nav link">
                        <Link to="#">
                        <img src={door} className="door" alt="salida"/>
                        <span className="text nav-text">Cerrar sesion</span>
                    </Link>
                    </li> 
            </div>
        </div>
        
    </nav> 
    <main>
    <Outlet />
    </main>
  )
}
