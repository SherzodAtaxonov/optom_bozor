import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Package, ShoppingBag, BarChart3, MessageCircle, User, LogOut } from "lucide-react";
import { useAppContext } from "../../../contexts/AppContext";
import "../styles/SellerNavbar.css";

export default function SellerNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { state, actions } = useAppContext();
  
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };
  
  // Count pending orders for seller
  const pendingOrdersCount = state.orders.filter(order => 
    state.user && order.sellerId === state.user.id && order.status === 'pending'
  ).length;
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    if (confirm("Tizimdan chiqishni xohlaysizmi?")) {
      actions.logout();
      navigate('/login');
    }
  };
  
  return (
    <nav className="seller-navbar">
      <div className="navbar-container">
        <Link to="/seller" className="logo">
          <Package size={24} />
          OptomSeller
        </Link>
        
        <button 
          className="mobile-menu-btn" 
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <ul className={isMobileMenuOpen ? 'active' : ''}>
          <li>
            <Link 
              to="/seller" 
              className={isActive('/seller') && location.pathname === '/seller' ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <BarChart3 size={18} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/seller/products" 
              className={isActive('/seller/products') ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Package size={18} />
              Mahsulotlar
            </Link>
          </li>
          <li style={{ position: 'relative' }}>
            <Link 
              to="/seller/orders" 
              className={isActive('/seller/orders') ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ShoppingBag size={18} />
              Buyurtmalar
              {pendingOrdersCount > 0 && (
                <span className="notification-badge">{pendingOrdersCount}</span>
              )}
            </Link>
          </li>
          <li>
            <Link 
              to="/seller/analytics" 
              className={isActive('/seller/analytics') ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <BarChart3 size={18} />
              Analitika
            </Link>
          </li>
          <li>
            <Link 
              to="/seller/chat" 
              className={isActive('/seller/chat') ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MessageCircle size={18} />
              Chat
            </Link>
          </li>
          <li>
            <Link 
              to="/seller/profile" 
              className={isActive('/seller/profile') ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User size={18} />
              Profil
            </Link>
          </li>
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={16} /> Chiqish
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
