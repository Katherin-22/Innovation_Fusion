import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Badge } from 'react-bootstrap';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartWidget = () => {
  const { getTotalItems, isAuthenticated } = useCart();

  if (!isAuthenticated()) {
    return null;
  }

  const totalItems = getTotalItems();

  return (
    <Link to="/carrito" className="position-relative text-decoration-none">
      <div className="d-flex align-items-center">
        <ShoppingCart size={24} className="text-dark" />
        {totalItems > 0 && (
          <Badge
            bg="danger"
            className="position-absolute translate-middle badge rounded-pill"
            style={{
              top: '10px',
              right: '-10px',
              fontSize: '0.7rem',
              minWidth: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {totalItems > 99 ? '99+' : totalItems}
          </Badge>
        )}
      </div>
    </Link>
  );
};

export default CartWidget;