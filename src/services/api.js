// src/services/api.js
const AUTH_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE)
  ? import.meta.env.VITE_API_BASE
  : 'http://127.0.0.1:5000/api';

// Generic authenticated request handler (local backend)
const authRequest = async (endpoint, options = {}) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('AUTH_TOKEN') : null;
  const url = `${AUTH_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const res = await fetch(url, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) {
    throw new Error(data.message || `API error: ${res.status}`);
  }
  return data;
};

// Products API (local backend)
export const productsAPI = {
  // Get all products
  getAll: () => authRequest('/products'),
  
  // Get product by ID
  getById: (id) => authRequest(`/products/${id}`),
  
  // Create new product
  create: (productData) => authRequest('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  }),
  
  // Update product
  update: (id, productData) => authRequest(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  }),
  
  // Delete product
  delete: (id) => authRequest(`/products/${id}`, {
    method: 'DELETE',
  }),
  
  // Search products
  search: (query) => authRequest(`/products?search=${encodeURIComponent(query)}`),
  
  // Get products by category
  getByCategory: (category) => authRequest(`/products?category=${encodeURIComponent(category)}`),
};

// Users API (local backend)
export const usersAPI = {
  // Create new user (registration)
  create: async (userData) => {
    const data = await authRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    return { user: data.user, token: data.token };
  },
  
  // Update current user (if you add such endpoint later)
  updateMe: async (userData) => authRequest('/users/me', {
    method: 'PATCH',
    body: JSON.stringify(userData),
  }),

  // Delete current user (account deletion)
  deleteMe: async () => {
    const data = await authRequest('/users/me', { method: 'DELETE' });
    return data;
  },
  
  // Login user
  login: async (username, password) => {
    const data = await authRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    return { user: data.user, token: data.token };
  },
};

// Orders API (local backend)
export const ordersAPI = {
  // Get all orders
  getAll: () => authRequest('/orders'),
  
  // Get order by ID
  getById: (id) => authRequest(`/orders/${id}`),
  
  // Create new order
  create: (orderData) => authRequest('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  }),
  
  // Update order
  update: (id, orderData) => authRequest(`/orders/${id}`, {
    method: 'PUT',
    body: JSON.stringify(orderData),
  }),
  
  // Delete order
  delete: (id) => authRequest(`/orders/${id}`, {
    method: 'DELETE',
  }),

  // (Optional) update order status
  updateStatus: (id, status) => authRequest(`/orders/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  }),
};

// Export all APIs
export const api = {
  products: productsAPI,
  users: usersAPI,
  orders: ordersAPI,
};

export default api;
