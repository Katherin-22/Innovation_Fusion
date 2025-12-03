import MenuAdmin from "./menuAdmin";  
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="admin-wrapper">
      {/* Menú lateral */}
      <MenuAdmin />

      {/* Contenido a la derecha */}
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
