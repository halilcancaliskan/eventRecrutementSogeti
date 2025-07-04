import React, { useState } from 'react';

const PromoCode = ({ onApplyPromoCode, appliedPromoCode, discount }) => {
  const [promoCode, setPromoCode] = useState('');
  const [error, setError] = useState('');

  const handleApply = () => {
    if (!promoCode.trim()) {
      setError('Please enter a promo code');
      return;
    }

    const result = onApplyPromoCode(promoCode.trim().toLowerCase());
    if (result.success) {
      setError('');
      setPromoCode('');
    } else {
      setError(result.message);
    }
  };

  const handleRemove = () => {
    onApplyPromoCode('');
    setError('');
  };

  return (
    <div className="promo-code-section">
      <h4>Promo Code</h4>
      {!appliedPromoCode ? (
        <div className="promo-code-input">
          <input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleApply()}
          />
          <button onClick={handleApply} className="apply-promo-btn">
            Apply
          </button>
        </div>
      ) : (
        <div className="applied-promo">
          <span className="promo-success">
            ✓ Promo code "{appliedPromoCode}" applied (-{discount}%)
          </span>
          <button onClick={handleRemove} className="remove-promo-btn">
            Remove
          </button>
        </div>
      )}
      {error && <p className="promo-error">{error}</p>}
    </div>
  );
};

export default PromoCode;
