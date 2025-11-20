import React, { useState, useEffect } from "react";
import { useGetStock } from "../../../hooks/stock/useGetStock";
import { Link } from "react-router-dom";
import MenuHome from "../../../layouts/home/menuHome";
import { useFiltro } from "../../../utils/FiltroContextx";
import "../../../styles/home/canalogoHome.css";

const Catalogo = () => {
  const { stock } = useGetStock();
  const { filtro } = useFiltro();
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  // DEBUG - Ver qué está pasando
  console.log("🎯 Filtro actual:", filtro);
  console.log("📦 Total productos:", stock.length);

  useEffect(() => {
    console.log("🔄 Aplicando filtro:", filtro);
    
    if (filtro === 'todos') {
      setProductosFiltrados(stock);
    } else {
      const filtrados = stock.filter(producto => {
        const publicoLower = producto.nombrePublico?.toLowerCase() || '';
        const tipoLower = producto.nombreTipoProducto?.toLowerCase() || '';
        const nombreLower = producto.nombreProducto?.toLowerCase() || '';
        
        console.log("📝 Producto:", producto.nombreProducto, "| Público:", publicoLower);

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
      console.log("✅ Productos después de filtrar:", filtrados.length);
      setProductosFiltrados(filtrados);
    }
  }, [stock, filtro]);

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

          {/* GRILLA DE PRODUCTOS */}
          <div className="products-grid">
            {productosFiltrados.map(producto => (
              <div key={producto.codigoReferencia} className="product-card-wrapper">
                <div className="product-card">
                  <div className="product-image-container">
                    <img
                      src={producto.imagen || "/imagenes_prueba/default.jpg"}
                      className="product-image"
                      alt={producto.nombreProducto}
                    />
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

        </div>
      </div>
    </div>
  );
};

export default Catalogo;