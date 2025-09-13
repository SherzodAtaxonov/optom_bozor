import { Download, Calendar, TrendingUp, Users, Package, DollarSign } from "lucide-react";
import "../styles/Reports.css";

export default function Reports() {
  const handleExportReport = () => {
    alert("Hisobot eksport qilinmoqda...");
  };

  const handleDateRange = () => {
    alert("Sana oralig'ini tanlash oynasi ochiladi");
  };

  return (
    <div className="reports-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Hisobotlar va Tahlil</h1>
          <p>Biznes haqida to'liq ma'lumot va ma'lumotlar tahlili</p>
        </div>
        <div className="header-actions">
          <button className="export-btn" onClick={handleExportReport}>
            <Download size={16} />
            Hisobotni Eksport Qilish
          </button>
          <button className="date-range-btn" onClick={handleDateRange}>
            <Calendar size={16} />
            So'nggi 30 kun
          </button>
        </div>
      </div>

      <div className="reports-grid">
        <div className="report-card">
          <div className="report-icon users-icon">
            <Users size={24} />
          </div>
          <div className="report-content">
            <h3>Jami Foydalanuvchilar</h3>
            <p className="report-number">1,524</p>
            <div className="report-trend positive">
              <TrendingUp size={16} />
              <span>+18% o'tgan oydan</span>
            </div>
          </div>
        </div>

        <div className="report-card">
          <div className="report-icon sellers-icon">
            <Package size={24} />
          </div>
          <div className="report-content">
            <h3>Faol Sotuvchilar</h3>
            <p className="report-number">247</p>
            <div className="report-trend positive">
              <TrendingUp size={16} />
              <span>+12% o'tgan oydan</span>
            </div>
          </div>
        </div>

        <div className="report-card">
          <div className="report-icon products-icon">
            <Package size={24} />
          </div>
          <div className="report-content">
            <h3>Jami Mahsulotlar</h3>
            <p className="report-number">3,892</p>
            <div className="report-trend positive">
              <TrendingUp size={16} />
              <span>+8% o'tgan oydan</span>
            </div>
          </div>
        </div>

        <div className="report-card">
          <div className="report-icon revenue-icon">
            <DollarSign size={24} />
          </div>
          <div className="report-content">
            <h3>Jami Daromad</h3>
            <p className="report-number">287,450,000 so'm</p>
            <div className="report-trend positive">
              <TrendingUp size={16} />
              <span>+24% o'tgan oydan</span>
            </div>
          </div>
        </div>
      </div>

      <div className="reports-content">
        <div className="orders-section">
          <div className="section-header">
            <h2>So'nggi Buyurtmalar</h2>
            <div className="status-filters">
              <button className="filter-chip active">Barchasi</button>
              <button className="filter-chip">Yakunlangan</button>
              <button className="filter-chip">Kutilayotgan</button>
              <button className="filter-chip">Bekor qilingan</button>
            </div>
          </div>

          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Buyurtma ID</th>
                  <th>Mijoz</th>
                  <th>Mahsulot</th>
                  <th>Miqdor</th>
                  <th>Summa</th>
                  <th>Holat</th>
                  <th>Sana</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#ORD-001</td>
                  <td>
                    <div className="customer-info">
                      <div className="customer-avatar">A</div>
                      <span>Azizbek Rahimov</span>
                    </div>
                  </td>
                  <td>
                    <div className="product-info">
                      <span className="product-emoji">🍎</span>
                      Qizil Olma
                    </div>
                  </td>
                  <td>25 kg</td>
                  <td>300,000 so'm</td>
                  <td>
                    <span className="status-badge completed">
                      <div className="status-dot"></div>
                      Yakunlandi
                    </span>
                  </td>
                  <td>15 Mar, 2024</td>
                </tr>
                <tr>
                  <td>#ORD-002</td>
                  <td>
                    <div className="customer-info">
                      <div className="customer-avatar">O</div>
                      <span>Otabek Saidov</span>
                    </div>
                  </td>
                  <td>
                    <div className="product-info">
                      <span className="product-emoji">🍇</span>
                      Yangi Uzum
                    </div>
                  </td>
                  <td>15 kg</td>
                  <td>225,000 so'm</td>
                  <td>
                    <span className="status-badge pending">
                      <div className="status-dot"></div>
                      Kutilmoqda
                    </span>
                  </td>
                  <td>14 Mar, 2024</td>
                </tr>
                <tr>
                  <td>#ORD-003</td>
                  <td>
                    <div className="customer-info">
                      <div className="customer-avatar">M</div>
                      <span>Malika Karimova</span>
                    </div>
                  </td>
                  <td>
                    <div className="product-info">
                      <span className="product-emoji">🧅</span>
                      Organik Piyoz
                    </div>
                  </td>
                  <td>50 kg</td>
                  <td>200,000 so'm</td>
                  <td>
                    <span className="status-badge cancelled">
                      <div className="status-dot"></div>
                      Bekor qilindi
                    </span>
                  </td>
                  <td>13 Mar, 2024</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="analytics-summary">
          <h2>Sotuv Tahlili</h2>
          <div className="analytics-chart">
            <div className="chart-placeholder">
              <TrendingUp size={48} />
              <p>Interaktiv sotuv diagrammasi bu yerda ko'rsatiladi</p>
              <span>So'nggi 30 kunlik ma'lumotlar ko'rsatilmoqda</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}