// src/components/ProductCard.jsx
import React, { useState } from "react";
import { ShoppingCart, Eye, MapPin, Package } from "lucide-react";
import { useAppContext } from "../../../contexts/AppContext";
import "../styles/ProductCard.css";

export default function ProductCard({ product }) {
  const [loading, setLoading] = useState(false);
  const { actions } = useAppContext();
  
  if (!product) return null;
  
  const {
    id,
    name,
    price = 0,
    unit = 'kg',
    quantity = 0,
    description,
    image,
    category,
    sellerId,
    sellerName,
    location,
    minOrder = 1,
    status = 'active'
  } = product;
  
  const isInStock = quantity > 0 && status === 'active';
  const isLowStock = quantity > 0 && quantity <= 50;
  const formattedPrice = new Intl.NumberFormat('uz-UZ').format(price);
  
  const getStockStatus = () => {
    if (!isInStock) return 'out-of-stock';
    if (isLowStock) return 'low-stock';
    return 'in-stock';
  };
  
  const handleAddToCart = async () => {
    if (!isInStock) return;
    
    setLoading(true);
    try {
      await actions.addToCart(product, minOrder);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleViewDetails = () => {
    // Navigate to product details
    console.log('View product details:', id);
  };
  
  return (
    <div className={`product-card ${loading ? 'loading' : ''}`}>
      {/* Stock Indicator */}
      <div className={`stock-indicator ${getStockStatus()}`}></div>
      
      {/* Product Image */}
      <div className="product-image">
        <div className="product-emoji">{image || '📦'}</div>
      </div>
      
      {/* Product Content */}
      <div className="product-content">
        {/* Product Header */}
        <div className="product-header">
          <h3 className="product-name">{name}</h3>
          <div className="product-badge">
            {isInStock ? 'Mavjud' : 'Tugagan'}
          </div>
        </div>
        
        {/* Description */}
        {description && (
          <p className="product-description">{description}</p>
        )}
        
        {/* Product Info Grid */}
        <div className="product-info">
          <div className="info-item">
            <span className="info-label">Kategoriya</span>
            <span className="info-value">{category || 'Umumiy'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Zaxira</span>
            <span className="info-value">{quantity} {unit}</span>
          </div>
        </div>
        
        {/* Seller Info */}
        <div className="seller-info">
          <div className="seller-avatar">
            {sellerName ? sellerName.charAt(0).toUpperCase() : 'S'}
          </div>
          <div className="seller-details">
            <h4>{sellerName || 'Noma\'lum sotuvchi'}</h4>
            <div className="seller-location">
              {location || 'Manzil ko\'rsatilmagan'}
            </div>
          </div>
        </div>
        
        {/* Pricing */}
        <div className="product-pricing">
          <div>
            <div className="product-price">
              {formattedPrice} <span className="price-unit">so'm/{unit}</span>
            </div>
          </div>
          <div className="min-order">
            Min: {minOrder} {unit}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="product-actions">
          <button 
            className="btn btn-secondary"
            onClick={handleViewDetails}
          >
            <Eye size={16} />
            Ko'rish
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleAddToCart}
            disabled={!isInStock || loading}
          >
            <ShoppingCart size={16} />
            {loading ? 'Qo\'shilmoqda...' : 'Savatga'}
          </button>
        </div>
      </div>
    </div>
  );
}
