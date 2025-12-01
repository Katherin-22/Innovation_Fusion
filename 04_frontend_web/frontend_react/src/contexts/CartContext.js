import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  // Obtener token JWT del localStorage
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Cargar carrito del usuario
  const loadCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/carrito', {
        headers: getAuthHeaders()
      });
      setCart(response.data);
      setError(null);
    } catch (err) {
      console.error('Error loading cart:', err);
      setError('Error al cargar el carrito');
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  // Agregar producto al carrito
  const addToCart = async (productId, quantity = 1) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8080/api/carrito/agregar', {
        idProducto: productId,
        cantidad: quantity
      }, {
        headers: getAuthHeaders()
      });
      setCart(response.data);
      setError(null);
      return { success: true };
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError('Error al agregar producto al carrito');
      return { success: false, error: err.response?.data?.message || 'Error desconocido' };
    } finally {
      setLoading(false);
    }
  };

  // Actualizar cantidad de producto
  const updateQuantity = async (productId, quantity) => {
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:8080/api/carrito/producto/${productId}/cantidad/${quantity}`, {}, {
        headers: getAuthHeaders()
      });
      setCart(response.data);
      setError(null);
      return { success: true };
    } catch (err) {
      console.error('Error updating quantity:', err);
      setError('Error al actualizar cantidad');
      return { success: false, error: err.response?.data?.message || 'Error desconocido' };
    } finally {
      setLoading(false);
    }
  };

  // Eliminar producto del carrito
  const removeFromCart = async (productId) => {
    try {
      setLoading(true);
      const response = await axios.delete(`http://localhost:8080/api/carrito/producto/${productId}`, {
        headers: getAuthHeaders()
      });
      setCart(response.data);
      setError(null);
      return { success: true };
    } catch (err) {
      console.error('Error removing from cart:', err);
      setError('Error al eliminar producto del carrito');
      return { success: false, error: err.response?.data?.message || 'Error desconocido' };
    } finally {
      setLoading(false);
    }
  };

  // Vaciar carrito completo
  const clearCart = async () => {
    try {
      setLoading(true);
      await axios.delete('http://localhost:8080/api/carrito', {
        headers: getAuthHeaders()
      });
      setCart({ detallesCarrito: [], total: 0 });
      setError(null);
      return { success: true };
    } catch (err) {
      console.error('Error clearing cart:', err);
      setError('Error al vaciar el carrito');
      return { success: false, error: err.response?.data?.message || 'Error desconocido' };
    } finally {
      setLoading(false);
    }
  };

  // Calcular total de items
  const getTotalItems = () => {
    if (!cart || !cart.detallesCarrito) return 0;
    return cart.detallesCarrito.reduce((total, item) => total + item.cantidad, 0);
  };

  // Verificar si el usuario está autenticado
  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  // Mostrar notificación
  const showNotification = (title, message, variant = 'success') => {
    setNotification({ title, message, variant });
    setTimeout(() => setNotification(null), 4000);
  };

  // Limpiar notificación
  const clearNotification = () => {
    setNotification(null);
  };

  // Limpiar carrito (cuando el usuario cierra sesión)
  const clearCartState = () => {
    setCart(null);
    setError(null);
    setNotification(null);
  };

  // Cargar carrito cuando el componente se monta y hay token
  useEffect(() => {
    if (isAuthenticated()) {
      loadCart();
    } else {
      clearCartState();
    }
  }, []);

  const value = {
    cart,
    loading,
    error,
    notification,
    loadCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    isAuthenticated,
    showNotification,
    clearNotification,
    clearCartState
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};