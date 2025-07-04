import React from 'react';

const PaymentSuccess = ({ finalOrderTotal, onContinueShopping }) => {
  return (
    <div className="payment-success">
      <div className="success-content">
        <h3>Payment Successful!</h3>
        <p>Thank you for your purchase. Your order has been confirmed.</p>
        <p>Order Total: <strong>${finalOrderTotal}</strong></p>
        <button 
          className="continue-shopping-btn"
          onClick={onContinueShopping}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
