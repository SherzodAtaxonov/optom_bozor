import { useState, useEffect } from "react";
import { Plus, Search, Filter, Edit, Trash2, Eye, Package, AlertTriangle, CheckCircle, X } from "lucide-react";
import { useAppContext } from "../../../contexts/AppContext";
import "../styles/ManageProducts.css";

export default function ManageProducts() {
  const { state, actions } = useAppContext();
  const { addNotification } = actions;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);
  
  const { products, productsLoading } = state;
  
  // Get unique categories
  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];
  
  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sellerName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };
  
  const handleSelectProduct = (productId, checked) => {
    if (checked) {
      setSelectedProducts(prev => [...prev, productId]);
    } else {
      setSelectedProducts(prev => prev.filter(id => id !== productId));
    }
  };
  
  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) return;
    
    if (!confirm(`${selectedProducts.length} ta mahsulotni o'chirishni xohlaysizmi?`)) return;
    
    setLoading(prev => ({ ...prev, bulk: 'deleting' }));
    try {
      for (const productId of selectedProducts) {
        await actions.deleteProduct(productId);
      }
      setSelectedProducts([]);
    } catch (error) {
      console.error('Error deleting products:', error);
    } finally {
      setLoading(prev => ({ ...prev, bulk: null }));
    }
  };
  
  const handleBulkStatusChange = async (newStatus) => {
    if (selectedProducts.length === 0) return;
    
    setLoading(prev => ({ ...prev, bulk: 'updating' }));
    try {
      for (const productId of selectedProducts) {
        const product = products.find(p => p.id === productId);
        if (product) {
          await actions.updateProduct(productId, { ...product, status: newStatus });
        }
      }
      setSelectedProducts([]);
    } catch (error) {
      console.error('Error updating products:', error);
    } finally {
      setLoading(prev => ({ ...prev, bulk: null }));
    }
  };
  
  const handleEdit = (product) => {
    setEditProduct(product);
  };

  const handleDelete = async (productId, productName) => {
    if (!confirm(`"${productName}" mahsulotini o'chirishni xohlaysizmi?`)) return;
    
    setLoading(prev => ({ ...prev, [productId]: 'deleting' }));
    try {
      await actions.deleteProduct(productId);
      addNotification('success', `"${productName}" muvaffaqiyatli o'chirildi!`);
    } catch (error) {
      console.error('Error deleting product:', error);
      addNotification('error', 'Xatolik yuz berdi!');
    } finally {
      setLoading(prev => ({ ...prev, [productId]: null }));
    }
  };

  const handleView = (product) => {
    setViewProduct(product);
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

  return (
    <div className="manage-products-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Mahsulotlarni Boshqarish</h1>
          <p>Mahsulot inventari va narxlarni boshqaring ({filteredProducts.length} ta mahsulot)</p>
        </div>
        <div className="header-actions">
          {selectedProducts.length > 0 && (
            <div className="bulk-actions">
              <button 
                className="bulk-btn approve"
                onClick={() => handleBulkStatusChange('active')}
                disabled={loading.bulk}
              >
                <CheckCircle size={16} />
                Faollashtirish ({selectedProducts.length})
              </button>
              <button 
                className="bulk-btn suspend"
                onClick={() => handleBulkStatusChange('inactive')}
                disabled={loading.bulk}
              >
                <AlertTriangle size={16} />
                To'xtatish
              </button>
              <button 
                className="bulk-btn delete"
                onClick={handleBulkDelete}
                disabled={loading.bulk}
              >
                <Trash2 size={16} />
                O'chirish
              </button>
            </div>
          )}
          <button className="add-btn" onClick={() => setShowAddModal(true)}>
            <Plus size={20} />
            Mahsulot Qo'shish
          </button>
        </div>
      </div>

      <div className="products-controls">
        <div className="search-box">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Mahsulot yoki sotuvchi nomi..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <select 
            className="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'Barcha Kategoriyalar' : category}
              </option>
            ))}
          </select>
          <select 
            className="status-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">Barcha Holatlar</option>
            <option value="active">Faol</option>
            <option value="inactive">Nofaol</option>
          </select>
        </div>
      </div>

      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox" 
                  className="checkbox"
                  checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th>Mahsulot</th>
              <th>Kategoriya</th>
              <th>Narx (so'm/kg)</th>
              <th>Zaxira</th>
              <th>Sotuvchi</th>
              <th>Holat</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {productsLoading ? (
              <tr>
                <td colSpan="8" className="loading-cell">
                  <div className="loading-state">
                    <div className="loading-spinner"></div>
                    Mahsulotlar yuklanmoqda...
                  </div>
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data-cell">
                  <div className="no-data">
                    <Package size={48} />
                    <h3>Mahsulotlar topilmadi</h3>
                    <p>Qidiruv so'zini o'zgartiring yoki filtrlarni tozalang</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredProducts.map(product => {
                const isSelected = selectedProducts.includes(product.id);
                const isLoading = loading[product.id];
                
                return (
                  <tr key={product.id} className={isSelected ? 'selected' : ''}>
                    <td>
                      <input 
                        type="checkbox" 
                        className="checkbox"
                        checked={isSelected}
                        onChange={(e) => handleSelectProduct(product.id, e.target.checked)}
                      />
                    </td>
                    <td>
                      <div className="product-info">
                        <div className="product-image">{product.image || '📦'}</div>
                        <div>
                          <p className="product-name">{product.name}</p>
                          <span className="product-sku">ID: {product.id}</span>
                        </div>
                      </div>
                    </td>
                    <td>{product.category || 'Umumiy'}</td>
                    <td>{new Intl.NumberFormat('uz-UZ').format(product.price)} so'm</td>
                    <td>
                      <span className={`stock-badge ${
                        product.quantity > 50 ? 'in-stock' : 
                        product.quantity > 0 ? 'low-stock' : 'out-of-stock'
                      }`}>
                        {product.quantity} {product.unit || 'kg'}
                      </span>
                    </td>
                    <td>
                      <div className="seller-info">
                        <div className="seller-avatar">
                          {product.sellerName ? product.sellerName.charAt(0).toUpperCase() : 'N'}
                        </div>
                        {product.sellerName || 'Noma\'lum'}
                      </div>
                    </td>
                    <td>
                      <button 
                        className={`status-badge ${product.status} clickable`}
                        onClick={() => handleToggleStatus(product)}
                        disabled={isLoading}
                        title="Holatni o'zgartirish"
                      >
                        {isLoading === 'updating' ? (
                          <div className="loading-spinner small"></div>
                        ) : product.status === 'active' ? 'Faol' : 'Nofaol'}
                      </button>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="action-btn view" 
                          onClick={() => handleView(product)}
                          title="Ko'rish"
                          disabled={isLoading}
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className="action-btn edit" 
                          onClick={() => handleEdit(product)}
                          title="Tahrirlash"
                          disabled={isLoading}
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          className="action-btn delete" 
                          onClick={() => handleDelete(product.id, product.name)}
                          title="O'chirish"
                          disabled={isLoading}
                        >
                          {isLoading === 'deleting' ? (
                            <div className="loading-spinner small"></div>
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}

          </tbody>
        </table>
      </div>

      <div className="pagination">
        <div className="pagination-info">
          156 natijadan 1-3 ko'rsatilmoqda
        </div>
        <div className="pagination-controls">
          <button className="pagination-btn">Oldingi</button>
          <button className="pagination-btn active">1</button>
          <button className="pagination-btn">2</button>
          <button className="pagination-btn">3</button>
          <button className="pagination-btn">Keyingi</button>
        </div>
      </div>

      {/* Modal oynalar */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Yangi mahsulot qo'shish</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <div className="modal-content">
              <form className="product-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Mahsulot nomi *</label>
                    <input 
                      type="text" 
                      placeholder="Mahsulot nomini kiriting"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Kategoriya *</label>
                    <select required>
                      <option value="">Kategoriyani tanlang</option>
                      <option value="mevalar">Mevalar</option>
                      <option value="sabzavotlar">Sabzavotlar</option>
                      <option value="donli-mahsulotlar">Don-li mahsulotlar</option>
                      <option value="poliz-ekinlari">Poliz ekinlari</option>
                      <option value="mol-mahsulotlari">Mol mahsulotlari</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Narxi (so'm) *</label>
                    <input 
                      type="number" 
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Miqdori *</label>
                    <input 
                      type="number" 
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>O'lchov birligi</label>
                    <select>
                      <option value="kg">kg</option>
                      <option value="tonna">tonna</option>
                      <option value="dona">dona</option>
                      <option value="qop">qop</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Sotuvchi *</label>
                  <select required>
                    <option value="">Sotuvchini tanlang</option>
                    <option value="1">Sherzod Karimov</option>
                    <option value="2">Malika Akhmedova</option>
                    <option value="3">Aziz Nazarov</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Tavsif</label>
                  <textarea 
                    placeholder="Mahsulot haqida qo'shimcha ma'lumot"
                    rows="3"
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Holat</label>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input type="checkbox" defaultChecked />
                      <span>Faol</span>
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-actions">
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => setShowAddModal(false)}
              >
                Bekor qilish
              </button>
              <button 
                type="submit" 
                className="btn-primary"
                onClick={() => {
                  addNotification('success', 'Mahsulot muvaffaqiyatli qo\'shildi!');
                  setShowAddModal(false);
                }}
              >
                Qo'shish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ko'rish modal */}
      {viewProduct && (
        <div className="modal-overlay" onClick={() => setViewProduct(null)}>
          <div className="modal view-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Mahsulot ma'lumotlari</h3>
              <button className="modal-close" onClick={() => setViewProduct(null)}>×</button>
            </div>
            <div className="modal-content">
              <div className="product-details">
                <div className="product-overview">
                  <div className="product-image-large">
                    {viewProduct.image || '📦'}
                  </div>
                  <div className="product-info-details">
                    <h2>{viewProduct.name}</h2>
                    <p className="product-id">ID: {viewProduct.id}</p>
                    <span className={`status-badge ${viewProduct.status}`}>
                      {viewProduct.status === 'active' ? 'Faol' : 'Nofaol'}
                    </span>
                  </div>
                </div>
                
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Kategoriya:</label>
                    <span>{viewProduct.category || 'Umumiy'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Narxi:</label>
                    <span>{new Intl.NumberFormat('uz-UZ').format(viewProduct.price)} so'm</span>
                  </div>
                  <div className="detail-item">
                    <label>Miqdor:</label>
                    <span>{viewProduct.quantity} {viewProduct.unit || 'kg'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Sotuvchi:</label>
                    <span>{viewProduct.sellerName || 'Noma\'lum'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Qo'shilgan sana:</label>
                    <span>{viewProduct.createdAt || 'Noma\'lum'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Oxirgi yangilanish:</label>
                    <span>{viewProduct.updatedAt || 'Noma\'lum'}</span>
                  </div>
                </div>
                
                {viewProduct.description && (
                  <div className="detail-item full-width">
                    <label>Tavsif:</label>
                    <p>{viewProduct.description}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-actions">
              <button 
                className="btn-secondary"
                onClick={() => setViewProduct(null)}
              >
                Yopish
              </button>
              <button 
                className="btn-primary"
                onClick={() => {
                  setViewProduct(null);
                  handleEdit(viewProduct);
                }}
              >
                Tahrirlash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tahrirlash modal */}
      {editProduct && (
        <div className="modal-overlay" onClick={() => setEditProduct(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Mahsulotni tahrirlash</h3>
              <button className="modal-close" onClick={() => setEditProduct(null)}>×</button>
            </div>
            <div className="modal-content">
              <form className="product-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Mahsulot nomi *</label>
                    <input 
                      type="text" 
                      defaultValue={editProduct.name}
                      placeholder="Mahsulot nomini kiriting"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Kategoriya *</label>
                    <select defaultValue={editProduct.category} required>
                      <option value="">Kategoriyani tanlang</option>
                      <option value="mevalar">Mevalar</option>
                      <option value="sabzavotlar">Sabzavotlar</option>
                      <option value="donli-mahsulotlar">Don-li mahsulotlar</option>
                      <option value="poliz-ekinlari">Poliz ekinlari</option>
                      <option value="mol-mahsulotlari">Mol mahsulotlari</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Narxi (so'm) *</label>
                    <input 
                      type="number" 
                      defaultValue={editProduct.price}
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Miqdori *</label>
                    <input 
                      type="number" 
                      defaultValue={editProduct.quantity}
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>O'lchov birligi</label>
                    <select defaultValue={editProduct.unit || 'kg'}>
                      <option value="kg">kg</option>
                      <option value="tonna">tonna</option>
                      <option value="dona">dona</option>
                      <option value="qop">qop</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Tavsif</label>
                  <textarea 
                    defaultValue={editProduct.description}
                    placeholder="Mahsulot haqida qo'shimcha ma'lumot"
                    rows="3"
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Holat</label>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        defaultChecked={editProduct.status === 'active'} 
                      />
                      <span>Faol</span>
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-actions">
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => setEditProduct(null)}
              >
                Bekor qilish
              </button>
              <button 
                type="submit" 
                className="btn-primary"
                onClick={() => {
                  addNotification('success', 'Mahsulot muvaffaqiyatli yangilandi!');
                  setEditProduct(null);
                }}
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
