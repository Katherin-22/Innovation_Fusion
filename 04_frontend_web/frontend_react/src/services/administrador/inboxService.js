import api_url from "./api";

// Obtener todos los mensajes
export const getMensajes = async () => {
  return await api_url.get("/api/mensajes");
};

// Responder un mensaje
export const responderMensaje = async (id, respuesta) => {
  return await api_url.post(`/api/mensajes/${id}/responder`, { respuesta });
};
