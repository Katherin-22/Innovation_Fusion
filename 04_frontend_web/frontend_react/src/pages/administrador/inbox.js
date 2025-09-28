import MenuAdmin from "../../layouts/Administrador/Menu/menuAdmin";
import "../../styles/Administrador/gestion_producto.css";
import "../../styles/Administrador/inventario.css";
import "../../styles/Administrador/chat.css";

const Inbox = () => {
    return (
    <div className="all">
      <MenuAdmin />
      <div className="main-content">
        <div className="container">
        <div className="row border-bottom pb-2 mb-4">
            <h2 className="text-center mb-4">Inbox</h2>



        </div>
        </div>
      </div>
    </div>
    )
}

export default Inbox;