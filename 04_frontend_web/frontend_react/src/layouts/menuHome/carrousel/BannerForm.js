import { useState } from "react";

const BannerForm = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8080/api/files/upload", {
        method: "POST",
        body: formData,
      });
      const url = await res.text(); // URL pública de Drive
      onUpload(url); // enviar al componente padre
      setFile(null);
      setPreviewUrl("");
    } catch (error) {
      console.error("Error subiendo archivo", error);
    }
  };

  return (
    <div className="row mb-3">
      <div className="col d-flex flex-column align-items-center">
        <h2>Cambiar banner</h2>
        <input type="file" className="form-control mb-2" onChange={handleFileChange} />
        <button type="button" className="btn custom-btn" onClick={handleUpload}>
          Subir Banner
        </button>
      </div>

      {previewUrl && (
        <div className="row mt-3">
          <h3 className="d-flex justify-content-center">Vista previa del banner</h3>
          <img src={previewUrl} alt="Vista previa" className="imagen-gc d-block mx-auto" />
        </div>
      )}
    </div>
  );
};

export default BannerForm;
