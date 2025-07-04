import React from 'react';

const CustomerInfo = ({ customerInfo, onCustomerInfoChange, errors }) => {
  const handleChange = (field, value) => {
    onCustomerInfoChange(field, value);
  };

  return (
    <div className="customer-info-section">
      <h4>Billing & Shipping Information</h4>
      
      <div className="customer-form">
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              placeholder="First Name *"
              value={customerInfo.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className={errors.firstName ? 'error' : ''}
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>
          
          <div className="form-group">
            <input
              type="text"
              placeholder="Last Name *"
              value={customerInfo.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className={errors.lastName ? 'error' : ''}
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address *"
            value={customerInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <input
            type="tel"
            placeholder="Phone Number *"
            value={customerInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Street Address *"
            value={customerInfo.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className={errors.address ? 'error' : ''}
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              placeholder="City *"
              value={customerInfo.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className={errors.city ? 'error' : ''}
            />
            {errors.city && <span className="error-message">{errors.city}</span>}
          </div>
          
          <div className="form-group">
            <input
              type="text"
              placeholder="Postal Code *"
              value={customerInfo.postalCode}
              onChange={(e) => handleChange('postalCode', e.target.value)}
              className={errors.postalCode ? 'error' : ''}
            />
            {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
          </div>
        </div>

        <div className="form-group">
          <select
            value={customerInfo.country}
            onChange={(e) => handleChange('country', e.target.value)}
            className={errors.country ? 'error' : ''}
          >
            <option value="">Select Country *</option>
            <option value="FR">France</option>
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
            <option value="DE">Germany</option>
            <option value="ES">Spain</option>
            <option value="IT">Italy</option>
            <option value="CA">Canada</option>
          </select>
          {errors.country && <span className="error-message">{errors.country}</span>}
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
