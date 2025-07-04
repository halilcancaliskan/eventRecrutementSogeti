import React from 'react';
import PromoCode from './PromoCode';

const Cart = ({ 
  cart, 
  showCart, 
  updateQuantity, 
  removeFromCart, 
  getTotalPrice, 
  handleProceedToCheckout,
  appliedPromoCode,
  promoDiscount,
  getDiscountAmount,
  getTotalAfterDiscount,
  applyPromoCode
}) => {
  if (!showCart) return null;

  return (
    <div className="cart-view">
      <h3>Shopping Cart</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <span className="item-name">{item.name}</span>
              <span className="item-price">${item.price}</span>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <button 
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
          
          <PromoCode 
            onApplyPromoCode={applyPromoCode}
            appliedPromoCode={appliedPromoCode}
            discount={promoDiscount}
          />
          
          <div className="cart-summary">
            <div className="cart-totals">
              <div className="total-line">
                <span>Subtotal:</span>
                <span>${getTotalPrice()}</span>
              </div>
              {appliedPromoCode && (
                <div className="total-line discount">
                  <span>Discount ({promoDiscount}%):</span>
                  <span>-${getDiscountAmount()}</span>
                </div>
              )}
              <div className="total-line final">
                <strong>Total: ${getTotalAfterDiscount()}</strong>
              </div>
            </div>
            <button 
              className="review-order-btn"
              onClick={handleProceedToCheckout}
              disabled={cart.length === 0}
            >
              Review Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
