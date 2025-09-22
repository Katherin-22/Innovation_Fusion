import MenuAdmin from "../../layouts/Administrador/Menu/menuAdmin";
import "../../styles/Administrador/gestion_producto.css";
import "../../styles/Administrador/inventario.css";

const GestionUsiuarios = () => {
    return (
    <div className="all">
      <MenuAdmin />
      <div className="main-content">
        <div className="container">
        <div className="row border-bottom pb-2 mb-4">
            <h1 className="text-center">Gestión Usuarios</h1>
        </div>
        </div>
      </div>
    </div>
    )
}

export default GestionUsiuarios;
