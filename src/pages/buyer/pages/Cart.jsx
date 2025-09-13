import React, { useState } from 'react';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';
import { useAppContext } from '../../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import "../styles/Cart.css";

export default function Cart() {
  const { state, actions } = useAppContext();
  const { cart, cartTotal, user } = state;
  const { updateCartItem, removeFromCart, clearCart, createOrder, addNotification } = actions;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState({});

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartItem(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleCreateOrder = async (cartItem) => {
    if (!user) {
      addNotification('Buyurtma berish uchun tizimga kiring', 'error');
      return;
    }

    setOrderLoading(prev => ({ ...prev, [cartItem.productId]: true }));
    
    try {
      const orderData = {
        productId: cartItem.productId,
        productName: cartItem.productName,
        sellerId: cartItem.sellerId,
        sellerName: cartItem.sellerName,
        buyerId: user.id,
        buyerName: user.name,
        quantity: cartItem.quantity,
        price: cartItem.price,
        total: cartItem.price * cartItem.quantity,
        unit: cartItem.unit,
        status: 'pending',
        paymentStatus: 'pending',
        createdAt: new Date().toISOString(),
      };

      await createOrder(orderData);
      removeFromCart(cartItem.productId);
      addNotification('Buyurtma muvaffaqiyatli yuborildi!', 'success');
    } catch (error) {
      console.error('Error creating order:', error);
      addNotification('Buyurtma yuborishda xatolik yuz berdi', 'error');
    } finally {
      setOrderLoading(prev => ({ ...prev, [cartItem.productId]: false }));
    }
  };

  const handleCheckoutAll = async () => {
    if (!user) {
      addNotification('Buyurtma berish uchun tizimga kiring', 'error');
      return;
    }

    if (cart.length === 0) return;

    setLoading(true);
    
    try {
      const orderPromises = cart.map(item => {
        const orderData = {
          productId: item.productId,
          productName: item.productName,
          sellerId: item.sellerId,
          sellerName: item.sellerName,
          buyerId: user.id,
          buyerName: user.name,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
          unit: item.unit,
          status: 'pending',
          paymentStatus: 'pending',
          createdAt: new Date().toISOString(),
        };
        return createOrder(orderData);
      });

      await Promise.all(orderPromises);
      clearCart();
      addNotification('Barcha buyurtmalar muvaffaqiyatli yuborildi!', 'success');
    } catch (error) {
      console.error('Error creating orders:', error);
      addNotification('Buyurtmalarni yuborishda xatolik yuz berdi', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-header">
          <button className="back-btn" onClick={() => navigate('/buyer')}>
            <ArrowLeft size={20} />
            Orqaga
          </button>
          <h1>Savat</h1>
        </div>

        <div className="empty-cart">
          <div className="empty-icon">
            <ShoppingBag size={80} />
          </div>
          <h2>Savatingiz bo'sh</h2>
          <p>Mahsulotlar qo'shish uchun do'konni ko'ring</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/buyer')}
          >
            Xarid qilishni boshlash
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <button className="back-btn" onClick={() => navigate('/buyer')}>
          <ArrowLeft size={20} />
          Orqaga
        </button>
        <h1>Savat ({cart.length} mahsulot)</h1>
        <button 
          className="clear-cart-btn"
          onClick={() => {
            if (confirm('Savatni tozalamoqchimisiz?')) {
              clearCart();
            }
          }}
        >
          <Trash2 size={16} />
          Tozalash
        </button>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.productId} className="cart-item">
              <div className="item-info">
                <h3>{item.productName}</h3>
                <p className="seller">Sotuvchi: {item.sellerName}</p>
                <div className="price-info">
                  <span className="price">
                    {new Intl.NumberFormat('uz-UZ').format(item.price)} so'm/{item.unit}
                  </span>
                </div>
              </div>

              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                >
                  <Minus size={16} />
                </button>
                <span className="quantity">{item.quantity} {item.unit}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="item-total">
                <div className="total-price">
                  {new Intl.NumberFormat('uz-UZ').format(item.price * item.quantity)} so'm
                </div>
              </div>

              <div className="item-actions">
                <button 
                  className="btn btn-success btn-small"
                  onClick={() => handleCreateOrder(item)}
                  disabled={orderLoading[item.productId]}
                >
                  <CreditCard size={16} />
                  {orderLoading[item.productId] ? 'Yuklanmoqda...' : 'Buyurtma berish'}
                </button>
                <button 
                  className="btn btn-danger btn-small"
                  onClick={() => handleRemoveItem(item.productId)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-card">
            <h3>Buyurtma xulosasi</h3>
            <div className="summary-details">
              <div className="summary-row">
                <span>Mahsulotlar soni:</span>
                <span>{cart.length} ta</span>
              </div>
              <div className="summary-row">
                <span>Jami miqdor:</span>
                <span>{cart.reduce((sum, item) => sum + item.quantity, 0)} birlik</span>
              </div>
              <div className="summary-row total">
                <span>Jami summa:</span>
                <span>{new Intl.NumberFormat('uz-UZ').format(cartTotal)} so'm</span>
              </div>
            </div>
            
            <button 
              className="btn btn-primary btn-large"
              onClick={handleCheckoutAll}
              disabled={loading || cart.length === 0}
            >
              <CreditCard size={20} />
              {loading ? 'Yuklanmoqda...' : 'Barchasi uchun buyurtma berish'}
            </button>

            <div className="payment-info">
              <p>💡 Buyurtma bergandan keyin sotuvchi bilan bog'lanishadi</p>
              <p>🔒 To'lov sotuvchi bilan kelishiladi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
