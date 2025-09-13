// src/components/ProductForm.jsx
import { useState } from "react";
import { Plus, Upload, Package, DollarSign } from "lucide-react";
import { useAppContext } from "../../../contexts/AppContext";
import "./ProductForm.css";

export default function ProductForm() {
  const { actions, state } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    unit: "kg",
    category: "",
    description: "",
    location: "",
    minOrder: "1",
    image: "📦",
    status: "active"
  });
  
  const [errors, setErrors] = useState({});
  
  const categories = [
    "Mevalar",
    "Sabzavotlar", 
    "Don mahsulotlari",
    "Sut mahsulotlari",
    "Go'sht mahsulotlari",
    "Boshqa"
  ];
  
  const units = ["kg", "dona", "litr", "paket", "qop"];
  const emojis = ["📦", "🍎", "🍇", "🧅", "🥕", "🌾", "🥛", "🥩", "🍞", "🧄"];
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Mahsulot nomi kiritilishi shart";
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Narx musbat son bo'lishi kerak";
    }
    
    if (!formData.quantity || parseInt(formData.quantity) < 0) {
      newErrors.quantity = "Miqdor 0 yoki undan katta bo'lishi kerak";
    }
    
    if (!formData.category) {
      newErrors.category = "Kategoriya tanlanishi shart";
    }
    
    if (parseInt(formData.minOrder) <= 0) {
      newErrors.minOrder = "Minimal buyurtma 1 dan katta bo'lishi kerak";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        minOrder: parseInt(formData.minOrder),
        sellerId: state.user?.id,
        sellerName: state.user?.name,
        location: formData.location || state.user?.location || "Noma'lum"
      };
      
      await actions.addProduct(productData);
      
      // Reset form
      setFormData({
        name: "",
        price: "",
        quantity: "",
        unit: "kg",
        category: "",
        description: "",
        location: "",
        minOrder: "1",
        image: "📦",
        status: "active"
      });
      
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="product-form-container">
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-header">
          <h3>Yangi Mahsulot Qo'shish</h3>
          <p>Mahsulot ma'lumotlarini to'ldiring</p>
        </div>
        
        <div className="form-grid">
          {/* Product Name */}
          <div className="form-group">
            <label>Mahsulot Nomi *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Masalan: Qizil olma"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>
          
          {/* Category */}
          <div className="form-group">
            <label>Kategoriya *</label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className={errors.category ? 'error' : ''}
            >
              <option value="">Kategoriyani tanlang</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <span className="error-text">{errors.category}</span>}
          </div>
          
          {/* Price */}
          <div className="form-group">
            <label>Narx (so'm) *</label>
            <div className="input-with-icon">
              <DollarSign size={18} className="input-icon" />
              <input
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="12000"
                min="0"
                step="100"
                className={errors.price ? 'error' : ''}
              />
            </div>
            {errors.price && <span className="error-text">{errors.price}</span>}
          </div>
          
          {/* Quantity */}
          <div className="form-group">
            <label>Miqdor *</label>
            <div className="input-with-icon">
              <Package size={18} className="input-icon" />
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                placeholder="100"
                min="0"
                className={errors.quantity ? 'error' : ''}
              />
            </div>
            {errors.quantity && <span className="error-text">{errors.quantity}</span>}
          </div>
          
          {/* Unit */}
          <div className="form-group">
            <label>O'lchov birligi</label>
            <select
              value={formData.unit}
              onChange={(e) => handleInputChange('unit', e.target.value)}
            >
              {units.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
          
          {/* Min Order */}
          <div className="form-group">
            <label>Minimal buyurtma</label>
            <input
              type="number"
              value={formData.minOrder}
              onChange={(e) => handleInputChange('minOrder', e.target.value)}
              placeholder="1"
              min="1"
              className={errors.minOrder ? 'error' : ''}
            />
            {errors.minOrder && <span className="error-text">{errors.minOrder}</span>}
          </div>
        </div>
        
        {/* Description */}
        <div className="form-group">
          <label>Tavsif</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Mahsulot haqida qisqacha ma'lumot..."
            rows={3}
          />
        </div>
        
        {/* Location */}
        <div className="form-group">
          <label>Joylashuv</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="Viloyat, tuman"
          />
        </div>
        
        {/* Icon Selection */}
        <div className="form-group">
          <label>Mahsulot ikonasi</label>
          <div className="emoji-selection">
            {emojis.map(emoji => (
              <button
                key={emoji}
                type="button"
                className={`emoji-btn ${formData.image === emoji ? 'selected' : ''}`}
                onClick={() => handleInputChange('image', emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="loading-spinner"></div>
                Qo'shilmoqda...
              </>
            ) : (
              <>
                <Plus size={18} />
                Mahsulot Qo'shish
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
