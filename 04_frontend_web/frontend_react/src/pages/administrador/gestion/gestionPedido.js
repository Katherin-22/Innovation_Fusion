import MenuAdmin from '../../../layouts/Administrador/Menu/menuAdmin';
import '../../../styles/Administrador/gestion_producto.css';
import '../../../styles/Administrador/inventario.css';

const GestionPedido = () => {
    return (
<div className="all">
      <MenuAdmin />
      <div className="main-content">
        <div className="container">


        <div className="row border-bottom pb-2 mb-4">
            <h1 className="text-center">Gestión Pedidos</h1>
        </div>

        <div className="row row-cols-md-2 g-4 mb-4">
            <div className="col">
                <button type="button" className="btn btn-outline-secondary w-100">Gestión Devoluciones</button>
            </div>
            <div className="col">
                <button type="button" className="btn btn-outline-secondary w-100">Gestión Cambios</button>
            </div>
        </div>

        <div className="row row-cols-md-3 g-4 mb-4">
            <div className="col">
                <select name="estado_pedido" id="estado_pedido" className="form-select">
                    <option value="">Seleccionar estado</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Entregado">Entregado</option>
                </select>
            </div>
            <div className="col">
                <button type="button" className="btn btn-primary w-100">Ver historial</button>
            </div>
            <div className="col">
                <button type="button" className="btn btn-success w-100">Agregar Manualmente</button>
            </div>
        </div>

        <div className="row">
            <div className="col">
      <table className="table table-bordered table-striped">
    <thead className="table-dark">
        <tr>
            <th scope="col">
                <input type="checkbox" id="checkAll" />
            </th>
            <th>ID Pedido</th>
            <th>Cliente</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><input type="checkbox" className="check-item" /></td>
            <td>001</td>
            <td>Ana Torres</td>
            <td>Pendiente</td>
            <td>2025-06-13</td>
            <td>
                <button className="btn btn-sm btn-info">Ver</button>
                <button className="btn btn-sm btn-warning">Editar</button>
            </td>
        </tr>
        <tr>
            <td><input type="checkbox" className="check-item" /></td>
            <td>002</td>
            <td>Pedro Gómez</td>
            <td>En proceso</td>
            <td>2025-06-12</td>
            <td>
                <button className="btn btn-sm btn-info">Ver</button>
                <button className="btn btn-sm btn-warning">Editar</button>
            </td>
        </tr>
      
    </tbody>
</table>

            </div>
        </div>

    </div>

</div>

        </div>


    )
}

export default GestionPedido;