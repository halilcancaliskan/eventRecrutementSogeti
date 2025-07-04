import React from 'react';

const OrderConfirmation = ({ 
  cart, 
  getTotalItems,
  getTotalPrice,
  getTotalWeight,
  getSelectedDeliveryOption,
  getFinalTotal,
  selectedPaymentMethod,
  isProcessingPayment,
  onBack,
  onProcessPayment
}) => {
  return (
    <div className="final-confirmation">
      <div className="confirmation-content">
        <h3>Order Confirmation</h3>
        <p>Please review your order details before completing your purchase:</p>
        
        <div className="confirmation-section">
          <h4>Order Items</h4>
          {cart.map(item => (
            <div key={item.id} className="confirmation-item">
              <span className="item-name">{item.name}</span>
              <span className="item-details">
                ${item.price} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
              </span>
              <span className="item-weight">
                Weight: {(item.weight * item.quantity).toFixed(2)}kg
              </span>
            </div>
          ))}
        </div>

        <div className="confirmation-section">
          <h4>Order Summary</h4>
          <div className="summary-line">
            <span>Items ({getTotalItems()}):</span>
            <span>${getTotalPrice()}</span>
          </div>
          <div className="summary-line">
            <span>Total Weight:</span>
            <span>{getTotalWeight()}kg</span>
          </div>
          <div className="summary-line">
            <span>Delivery ({getSelectedDeliveryOption().name}):</span>
            <span>${getSelectedDeliveryOption().cost.toFixed(2)}</span>
          </div>
          <div className="summary-line total">
            <span><strong>Total Amount:</strong></span>
            <span><strong>${getFinalTotal()}</strong></span>
          </div>
        </div>

        <div className="confirmation-section">
          <h4>Payment Method</h4>
          <p>{selectedPaymentMethod.charAt(0).toUpperCase() + selectedPaymentMethod.slice(1)}</p>
        </div>

        <div className="confirmation-section">
          <h4>Delivery Details</h4>
          <p><strong>{getSelectedDeliveryOption().name}</strong></p>
          <p>{getSelectedDeliveryOption().description}</p>
          <p>Delivery Cost: ${getSelectedDeliveryOption().cost.toFixed(2)}</p>
        </div>

        <div className="confirmation-actions">
          <button className="back-btn" onClick={onBack}>
            Back to Payment
          </button>
          <button 
            className="pay-btn"
            onClick={onProcessPayment}
            disabled={isProcessingPayment}
          >
            {isProcessingPayment ? 'Processing Payment...' : `Complete Payment $${getFinalTotal()}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
