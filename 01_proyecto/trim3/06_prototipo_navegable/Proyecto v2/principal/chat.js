// Lee los mensajes del localStorage
function obtenerMensajes() {
    return JSON.parse(localStorage.getItem("mensajesChat") || "[]");
  }
  
  // Guarda los mensajes en el localStorage
  function guardarMensajes(mensajes) {
    localStorage.setItem("mensajesChat", JSON.stringify(mensajes));
  }
  
  // Agrega un mensaje nuevo
  function enviarMensaje(remitente, texto) {
    const mensajes = obtenerMensajes();
    mensajes.push({ remitente, mensaje: texto });
    guardarMensajes(mensajes);
    mostrarMensajes(); // actualiza la vista si aplica
  }
  
  // Muestra los mensajes en el DOM
  function mostrarMensajes() {
    const contenedor = document.querySelector(".chat-box") || document.querySelector(".mensajes");
    if (!contenedor) return;
    const mensajes = obtenerMensajes();
    contenedor.innerHTML = "";
  
    mensajes.forEach(msg => {
      const div = document.createElement("div");
      div.className = msg.remitente === "cliente" ? "message sent" : "message recieved";
      div.textContent = `${msg.remitente === "cliente" ? "Cliente" : "Admin"}: ${msg.mensaje}`;
      contenedor.appendChild(div);
    });
  }
  
  // Detecta envío desde input (cliente o admin)
  document.addEventListener("DOMContentLoaded", () => {
    mostrarMensajes();
  
    const input = document.querySelector(".chat-input input") || document.querySelector(".nuevo-mensaje input");
    const boton = document.querySelector(".chat-input button") || document.querySelector(".nuevo-mensaje button");
  
    if (input && boton) {
      boton.addEventListener("click", () => {
        const texto = input.value.trim();
        if (texto !== "") {
          const remitente = document.querySelector(".chat-container") ? "cliente" : "admin";
          enviarMensaje(remitente, texto);
          input.value = "";
        }
      });
    }
  
    // Permite mantener sincronizado con otros tabs
    window.addEventListener("storage", () => {
      mostrarMensajes();
    });
  });
  