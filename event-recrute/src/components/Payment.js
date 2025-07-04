import React from 'react';
import CustomerInfo from './CustomerInfo';

const Payment = ({ 
  selectedPaymentMethod,
  paymentDetails,
  selectedDeliveryOption,
  deliveryOptions,
  customerInfo,
  customerInfoErrors,
  getFinalTotal,
  handlePaymentMethodChange,
  handlePaymentDetailsChange,
  handleCustomerInfoChange,
  setSelectedDeliveryOption,
  validatePaymentDetails,
  validateCustomerInfo,
  onBack,
  onConfirm
}) => {
  const isFormValid = validatePaymentDetails() && validateCustomerInfo();

  return (
    <div className="payment-modal">
      <div className="payment-content">
        <h3>Checkout Information</h3>
        
        <CustomerInfo 
          customerInfo={customerInfo}
          onCustomerInfoChange={handleCustomerInfoChange}
          errors={customerInfoErrors}
        />
        
        <div className="payment-methods">
          <h4>Payment Method</h4>
          {['visa', 'mastercard', 'amex', 'paypal', 'giftcard'].map(method => (
            <button
              key={method}
              className={`payment-method-btn ${selectedPaymentMethod === method ? 'selected' : ''}`}
              onClick={() => handlePaymentMethodChange(method)}
            >
              {method.charAt(0).toUpperCase() + method.slice(1)}
            </button>
          ))}
        </div>

        <div className="delivery-options">
          <h4>Select Delivery Option</h4>
          {deliveryOptions.map(option => (
            <div key={option.id} className="delivery-option">
              <label>
                <input
                  type="radio"
                  name="delivery"
                  value={option.id}
                  checked={selectedDeliveryOption === option.id}
                  onChange={(e) => setSelectedDeliveryOption(e.target.value)}
                />
                <div className="delivery-info">
                  <span className="delivery-name">{option.name}</span>
                  <span className="delivery-description">{option.description}</span>
                  <span className="delivery-cost">${option.cost.toFixed(2)}</span>
                </div>
              </label>
            </div>
          ))}
        </div>

        {selectedPaymentMethod && (
          <div className="payment-form">
            <h4>Payment Details</h4>
            
            {(selectedPaymentMethod === 'visa' || selectedPaymentMethod === 'mastercard' || selectedPaymentMethod === 'amex') && (
              <div className="card-form">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={paymentDetails.cardNumber}
                  onChange={(e) => handlePaymentDetailsChange('cardNumber', e.target.value)}
                  maxLength="19"
                />
                <div className="card-details">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={paymentDetails.expiryDate}
                    onChange={(e) => handlePaymentDetailsChange('expiryDate', e.target.value)}
                    maxLength="5"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={paymentDetails.cvv}
                    onChange={(e) => handlePaymentDetailsChange('cvv', e.target.value)}
                    maxLength="4"
                  />
                </div>
              </div>
            )}

            {selectedPaymentMethod === 'paypal' && (
              <div className="paypal-form">
                <input
                  type="email"
                  placeholder="PayPal Email"
                  value={paymentDetails.paypalEmail}
                  onChange={(e) => handlePaymentDetailsChange('paypalEmail', e.target.value)}
                />
              </div>
            )}

            {selectedPaymentMethod === 'giftcard' && (
              <div className="giftcard-form">
                <input
                  type="text"
                  placeholder="Gift Card Number"
                  value={paymentDetails.giftCardNumber}
                  onChange={(e) => handlePaymentDetailsChange('giftCardNumber', e.target.value)}
                  maxLength="16"
                />
              </div>
            )}

            <div className="payment-summary">
              <p>Total Amount: <strong>${getFinalTotal()}</strong></p>
            </div>

            <div className="payment-actions">
              <button className="back-btn" onClick={onBack}>
                Back to Summary
              </button>
              <button 
                className="confirm-btn"
                onClick={onConfirm}
                disabled={!isFormValid}
              >
                Confirm Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
