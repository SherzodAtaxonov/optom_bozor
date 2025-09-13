import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Package, FileText, Store } from "lucide-react";
import "../styles/Sidebar.css";

export default function Sidebar({ isOpen, onClose, isMobile }) {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLinkClick = () => {
    if (isMobile) {
      onClose();
    }
  };

  return (
    <div className={`sidebar ${isMobile && isOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <Store size={24} className="logo-icon" />
          <h2 className="logo-text">OptomBozor</h2>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link 
              to="/admin/dashboard" 
              className={`nav-link ${isActive('/admin/dashboard') ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <LayoutDashboard size={20} />
              <span>Boshqaruv Paneli</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/admin/users" 
              className={`nav-link ${isActive('/admin/users') ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <Users size={20} />
              <span>Foydalanuvchilar</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/admin/products" 
              className={`nav-link ${isActive('/admin/products') ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <Package size={20} />
              <span>Mahsulotlar</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/admin/reports" 
              className={`nav-link ${isActive('/admin/reports') ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <FileText size={20} />
              <span>Hisobotlar</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">A</div>
          <div className="user-details">
            <p className="user-name">Admin</p>
            <span className="user-status">Onlayn</span>
          </div>
        </div>
      </div>
    </div>
  );
}
