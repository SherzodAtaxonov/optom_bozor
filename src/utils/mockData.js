// src/utils/mockData.js
import { api } from '../services/api.js';

// Mock Products Data
export const mockProducts = [
  {
    name: "Qizil Olma",
    category: "Mevalar",
    price: 12000,
    unit: "kg",
    quantity: 500,
    description: "Yuqori sifatli qizil olma. O'zbekistonning eng yaxshi fermerlaridan.",
    image: "🍎",
    sellerId: 1,
    sellerName: "Sherzod Karimov",
    status: "active",
    minOrder: 10,
    location: "Farg'ona viloyati"
  },
  {
    name: "Yangi Uzum",
    category: "Mevalar", 
    price: 15000,
    unit: "kg",
    quantity: 300,
    description: "Shirin va suvli uzum. Tog' hududlaridan.",
    image: "🍇",
    sellerId: 2,
    sellerName: "Ali Nazarov",
    status: "active",
    minOrder: 5,
    location: "Samarqand viloyati"
  },
  {
    name: "Organik Piyoz",
    category: "Sabzavotlar",
    price: 6000,
    unit: "kg", 
    quantity: 800,
    description: "Organik usulda yetishtirilgan piyoz.",
    image: "🧅",
    sellerId: 3,
    sellerName: "Murod Toshev",
    status: "active",
    minOrder: 20,
    location: "Qashqadaryo viloyati"
  },
  {
    name: "Organik Sabzi",
    category: "Sabzavotlar",
    price: 8000,
    unit: "kg",
    quantity: 0,
    description: "Organik sabzi, yuqori sifatli.",
    image: "🥕",
    sellerId: 3,
    sellerName: "Murod Toshev", 
    status: "inactive",
    minOrder: 15,
    location: "Qashqadaryo viloyati"
  },
  {
    name: "Bug'doy Uni",
    category: "Don mahsulotlari",
    price: 4500,
    unit: "kg",
    quantity: 1000,
    description: "Yuqori sifatli bug'doy uni.",
    image: "🌾",
    sellerId: 4,
    sellerName: "Jahongir Rahimov",
    status: "active",
    minOrder: 50,
    location: "Sirdaryo viloyati"
  }
];

// Mock Users Data  
export const mockUsers = [
  {
    name: "Admin Foydalanuvchi",
    email: "admin@optombozor.uz",
    password: "admin123",
    role: "admin",
    phone: "+998901234567",
    avatar: "A"
  },
  {
    name: "Sherzod Karimov", 
    email: "sherzod@example.com",
    password: "seller123",
    role: "seller",
    phone: "+998901234567",
    avatar: "S",
    company: "Sherzod Meva Kompaniyasi",
    location: "Farg'ona viloyati"
  },
  {
    name: "Ali Nazarov",
    email: "ali@example.com", 
    password: "seller123",
    role: "seller",
    phone: "+998917654321",
    avatar: "A",
    company: "Ali Uzum Fermi",
    location: "Samarqand viloyati"
  },
  {
    name: "Murod Toshev",
    email: "murod@example.com",
    password: "seller123", 
    role: "seller",
    phone: "+998934567890",
    avatar: "M",
    company: "EkoFerm Organik",
    location: "Qashqadaryo viloyati"
  },
  {
    name: "Jahongir Rahimov",
    email: "jahongir@example.com",
    password: "seller123",
    role: "seller", 
    phone: "+998971234567",
    avatar: "J",
    company: "Don Mahsulotlari",
    location: "Sirdaryo viloyati"
  },
  {
    name: "Azizbek Rahimov",
    email: "azizbek@example.com",
    password: "buyer123", 
    role: "buyer",
    phone: "+998901111111",
    avatar: "A",
    company: "Azizbek Supermarket",
    location: "Toshkent shahri"
  },
  {
    name: "Otabek Saidov", 
    email: "otabek@example.com",
    password: "buyer123",
    role: "buyer",
    phone: "+998902222222", 
    avatar: "O",
    company: "Otabek Do'koni",
    location: "Andijon viloyati"
  },
  {
    name: "Malika Karimova",
    email: "malika@example.com",
    password: "buyer123",
    role: "buyer",
    phone: "+998903333333",
    avatar: "M", 
    company: "Malika Market",
    location: "Namangan viloyati"
  }
];

// Mock Orders Data
export const mockOrders = [
  {
    orderNumber: "ORD-001",
    buyerId: 6,
    buyerName: "Azizbek Rahimov",
    sellerId: 1,
    sellerName: "Sherzod Karimov",
    productId: 1,
    productName: "Qizil Olma",
    quantity: 25,
    unit: "kg",
    price: 12000,
    totalAmount: 300000,
    status: "completed",
    paymentStatus: "paid",
    deliveryAddress: "Toshkent shahri, Yunusobod tumani",
    notes: "Tez yetkazib berish kerak",
    orderDate: "2024-03-15T10:30:00.000Z"
  },
  {
    orderNumber: "ORD-002", 
    buyerId: 7,
    buyerName: "Otabek Saidov",
    sellerId: 2,
    sellerName: "Ali Nazarov", 
    productId: 2,
    productName: "Yangi Uzum",
    quantity: 15,
    unit: "kg",
    price: 15000,
    totalAmount: 225000,
    status: "pending",
    paymentStatus: "pending",
    deliveryAddress: "Andijon viloyati, Andijon shahri",
    notes: "",
    orderDate: "2024-03-14T14:20:00.000Z"
  },
  {
    orderNumber: "ORD-003",
    buyerId: 8, 
    buyerName: "Malika Karimova",
    sellerId: 3,
    sellerName: "Murod Toshev",
    productId: 3,
    productName: "Organik Piyoz",
    quantity: 50,
    unit: "kg", 
    price: 6000,
    totalAmount: 300000,
    status: "cancelled",
    paymentStatus: "cancelled",
    deliveryAddress: "Namangan viloyati, Namangan shahri",
    notes: "Sifat yoqmadi",
    orderDate: "2024-03-13T09:15:00.000Z"
  }
];

// Function to populate API with mock data
export const initializeMockData = async () => {
  try {
    console.log('🔄 Mock ma\'lumotlarni yuklash boshlandi...');

    // Check if data already exists
    const existingProducts = await api.products.getAll();
    const existingUsers = await api.users.getAll();
    const existingOrders = await api.orders.getAll();

    // Add products if none exist
    if (!existingProducts || existingProducts.length === 0) {
      console.log('📦 Mahsulotlarni qo\'shish...');
      for (const product of mockProducts) {
        await api.products.create(product);
      }
      console.log('✅ Mahsulotlar qo\'shildi');
    }

    // Add users if none exist  
    if (!existingUsers || existingUsers.length === 0) {
      console.log('👥 Foydalanuvchilarni qo\'shish...');
      for (const user of mockUsers) {
        await api.users.create(user);
      }
      console.log('✅ Foydalanuvchilar qo\'shildi');
    }

    // Add orders if none exist
    if (!existingOrders || existingOrders.length === 0) {
      console.log('📋 Buyurtmalarni qo\'shish...');
      for (const order of mockOrders) {
        await api.orders.create(order);
      }
      console.log('✅ Buyurtmalar qo\'shildi');
    }

    console.log('🎉 Mock ma\'lumotlar muvaffaqiyatli yuklandi!');
    return true;
  } catch (error) {
    console.error('❌ Mock ma\'lumotlarni yuklashda xatolik:', error);
    return false;
  }
};

// Export all mock data
export default {
  products: mockProducts,
  users: mockUsers,
  orders: mockOrders,
  initializeMockData
};
