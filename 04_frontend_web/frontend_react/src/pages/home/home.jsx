import { useEffect, useState } from "react";
import MenuHome from "../../layouts/home/menuHome";
import Footer from "../../layouts/home/footer";
import { useGetStock } from "../../hooks/stock/useGetStock";
import { getImagenById } from "../../services/administrador/ImagenService.js";
import { Link } from "react-router-dom";
import "../../styles/home/paginaInicio.css";

export default function Home() {
  const { stock, loading, error } = useGetStock();
  const [zapatos, setZapatos] = useState([]);
  const [bolsos, setBolsos] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [imagenesProductos, setImagenesProductos] = useState({}); // Objeto para almacenar imágenes por idProducto

  console.log("🔍 Home component - Stock:", stock);

  // Función para cargar imágenes de un producto
  const cargarImagenProducto = async (idProducto) => {
    try {
      const response = await getImagenById(idProducto);
      if (response.data && response.data.length > 0) {
        return `http://localhost:8080${response.data[0].urlImagen}`;
      }
      return null; // Si no hay imágenes
    } catch (error) {
      console.error("Error al cargar imagen del producto:", error);
      return null;
    }
  };

  // Filtrar productos y cargar sus imágenes
  useEffect(() => {
    const filtrarYCargarImagenes = async () => {
      if (stock && stock.length > 0) {
        console.log("🎯 Filtrando productos y cargando imágenes...");
        
        // Filtrar zapatos
        const zapatosFiltrados = stock.filter(producto => {
          const tipo = producto.nombreTipoProducto?.toLowerCase() || '';
          const nombre = producto.nombreProducto?.toLowerCase() || '';
          
          const esZapato = tipo.includes('zapato') || 
                          tipo.includes('calzado') ||
                          nombre.includes('zapato') ||
                          nombre.includes('tenis') ||
                          nombre.includes('deportivo');
          
          return esZapato;
        }).slice(0, 4);
        
        // Filtrar bolsos
        const bolsosFiltrados = stock.filter(producto => {
          const tipo = producto.nombreTipoProducto?.toLowerCase() || '';
          const nombre = producto.nombreProducto?.toLowerCase() || '';
          
          const esBolso = tipo.includes('bolso') || 
                         nombre.includes('bolso') ||
                         nombre.includes('mochila') ||
                         nombre.includes('cartera');
          
          return esBolso;
        }).slice(0, 4);
        
        // Cargar imágenes para todos los productos
        const todasImagenes = {};
        
        // Cargar imágenes de zapatos
        for (const zapato of zapatosFiltrados) {
          if (zapato.idProducto && !todasImagenes[zapato.idProducto]) {
            const imagenUrl = await cargarImagenProducto(zapato.idProducto);
            todasImagenes[zapato.idProducto] = imagenUrl || zapato.imagen || "/imagenes_prueba/default.jpg";
          }
        }
        
        // Cargar imágenes de bolsos
        for (const bolso of bolsosFiltrados) {
          if (bolso.idProducto && !todasImagenes[bolso.idProducto]) {
            const imagenUrl = await cargarImagenProducto(bolso.idProducto);
            todasImagenes[bolso.idProducto] = imagenUrl || bolso.imagen || "/imagenes_prueba/default.jpg";
          }
        }
        
        setImagenesProductos(todasImagenes);
        setZapatos(zapatosFiltrados);
        setBolsos(bolsosFiltrados);
        
        console.log("✅ Imágenes cargadas para", Object.keys(todasImagenes).length, "productos");
      } else {
        console.log("📭 No hay stock disponible");
        setZapatos([]);
        setBolsos([]);
        setImagenesProductos({});
      }
    };
    
    filtrarYCargarImagenes();
  }, [stock]);

  // Función para obtener la imagen de un producto
  const obtenerImagenProducto = (producto) => {
    if (producto.idProducto && imagenesProductos[producto.idProducto]) {
      return imagenesProductos[producto.idProducto];
    }
    return producto.imagen || "/imagenes_prueba/default.jpg";
  };

  // Función para manejar favoritos
  const toggleFavorito = (producto) => {
    const productoId = producto.codigoReferencia;
    if (favoritos.includes(productoId)) {
      setFavoritos(favoritos.filter(id => id !== productoId));
      console.log("❌ Eliminado de favoritos:", producto.nombreProducto);
    } else {
      setFavoritos([...favoritos, productoId]);
      console.log("❤️ Agregado a favoritos:", producto.nombreProducto);
    }
  };

  // Función para agregar al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    console.log("🛒 Agregado al carrito:", producto.nombreProducto);
    
    // Aquí podrías mostrar un toast/notificación
    alert(`¡${producto.nombreProducto} agregado al carrito!`);
  };

  // Estados de carga y error
  if (loading) {
    return (
      <div className="allHome" id="home-container">
        <MenuHome />
        <div className="body-color" id="home-body">
          <div className="container text-center text-white py-5">
            <p>Cargando productos e imágenes...</p>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="allHome" id="home-container">
        <MenuHome />
        <div className="body-color" id="home-body">
          <div className="container text-center text-white py-5">
            <p>Error al cargar productos: {error}</p>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  // Componente de tarjeta de producto reutilizable
  const ProductoCard = ({ producto, tipo, index }) => {
    const esFavorito = favoritos.includes(producto.codigoReferencia);
    const imagenProducto = obtenerImagenProducto(producto);
    
    return (
      <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4" 
           id={`home-${tipo}-card-${index + 1}`}>
        <div className="card text-center h-100 home-product-card position-relative" 
             id={`home-${tipo}-card-container-${index + 1}`}>
          
          {/* Botón de corazón (favoritos) */}
          <button
            className="btn btn-link text-decoration-none position-absolute top-0 end-0 p-3"
            onClick={() => toggleFavorito(producto)}
            aria-label={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
            style={{ zIndex: 2 }}
            id={`home-${tipo}-favorite-btn-${index + 1}`}
          >
            <i className={`bi ${esFavorito ? 'bi-heart-fill text-danger' : 'bi-heart text-white'}`} 
               style={{ fontSize: '1.5rem', filter: 'drop-shadow(0px 0px 2px rgba(0,0,0,0.5))' }}></i>
          </button>
          
          {/* Imagen del producto */}
          <div className="producto-imagen-container-home" id={`home-${tipo}-image-container-${index + 1}`}>
            <img 
              src={imagenProducto} 
              className="card-img-top home-product-image"
              alt={producto.nombreProducto} 
              id={`home-${tipo}-image-${index + 1}`}
              onError={(e) => {
                e.target.src = "/iamgenes_prueba/zapato/im6.jpg"; // Imagen por defecto si falla la carga
              }}
            />
          </div>
          
          <div className="card-body home-product-body" id={`home-${tipo}-card-body-${index + 1}`}>
            <h5 className="card-title home-product-title" id={`home-${tipo}-title-${index + 1}`}>
              {producto.nombreProducto}
            </h5>
            <p className="card-text home-product-description" id={`home-${tipo}-description-${index + 1}`}>
              {producto.nombrePublico} - {producto.nombreTipoProducto}
            </p>
            
            <div className="home-product-hover-text" id={`home-${tipo}-hover-text-${index + 1}`}>
              <p id={`home-${tipo}-hover-price-${index + 1}`}>
                ${producto.precio?.toLocaleString() || 'N/A'}
              </p>
            </div>
            
            {/* Botón de agregar al carrito */}
            <div className="mt-3">
              <button
                className="btn btn-outline-light btn-sm w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={() => agregarAlCarrito(producto)}
                id={`home-${tipo}-cart-btn-${index + 1}`}
              >
                <i className="bi bi-cart-plus"></i>
                <span>Agregar al carrito</span>
              </button>
            </div>
            
            {/* Botón de ver detalles */}
            <div className="mt-2">
              <Link
                className="btn btn-link text-decoration-none text-light btn-sm w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={() => {
                  console.log("Ver detalles:", producto);
                  // Aquí podrías redirigir a la página de detalles del producto
                  // window.location.href = `/producto/${producto.codigoReferencia}`;
                }}
                id={`home-${tipo}-details-btn-${index + 1}`}
                to={`/home/${producto.codigoReferencia}`}
              >
                <i className="bi bi-eye"></i>
                <span>Ver detalles</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="allHome" id="home-container">
      <MenuHome />
      <div className="body-color" id="home-body">
        
        <div className="container-fluid" id="home-products-container">

          {/* Sección: Zapatos */}
          <div className="row mt-5" id="home-shoes-section">
            <h1 className="text-center text-white mb-4" id="home-shoes-title">
              Compra por estilos de calzado
            </h1>
            
            {zapatos.length > 0 ? (
              zapatos.map((zapato, index) => (
                <ProductoCard 
                  key={zapato.codigoReferencia || index} 
                  producto={zapato} 
                  tipo="shoe" 
                  index={index} 
                />
              ))
            ) : (
              !loading && (
                <div className="col-12">
                  <p className="text-white text-center">No hay zapatos disponibles</p>
                </div>
              )
            )}
          </div>

          {/* Sección: Bolsos */}
          <div className="row mt-5" id="home-bags-section">
            <h1 className="text-center text-white mb-4" id="home-bags-title">
              Compra por estilos de bolsos
            </h1>
            
            {bolsos.length > 0 ? (
              bolsos.map((bolso, index) => (
                <ProductoCard 
                  key={bolso.codigoReferencia || index} 
                  producto={bolso} 
                  tipo="bag" 
                  index={index} 
                />
              ))
            ) : (
              !loading && (
                <div className="col-12">
                  <p className="text-white text-center">No hay bolsos disponibles</p>
                </div>
              )
            )}
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
}