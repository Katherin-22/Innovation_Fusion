import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Heart } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';

const FavoritesButton = ({ productId, size = "sm", className = "" }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showNotification } = useCart();

  useEffect(() => {
    verificarEstadoFavorito();
  }, [productId]);

  const verificarEstadoFavorito = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get(`http://localhost:8080/api/favoritos/producto/${productId}/estado`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setIsFavorite(response.data.esFavorito);
      }
    } catch (err) {
      console.error('Error verificando estado favorito:', err);
    }
  };

  const toggleFavorito = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      let response;

      if (isFavorite) {
        // Eliminar de favoritos
        response = await axios.delete(`http://localhost:8080/api/favoritos/producto/${productId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success) {
          setIsFavorite(false);
          showNotification('Removido', 'Producto eliminado de favoritos', 'info');
        }
      } else {
        // Agregar a favoritos
        response = await axios.post(`http://localhost:8080/api/favoritos/producto/${productId}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success) {
          setIsFavorite(true);
          showNotification('Agregado', 'Producto agregado a favoritos', 'success');
        }
      }
    } catch (err) {
      console.error('Error toggling favorito:', err);
      const errorMessage = err.response?.data?.message || 'Error al actualizar favoritos';
      showNotification('Error', errorMessage, 'danger');
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorito();
  };

  return (
    <Button
      variant={isFavorite ? "danger" : "outline-danger"}
      size={size}
      onClick={handleClick}
      disabled={loading}
      className={className}
      title={isFavorite ? "Remover de favoritos" : "Agregar a favoritos"}
    >
      <Heart
        size={16}
        fill={isFavorite ? "currentColor" : "none"}
      />
    </Button>
  );
};

export default FavoritesButton;