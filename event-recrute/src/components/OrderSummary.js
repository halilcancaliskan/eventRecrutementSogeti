import React from 'react';

const OrderSummary = ({ 
  cart, 
  getTotalPrice, 
  getTotalWeight, 
  getSelectedDeliveryOption, 
  getFinalTotal,
  appliedPromoCode,
  promoDiscount,
  getDiscountAmount,
  getTotalAfterDiscount,
  onBack,
  onProceedToPayment 
}) => {
  return (
    <div className="order-summary">
      <div className="order-summary-content">
        <h3>Order Summary</h3>
        <div className="order-details">
          <h4>Items in your order:</h4>
          {cart.map(item => (
            <div key={item.id} className="order-item">
              <div className="order-item-info">
                <span className="item-name">{item.name}</span>
                <span className="item-details">
                  ${item.price} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                </span>
                <span className="item-weight">
                  Weight: {item.weight}kg × {item.quantity} = {(item.weight * item.quantity).toFixed(2)}kg
                </span>
              </div>
            </div>
          ))}
          
          <div className="order-totals">
            <div className="total-line">
              <span>Subtotal:</span>
              <span>${getTotalPrice()}</span>
            </div>
            {appliedPromoCode && (
              <div className="total-line discount">
                <span>Discount ({appliedPromoCode} - {promoDiscount}%):</span>
                <span>-${getDiscountAmount()}</span>
              </div>
            )}
            <div className="total-line">
              <span>Total after discount:</span>
              <span>${getTotalAfterDiscount()}</span>
            </div>
            <div className="total-line">
              <span>Total Weight:</span>
              <span>{getTotalWeight()}kg</span>
            </div>
            <div className="total-line">
              <span>Shipping:</span>
              <span>${getSelectedDeliveryOption().cost.toFixed(2)}</span>
            </div>
            <div className="total-line final-total">
              <span><strong>Final Total:</strong></span>
              <span><strong>${getFinalTotal()}</strong></span>
            </div>
          </div>
          
          <div className="order-actions">
            <button className="back-btn" onClick={onBack}>
              Back to Cart
            </button>
            <button className="checkout-btn" onClick={onProceedToPayment}>
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
