import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  DollarSign,
  Filter,
  Search,
  Bell
} from 'lucide-react';
import { useAppContext } from '../../../contexts/AppContext';
import '../styles/Orders.css';

export default function Orders() {
  const { state, actions } = useAppContext();
  const { orders, user } = state;
  const { updateOrder, addNotification } = actions;
  
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState({});
  const [viewOrder, setViewOrder] = useState(null);

  // Filter orders for current seller
  const sellerOrders = orders.filter(order => 
    user && order.sellerId === user.id
  );

  // Apply filters
  const filteredOrders = sellerOrders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesSearch = 
      order.productName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.buyerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id?.toString().includes(searchQuery);
    
    return matchesStatus && matchesSearch;
  });

  const handleStatusUpdate = async (orderId, newStatus) => {
    setLoading(prev => ({ ...prev, [orderId]: true }));
    
    try {
      const order = orders.find(o => o.id === orderId);
      if (order) {
        await updateOrder(orderId, { ...order, status: newStatus });
        
        // Send notification based on status
        const statusMessages = {
          'confirmed': 'Buyurtma tasdiqlandi',
          'shipped': 'Buyurtma yuborildi',
          'delivered': 'Buyurtma yetkazildi',
          'cancelled': 'Buyurtma bekor qilindi'
        };
        
        addNotification(statusMessages[newStatus] || 'Buyurtma holati yangilandi', 'success');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      addNotification('Xatolik yuz berdi', 'error');
    } finally {
      setLoading(prev => ({ ...prev, [orderId]: false }));
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'pending',
      'confirmed': 'confirmed',
      'shipped': 'shipped',
      'delivered': 'delivered',
      'cancelled': 'cancelled'
    };
    return colors[status] || 'pending';
  };

  const getStatusText = (status) => {
    const texts = {
      'pending': 'Kutilmoqda',
      'confirmed': 'Tasdiqlangan',
      'shipped': 'Yuborilgan',
      'delivered': 'Yetkazilgan',
      'cancelled': 'Bekor qilingan'
    };
    return texts[status] || status;
  };

  const orderStats = {
    total: sellerOrders.length,
    pending: sellerOrders.filter(o => o.status === 'pending').length,
    confirmed: sellerOrders.filter(o => o.status === 'confirmed').length,
    shipped: sellerOrders.filter(o => o.status === 'shipped').length,
    delivered: sellerOrders.filter(o => o.status === 'delivered').length,
    cancelled: sellerOrders.filter(o => o.status === 'cancelled').length
  };

  return (
    <div className="orders-page">
      {/* Header */}
      <div className="orders-header">
        <div className="header-content">
          <h1>Buyurtmalar</h1>
          <p>Sizga kelgan buyurtmalarni boshqaring</p>
        </div>
        
        <div className="orders-stats">
          <div className="stat-item">
            <Package size={24} />
            <div>
              <span className="stat-number">{orderStats.total}</span>
              <span className="stat-label">Jami</span>
            </div>
          </div>
          <div className="stat-item pending">
            <Clock size={24} />
            <div>
              <span className="stat-number">{orderStats.pending}</span>
              <span className="stat-label">Kutilmoqda</span>
            </div>
          </div>
          <div className="stat-item confirmed">
            <CheckCircle size={24} />
            <div>
              <span className="stat-number">{orderStats.confirmed}</span>
              <span className="stat-label">Tasdiqlangan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="orders-controls">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Buyurtma ID, mahsulot yoki haridor nomi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="filter-controls">
          <select 
            className="status-filter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">Barcha holatlar</option>
            <option value="pending">Kutilmoqda</option>
            <option value="confirmed">Tasdiqlangan</option>
            <option value="shipped">Yuborilgan</option>
            <option value="delivered">Yetkazilgan</option>
            <option value="cancelled">Bekor qilingan</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="orders-list">
        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <Package size={60} />
            <h3>Buyurtmalar topilmadi</h3>
            <p>Hozircha sizga buyurtma kelmagan yoki filtrlarga mos buyurtma yo'q</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>#{order.id}</h3>
                  <span className={`status-badge ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
                <div className="order-date">
                  <Calendar size={16} />
                  {new Date(order.createdAt).toLocaleDateString('uz-UZ')}
                </div>
              </div>

              <div className="order-content">
                <div className="product-info">
                  <h4>{order.productName}</h4>
                  <div className="quantity-price">
                    <span>{order.quantity} {order.unit}</span>
                    <span className="price">
                      <DollarSign size={16} />
                      {new Intl.NumberFormat('uz-UZ').format(order.total)} so'm
                    </span>
                  </div>
                </div>

                <div className="buyer-info">
                  <h5>Haridor:</h5>
                  <p>{order.buyerName}</p>
                  <div className="contact-info">
                    <span><Phone size={14} /> +998 90 123 45 67</span>
                    <span><Mail size={14} /> haridor@example.com</span>
                  </div>
                </div>
              </div>

              <div className="order-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setViewOrder(order)}
                >
                  <Eye size={16} />
                  Ko'rish
                </button>
                
                {order.status === 'pending' && (
                  <>
                    <button 
                      className="btn btn-success"
                      onClick={() => handleStatusUpdate(order.id, 'confirmed')}
                      disabled={loading[order.id]}
                    >
                      <CheckCircle size={16} />
                      {loading[order.id] ? 'Kutilmoqda...' : 'Tasdiqlash'}
                    </button>
                    <button 
                      className="btn btn-danger"
                      onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                      disabled={loading[order.id]}
                    >
                      <XCircle size={16} />
                      Bekor qilish
                    </button>
                  </>
                )}
                
                {order.status === 'confirmed' && (
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleStatusUpdate(order.id, 'shipped')}
                    disabled={loading[order.id]}
                  >
                    <Package size={16} />
                    {loading[order.id] ? 'Kutilmoqda...' : 'Yuborish'}
                  </button>
                )}
                
                {order.status === 'shipped' && (
                  <button 
                    className="btn btn-success"
                    onClick={() => handleStatusUpdate(order.id, 'delivered')}
                    disabled={loading[order.id]}
                  >
                    <CheckCircle size={16} />
                    {loading[order.id] ? 'Kutilmoqda...' : 'Yetkazildi'}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* View Order Modal */}
      {viewOrder && (
        <div className="modal-overlay" onClick={() => setViewOrder(null)}>
          <div className="modal view-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Buyurtma tafsilotlari</h3>
              <button className="modal-close" onClick={() => setViewOrder(null)}>×</button>
            </div>
            
            <div className="modal-content">
              <div className="order-details">
                <div className="detail-section">
                  <h4>Buyurtma ma'lumotlari</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>ID:</label>
                      <span>#{viewOrder.id}</span>
                    </div>
                    <div className="detail-item">
                      <label>Holat:</label>
                      <span className={`status-badge ${getStatusColor(viewOrder.status)}`}>
                        {getStatusText(viewOrder.status)}
                      </span>
                    </div>
                    <div className="detail-item">
                      <label>Sana:</label>
                      <span>{new Date(viewOrder.createdAt).toLocaleDateString('uz-UZ')}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Mahsulot</h4>
                  <div className="product-details">
                    <h5>{viewOrder.productName}</h5>
                    <p>Miqdor: {viewOrder.quantity} {viewOrder.unit}</p>
                    <p>Narx: {new Intl.NumberFormat('uz-UZ').format(viewOrder.price)} so'm/{viewOrder.unit}</p>
                    <p className="total">Jami: {new Intl.NumberFormat('uz-UZ').format(viewOrder.total)} so'm</p>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Haridor ma'lumotlari</h4>
                  <div className="buyer-details">
                    <p><strong>{viewOrder.buyerName}</strong></p>
                    <p><Phone size={16} /> +998 90 123 45 67</p>
                    <p><Mail size={16} /> haridor@example.com</p>
                    <p><MapPin size={16} /> Toshkent, O'zbekiston</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setViewOrder(null)}>
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
