import React, { useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import OrderSummary from './components/OrderSummary';
import Payment from './components/Payment';
import OrderConfirmation from './components/OrderConfirmation';
import PaymentSuccess from './components/PaymentSuccess';
import PromoCode from './components/PromoCode';
import CustomerInfo from './components/CustomerInfo';

const sampleProducts = [
  { 
    id: 1, 
    name: 'Gaming Laptop', 
    price: 999.99, 
    weight: 2.5, 
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=300&fit=crop'
  },
  { 
    id: 2, 
    name: 'Gaming Mouse', 
    price: 29.99, 
    weight: 0.2, 
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop'
  },
  { 
    id: 3, 
    name: 'Mechanical Keyboard', 
    price: 79.99, 
    weight: 1.1, 
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop'
  },
  { 
    id: 4, 
    name: 'Gaming Monitor', 
    price: 299.99, 
    weight: 5.2, 
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop'
  },
  { 
    id: 5, 
    name: 'Gaming Headset', 
    price: 149.99, 
    weight: 0.3, 
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop'
  }
];

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [addedToCartId, setAddedToCartId] = useState(null);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showFinalConfirmation, setShowFinalConfirmation] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('standard');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    paypalEmail: '',
    giftCardNumber: ''
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [finalOrderTotal, setFinalOrderTotal] = useState('0.00');
  const [appliedPromoCode, setAppliedPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [customerInfoErrors, setCustomerInfoErrors] = useState({});

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    // Visual feedback
    setAddedToCartId(product.id);
    setTimeout(() => setAddedToCartId(null), 500);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getTotalWeight = () => {
    return cart.reduce((total, item) => total + (item.weight * item.quantity), 0).toFixed(2);
  };

  const getShippingCost = () => {
    const totalWeight = parseFloat(getTotalWeight());
    if (totalWeight === 0) return 0;
    if (totalWeight < 2) return 5.99;
    if (totalWeight < 5) return 9.99;
    return 15.99;
  };

  const getDeliveryOptions = () => {
    return [
      { 
        id: 'standard', 
        name: 'Standard Delivery', 
        description: '5-7 business days', 
        cost: getShippingCost() 
      },
      { 
        id: 'express', 
        name: 'Express Delivery', 
        description: '2-3 business days', 
        cost: getShippingCost() + 5.99 
      },
      { 
        id: 'overnight', 
        name: 'Overnight Delivery', 
        description: 'Next business day', 
        cost: getShippingCost() + 15.99 
      }
    ];
  };

  const getSelectedDeliveryOption = () => {
    return getDeliveryOptions().find(option => option.id === selectedDeliveryOption);
  };

  const applyPromoCode = (code) => {
    if (!code) {
      setAppliedPromoCode('');
      setPromoDiscount(0);
      return { success: true };
    }

    // Define available promo codes
    const promoCodes = {
      'sogeti': { discount: 10, description: 'Sogeti Special' },
      // Add more promo codes here
    };

    if (promoCodes[code]) {
      setAppliedPromoCode(code);
      setPromoDiscount(promoCodes[code].discount);
      return { success: true, message: 'Promo code applied successfully!' };
    } else {
      return { success: false, message: 'Invalid promo code' };
    }
  };

  const getDiscountAmount = () => {
    if (!appliedPromoCode || promoDiscount === 0) return 0;
    return (parseFloat(getTotalPrice()) * promoDiscount / 100).toFixed(2);
  };

  const getTotalAfterDiscount = () => {
    return (parseFloat(getTotalPrice()) - parseFloat(getDiscountAmount())).toFixed(2);
  };

  const getFinalTotal = () => {
    const deliveryOption = getSelectedDeliveryOption();
    if (!deliveryOption || cart.length === 0) {
      return parseFloat(getTotalAfterDiscount()).toFixed(2);
    }
    return (parseFloat(getTotalAfterDiscount()) + deliveryOption.cost).toFixed(2);
  };

  const validateCart = () => {
    if (cart.length === 0) {
      return { isValid: false, message: "Your cart is empty" };
    }
    
    const unavailableItems = cart.filter(item => 
      !sampleProducts.find(product => product.id === item.id)
    );
    
    if (unavailableItems.length > 0) {
      return { 
        isValid: false, 
        message: `Some items are no longer available: ${unavailableItems.map(item => item.name).join(', ')}` 
      };
    }
    
    return { isValid: true, message: "Cart is valid" };
  };

  const handleProceedToCheckout = () => {
    const validation = validateCart();
    if (validation.isValid) {
      setShowOrderSummary(true);
    } else {
      alert(validation.message);
    }
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    setPaymentDetails({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      paypalEmail: '',
      giftCardNumber: ''
    });
  };

  const handlePaymentDetailsChange = (field, value) => {
    setPaymentDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (customerInfoErrors[field]) {
      setCustomerInfoErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validatePaymentDetails = () => {
    switch (selectedPaymentMethod) {
      case 'visa':
      case 'mastercard':
      case 'amex':
        return paymentDetails.cardNumber.length >= 16 && 
               paymentDetails.expiryDate.length === 5 && 
               paymentDetails.cvv.length >= 3;
      case 'paypal':
        return paymentDetails.paypalEmail.includes('@');
      case 'giftcard':
        return paymentDetails.giftCardNumber.length >= 12;
      default:
        return false;
    }
  };

  const validateCustomerInfo = () => {
    const errors = {};
    
    if (!customerInfo.firstName.trim()) errors.firstName = 'First name is required';
    if (!customerInfo.lastName.trim()) errors.lastName = 'Last name is required';
    if (!customerInfo.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      errors.email = 'Email is invalid';
    }
    if (!customerInfo.phone.trim()) errors.phone = 'Phone number is required';
    if (!customerInfo.address.trim()) errors.address = 'Address is required';
    if (!customerInfo.city.trim()) errors.city = 'City is required';
    if (!customerInfo.postalCode.trim()) errors.postalCode = 'Postal code is required';
    if (!customerInfo.country) errors.country = 'Country is required';
    
    setCustomerInfoErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const processPayment = async () => {
    if (!validatePaymentDetails()) {
      alert('Please fill in all payment details correctly');
      return;
    }

    // Store final total before clearing cart
    setFinalOrderTotal(getFinalTotal());
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentComplete(true);
      setCart([]); // Clear cart after successful payment
    }, 3000);
  };

  const resetCheckout = () => {
    setShowOrderSummary(false);
    setShowPayment(false);
    setShowFinalConfirmation(false);
    setSelectedPaymentMethod('');
    setSelectedDeliveryOption('standard');
    setPaymentComplete(false);
    setFinalOrderTotal('0.00');
    setPaymentDetails({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      paypalEmail: '',
      giftCardNumber: ''
    });
    setAppliedPromoCode('');
    setPromoDiscount(0);
    setCustomerInfo({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      country: ''
    });
    setCustomerInfoErrors({});
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Product Store</h1>
        <div className="cart-info" onClick={() => setShowCart(!showCart)}>
          Cart: {getTotalItems()} items (${getTotalPrice()})
          <span className="cart-toggle">{showCart ? '▼' : '▶'}</span>
        </div>
      </header>
      
      <Cart 
        cart={cart}
        showCart={showCart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        getTotalPrice={getTotalPrice}
        handleProceedToCheckout={handleProceedToCheckout}
        appliedPromoCode={appliedPromoCode}
        promoDiscount={promoDiscount}
        getDiscountAmount={getDiscountAmount}
        getTotalAfterDiscount={getTotalAfterDiscount}
        applyPromoCode={applyPromoCode}
      />

      {showOrderSummary && !showPayment && (
        <OrderSummary 
          cart={cart}
          getTotalPrice={getTotalPrice}
          getTotalWeight={getTotalWeight}
          getSelectedDeliveryOption={getSelectedDeliveryOption}
          getFinalTotal={getFinalTotal}
          appliedPromoCode={appliedPromoCode}
          promoDiscount={promoDiscount}
          getDiscountAmount={getDiscountAmount}
          getTotalAfterDiscount={getTotalAfterDiscount}
          onBack={() => setShowOrderSummary(false)}
          onProceedToPayment={() => setShowPayment(true)}
        />
      )}

      {showPayment && !paymentComplete && !showFinalConfirmation && (
        <Payment 
          selectedPaymentMethod={selectedPaymentMethod}
          paymentDetails={paymentDetails}
          selectedDeliveryOption={selectedDeliveryOption}
          deliveryOptions={getDeliveryOptions()}
          customerInfo={customerInfo}
          customerInfoErrors={customerInfoErrors}
          getFinalTotal={getFinalTotal}
          handlePaymentMethodChange={handlePaymentMethodChange}
          handlePaymentDetailsChange={handlePaymentDetailsChange}
          handleCustomerInfoChange={handleCustomerInfoChange}
          setSelectedDeliveryOption={setSelectedDeliveryOption}
          validatePaymentDetails={validatePaymentDetails}
          validateCustomerInfo={validateCustomerInfo}
          onBack={() => setShowPayment(false)}
          onConfirm={() => setShowFinalConfirmation(true)}
        />
      )}

      {showFinalConfirmation && (
        <OrderConfirmation 
          cart={cart}
          getTotalItems={getTotalItems}
          getTotalPrice={getTotalPrice}
          getTotalWeight={getTotalWeight}
          getSelectedDeliveryOption={getSelectedDeliveryOption}
          getFinalTotal={getFinalTotal}
          selectedPaymentMethod={selectedPaymentMethod}
          isProcessingPayment={isProcessingPayment}
          appliedPromoCode={appliedPromoCode}
          promoDiscount={promoDiscount}
          getDiscountAmount={getDiscountAmount}
          getTotalAfterDiscount={getTotalAfterDiscount}
          onBack={() => setShowFinalConfirmation(false)}
          onProcessPayment={processPayment}
        />
      )}

      {paymentComplete && (
        <PaymentSuccess 
          finalOrderTotal={finalOrderTotal}
          onContinueShopping={resetCheckout}
        />
      )}
      
      <ProductList 
        products={sampleProducts}
        addToCart={addToCart}
        addedToCartId={addedToCartId}
      />
    </div>
  );
}

export default App;