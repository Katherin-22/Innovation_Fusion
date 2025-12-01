import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const CartSummary = () => {
  const { cart, clearCart, loading, getTotalItems } = useCart();
  const [clearing, setClearing] = useState(false);

  const handleClearCart = async () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      setClearing(true);
      try {
        await clearCart();
      } catch (error) {
        console.error('Error clearing cart:', error);
      } finally {
        setClearing(false);
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (!cart || !cart.detallesCarrito || cart.detallesCarrito.length === 0) {
    return (
      <Card className="text-center p-4">
        <Card.Body>
          <ShoppingBag size={48} className="text-muted mb-3" />
          <h5>Tu carrito está vacío</h5>
          <p className="text-muted">Agrega algunos productos para continuar</p>
        </Card.Body>
      </Card>
    );
  }

  const totalItems = getTotalItems();

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-light">
        <h5 className="mb-0">Resumen del Pedido</h5>
      </Card.Header>
      <Card.Body>
        <div className="d-flex justify-content-between mb-3">
          <span>Productos ({totalItems}):</span>
          <span>{formatPrice(cart.total)}</span>
        </div>

        <hr />

        <div className="d-flex justify-content-between mb-4">
          <strong>Total:</strong>
          <strong className="text-primary">{formatPrice(cart.total)}</strong>
        </div>

        <div className="d-grid gap-2">
          <Button
            as={Link}
            to="/checkout"
            variant="primary"
            size="lg"
            disabled={loading}
            className="w-100"
          >
            Proceder al Checkout
          </Button>

          <Button
            variant="outline-danger"
            onClick={handleClearCart}
            disabled={loading || clearing}
            className="w-100"
          >
            <Trash2 size={16} className="me-2" />
            {clearing ? 'Vaciando...' : 'Vaciar Carrito'}
          </Button>
        </div>

        <Alert variant="info" className="mt-3 small">
          <small>
            Los precios incluyen IVA. El envío se calculará en el siguiente paso.
          </small>
        </Alert>
      </Card.Body>
    </Card>
  );
};

export default CartSummary;