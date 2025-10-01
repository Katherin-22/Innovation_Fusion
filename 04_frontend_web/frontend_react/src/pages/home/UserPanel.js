import { useState } from "react";

const UserPanel = () => {
  const [tipo, setTipo] = useState("RECLAMO");
  const [contenido, setContenido] = useState("");
  const [usuario, setUsuario] = useState("");

  const enviarMensaje = async () => {
    await fetch("http://localhost:8081/api/mensajes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, tipo, contenido }),
    });
    alert("Mensaje enviado con éxito");
    setContenido("");
  };

  return (
    <div className="p-4">
      <h2 className="mb-3">Enviar mensaje</h2>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Tu nombre"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <select
        className="form-select mb-2"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      >
        <option value="RECLAMO">Reclamo</option>
        <option value="SOLICITUD_CAMBIO">Solicitud de cambio</option>
        <option value="PREGUNTA">Pregunta</option>
        <option value="SUGERENCIA">Sugerencia</option>
      </select>
      <textarea
        className="form-control mb-2"
        placeholder="Escribe tu mensaje..."
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
      ></textarea>
      <button className="btn btn-primary" onClick={enviarMensaje}>
        Enviar
      </button>
    </div>
  );
};

export default UserPanel;
