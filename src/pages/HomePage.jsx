import { Link } from "react-router-dom";
import { Users, ShoppingCart, Settings } from "lucide-react";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">OptomBozor</h1>
            <p className="hero-subtitle">
              O'zbekistonning eng yirik onlayn optom bozori
            </p>
            <p className="hero-description">
              Mahsulotlarni optom narxlarda sotib oling yoki soting. 
              Bizning platformamiz orqali ishongizni rivojlantiring.
            </p>
            
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary">Ro'yxatdan o'tish</Link>
              <Link to="/login" className="btn btn-secondary">Kirish</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="roles-section">
        <div className="container">
          <h2 className="section-title">Rolni tanlang</h2>
          <div className="roles-grid">
            
            <Link to="/buyer" className="role-card buyer">
              <div className="role-icon">
                <ShoppingCart size={48} />
              </div>
              <h3>Xaridor</h3>
              <p>Mahsulotlarni optom narxlarda sotib oling</p>
              <ul className="role-features">
                <li>Mahsulotlarni ko'rish</li>
                <li>Savat va buyurtmalar</li>
                <li>Sotuvchilar bilan chat</li>
                <li>Yetkazib berish</li>
              </ul>
            </Link>

            <Link to="/seller" className="role-card seller">
              <div className="role-icon">
                <Users size={48} />
              </div>
              <h3>Sotuvchi</h3>
              <p>Mahsulotlaringizni optomga soting</p>
              <ul className="role-features">
                <li>Mahsulot qo'shish</li>
                <li>Buyurtmalarni boshqarish</li>
                <li>Xaridorlar bilan chat</li>
                <li>Statistika va hisobotlar</li>
              </ul>
            </Link>

            <Link to="/admin/dashboard" className="role-card admin">
              <div className="role-icon">
                <Settings size={48} />
              </div>
              <h3>Administrator</h3>
              <p>Platformani boshqaring va nazorat qiling</p>
              <ul className="role-features">
                <li>Foydalanuvchilarni boshqarish</li>
                <li>Mahsulotlarni nazorat qilish</li>
                <li>Hisobotlar va statistika</li>
                <li>Tizim sozlamalari</li>
              </ul>
            </Link>

          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2 className="section-title">Nima uchun OptomBozor?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h4>Ishonchli hamkorlar</h4>
              <p>Faqat tekshirilgan va ishonchli sotuvchilar</p>
            </div>
            <div className="feature-card">
              <h4>Tez yetkazib berish</h4>
              <p>Butun O'zbekiston bo'ylab tez yetkazib berish</p>
            </div>
            <div className="feature-card">
              <h4>Qulay narxlar</h4>
              <p>Optom narxlarda yuqori sifatli mahsulotlar</p>
            </div>
            <div className="feature-card">
              <h4>24/7 yordam</h4>
              <p>Doimiy mijozlarni qo'llab-quvvatlash xizmati</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
