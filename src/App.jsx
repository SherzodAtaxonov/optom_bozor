// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useAppContext } from "./contexts/AppContext";
import Notification from "./components/Notification";
import ErrorBoundary from "./components/ErrorBoundary";

// HomePage
import HomePage from "./pages/HomePage";

// Buyer sahifalar
import BuyerLayout from "./pages/buyer/BuyerLayout";
import BuyerHome from "./pages/buyer/pages/Home";
import BuyerProducts from "./pages/buyer/pages/Products";
import Cart from "./pages/buyer/pages/Cart";
import BuyerChat from "./pages/buyer/pages/Chat";
import Orders from "./pages/buyer/pages/Orders";
import BuyerProfile from "./pages/buyer/pages/Profile";

// Seller sahifalar
import SellerLayout from "./pages/seller/SellerLayout";

// Auth sahifalar
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Admin sahifalar
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/pages/Dashboard";
import ManageUsers from "./pages/admin/pages/ManageUsers";
import ManageProducts from "./pages/admin/pages/ManageProducts";
import Reports from "./pages/admin/pages/Reports";

// Simple auth guard component
function RequireAuth({ children }) {
  const { state } = useAppContext();
  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Main App component with routes
function AppRoutes() {
  const { state, actions } = useAppContext();

  return (
    <>
      <Router future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}>
        <Routes>
        {/* Auth sahifalari */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Asosiy tanlash sahifa */}
        <Route path="/" element={<HomePage />} />

        {/* Buyer layout (protected) */}
        <Route path="/buyer" element={<RequireAuth><BuyerLayout /></RequireAuth>}>
          <Route index element={<BuyerHome />} /> {/* /buyer */}
          <Route path="products" element={<BuyerProducts />} /> {/* /buyer/products */}
          <Route path="product/:id" element={<BuyerProducts />} />
          <Route path="cart" element={<Cart />} />
          <Route path="chat" element={<BuyerChat />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<BuyerProfile />} />
        </Route>

        {/* Seller layout (protected) */}
        <Route path="/seller/*" element={<RequireAuth><SellerLayout /></RequireAuth>} />

        {/* Admin layout (protected) */}
        <Route path="/admin" element={<RequireAuth><AdminLayout /></RequireAuth>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<h2>404 – Sahifa topilmadi</h2>} />
        </Routes>
      </Router>
      
      {/* Global Notification */}
      <Notification 
        notification={state.notification} 
        onClose={() => actions.clearNotification && actions.clearNotification()}
      />
    </>
  );
}

// App wrapper with Context Provider
function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
