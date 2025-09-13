import { useState, useEffect } from "react";
import { Package, ShoppingCart, MessageCircle, BarChart3, User, TrendingUp, LogOut } from "lucide-react";
import { useAppContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import Orders from "./components/Orders";
import Chat from "./components/Chat";
import Statistics from "./components/Statistics";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import "./styles/Seller.css";

export default function SellerLayout() {
  const [activeSection, setActiveSection] = useState("products");
  const { state, actions } = useAppContext();
  const navigate = useNavigate();
  
  // Get seller-specific data
  const products = state.products.filter(p => p.sellerId === state.user?.id) || [];
  const orders = state.orders.filter(o => o.sellerId === state.user?.id) || [];
  const messages = []; // This would come from chat API
  
  // Calculate stats
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === 'completed').length;
  const totalRevenue = orders
    .filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  
  const getButtonClass = (section) => {
    return `nav-button ${activeSection === section ? 'active' : ''}`;
  };
  
  useEffect(() => {
    // Load seller data when component mounts
    if (state.user?.role === 'seller') {
      actions.loadProducts();
      actions.loadOrders();
    }
  }, [state.user]);

  const displayName = state.user?.fullName || state.user?.name || `${state.user?.firstName || ''} ${state.user?.lastName || ''}`.trim();

  const handleLogout = () => {
    if (confirm('Tizimdan chiqishni xohlaysizmi?')) {
      actions.logout();
      navigate('/login');
    }
  };

  return (
    <div className="seller-layout">
      {/* Modern Header */}
      <header>
        <div className="header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Sotuvchi Paneli</h1>
            {state.user && (
              <p style={{ color: 'rgba(255,255,255,0.8)', margin: '8px 0 0 0', fontSize: '1.1rem' }}>
                Xush kelibsiz, {displayName || 'Siz'}!
              </p>
            )}
          </div>
          <div>
            <button className="logout-btn" onClick={handleLogout} style={{ background:'#ef4444', color:'#fff', border:'none', padding:'8px 12px', borderRadius:6, cursor:'pointer', display:'flex', alignItems:'center', gap:8 }}>
              <LogOut size={16} /> Chiqish
            </button>
          </div>
        </div>
      </header>

      {/* Ultra Modern Navigation */}
      <nav className="seller-nav">
        <div className="nav-container">
          <button 
            className={getButtonClass("products")}
            onClick={() => setActiveSection("products")}
          >
            <Package size={18} />
            Mahsulotlar
          </button>
          <button 
            className={getButtonClass("orders")}
            onClick={() => setActiveSection("orders")}
          >
            <ShoppingCart size={18} />
            Buyurtmalar
          </button>
          <button 
            className={getButtonClass("chat")}
            onClick={() => setActiveSection("chat")}
          >
            <MessageCircle size={18} />
            Chat
          </button>
          <button 
            className={getButtonClass("stats")}
            onClick={() => setActiveSection("stats")}
          >
            <BarChart3 size={18} />
            Statistika
          </button>
          <button 
            className={getButtonClass("profile")}
            onClick={() => setActiveSection("profile")}
          >
            <User size={18} />
            Profil
          </button>
          <button 
            className={getButtonClass("settings")}
            onClick={() => setActiveSection("settings")}
          >
            <User size={18} />
            Sozlamalar
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="seller-main">
        {activeSection === "products" && (
          <section>
            <h2>Mahsulotlarim</h2>
            
            {/* Quick Stats */}
            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-number">{totalProducts}</div>
                <div className="stat-title">Jami Mahsulotlar</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{products.filter(p => p.quantity > 0).length}</div>
                <div className="stat-title">Mavjud</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{products.filter(p => p.quantity === 0).length}</div>
                <div className="stat-title">Tugagan</div>
              </div>
            </div>
            
            <ProductForm />
            <ProductList products={products} />
          </section>
        )}

        {activeSection === "orders" && (
          <section>
            <h2>Buyurtmalar</h2>
            
            {/* Order Stats */}
            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-number">{totalOrders}</div>
                <div className="stat-title">Jami</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{orders.filter(o => o.status === 'pending').length}</div>
                <div className="stat-title">Kutilmoqda</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{completedOrders}</div>
                <div className="stat-title">Yakunlangan</div>
              </div>
            </div>
            
            <Orders orders={orders} />
          </section>
        )}

        {activeSection === "chat" && (
          <section>
            <h2>Mijozlar bilan Chat</h2>
            <Chat messages={messages} />
          </section>
        )}

        {activeSection === "stats" && (
          <section>
            <h2>Statistika va Tahlil</h2>
            <Statistics products={products} orders={orders} />
          </section>
        )}

        {activeSection === "profile" && (
          <section>
            <h2>Mening Profilim</h2>
            <Profile />
          </section>
        )}

        {activeSection === "settings" && (
          <section>
            <Settings />
          </section>
        )}
      </main>
    </div>
  );
}
