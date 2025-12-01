import { useEffect, useState } from "react";
import MenuHome from "../../layouts/home/menuHome";
import Footer from "../../layouts/home/footer";
import { useGetStock } from "../../hooks/stock/useGetStock";
import "../../styles/home/paginaInicio.css";

export default function Home() {
  const { stock, loading, error } = useGetStock();
  const [zapatos, setZapatos] = useState([]);
  const [bolsos, setBolsos] = useState([]);

  console.log("🔍 Home component - Stock:", stock);
  console.log("🔄 Loading:", loading);
  console.log("❌ Error:", error);

  // Filtrar productos cuando el stock cambie
  useEffect(() => {
    console.log("🎯 Filtrando productos...");
    
    if (stock && stock.length > 0) {
      console.log("📦 Total productos para filtrar:", stock.length);
      
      // Filtrar zapatos
      const zapatosFiltrados = stock.filter(producto => {
        const tipo = producto.nombreTipoProducto?.toLowerCase() || '';
        const nombre = producto.nombreProducto?.toLowerCase() || '';
        
        const esZapato = tipo.includes('zapato') || 
                        tipo.includes('calzado') ||
                        nombre.includes('zapato') ||
                        nombre.includes('tenis') ||
                        nombre.includes('deportivo');
        
        if (esZapato) {
          console.log("👟 Encontrado zapato:", producto.nombreProducto);
        }
        
        return esZapato;
      }).slice(0, 4);
      
      console.log("👟 Zapatos encontrados:", zapatosFiltrados.length);
      setZapatos(zapatosFiltrados);
      
      // Filtrar bolsos
      const bolsosFiltrados = stock.filter(producto => {
        const tipo = producto.nombreTipoProducto?.toLowerCase() || '';
        const nombre = producto.nombreProducto?.toLowerCase() || '';
        
        const esBolso = tipo.includes('bolso') || 
                       nombre.includes('bolso') ||
                       nombre.includes('mochila') ||
                       nombre.includes('cartera');
        
        if (esBolso) {
          console.log("👜 Encontrado bolso:", producto.nombreProducto);
        }
        
        return esBolso;
      }).slice(0, 4);
      
      console.log("👜 Bolsos encontrados:", bolsosFiltrados.length);
      setBolsos(bolsosFiltrados);
    } else {
      console.log("📭 No hay stock disponible");
      setZapatos([]);
      setBolsos([]);
    }
  }, [stock]);

  // Estados de carga y error
  if (loading) {
    return (
      <div className="allHome" id="home-container">
        <MenuHome />
        <div className="body-color" id="home-body">
          <div className="container text-center text-white py-5">
            <p>Cargando productos...</p>
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
                <div key={zapato.codigoReferencia || index} className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4" id={`home-shoe-card-${index + 1}`}>
                  <div className="card text-center h-100 home-product-card" id={`home-shoe-card-container-${index + 1}`}>
                    <img 
                      src={zapato.imagen || "/imagenes_prueba/default.jpg"} 
                      className="card-img-top home-product-image"
                      alt={zapato.nombreProducto} 
                      id={`home-shoe-image-${index + 1}`}
                    />
                    <div className="card-body home-product-body" id={`home-shoe-card-body-${index + 1}`}>
                      <h5 className="card-title home-product-title" id={`home-shoe-title-${index + 1}`}>
                        {zapato.nombreProducto}
                      </h5>
                      <p className="card-text home-product-description" id={`home-shoe-description-${index + 1}`}>
                        {zapato.nombrePublico} - {zapato.nombreTipoProducto}
                      </p>
                      <div className="home-product-hover-text" id={`home-shoe-hover-text-${index + 1}`}>
                        <p id={`home-shoe-hover-price-${index + 1}`}>
                          ${zapato.precio?.toLocaleString() || 'N/A'}
                        </p>
                      </div>
                      <div className="">

                      </div>
                    </div>
                  </div>
                </div>
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
                <div key={bolso.codigoReferencia || index} className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4" id={`home-bag-card-${index + 1}`}>
                  <div className="card text-center h-100 home-product-card" id={`home-bag-card-container-${index + 1}`}>
                    <img 
                      src={bolso.imagen || "/imagenes_prueba/default.jpg"} 
                      className="card-img-top home-product-image"
                      alt={bolso.nombreProducto} 
                      id={`home-bag-image-${index + 1}`}
                    />
                    <div className="card-body home-product-body" id={`home-bag-card-body-${index + 1}`}>
                      <h5 className="card-title home-product-title" id={`home-bag-title-${index + 1}`}>
                        {bolso.nombreProducto}
                      </h5>
                      <p className="card-text home-product-description" id={`home-bag-description-${index + 1}`}>
                        {bolso.nombrePublico} - {bolso.nombreTipoProducto}
                      </p>
                      <div className="home-product-hover-text" id={`home-bag-hover-text-${index + 1}`}>
                        <p id={`home-bag-hover-price-${index + 1}`}>
                          ${bolso.precio?.toLocaleString() || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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