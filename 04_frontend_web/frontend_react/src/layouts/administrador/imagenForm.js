import { useState } from "react";
import { createImagen } from "../../../services/administrador/ImagenService"

const ImagenForm = ({ idProducto, onUpload }) => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      const response = await createImagen(idProducto, file); // ya maneja formData en el service
      const data = response.data; 
      onUpload(data); // le paso al padre la info de la imagen guardada
      setFile(null);  // limpio el estado
    } catch (error) {
      console.error("Error en la subida:", error);
      alert("Hubo un problema al subir la imagen");
    }
  };



  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex flex-column align-items-center p-3"
    >
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="form-control mb-3"
      />
      <button
        type="submit"
        className="btn btn-primary btn-lg rounded-3 shadow"
      >
        Subir Imagen
      </button>
    </form>
  );
};

export default ImagenForm;