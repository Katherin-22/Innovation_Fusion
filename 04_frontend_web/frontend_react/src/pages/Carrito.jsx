import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuHome from '../layouts/home/menuHome';
import axios from 'axios';

const Carrito = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchCarrito(token);
  }, []);

  const fetchCarrito = async (token) => {
    try {
      const response = await axios.get('http://localhost:8080/api/carrito', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setItems(response.data);
    } catch (error) {
      console.error('Error cargando carrito:', error);
    }
  };

  const updateCantidad = async (idProducto, idCarrito, cantidad) => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.put(`http://localhost:8080/api/carrito/${idProducto}/${idCarrito}`, { cantidad }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCarrito(token);
    } catch (error) {
      console.error('Error actualizando cantidad:', error);
    }
  };

  const eliminarItem = async (idProducto, idCarrito) => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.delete(`http://localhost:8080/api/carrito/${idProducto}/${idCarrito}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCarrito(token);
    } catch (error) {
      console.error('Error eliminando item:', error);
    }
  };

  const total = items.reduce((sum, item) => sum + (item.producto.precio * item.cantidad), 0);

  return (
    <div className="allHome">
      <MenuHome />
      <div className="body-color">
        <div className="container-fluid">
          <h2 className="text-center mb-4">Carrito de Compras</h2>
          {items.length === 0 ? (
            <p className="text-center">Tu carrito está vacío</p>
          ) : (
            <div className="row">
              {items.map((item) => (
                <div key={`${item.producto.idProducto}-${item.carrito.idCarrito}`} className="col-md-12 mb-3">
                  <div className="card">
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div>
                        <h5>{item.producto.nombreProducto}</h5>
                        <p>Color: {item.color?.nombreColor || 'N/A'}</p>
                        <p>Talla: {item.variacion?.nombre || 'N/A'}</p>
                        <p>Precio: ${item.producto.precio}</p>
                      </div>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-outline-secondary me-2"
                          onClick={() => updateCantidad(item.producto.idProducto, item.carrito.idCarrito, item.cantidad - 1)}
                          disabled={item.cantidad <= 1}
                        >
                          -
                        </button>
                        <span className="me-2">{item.cantidad}</span>
                        <button
                          className="btn btn-outline-secondary me-2"
                          onClick={() => updateCantidad(item.producto.idProducto, item.carrito.idCarrito, item.cantidad + 1)}
                        >
                          +
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => eliminarItem(item.producto.idProducto, item.carrito.idCarrito)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="col-md-12 text-end">
                <h4>Total: ${total}</h4>
                <button className="btn btn-success">Proceder al Pago</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carrito;