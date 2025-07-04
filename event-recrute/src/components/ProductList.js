import React from 'react';

const ProductList = ({ products, addToCart, addedToCartId }) => {
  return (
    <main className="product-list">
      <h2 className="section-title">
        <span className="glitch" data-text="AVAILABLE PRODUCTS">AVAILABLE PRODUCTS</span>
      </h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              <div className="product-overlay"></div>
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="price">${product.price}</p>
              <p className="weight">Weight: {product.weight}kg</p>
              <button 
                className={`add-to-cart-btn ${addedToCartId === product.id ? 'added' : ''}`}
                onClick={() => addToCart(product)}
              >
                <span className="btn-text">
                  {addedToCartId === product.id ? 'ADDED!' : 'ADD TO CART'}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProductList;
