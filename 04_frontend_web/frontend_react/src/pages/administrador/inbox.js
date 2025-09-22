import MenuAdmin from "../../layouts/Administrador/Menu/menuAdmin";
import "../../styles/Administrador/gestion_producto.css";
import "../../styles/Administrador/inventario.css";
import "../../styles/Administrador/chat.css";

const Inbox = () => {
    return (
<div className="all">
<MenuAdmin />

<div className="main-content">

    <div className="container-fluid mt-3">
  <div className="row">

    <div className="col-12 col-md-4 border-end p-0">
      <div className="list-group rounded-0">
        <button className="list-group-item list-group-item-action active d-flex justify-content-between align-items-center">
          <div>
            <div className="fw-bold">Daniela</div>
            <small className="text-light">Escribiendo...</small>
          </div>
        </button>
        <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          <div>
            <div className="fw-bold">Carlos</div>
            <small className="text-muted">Hola, ¿cómo va todo?</small>
          </div>
        </button>
        <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          <div>
            <div className="fw-bold">Lucía</div>
            <small className="text-muted">¿Revisaste el pedido?</small>
          </div>
        </button>
      </div>
    </div>

    <div className="col-12 col-md-8 d-flex flex-column min-vh-100">

      <div className="p-3 border-bottom bg-white">
        <h5 className="mb-0">Chat con Daniela</h5>
      </div>


      <div className="flex-grow-1 overflow-auto p-3" >
        <div className="d-flex flex-column gap-3">
          <div className="d-flex flex-column align-self-start">
            <div className="bg-light rounded p-2">Hola, ¿cómo estás?</div>
            <small className="text-muted">10:05 AM</small>
          </div>

          <div className="d-flex flex-column align-self-end text-end">
            <div className="bg-primary text-white rounded p-2">Bien, gracias. ¿Y tú?</div>
            <small className="text-muted">10:06 AM</small>
          </div>

          <div className="d-flex flex-column align-self-start">
            <div className="bg-light rounded p-2">Estoy organizando los pedidos</div>
            <small className="text-muted">10:07 AM</small>
          </div>
        </div>
      </div>

      <form className="p-3 border-top d-flex align-items-center gap-2 bg-white">
        <input type="text" className="form-control" placeholder="Escribe un mensaje..." />
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  </div>
</div>


</div>
</div>
    )
}

export default Inbox;
