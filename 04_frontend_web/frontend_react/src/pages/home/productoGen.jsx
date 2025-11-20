import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetStock } from "../../hooks/stock/useGetStock";
import MenuHome from "../../layouts/home/menuHome";
import "../../styles/home/productGen.css"
import api_url from "../../services/administrador/api";
import { getImagenById } from "../../services/administrador/ImagenService.js";

const ProductoGen = () => {
  const { stock } = useGetStock();
  const { codigoReferencia } = useParams();

  // Buscar producto por códigoReferencia
  const producto = stock.find(p => p.codigoReferencia === codigoReferencia);

  const [favorito, setFavorito] = useState(false);
  const [imagenModal, setImagenModal] = useState(null); // Estado para el modal de imagen
  const [imagenesProducto, setImagenesProducto] = useState([]); // Estado para las imágenes del producto
  const [imagenPrincipal, setImagenPrincipal] = useState(""); // Imagen principal a mostrar

  // 🟡 ESTADOS PARA COLORES Y TALLAS
  const [colores, setColores] = useState([]);
  const [tallas, setTallas] = useState([]);
  const [colorSeleccionado, setColorSeleccionado] = useState("");
  const [tallaSeleccionada, setTallaSeleccionada] = useState("");

  // ============================
  // 1️⃣ Cargar COLORES del producto
  // ============================
  useEffect(() => {
    if (!producto) return;

    api_url.get(`/publico/stock/producto/${producto.idProducto}/color`)
      .then(res => {
        setColores(res.data);
      })
      .catch(err => console.error("Error al cargar colores:", err));
  }, [producto]);

  // ============================
  // 2️⃣ Cargar IMÁGENES del producto
  // ============================
  useEffect(() => {
    if (!producto) return;

    const cargarImagenes = async () => {
      try {
        const response = await getImagenById(producto.idProducto);
        if (response.data && response.data.length > 0) {
          setImagenesProducto(response.data);
          // Establecer la primera imagen como principal
          setImagenPrincipal(`http://localhost:8080${response.data[0].urlImagen}`);
        } else {
          // Si no hay imágenes, usar la imagen por defecto
          setImagenPrincipal(producto.imagen || "/imagenes_prueba/default.jpg");
        }
      } catch (error) {
        console.error("Error al cargar imágenes del producto:", error);
        setImagenPrincipal(producto.imagen || "/imagenes_prueba/default.jpg");
      }
    };

    cargarImagenes();
  }, [producto]);

  // ============================
  // 3️⃣ Cargar TALLAS cuando se selecciona un color
  // ============================
  useEffect(() => {
    if (!producto || !colorSeleccionado) {
      setTallas([]);
      setTallaSeleccionada("");
      return;
    }

    api_url.get(`/publico/stock/producto/${producto.idProducto}/color/${colorSeleccionado}/tallas`)
      .then(res => {
        setTallas(res.data);
        setTallaSeleccionada(""); // Resetear talla al cambiar color
      })
      .catch(err => console.error("Error al cargar tallas:", err));
  }, [producto, colorSeleccionado]);

  // ============================
  // 4️⃣ Obtener stock disponible para la combinación seleccionada
  // ============================
  const obtenerStockDisponible = () => {
    if (!colorSeleccionado || !tallaSeleccionada) return null;
    
    const stockItem = stock.find(item => {
      // Convertir ambos a number para comparación segura
      const itemColorId = parseInt(item.idColor);
      const selectedColorId = parseInt(colorSeleccionado);
      
      return (
        item.idProducto === producto.idProducto &&
        itemColorId === selectedColorId &&
        item.nombre === tallaSeleccionada
      );
    });
    
    return stockItem ? stockItem.stockActual : 0;
  };

  // ============================
  // FUNCIONES PARA MANEJO DE IMÁGENES
  // ============================
  const abrirModalImagen = (imagenUrl = null) => {
    const imagenAMostrar = imagenUrl || imagenPrincipal;
    setImagenModal({
      imagen: imagenAMostrar,
      nombre: producto.nombreProducto
    });
  };

  const cerrarModalImagen = () => {
    setImagenModal(null);
  };

  const cambiarImagenPrincipal = (nuevaImagenUrl) => {
    setImagenPrincipal(nuevaImagenUrl);
  };

  const stockDisponible = obtenerStockDisponible();

  if (!producto) {
    return <h2 className="text-center mt-5">Producto no encontrado</h2>;
  }

  return (
    <div className="producto-detalle-container">
      <MenuHome />
      <div className="producto-body-background">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8">
              <div className="producto-card-detalle shadow-sm">
                <div className="producto-card-body-detalle">

                  {/* ============================
                      INFO PRINCIPAL
                  ============================ */}
                  <div className="row producto-info-principal">  
                    <div className="col-md-6 producto-col-imagen">
                      {/* IMAGEN PRINCIPAL CON FUNCIONALIDAD DE CLICK */}
                      <div className="producto-imagen-container">
                        <img
                          src={imagenPrincipal}
                          alt={producto.nombreProducto}
                          className="producto-imagen-principal img-fluid rounded"
                          onClick={() => abrirModalImagen()}
                          style={{ cursor: 'pointer' }}
                        />
                        <div 
                          className="producto-imagen-overlay"
                          onClick={() => abrirModalImagen()}
                        >
                          <span>Ver imagen</span>
                        </div>
                      </div>

                      {/* MINIATURAS DE IMÁGENES (si hay más de una) */}
                      {imagenesProducto.length > 1 && (
                        <div className="producto-miniaturas-container mt-3">
                          <div className="row g-2 justify-content-center">
                            {imagenesProducto.map((imagen, index) => (
                              <div key={index} className="col-auto">
                                <img
                                  src={`http://localhost:8080${imagen.urlImagen}`}
                                  alt={`${producto.nombreProducto} ${index + 1}`}
                                  className={`producto-miniatura img-thumbnail ${imagenPrincipal === `http://localhost:8080${imagen.urlImagen}` ? 'miniatura-activa' : ''}`}
                                  onClick={() => cambiarImagenPrincipal(`http://localhost:8080${imagen.urlImagen}`)}
                                  style={{ cursor: 'pointer', width: '60px', height: '60px', objectFit: 'cover' }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="col-md-6 producto-col-detalles">
                      <div className="row">
                        <div className="col">
                          <h3 className="producto-titulo-detalle">{producto.nombreProducto}</h3>
                        </div>
                        <div className="col col-info">
                          <p className="producto-codigo-detalle text-muted">
                            Código: <b>{producto.codigoReferencia}</b>
                          </p>
                          <p className="producto-precio-detalle text-muted">
                            Precio: <b className="producto-precio-valor">${producto.precio}</b>
                          </p>
                          <p className="producto-descripcion-detalle text-muted">
                            Descripción: <b>{producto.Descripción}</b>
                          </p>
                        
                          {/* Información adicional */}
                          <div className="producto-info-adicional mt-3">
                            <p className="producto-categoria-detalle text-muted mb-1">
                              Categoría: <b>{producto.nombreCategoria}</b>
                            </p>
                            <p className="producto-tipo-detalle text-muted mb-1">
                              Tipo: <b>{producto.nombreTipoProducto}</b>
                            </p>
                            <p className="producto-genero-detalle text-muted">
                              Género: <b>{producto.nombrePublico}</b>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ============================
                      SELECTORES COLORES Y TALLAS
                  ============================ */}
                  <div className="row producto-selectores-fila mt-4">
                    <div className="col-md-6">
                      <label className="form-label producto-label-selector"><b>Color:</b></label>
                      <select
                        className="form-select producto-select-color"
                        value={colorSeleccionado}
                        onChange={(e) => setColorSeleccionado(e.target.value)}
                      >
                        <option value="">Seleccione un color</option>
                        {colores.map((color) => (
                          <option key={color.idColor} value={color.idColor}>
                            {color.nombreColor}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label producto-label-selector"><b>Talla:</b></label>
                      <select 
                        className="form-select producto-select-talla" 
                        value={tallaSeleccionada}
                        onChange={(e) => setTallaSeleccionada(e.target.value)}
                        disabled={!colorSeleccionado}
                      >
                        <option value="">Seleccione una talla</option>
                        {tallas.map((talla, index) => (
                          <option key={index} value={talla.nombre}>
                            {talla.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* ============================
                      INFO STOCK DISPONIBLE
                  ============================ */}

                  {/* ============================
                      BOTONES DE ACCIÓN
                  ============================ */}
                  <div className="row producto-botones-fila justify-content-between mt-4">
                    <div className="col-auto">
                      <button
                        className={`btn producto-btn-favorito ${favorito ? "btn-danger" : "btn-outline-danger"}`}
                        onClick={() => setFavorito(!favorito)}
                      >
                        <i className={`bi ${favorito ? "bi-heart-fill" : "bi-heart"} producto-icono-favorito`}></i>
                        {favorito ? " Quitar favorito" : " Agregar a favoritos"}
                      </button>
                    </div>

                    <div className="col-auto">
                      <button 
                        className="btn producto-btn-comprar btn-success"
                      >
                        <i className="bi bi-cart-plus producto-icono-comprar me-2">Comprar Ahora</i>
  
                      </button>
                    </div>

                    <div className="col-auto">
                      <Link to="/Catalogo" className="btn producto-btn-volver btn-outline-secondary">
                        <i className="bi bi-arrow-left producto-icono-volver me-2"></i>
                        Volver al catálogo
                      </Link>
                    </div>
                  </div>

                  {/* ============================
                      SECCIÓN COMENTARIOS
                  ============================ */}
                  <div className="row producto-comentarios-fila mt-5">
                    <div className="col-12">
                      <div className="producto-seccion-comentarios">
                        <h4 className="producto-titulo-comentarios text-center mb-4">
                          <i className="bi bi-chat-dots me-2"></i>
                          Opiniones del producto
                        </h4>
                        
                        <form className="producto-form-comentario container">
                          <div className="row align-items-end">
                            <div className="col-md-8">
                              <label className="form-label producto-label-comentario">Deja tu opinión</label>
                              <input 
                                type="text" 
                                name="opinion"
                                placeholder="Comparte tu experiencia con este producto..."
                                className="form-control producto-input-comentario"
                              />
                            </div>
                            <div className="col-md-4">
                              <button 
                                type="submit" 
                                className="btn producto-btn-enviar-comentario btn-outline-primary w-100"
                              >
                                <i className="bi bi-send producto-icono-comentar me-2"></i>
                                Publicar comentario
                              </button>
                            </div>
                          </div>
                        </form>

                        {/* Espacio para lista de comentarios */}
                        <div className="producto-lista-comentarios mt-4">
                          <p className="text-muted text-center">
                            <i className="bi bi-info-circle me-2"></i>
                            Sé el primero en comentar este producto
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>

      {/* ============================
          MODAL PARA VER IMAGEN
      ============================ */}
      {imagenModal && (
        <div className="modal-overlay" onClick={cerrarModalImagen}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{imagenModal.nombre}</h3>
              <button className="close-button" onClick={cerrarModalImagen}>×</button>
            </div>
            <div className="modal-body">
              <img 
                src={imagenModal.imagen} 
                alt={imagenModal.nombre}
                className="modal-image"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductoGen;