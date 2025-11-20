import MenuAdmin from "../../../layouts/administrador/menuAdmin";
import "../../../styles/administrador/gestion_producto.css";
import "../../../styles/administrador/inventario.css";

const GestionDevoluciones= () => {
    return (
    <div className="all">
      <MenuAdmin />
      <div className="main-content">
        <div className="container">
        <div className="row border-bottom pb-2 mb-4">
            <h2 className="text-center mb-4">Gestión Devoluciones</h2>
            
        </div>
        </div>
      </div>
    </div>
    )
}

export default GestionDevoluciones;
