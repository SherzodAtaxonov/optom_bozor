// src/contexts/AppContext.jsx
import { createContext, useContext, useReducer, useEffect } from 'react';
import { api } from '../services/api';

// Initial state
const initialState = {
  // User data
  user: null,
  isAuthenticated: false,
  userRole: null,

  // Products
  products: [],
  selectedProduct: null,
  productsLoading: false,
  productsError: null,

  // Orders
  orders: [],
  userOrders: [],
  ordersLoading: false,
  ordersError: null,

  // Cart
  cart: [],
  cartTotal: 0,

  // Users (for admin)
  users: [],
  usersLoading: false,
  usersError: null,

  // UI state
  loading: false,
  error: null,
  notification: null,
};

// Action types
const ActionTypes = {
  // Loading states
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_NOTIFICATION: 'SET_NOTIFICATION',

  // User actions
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  UPDATE_USER: 'UPDATE_USER',

  // Products actions
  SET_PRODUCTS_LOADING: 'SET_PRODUCTS_LOADING',
  SET_PRODUCTS_SUCCESS: 'SET_PRODUCTS_SUCCESS',
  SET_PRODUCTS_ERROR: 'SET_PRODUCTS_ERROR',
  ADD_PRODUCT: 'ADD_PRODUCT',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  SET_SELECTED_PRODUCT: 'SET_SELECTED_PRODUCT',

  // Orders actions
  SET_ORDERS_LOADING: 'SET_ORDERS_LOADING',
  SET_ORDERS_SUCCESS: 'SET_ORDERS_SUCCESS',
  SET_ORDERS_ERROR: 'SET_ORDERS_ERROR',
  ADD_ORDER: 'ADD_ORDER',
  UPDATE_ORDER: 'UPDATE_ORDER',
  DELETE_ORDER: 'DELETE_ORDER',

  // Cart actions
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_CART_ITEM: 'UPDATE_CART_ITEM',
  CLEAR_CART: 'CLEAR_CART',

  // Users actions (for admin)
  SET_USERS_LOADING: 'SET_USERS_LOADING',
  SET_USERS_SUCCESS: 'SET_USERS_SUCCESS',
  SET_USERS_ERROR: 'SET_USERS_ERROR',
  ADD_USER: 'ADD_USER',
  UPDATE_USER_IN_LIST: 'UPDATE_USER_IN_LIST',
  DELETE_USER: 'DELETE_USER',
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    // Loading and error states
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case ActionTypes.SET_NOTIFICATION:
      return { ...state, notification: action.payload };

    // User management
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        userRole: action.payload.role,
        loading: false,
        error: null,
      };
    
    case ActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        userRole: null,
        cart: [],
        cartTotal: 0,
      };

    case ActionTypes.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    // Products management
    case ActionTypes.SET_PRODUCTS_LOADING:
      return { ...state, productsLoading: action.payload };
    
    case ActionTypes.SET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        productsLoading: false,
        productsError: null,
      };
    
    case ActionTypes.SET_PRODUCTS_ERROR:
      return {
        ...state,
        productsError: action.payload,
        productsLoading: false,
      };

    case ActionTypes.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case ActionTypes.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        ),
      };

    case ActionTypes.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
      };

    case ActionTypes.SET_SELECTED_PRODUCT:
      return {
        ...state,
        selectedProduct: action.payload,
      };

    // Orders management
    case ActionTypes.SET_ORDERS_LOADING:
      return { ...state, ordersLoading: action.payload };
    
    case ActionTypes.SET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload.all || [],
        userOrders: action.payload.user || [],
        ordersLoading: false,
        ordersError: null,
      };
    
    case ActionTypes.SET_ORDERS_ERROR:
      return {
        ...state,
        ordersError: action.payload,
        ordersLoading: false,
      };

    case ActionTypes.ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
        userOrders: state.user && (action.payload.buyerId === state.user.id || action.payload.sellerId === state.user.id)
          ? [...state.userOrders, action.payload]
          : state.userOrders,
      };

    case ActionTypes.UPDATE_ORDER:
      const updatedOrders = state.orders.map(order =>
        order.id === action.payload.id ? action.payload : order
      );
      const updatedUserOrders = state.userOrders.map(order =>
        order.id === action.payload.id ? action.payload : order
      );
      return {
        ...state,
        orders: updatedOrders,
        userOrders: updatedUserOrders,
      };

    // Cart management
    case ActionTypes.ADD_TO_CART:
      const existingItem = state.cart.find(item => item.productId === action.payload.productId);
      let newCart;
      
      if (existingItem) {
        newCart = state.cart.map(item =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newCart = [...state.cart, action.payload];
      }
      
      const newTotal = newCart.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      return {
        ...state,
        cart: newCart,
        cartTotal: newTotal,
      };

    case ActionTypes.REMOVE_FROM_CART:
      const filteredCart = state.cart.filter(item => item.productId !== action.payload);
      const filteredTotal = filteredCart.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      return {
        ...state,
        cart: filteredCart,
        cartTotal: filteredTotal,
      };

    case ActionTypes.UPDATE_CART_ITEM:
      const updatedCart = state.cart.map(item =>
        item.productId === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      const updatedTotal = updatedCart.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      return {
        ...state,
        cart: updatedCart,
        cartTotal: updatedTotal,
      };

    case ActionTypes.CLEAR_CART:
      return {
        ...state,
        cart: [],
        cartTotal: 0,
      };

    // Users management (for admin)
    case ActionTypes.SET_USERS_LOADING:
      return { ...state, usersLoading: action.payload };
    
    case ActionTypes.SET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        usersLoading: false,
        usersError: null,
      };
    
    case ActionTypes.SET_USERS_ERROR:
      return {
        ...state,
        usersError: action.payload,
        usersLoading: false,
      };

    case ActionTypes.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case ActionTypes.UPDATE_USER_IN_LIST:
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        ),
      };

    case ActionTypes.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
      };

    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Initialize app data
  useEffect(() => {
    initializeAppData();
  }, []);

  const initializeAppData = async () => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      // Load initial data from real backend
      await Promise.all([
        loadProducts(),
        loadOrders()
      ]);
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    }
  };

  // Action creators
  const actions = {
    // Authentication
    login: async (username, password) => {
      try {
        dispatch({ type: ActionTypes.SET_LOADING, payload: true });
        const { user, token } = await api.users.login(username, password);
        dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: user });
        
        // Load user-specific data after login
        if (user.role === 'buyer') {
          await loadUserOrders(user.id);
        } else if (user.role === 'seller') {
          await loadSellerOrders(user.id);
        } else if (user.role === 'admin') {
          await loadUsers();
        }
        
        showNotification('Muvaffaqiyatli tizimga kirdingiz!', 'success');
        return user;
      } catch (error) {
        dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
        throw error;
      }
    },

    logout: () => {
      dispatch({ type: ActionTypes.LOGOUT });
      showNotification('Tizimdan chiqdingiz', 'info');
    },

    loginSuccess: (user) => {
      dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: user });
    },

    register: async (userData) => {
      try {
        dispatch({ type: ActionTypes.SET_LOADING, payload: true });
        const newUser = await api.users.create(userData);
        dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: newUser });
        showNotification('Ro\'yxatdan o\'tish muvaffaqiyatli!', 'success');
        return newUser;
      } catch (error) {
        dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
        throw error;
      }
    },

    // Products
    loadProducts: loadProducts,
    
    addProduct: async (productData) => {
      try {
        const newProduct = await api.products.create(productData);
        dispatch({ type: ActionTypes.ADD_PRODUCT, payload: newProduct });
        showNotification('Mahsulot muvaffaqiyatli qo\'shildi!', 'success');
        return newProduct;
      } catch (error) {
        showNotification('Mahsulot qo\'shishda xatolik', 'error');
        throw error;
      }
    },

    updateProduct: async (id, productData) => {
      try {
        const updatedProduct = await api.products.update(id, productData);
        dispatch({ type: ActionTypes.UPDATE_PRODUCT, payload: updatedProduct });
        showNotification('Mahsulot muvaffaqiyatli yangilandi!', 'success');
        return updatedProduct;
      } catch (error) {
        showNotification('Mahsulotni yangilashda xatolik', 'error');
        throw error;
      }
    },

    deleteProduct: async (id) => {
      try {
        await api.products.delete(id);
        dispatch({ type: ActionTypes.DELETE_PRODUCT, payload: id });
        showNotification('Mahsulot o\'chirildi', 'success');
      } catch (error) {
        showNotification('Mahsulotni o\'chirishda xatolik', 'error');
        throw error;
      }
    },

    // Orders
    loadOrders: loadOrders,
    
    createOrder: async (orderData) => {
      try {
        const newOrder = await api.orders.create(orderData);
        dispatch({ type: ActionTypes.ADD_ORDER, payload: newOrder });
        showNotification('Buyurtma muvaffaqiyatli yaratildi!', 'success');
        return newOrder;
      } catch (error) {
        showNotification('Buyurtma yaratishda xatolik', 'error');
        throw error;
      }
    },

    updateOrder: async (id, orderData) => {
      try {
        const updatedOrder = await api.orders.update(id, orderData);
        dispatch({ type: ActionTypes.UPDATE_ORDER, payload: updatedOrder });
        showNotification('Buyurtma yangilandi', 'success');
        return updatedOrder;
      } catch (error) {
        showNotification('Buyurtmani yangilashda xatolik', 'error');
        throw error;
      }
    },

    // Cart
    addToCart: (product, quantity = 1) => {
      const cartItem = {
        productId: product.id,
        productName: product.name,
        price: product.price,
        unit: product.unit,
        quantity: quantity,
        sellerId: product.sellerId,
        sellerName: product.sellerName,
      };
      dispatch({ type: ActionTypes.ADD_TO_CART, payload: cartItem });
      showNotification(`${product.name} savatga qo'shildi`, 'success');
    },

    removeFromCart: (productId) => {
      dispatch({ type: ActionTypes.REMOVE_FROM_CART, payload: productId });
      showNotification('Mahsulot savatdan o\'chirildi', 'info');
    },

    updateCartItem: (productId, quantity) => {
      dispatch({ 
        type: ActionTypes.UPDATE_CART_ITEM, 
        payload: { productId, quantity } 
      });
    },

    clearCart: () => {
      dispatch({ type: ActionTypes.CLEAR_CART });
      showNotification('Savat tozalandi', 'info');
    },

    // Users (admin)
    loadUsers: loadUsers,
    
    // Notifications
    addNotification: (message, type = 'info') => {
      showNotification(message, type);
    },
    
    clearNotification: () => {
      dispatch({ type: ActionTypes.SET_NOTIFICATION, payload: null });
    },
  };

  // Helper functions
  async function loadProducts() {
    try {
      dispatch({ type: ActionTypes.SET_PRODUCTS_LOADING, payload: true });
      const products = await api.products.getAll();
      dispatch({ type: ActionTypes.SET_PRODUCTS_SUCCESS, payload: products || [] });
    } catch (error) {
      dispatch({ type: ActionTypes.SET_PRODUCTS_ERROR, payload: error.message });
    }
  }

  async function loadOrders() {
    try {
      dispatch({ type: ActionTypes.SET_ORDERS_LOADING, payload: true });
      const allOrders = await api.orders.getAll();
      dispatch({ 
        type: ActionTypes.SET_ORDERS_SUCCESS, 
        payload: { all: allOrders || [] } 
      });
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ORDERS_ERROR, payload: error.message });
    }
  }

  async function loadUserOrders(userId) {
    try {
      const userOrders = await api.orders.getByUserId(userId);
      dispatch({ 
        type: ActionTypes.SET_ORDERS_SUCCESS, 
        payload: { user: userOrders || [] } 
      });
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ORDERS_ERROR, payload: error.message });
    }
  }

  async function loadSellerOrders(sellerId) {
    try {
      const sellerOrders = await api.orders.getBySellerId(sellerId);
      dispatch({ 
        type: ActionTypes.SET_ORDERS_SUCCESS, 
        payload: { user: sellerOrders || [] } 
      });
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ORDERS_ERROR, payload: error.message });
    }
  }

  async function loadUsers() {
    try {
      dispatch({ type: ActionTypes.SET_USERS_LOADING, payload: true });
      const users = await api.users.getAll();
      dispatch({ type: ActionTypes.SET_USERS_SUCCESS, payload: users || [] });
    } catch (error) {
      dispatch({ type: ActionTypes.SET_USERS_ERROR, payload: error.message });
    }
  }

  function showNotification(message, type = 'info') {
    const notification = { message, type, id: Date.now() };
    dispatch({ type: ActionTypes.SET_NOTIFICATION, payload: notification });
    
    // Auto remove notification after 5 seconds
    setTimeout(() => {
      dispatch({ type: ActionTypes.SET_NOTIFICATION, payload: null });
    }, 5000);
  }

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
