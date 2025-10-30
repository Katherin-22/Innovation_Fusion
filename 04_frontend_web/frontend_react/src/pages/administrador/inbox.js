import MenuAdmin from "../../layouts/Administrador/Menu/menuAdmin";
import "../../styles/administrador/gestion_producto.css";
import "../../styles/administrador/inventario.css";
import "../../styles/administrador/chat.css";

import { useEffect, useState } from "react";
import { getMensajes, responderMensaje } from "../../services/administrador/inboxService";

const Inbox = () => {
  const [mensajes, setMensajes] = useState([]);
  const [respuesta, setRespuesta] = useState({});

  useEffect(() => {
    cargarMensajes();
  }, []);

  const cargarMensajes = async () => {
    try {
      const res = await getMensajes();
      setMensajes(res.data); // axios devuelve en data
    } catch (err) {
      console.error("Error al obtener mensajes:", err);
    }
  };

  const enviarRespuesta = async (id) => {
    try {
      await responderMensaje(id, respuesta[id]);
      alert("Respuesta enviada");
      cargarMensajes(); // refrescar lista
    } catch (err) {
      console.error("Error al responder:", err);
    }
  };

  return (
    <div className="all">
      <MenuAdmin />
      <div className="main-content p-4">
        <h2 className="text-center mb-4">📩 Inbox</h2>
        {mensajes.map((m) => (
          <div key={m.id} className="card mb-3 p-3">
            <h5>{m.tipo} - {m.usuario}</h5>
            <p>{m.contenido}</p>
            <p><b>Respuesta:</b> {m.respuesta || "Sin respuesta"}</p>
            <textarea
              className="form-control mb-2"
              placeholder="Escribir respuesta..."
              value={respuesta[m.id] || ""}
              onChange={(e) =>
                setRespuesta({ ...respuesta, [m.id]: e.target.value })
              }
            ></textarea>
            <button
              className="btn custom-btn"
              onClick={() => enviarRespuesta(m.id)}
            >
              Responder
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inbox;
