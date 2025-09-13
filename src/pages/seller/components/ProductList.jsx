// src/components/ProductList.jsx
import { useState } from "react";
import { Edit, Trash2, Eye, Package, AlertCircle, CheckCircle } from "lucide-react";
import { useAppContext } from "../../../contexts/AppContext";
import "./ProductList.css";

export default function ProductList({ products = [] }) {
  const { actions } = useAppContext();
  const [loading, setLoading] = useState({});
  
  if (products.length === 0) {
    return (
      <div className="no-products">
        <Package size={48} className="no-products-icon" />
        <h3>Hali mahsulotlar yo'q</h3>
        <p>Yuqoridagi forma orqali birinchi mahsulotingizni qo'shing</p>
      </div>
    );
  }
  
  const handleDelete = async (productId, productName) => {
    if (!confirm(`"${productName}" mahsulotini o'chirishni xohlaysizmi?`)) return;
    
    setLoading(prev => ({ ...prev, [productId]: 'deleting' }));
    try {
      await actions.deleteProduct(productId);
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setLoading(prev => ({ ...prev, [productId]: null }));
    }
  };
  
  const handleToggleStatus = async (product) => {
    const newStatus = product.status === 'active' ? 'inactive' : 'active';
    setLoading(prev => ({ ...prev, [product.id]: 'updating' }));
    
    try {
      await actions.updateProduct(product.id, { ...product, status: newStatus });
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setLoading(prev => ({ ...prev, [product.id]: null }));
    }
  };
  
  const getStockStatus = (quantity) => {
    if (quantity === 0) return { status: 'out', label: 'Tugagan', class: 'out-of-stock' };
    if (quantity <= 10) return { status: 'low', label: 'Kam qolgan', class: 'low-stock' };
    return { status: 'good', label: 'Yetarli', class: 'in-stock' };
  };
  
  return (
    <div className="product-list-container">
      <div className="list-header">
        <h3>Mening Mahsulotlarim ({products.length})</h3>
        <div className="list-stats">
          <span className="stat active">
            {products.filter(p => p.status === 'active').length} Faol
          </span>
          <span className="stat inactive">
            {products.filter(p => p.status === 'inactive').length} Nofaol
          </span>
        </div>
      </div>
      
      <div className="products-grid">
        {products.map(product => {
          const stockInfo = getStockStatus(product.quantity);
          const isLoading = loading[product.id];
          
          return (
            <div key={product.id} className={`product-item ${product.status}`}>
              {/* Status Indicator */}
              <div className={`status-indicator ${product.status}`}>
                {product.status === 'active' ? 
                  <CheckCircle size={16} /> : 
                  <AlertCircle size={16} />
                }
              </div>
              
              {/* Product Image */}
              <div className="product-image">
                <span className="product-emoji">{product.image || '📦'}</span>
              </div>
              
              {/* Product Info */}
              <div className="product-info">
                <h4 className="product-name">{product.name}</h4>
                <p className="product-category">{product.category}</p>
                
                <div className="product-details">
                  <div className="detail-item">
                    <span className="label">Narx:</span>
                    <span className="value">{new Intl.NumberFormat('uz-UZ').format(product.price)} so'm/{product.unit}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="label">Zaxira:</span>
                    <span className={`value stock-${stockInfo.class}`}>
                      {product.quantity} {product.unit}
                      <span className="stock-label">({stockInfo.label})</span>
                    </span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="label">Min buyurtma:</span>
                    <span className="value">{product.minOrder} {product.unit}</span>
                  </div>
                  
                  {product.location && (
                    <div className="detail-item">
                      <span className="label">Joylashuv:</span>
                      <span className="value">{product.location}</span>
                    </div>
                  )}
                </div>
                
                {product.description && (
                  <p className="product-description">{product.description}</p>
                )}
              </div>
              
              {/* Actions */}
              <div className="product-actions">
                <button 
                  className="action-btn view"
                  title="Ko'rish"
                  disabled={isLoading}
                >
                  <Eye size={16} />
                </button>
                
                <button 
                  className="action-btn edit"
                  title="Tahrirlash"
                  disabled={isLoading}
                >
                  <Edit size={16} />
                </button>
                
                <button 
                  className={`action-btn toggle ${product.status}`}
                  title={product.status === 'active' ? 'Nofaol qilish' : 'Faollashtirish'}
                  onClick={() => handleToggleStatus(product)}
                  disabled={isLoading}
                >
                  {isLoading === 'updating' ? (
                    <div className="loading-spinner"></div>
                  ) : product.status === 'active' ? (
                    <CheckCircle size={16} />
                  ) : (
                    <AlertCircle size={16} />
                  )}
                </button>
                
                <button 
                  className="action-btn delete"
                  title="O'chirish"
                  onClick={() => handleDelete(product.id, product.name)}
                  disabled={isLoading}
                >
                  {isLoading === 'deleting' ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    <Trash2 size={16} />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
