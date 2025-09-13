// src/pages/Seller.jsx
import { useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import Orders from "../components/Orders";
import Chat from "../components/Chat";
import Statistics from "../components/Statistics";
import "../styles/Seller.css";

export default function Seller() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);

  return (
    <div className="seller-panel">
      <h1>Sotuvchi paneli</h1>
      <div className="section">
        <h2>Mahsulotlar</h2>
        <ProductForm products={products} setProducts={setProducts} />
        <ProductList products={products} />
      </div>
      <div className="section">
        <h2>Buyurtmalar</h2>
        <Orders orders={orders} setOrders={setOrders} />
      </div>
      <div className="section">
        <h2>Chat</h2>
        <Chat messages={messages} setMessages={setMessages} />
      </div>
      <div className="section">
        <h2>Statistika</h2>
        <Statistics products={products} orders={orders} />
      </div>
    </div>
  );
}
