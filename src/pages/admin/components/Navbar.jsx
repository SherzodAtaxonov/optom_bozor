// src/pages/admin/components/Navbar.jsx
import { Bell, Search, User, Settings, LogOut, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../contexts/AppContext";
import "../styles/Navbar.css";

export default function Navbar({ onToggleSidebar, isSidebarOpen }) {
  const navigate = useNavigate();
  const { actions } = useAppContext();

  const handleNotifications = () => {
    alert("Bildirishnomalar oynasi ochiladi");
  };

  const handleProfile = () => {
    alert("Profil sahifasiga o'tish");
  };

  const handleSettings = () => {
    alert("Sozlamalar sahifasiga o'tish");
  };

  const handleLogout = () => {
    if (confirm("Tizimdan chiqishni xohlaysizmi?")) {
      actions.logout();
      navigate('/login');
    }
  };

  return (
    <div className="navbar">
      {/* Mobil menyu tugmasi */}
      <button className="mobile-menu-btn" onClick={onToggleSidebar}>
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Chap tomonda qidiruv */}
      <div className="navbar-left">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Qidirish..." className="search-input" />
        </div>
      </div>

      {/* O‘ng tomonda tugmalar */}
      <div className="navbar-right">
        <button className="navbar-btn notifications" onClick={handleNotifications}>
          <Bell size={18} />
          <span className="notification-badge">3</span>
        </button>

        <div className="profile-dropdown">
          <button className="profile-btn">
            <div className="profile-avatar">
              <User size={18} />
            </div>
            <div className="profile-info">
              <span className="profile-name">Admin Foydalanuvchi</span>
              <span className="profile-role">Administrator</span>
            </div>
          </button>

          <div className="dropdown-menu">
            <a href="#" className="dropdown-item" onClick={handleProfile}>
              <User size={16} />
              Profil
            </a>
            <a href="#" className="dropdown-item" onClick={handleSettings}>
              <Settings size={16} />
              Sozlamalar
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item danger" onClick={handleLogout}>
              <LogOut size={16} />
              Chiqish
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
