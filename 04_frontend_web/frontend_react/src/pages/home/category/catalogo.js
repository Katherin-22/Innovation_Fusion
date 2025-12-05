import React, { useState, useEffect } from "react";
import { useGetStock } from "../../../hooks/stock/useGetStock";
import { Link } from "react-router-dom";
import MenuHome from "../../../layouts/home/menuHome";
import { useFiltro } from "../../../utils/FiltroContextx";
import { getImagenById } from "../../../services/administrador/ImagenService.js";
import "../../../styles/home/canalogoHome.css";

const Catalogo = () => {
  const { stock } = useGetStock();
  const { filtro } = useFiltro();
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [imagenesProductos, setImagenesProductos] = useState({}); // Estado para almacenar imágenes

  // Cargar imágenes para todos los productos filtrados
  useEffect(() => {
    const cargarImagenes = async () => {
      if (stock && stock.length > 0) {
        const todasImagenes = {};
        
        // Determinar qué productos necesitan imágenes
        const productosParaCargar = filtro === 'todos' 
          ? stock 
          : stock.filter(producto => {
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
        
        // Cargar imágenes para cada producto
        for (const producto of productosParaCargar) {
          if (producto.idProducto && !todasImagenes[producto.idProducto]) {
            try {
              const response = await getImagenById(producto.idProducto);
              if (response.data && response.data.length > 0) {
                // Tomar la primera imagen
                todasImagenes[producto.idProducto] = `http://localhost:8080${response.data[0].urlImagen}`;
              } else {
                // Si no hay imágenes, usar la imagen por defecto
                todasImagenes[producto.idProducto] = producto.imagen || "/imagenes_prueba/default.jpg";
              }
            } catch (error) {
              console.error(`Error al cargar imagen para producto ${producto.idProducto}:`, error);
              todasImagenes[producto.idProducto] = producto.imagen || "/imagenes_prueba/default.jpg";
            }
          }
        }
        
        setImagenesProductos(todasImagenes);
      }
    };
    
    cargarImagenes();
  }, [stock, filtro]);

  // Filtrar productos
  useEffect(() => {
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

  // Función para obtener la imagen de un producto
  const obtenerImagenProducto = (producto) => {
    if (producto.idProducto && imagenesProductos[producto.idProducto]) {
      return imagenesProductos[producto.idProducto];
    }
    return producto.imagen || "/imagenes_prueba/default.jpg";
  };

  return (
    <div className="catalogo-container" id="catalogo-container">
      <MenuHome />
      <div className="catalogo-background" id="catalogo-background">
        <div className="catalogo-wrapper" id="catalogo-wrapper">
          
          {/* HEADER CON FILTRO ACTIVO */}
          <div className="filtros-activos" id="filtros-activos">
            <h2 className="categoria-titulo" id="categoria-titulo">
              {filtro === 'todos' && 'Todos los productos'}
              {filtro === 'mujer' && 'Calzado para Mujer'}
              {filtro === 'hombre' && 'Calzado para Hombre'} 
              {filtro === 'nino' && 'Calzado para Niño'}
              {filtro === 'calzado' && 'Todo el Calzado'}
              {filtro === 'bolsos' && 'Bolsos'}
            </h2>
            <p className="contador-productos" id="contador-productos">
              {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? 's' : ''} encontrado{productosFiltrados.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* GRILLA DE PRODUCTOS */}
          <div className="products-grid" id="products-grid">
            {productosFiltrados.map((producto, index) => {
              const imagenProducto = obtenerImagenProducto(producto);
              
              return (
                <div key={producto.codigoReferencia} className="product-card-wrapper" id={`product-card-wrapper-${index}`}>
                  <div className="product-card" id={`product-card-${index}`}>
                    <div className="product-image-container" id={`product-image-container-${index}`}>
                      <img
                        src={imagenProducto}
                        className="product-image"
                        alt={producto.nombreProducto}
                        id={`product-image-${index}`}
                        onError={(e) => {
                          e.target.src = "/iamgenes_prueba/zapato/im6.jpg"; // Imagen por defecto si falla la carga
                        }}
                      />
                    </div>
                    <div className="product-info" id={`product-info-${index}`}>
                      <h3 className="product-name" id={`product-name-${index}`}>{producto.nombreProducto}</h3>
                      <p className="product-category" id={`product-category-${index}`}>{producto.nombreTipoProducto}</p>
                      <p className="product-gender" id={`product-gender-${index}`}>{producto.nombrePublico}</p>
                      <p className="product-price" id={`product-price-${index}`}>
                        Precio: <span className="price-value" id={`price-value-${index}`}>${producto.precio?.toLocaleString()}</span>
                      </p>
                      <Link to={`/home/${producto.codigoReferencia}`} className="product-link" id={`product-link-${index}`}>
                        Ver producto
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* MENSAJE SI NO HAY PRODUCTOS */}
          {productosFiltrados.length === 0 && (
            <div className="no-productos" id="no-productos">
              <p id="no-productos-message">No se encontraron productos para esta categoría.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Catalogo;