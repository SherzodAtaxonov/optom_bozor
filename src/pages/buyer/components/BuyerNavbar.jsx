import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ShoppingCart, LogOut } from "lucide-react";
import { useAppContext } from "../../../contexts/AppContext";
import "./../styles/Navbar.css";

export default function BuyerNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { state, actions } = useAppContext();
  
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };
  
  const cartItemsCount = state.cart.length;
  
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
    <nav className="buyer-navbar">
      <div className="navbar-container">
        <Link to="/buyer" className="logo">
          OptomBozor
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
              to="/buyer" 
              className={isActive('/buyer') && location.pathname === '/buyer' ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Bosh sahifa
            </Link>
          </li>
          <li>
            <Link 
              to="/buyer/products" 
              className={isActive('/buyer/products') ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Mahsulotlar
            </Link>
          </li>
          <li style={{ position: 'relative' }}>
            <Link 
              to="/buyer/cart" 
              className={isActive('/buyer/cart') ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ShoppingCart size={18} />
              Savat
              {cartItemsCount > 0 && (
                <span className="cart-badge">{cartItemsCount}</span>
              )}
            </Link>
          </li>
          <li>
            <Link 
              to="/buyer/orders" 
              className={isActive('/buyer/orders') ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Buyurtmalar
            </Link>
          </li>
          <li>
            <Link 
              to="/buyer/chat" 
              className={isActive('/buyer/chat') ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Chat
            </Link>
          </li>
          <li>
            <Link 
              to="/buyer/profile" 
              className={isActive('/buyer/profile') ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
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
