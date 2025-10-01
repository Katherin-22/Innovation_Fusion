import React from "react";
import MenuHome from "../../layouts/menuHome/menuHome";
import { useGetStock } from "../../hooks/stock/useGetStock";

const Catalogo = () => {
  const { stock, loading } = useGetStock();

  if (loading) return <p className="text-center mt-4">Cargando productos...</p>;

  return (
    <div className="allHome">
      <MenuHome />
      <div className="body-color py-4">
        <div className="container">
          <h2 className="text-center mb-4">Catálogo de Productos</h2>
          <div className="row">
            {stock.map((producto) => (
              <div key={producto.codigoReferencia} className="col-md-4 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{producto.nombreProducto}</h5>
                    <p className="card-text text-muted">
                      Precio: <b>${producto.precio}</b>
                    </p>
                    <button className="btn btn-primary mt-auto">
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalogo;
