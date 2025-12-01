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
    return <h2 className="text-center mt-5" id="producto-no-encontrado">Producto no encontrado</h2>;
  }

  return (
    <div className="producto-detalle-container" id="producto-detalle-container">
      <MenuHome />
      <div className="producto-body-background" id="producto-body-background">
        <div className="container-fluid" id="producto-main-container">
          <div className="row justify-content-center" id="producto-main-row">
            <div className="col-md-10 col-lg-8" id="producto-content-col">
              <div className="producto-card-detalle shadow-sm" id="producto-card-detalle">
                <div className="producto-card-body-detalle" id="producto-card-body-detalle">

                  {/* ============================
                      INFO PRINCIPAL
                  ============================ */}
                  <div className="row producto-info-principal" id="producto-info-principal">  
                    <div className="col-md-6 producto-col-imagen" id="producto-col-imagen">
                      {/* IMAGEN PRINCIPAL CON FUNCIONALIDAD DE CLICK */}
                      <div className="producto-imagen-container" id="producto-imagen-container">
                        <img
                          src={imagenPrincipal}
                          alt={producto.nombreProducto}
                          className="producto-imagen-principal img-fluid rounded"
                          onClick={() => abrirModalImagen()}
                          style={{ cursor: 'pointer' }}
                          id="producto-imagen-principal"
                        />
                      </div>

                      {/* MINIATURAS DE IMÁGENES (si hay más de una) */}
                      {imagenesProducto.length > 1 && (
                        <div className="producto-miniaturas-container mt-3" id="producto-miniaturas-container">
                          <div className="row g-2 justify-content-center" id="producto-miniaturas-row">
                            {imagenesProducto.map((imagen, index) => (
                              <div key={index} className="col-auto" id={`producto-miniatura-col-${index}`}>
                                <img
                                  src={`http://localhost:8080${imagen.urlImagen}`}
                                  alt={`${producto.nombreProducto} ${index + 1}`}
                                  className={`producto-miniatura img-thumbnail ${imagenPrincipal === `http://localhost:8080${imagen.urlImagen}` ? 'miniatura-activa' : ''}`}
                                  onClick={() => cambiarImagenPrincipal(`http://localhost:8080${imagen.urlImagen}`)}
                                  style={{ cursor: 'pointer', width: '60px', height: '60px', objectFit: 'cover' }}
                                  id={`producto-miniatura-${index}`}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="col-md-6 producto-col-detalles" id="producto-col-detalles">
                      <div className="row" id="producto-detalles-row">
                        <div className="col" id="producto-titulo-col">
                          <h3 className="producto-titulo-detalle" id="producto-titulo-detalle">{producto.nombreProducto}</h3>
                        </div>
                        <div className="col col-info" id="producto-info-col">
                          <p className="producto-codigo-detalle text-muted" id="producto-codigo-detalle">
                            Código: <b id="producto-codigo-valor">{producto.codigoReferencia}</b>
                          </p>
                          <p className="producto-precio-detalle text-muted" id="producto-precio-detalle">
                            Precio: <b className="producto-precio-valor" id="producto-precio-valor">${producto.precio}</b>
                          </p>
                          <p className="producto-descripcion-detalle text-muted" id="producto-descripcion-detalle">
                            Descripción: <b id="producto-descripcion-valor">{producto.descripcion}</b>
                          </p>
                        
                          {/* Información adicional */}
                          <div className="producto-info-adicional mt-3" id="producto-info-adicional">
                            <p className="producto-categoria-detalle text-muted mb-1" id="producto-categoria-detalle">
                              Categoría: <b id="producto-categoria-valor">{producto.nombreCategoria}</b>
                            </p>
                            <p className="producto-tipo-detalle text-muted mb-1" id="producto-tipo-detalle">
                              Tipo: <b id="producto-tipo-valor">{producto.nombreTipoProducto}</b>
                            </p>
                            <p className="producto-genero-detalle text-muted" id="producto-genero-detalle">
                              Género: <b id="producto-genero-valor">{producto.nombrePublico}</b>
                            </p>
                            <p className="producto-material-detalle text-muted" id="producto-genero-detalle">
                              Material: <b id="producto-material-valor">{producto.nombreMaterial}</b>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ============================
                      SELECTORES COLORES Y TALLAS
                  ============================ */}
                  <div className="row producto-selectores-fila mt-4" id="producto-selectores-fila">
                    <div className="col-md-6" id="producto-selector-color-col">
                      <label className="form-label producto-label-selector" id="producto-label-color"><b>Color:</b></label>
                      <select
                        className="form-select producto-select-color"
                        value={colorSeleccionado}
                        onChange={(e) => setColorSeleccionado(e.target.value)}
                        id="producto-select-color"
                      >
                        <option value="" id="producto-option-color-default">Seleccione un color</option>
                        {colores.map((color) => (
                          <option key={color.idColor} value={color.idColor} id={`producto-option-color-${color.idColor}`}>
                            {color.nombreColor}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6" id="producto-selector-talla-col">
                      <label className="form-label producto-label-selector" id="producto-label-talla"><b>Talla:</b></label>
                      <select 
                        className="form-select producto-select-talla" 
                        value={tallaSeleccionada}
                        onChange={(e) => setTallaSeleccionada(e.target.value)}
                        disabled={!colorSeleccionado}
                        id="producto-select-talla"
                      >
                        <option value="" id="producto-option-talla-default">Seleccione una talla</option>
                        {tallas.map((talla, index) => (
                          <option key={index} value={talla.nombre} id={`producto-option-talla-${index}`}>
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
<div className="row producto-botones-fila justify-content-center mt-4" id="producto-botones-fila">
  <div className="col-auto" id="producto-boton-favorito-col">
    <button
      className={`btn producto-btn-favorito ${favorito ? "btn-danger" : "btn-outline-danger"}`}
      onClick={() => setFavorito(!favorito)}
      id="producto-btn-favorito"
    >
      <i className={`bi ${favorito ? "bi-heart-fill" : "bi-heart"} producto-icono-favorito`} id="producto-icono-favorito"></i>
      {favorito ? " Quitar favorito" : " Agregar a favoritos"}
    </button>
  </div>

  <div className="col-auto" id="producto-boton-comprar-col">
    <button 
      className="btn producto-btn-comprar btn-success"
      id="producto-btn-comprar"
    >
      <i className="bi bi-cart-plus producto-icono-comprar me-2" id="producto-icono-comprar"></i>
      Comprar Ahora
    </button>
  </div>

  <div className="col-auto" id="producto-boton-volver-col">
    <Link to="/Catalogo" className="btn producto-btn-volver btn-outline-secondary" id="producto-btn-volver">
      <i className="bi bi-arrow-left producto-icono-volver me-2" id="producto-icono-volver"></i>
      Volver al catálogo
    </Link>
  </div>
</div>

                  {/* ============================
                      SECCIÓN COMENTARIOS
                  ============================ */}
                  <div className="row producto-comentarios-fila mt-5" id="producto-comentarios-fila">
                    <div className="col-12" id="producto-comentarios-col">
                      <div className="producto-seccion-comentarios" id="producto-seccion-comentarios">
                        <h4 className="producto-titulo-comentarios text-center mb-4" id="producto-titulo-comentarios">
                          <i className="bi bi-chat-dots me-2" id="producto-icono-comentarios"></i>
                          Opiniones del producto
                        </h4>
                        
                        <form className="producto-form-comentario container" id="producto-form-comentario">
                          <div className="row align-items-end" id="producto-form-comentario-row">
                            <div className="col-md-8" id="producto-input-comentario-col">
                              <label className="form-label producto-label-comentario" id="producto-label-comentario">Deja tu opinión</label>
                              <input 
                                type="text" 
                                name="opinion"
                                placeholder="Comparte tu experiencia con este producto..."
                                className="form-control producto-input-comentario"
                                id="producto-input-comentario"
                              />
                            </div>
                            <div className="col-md-4" id="producto-boton-comentario-col">
                              <button 
                                type="submit" 
                                className="btn producto-btn-enviar-comentario btn-outline-primary w-100"
                                id="producto-btn-enviar-comentario"
                              >
                                <i className="bi bi-send producto-icono-comentar me-2" id="producto-icono-comentar"></i>
                                Publicar comentario
                              </button>
                            </div>
                          </div>
                        </form>

                        {/* Espacio para lista de comentarios */}
                        <div className="producto-lista-comentarios mt-4" id="producto-lista-comentarios">
                          <p className="text-muted text-center" id="producto-sin-comentarios-message">
                            <i className="bi bi-info-circle me-2" id="producto-icono-sin-comentarios"></i>
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
        <div className="modal-overlay" onClick={cerrarModalImagen} id="producto-modal-overlay">
          <div className="modal-content" onClick={(e) => e.stopPropagation()} id="producto-modal-content">
            <div className="modal-header" id="producto-modal-header">
              <h3 id="producto-modal-titulo">{imagenModal.nombre}</h3>
              <button className="close-button" onClick={cerrarModalImagen} id="producto-modal-close">×</button>
            </div>
            <div className="modal-body" id="producto-modal-body">
              <img 
                src={imagenModal.imagen} 
                alt={imagenModal.nombre}
                className="modal-image"
                id="producto-modal-image"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductoGen;