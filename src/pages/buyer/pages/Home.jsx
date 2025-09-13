import { useState, useEffect } from "react";
import { Search, Filter, Grid, List, Loader } from "lucide-react";
import { useAppContext } from "../../../contexts/AppContext";
import ProductCard from "../components/ProductCard";
import "../styles/Home.css";

export default function Home() {
  const { state, actions } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  
  const { products, productsLoading, productsError } = state;
  
  // Get unique categories
  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];
  
  // Filter and sort products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });
  
  if (productsLoading) {
    return (
      <div className="home-page">
        <div className="loading-state">
          <Loader className="loading-spinner" size={48} />
          <h2>Mahsulotlar yuklanmoqda...</h2>
          <p>Iltimos, kuting</p>
        </div>
      </div>
    );
  }
  
  if (productsError) {
    return (
      <div className="home-page">
        <div className="error-state">
          <h2>Xatolik yuz berdi</h2>
          <p>{productsError}</p>
          <button 
            className="btn btn-primary"
            onClick={() => actions.loadProducts()}
          >
            Qaytadan yuklash
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Taze Mahsulotlar Bozori</h1>
          <p>Eng yaxshi narxlarda sifatli mahsulotlar</p>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="filters-section">
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Mahsulotlarni qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-controls">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'Barcha kategoriyalar' : category}
              </option>
            ))}
          </select>
          
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="name">Nomi bo'yicha</option>
            <option value="price-low">Narxi (Pastdan yuqoriga)</option>
            <option value="price-high">Narxi (Yuqoridan pastga)</option>
          </select>
          
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={18} />
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="products-section">
        <div className="section-header">
          <h2>Mahsulotlar ({filteredProducts.length})</h2>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <h3>Hech qanday mahsulot topilmadi</h3>
            <p>Qidiruv so'zini o'zgartiring yoki filterni tozalang</p>
          </div>
        ) : (
          <div className={`product-grid ${viewMode}`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
