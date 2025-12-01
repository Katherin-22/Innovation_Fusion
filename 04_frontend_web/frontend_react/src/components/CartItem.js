import React, { useState } from 'react';
import { Card, Button, Form, Row, Col, Image } from 'react-bootstrap';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart, loading } = useCart();
  const [updating, setUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;

    setUpdating(true);
    try {
      await updateQuantity(item.idProducto, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleRemove = async () => {
    setUpdating(true);
    try {
      await removeFromCart(item.idProducto);
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setUpdating(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Row className="align-items-center">
          {/* Imagen del producto */}
          <Col xs={3} md={2}>
            <Image
              src={item.imagenUrl ? `http://localhost:8080/uploads/${item.imagenUrl}` : '/placeholder-image.jpg'}
              alt={item.nombreProducto}
              fluid
              rounded
              style={{ maxHeight: '80px', objectFit: 'cover' }}
            />
          </Col>

          {/* Información del producto */}
          <Col xs={9} md={4}>
            <h6 className="mb-1">{item.nombreProducto}</h6>
            <small className="text-muted d-block">Código: {item.codigoReferencia}</small>
            <small className="text-muted d-block">Precio unitario: {formatPrice(item.precio)}</small>
          </Col>

          {/* Controles de cantidad */}
          <Col xs={6} md={3} className="text-center">
            <div className="d-flex align-items-center justify-content-center">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => handleQuantityChange(item.cantidad - 1)}
                disabled={updating || loading || item.cantidad <= 1}
                className="me-2"
              >
                <Minus size={16} />
              </Button>

              <Form.Control
                type="number"
                value={item.cantidad}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value >= 1) handleQuantityChange(value);
                }}
                min="1"
                style={{ width: '60px', textAlign: 'center' }}
                disabled={updating || loading}
                className="mx-2"
              />

              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => handleQuantityChange(item.cantidad + 1)}
                disabled={updating || loading}
                className="ms-2"
              >
                <Plus size={16} />
              </Button>
            </div>
          </Col>

          {/* Subtotal y eliminar */}
          <Col xs={6} md={3} className="text-end">
            <div className="d-flex flex-column align-items-end">
              <strong className="mb-2">{formatPrice(item.subtotal)}</strong>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={handleRemove}
                disabled={updating || loading}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </Col>
        </Row>

        {updating && (
          <div className="text-center mt-2">
            <small className="text-muted">Actualizando...</small>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default CartItem;