import MenuAdmin from "../../layouts/Administrador/Menu/menuAdmin";
import "../../styles/Administrador/gestion_producto.css";
import "../../styles/Administrador/inventario.css";


const PrincipalPage = () => {
  return (
    <div className="all">
      <MenuAdmin />
      <div className="main-content">
        <div className="container">
        <div className="row border-bottom pb-2 mb-4">
            <h2 className="text-center mb-4">Inventario</h2>


        </div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalPage;
