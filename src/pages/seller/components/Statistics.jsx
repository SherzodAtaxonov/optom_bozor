// src/components/Statistics.jsx
import { useState, useEffect } from "react";
import { TrendingUp, Package, ShoppingCart, DollarSign, Users, Calendar, BarChart3 } from "lucide-react";
import "./Statistics.css";

export default function Statistics({ products = [], orders = [] }) {
  const [timeFilter, setTimeFilter] = useState('30d');
  const [selectedPeriod, setSelectedPeriod] = useState('Bu oy');
  
  // Calculate statistics
  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 'active').length;
  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === 'completed').length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const totalRevenue = orders
    .filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const averageOrderValue = completedOrders > 0 ? totalRevenue / completedOrders : 0;
  
  // Best selling products
  const productSales = products.map(product => {
    const sales = orders
      .filter(o => o.productId === product.id && o.status === 'completed')
      .reduce((sum, o) => sum + (o.quantity || 0), 0);
    return { ...product, salesCount: sales };
  }).sort((a, b) => b.salesCount - a.salesCount).slice(0, 3);
  
  // Recent activity
  const recentOrders = orders
    .sort((a, b) => new Date(b.orderDate || b.createdAt) - new Date(a.orderDate || a.createdAt))
    .slice(0, 5);
  
  const growthPercentage = 15.3; // This would be calculated based on previous period data
  
  return (
    <div className="statistics-container">
      {/* Header */}
      <div className="stats-header">
        <div>
          <h3>Biznes Statistikasi</h3>
          <p>Sotuvlar va mahsulotlar haqida to'liq ma'lumot</p>
        </div>
        <div className="period-selector">
          <select 
            value={timeFilter} 
            onChange={(e) => setTimeFilter(e.target.value)}
            className="period-select"
          >
            <option value="7d">So'nggi 7 kun</option>
            <option value="30d">So'nggi 30 kun</option>
            <option value="90d">So'nggi 3 oy</option>
            <option value="1y">So'nggi yil</option>
          </select>
        </div>
      </div>
      
      {/* Main Stats Grid */}
      <div className="main-stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <h4>Umumiy Daromad</h4>
            <p className="stat-number">{new Intl.NumberFormat('uz-UZ').format(totalRevenue)}</p>
            <span className="stat-currency">so'm</span>
            <div className="stat-trend positive">
              <TrendingUp size={14} />
              +{growthPercentage}%
            </div>
          </div>
        </div>
        
        <div className="stat-card secondary">
          <div className="stat-icon">
            <ShoppingCart size={24} />
          </div>
          <div className="stat-content">
            <h4>Buyurtmalar</h4>
            <p className="stat-number">{totalOrders}</p>
            <div className="stat-breakdown">
              <span className="completed">{completedOrders} yakunlangan</span>
              <span className="pending">{pendingOrders} kutilmoqda</span>
            </div>
          </div>
        </div>
        
        <div className="stat-card tertiary">
          <div className="stat-icon">
            <Package size={24} />
          </div>
          <div className="stat-content">
            <h4>Mahsulotlar</h4>
            <p className="stat-number">{totalProducts}</p>
            <div className="stat-breakdown">
              <span className="active">{activeProducts} faol</span>
              <span className="inactive">{totalProducts - activeProducts} nofaol</span>
            </div>
          </div>
        </div>
        
        <div className="stat-card quaternary">
          <div className="stat-icon">
            <BarChart3 size={24} />
          </div>
          <div className="stat-content">
            <h4>O'rtacha Buyurtma</h4>
            <p className="stat-number">{new Intl.NumberFormat('uz-UZ').format(Math.round(averageOrderValue))}</p>
            <span className="stat-currency">so'm</span>
            <div className="stat-description">har bir buyurtma uchun</div>
          </div>
        </div>
      </div>
      
      {/* Secondary Stats */}
      <div className="secondary-stats">
        {/* Best Selling Products */}
        <div className="stats-section">
          <div className="section-header">
            <h4>Eng ko'p sotiladigan mahsulotlar</h4>
            <Package size={18} />
          </div>
          <div className="best-products">
            {productSales.length > 0 ? productSales.map((product, index) => (
              <div key={product.id} className="product-rank-item">
                <div className="rank-badge">{index + 1}</div>
                <div className="product-emoji">{product.image || '📦'}</div>
                <div className="product-details">
                  <h5>{product.name}</h5>
                  <p>{product.salesCount} marta sotilgan</p>
                </div>
                <div className="product-revenue">
                  {new Intl.NumberFormat('uz-UZ').format(product.salesCount * product.price)} so'm
                </div>
              </div>
            )) : (
              <div className="no-data">
                <p>Hali sotuvlar yo'q</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Recent Orders */}
        <div className="stats-section">
          <div className="section-header">
            <h4>So'nggi buyurtmalar</h4>
            <Calendar size={18} />
          </div>
          <div className="recent-orders">
            {recentOrders.length > 0 ? recentOrders.map(order => (
              <div key={order.id} className="order-item">
                <div className="order-info">
                  <h5>{order.productName}</h5>
                  <p>{order.buyerName}</p>
                </div>
                <div className="order-details">
                  <span className="quantity">{order.quantity} {order.unit}</span>
                  <span className={`status ${order.status}`}>
                    {order.status === 'completed' ? 'Yakunlangan' : 
                     order.status === 'pending' ? 'Kutilmoqda' : 'Bekor qilingan'}
                  </span>
                </div>
                <div className="order-amount">
                  {new Intl.NumberFormat('uz-UZ').format(order.totalAmount)} so'm
                </div>
              </div>
            )) : (
              <div className="no-data">
                <p>Buyurtmalar yo'q</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Performance Insights */}
      <div className="insights-section">
        <h4>Tavsiyalar</h4>
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-icon success">
              <TrendingUp size={20} />
            </div>
            <div className="insight-content">
              <h5>Yaxshi natija!</h5>
              <p>Sotuvlaringiz o'tgan oyga nisbatan {growthPercentage}% o'sgan</p>
            </div>
          </div>
          
          {activeProducts < totalProducts / 2 && (
            <div className="insight-card">
              <div className="insight-icon warning">
                <Package size={20} />
              </div>
              <div className="insight-content">
                <h5>Mahsulotlarni faollashtiring</h5>
                <p>Siz {totalProducts - activeProducts} ta nofaol mahsulotingiz bor</p>
              </div>
            </div>
          )}
          
          {pendingOrders > 0 && (
            <div className="insight-card">
              <div className="insight-icon info">
                <ShoppingCart size={20} />
              </div>
              <div className="insight-content">
                <h5>Buyurtmalarni tekshiring</h5>
                <p>{pendingOrders} ta buyurtma tasdiqlanishini kutmoqda</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
