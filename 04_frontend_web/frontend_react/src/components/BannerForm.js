import { useState } from "react";

const BannerForm = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:8080/api/banners/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      alert("Error al subir el banner");
      return;
    }

    const data = await response.json();
    onUpload(data); // devuelve el objeto Banner completo
    setFile(null);
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
        Subir Banner
      </button>
    </form>
  );
};

export default BannerForm;
