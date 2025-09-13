import { TrendingUp, Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import "../styles/Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Boshqaruv Paneli</h1>
        <p>Xush kelibsiz! Bugun biznesingizda nima sodir bo'layotgani haqida ma'lumot.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon users">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>Jami Foydalanuvchilar</h3>
            <p className="stat-number">1,248</p>
            <span className="stat-change positive">+12% bu oyda</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon products">
            <Package size={24} />
          </div>
          <div className="stat-content">
            <h3>Mahsulotlar</h3>
            <p className="stat-number">856</p>
            <span className="stat-change positive">+8% bu oyda</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orders">
            <ShoppingCart size={24} />
          </div>
          <div className="stat-content">
            <h3>Buyurtmalar</h3>
            <p className="stat-number">2,341</p>
            <span className="stat-change positive">+23% bu oyda</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon revenue">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <h3>Daromad</h3>
            <p className="stat-number">$48,392</p>
            <span className="stat-change positive">+15% bu oyda</span>
          </div>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Sotuv Tahlili</h3>
            <div className="chart-legend">
              <span className="legend-item">
                <div className="legend-dot primary"></div>
                Bu oy
              </span>
              <span className="legend-item">
                <div className="legend-dot secondary"></div>
                O'tgan oy
              </span>
            </div>
          </div>
          <div className="chart-placeholder">
            <TrendingUp size={48} className="chart-icon" />
            <p>Sotuv diagrammasi bu yerda ko'rsatiladi</p>
          </div>
        </div>

        <div className="recent-activity">
          <h3>So'nggi Faoliyat</h3>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon new-order">
                <ShoppingCart size={16} />
              </div>
              <div className="activity-content">
                <p><strong>Yangi buyurtma</strong> Jasur Karimovdan</p>
                <span className="activity-time">2 daqiqa oldin</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon new-user">
                <Users size={16} />
              </div>
              <div className="activity-content">
                <p><strong>Yangi foydalanuvchi</strong> ro'yxatdan o'tdi</p>
                <span className="activity-time">15 daqiqa oldin</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon product-update">
                <Package size={16} />
              </div>
              <div className="activity-content">
                <p><strong>Mahsulot yangilandi</strong> - Qizil olma</p>
                <span className="activity-time">1 soat oldin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}