import MenuAdmin from "../../layouts/Administrador/Menu/menuAdmin";
import "../../styles/Administrador/gestion_producto.css";
import "../../styles/Administrador/inventario.css";


const PrincipalPage = () => {
  return (
    <div className="admin-layout">
      {/* Barra lateral */}
      <MenuAdmin />

      {/* Contenido principal */}
      <main className="admin-content">
        <h1>Panel de Administración</h1>
        <p>Bienvenido al módulo administrador. Selecciona una opción del menú.</p>
      </main>
    </div>
  );
};

export default PrincipalPage;
