import React, { useState } from 'react';
import { Button, Spinner, Alert } from 'react-bootstrap';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const AddToCartButton = ({ productId, productName, disabled = false, variant = "primary", size = "sm", className = "" }) => {
  const { addToCart, isAuthenticated, showNotification } = useCart();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(null);

  const handleAddToCart = async () => {
    if (!isAuthenticated()) {
      setError('Debes iniciar sesión para agregar productos al carrito');
      return;
    }

    setAdding(true);
    setError(null);

    try {
      const result = await addToCart(productId, 1);

      if (result.success) {
        setAdded(true);
        showNotification('Producto agregado', `"${productName}" se agregó al carrito`, 'success');
        setTimeout(() => setAdded(false), 2000); // Mostrar check por 2 segundos
      } else {
        setError(result.error || 'Error al agregar al carrito');
        showNotification('Error', result.error || 'No se pudo agregar el producto', 'danger');
      }
    } catch (err) {
      setError('Error al agregar al carrito');
    } finally {
      setAdding(false);
    }
  };

  if (!isAuthenticated()) {
    return (
      <Button
        variant="outline-primary"
        size={size}
        disabled
        className={className}
        title="Inicia sesión para agregar al carrito"
      >
        <ShoppingCart size={16} className="me-2" />
        Iniciar Sesión
      </Button>
    );
  }

  return (
    <div>
      <Button
        variant={added ? "success" : variant}
        size={size}
        onClick={handleAddToCart}
        disabled={disabled || adding || added}
        className={className}
      >
        {adding ? (
          <>
            <Spinner animation="border" size="sm" className="me-2" />
            Agregando...
          </>
        ) : added ? (
          <>
            <Check size={16} className="me-2" />
            ¡Agregado!
          </>
        ) : (
          <>
            <ShoppingCart size={16} className="me-2" />
            Agregar al Carrito
          </>
        )}
      </Button>

      {error && (
        <Alert variant="danger" className="mt-2 small p-2">
          {error}
        </Alert>
      )}
    </div>
  );
};

export default AddToCartButton;