import React, { useState, useEffect } from "react";
import { useGetStock } from "../../../hooks/stock/useGetStock";
import { Link } from "react-router-dom";
import MenuHome from "../../../layouts/home/menuHome";
import { useFiltro } from "../../../utils/FiltroContextx";
import { getImagenById } from "../../../services/administrador/ImagenService";
import "../../../styles/home/canalogoHome.css";

const Catalogo = () => {
  const { stock } = useGetStock();
  const { filtro } = useFiltro();
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [imagenesProductos, setImagenesProductos] = useState({}); // Estado para almacenar imágenes por producto
  const [imagenModal, setImagenModal] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("🔄 Aplicando filtro:", filtro);
    
    if (filtro === 'todos') {
      setProductosFiltrados(stock);
    } else {
      const filtrados = stock.filter(producto => {
        const publicoLower = producto.nombrePublico?.toLowerCase() || '';
        const tipoLower = producto.nombreTipoProducto?.toLowerCase() || '';
        const nombreLower = producto.nombreProducto?.toLowerCase() || '';
        
        switch(filtro) {
          case 'mujer':
            return publicoLower.includes('mujer') || nombreLower.includes('mujer');
          case 'hombre':
            return publicoLower.includes('hombre') || nombreLower.includes('hombre');
          case 'nino':
            return publicoLower.includes('niño') || publicoLower.includes('nino') || nombreLower.includes('niño');
          case 'calzado':
            return tipoLower.includes('zapato') || tipoLower.includes('calzado') || nombreLower.includes('zapato');
          case 'bolsos':
            return tipoLower.includes('bolso') || nombreLower.includes('bolso');
          default:
            return true;
        }
      });
      setProductosFiltrados(filtrados);
    }
  }, [stock, filtro]);

  // Cargar imágenes para cada producto
  useEffect(() => {
    const cargarImagenes = async () => {
      setLoading(true);
      try {
        const imagenesMap = {};
        
        for (const producto of productosFiltrados) {
          try {
            const response = await getImagenById(producto.idProducto);
            if (response.data && response.data.length > 0) {
              // Tomar la primera imagen del producto
              imagenesMap[producto.idProducto] = `http://localhost:8080${response.data[0].urlImagen}`;
            }
          } catch (error) {
            console.error(`Error al cargar imagen para producto ${producto.idProducto}:`, error);
            imagenesMap[producto.idProducto] = "/imagenes_prueba/default.jpg";
          }
        }
        
        setImagenesProductos(imagenesMap);
      } catch (error) {
        console.error("Error general al cargar imágenes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productosFiltrados.length > 0) {
      cargarImagenes();
    }
  }, [productosFiltrados]);

  // Función para abrir el modal con la imagen
  const abrirModalImagen = (producto) => {
    const imagen = imagenesProductos[producto.idProducto] || producto.imagen || "/imagenes_prueba/default.jpg";
    setImagenModal({
      imagen: imagen,
      nombre: producto.nombreProducto
    });
  };

  // Función para cerrar el modal
  const cerrarModalImagen = () => {
    setImagenModal(null);
  };

  return (
    <div className="catalogo-container">
      <MenuHome />
      <div className="catalogo-background">
        <div className="catalogo-wrapper">
          
          {/* HEADER CON FILTRO ACTIVO */}
          <div className="filtros-activos">
            <h2 className="categoria-titulo">
              {filtro === 'todos' && 'Todos los productos'}
              {filtro === 'mujer' && 'Calzado para Mujer'}
              {filtro === 'hombre' && 'Calzado para Hombre'} 
              {filtro === 'nino' && 'Calzado para Niño'}
              {filtro === 'calzado' && 'Todo el Calzado'}
              {filtro === 'bolsos' && 'Bolsos'}
            </h2>
            <p className="contador-productos">
              {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? 's' : ''} encontrado{productosFiltrados.length !== 1 ? 's' : ''}
            </p>
          </div>

          {loading && <p>Cargando imágenes...</p>}

          {/* GRILLA DE PRODUCTOS */}
          <div className="products-grid">
            {productosFiltrados.map(producto => (
              <div key={producto.codigoReferencia} className="product-card-wrapper">
                <div className="product-card">
                  <div className="product-image-container">
                    <img
                      src={imagenesProductos[producto.idProducto] || producto.imagen || "/imagenes_prueba/default.jpg"}
                      className="product-image"
                      alt={producto.nombreProducto}
                      onClick={() => abrirModalImagen(producto)}
                      style={{ cursor: 'pointer' }}
                    />
                    <div className="image-overlay" onClick={() => abrirModalImagen(producto)}>
                      <span>Ver imagen</span>
                    </div>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{producto.nombreProducto}</h3>
                    <p className="product-category">{producto.nombreTipoProducto}</p>
                    <p className="product-gender">{producto.nombrePublico}</p>
                    <p className="product-price">
                      Precio: <span className="price-value">${producto.precio}</span>
                    </p>
                    <Link to={`/home/${producto.codigoReferencia}`} className="product-link">
                      Ver producto
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* MENSAJE SI NO HAY PRODUCTOS */}
          {productosFiltrados.length === 0 && (
            <div className="no-productos">
              <p>No se encontraron productos para esta categoría.</p>
            </div>
          )}

          {/* MODAL PARA VER IMAGEN */}
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
      </div>
    </div>
  );
};

export default Catalogo;