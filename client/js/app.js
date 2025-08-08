// Global variables
let currentUser = null;
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// API base URL
const API_BASE = '/api';

// Utility functions
const getToken = () => localStorage.getItem('token');

const setAuthHeader = () => {
  const token = getToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const formatPrice = (price) => `₹${price.toLocaleString('en-IN')}`;

const showAlert = (message, type = 'info') => {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.textContent = message;
  
  const container = document.querySelector('.container') || document.body;
  container.insertBefore(alertDiv, container.firstChild);
  
  setTimeout(() => alertDiv.remove(), 5000);
};

// API functions
const api = {
  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...setAuthHeader(),
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Auth
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  async register(name, email, password) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
  },

  async getCurrentUser() {
    return this.request('/auth/me');
  },

  // Products
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/products?${queryString}`);
  },

  async getProduct(id) {
    return this.request(`/products/${id}`);
  },

  async createProduct(productData) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData)
    });
  },

  async updateProduct(id, productData) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData)
    });
  },

  async deleteProduct(id) {
    return this.request(`/products/${id}`, {
      method: 'DELETE'
    });
  },

  // Orders
  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  },

  async getMyOrders() {
    return this.request('/orders/my-orders');
  },

  async trackOrder(orderId) {
    return this.request(`/orders/track/${orderId}`);
  },

  async getAllOrders(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/orders?${queryString}`);
  },

  async updateOrderStatus(orderId, status) {
    return this.request(`/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  },

  // Admin
  async getDashboardStats() {
    return this.request('/admin/dashboard');
  },

  async getUsers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/admin/users?${queryString}`);
  }
};

// Auth functions
const auth = {
  async login(email, password) {
    try {
      const data = await api.login(email, password);
      localStorage.setItem('token', data.token);
      currentUser = data.user;
      this.updateUI();
      return data;
    } catch (error) {
      throw error;
    }
  },

  async register(name, email, password) {
    try {
      const data = await api.register(name, email, password);
      localStorage.setItem('token', data.token);
      currentUser = data.user;
      this.updateUI();
      return data;
    } catch (error) {
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('token');
    currentUser = null;
    cart = [];
    localStorage.removeItem('cart');
    this.updateUI();
    window.location.href = '/';
  },

  async checkAuth() {
    const token = getToken();
    if (token) {
      try {
        const data = await api.getCurrentUser();
        currentUser = data.user;
        this.updateUI();
      } catch (error) {
        this.logout();
      }
    }
  },

  updateUI() {
    const authButtons = document.querySelector('.auth-buttons');
    const userInfo = document.querySelector('.user-info');
    const profileLink = document.querySelector('.profile-link');
    
    if (currentUser) {
      if (authButtons) {
        authButtons.innerHTML = `
          <span>Welcome, ${currentUser.name}</span>
          <button class="btn btn-secondary" onclick="auth.logout()">Logout</button>
        `;
      }
      
      // Show profile link for authenticated users
      if (profileLink) {
        profileLink.style.display = 'block';
      }
      
      // Show admin link if user is admin
      if (currentUser.role === 'admin') {
        const nav = document.querySelector('nav ul');
        if (nav && !nav.querySelector('.admin-link')) {
          const adminLi = document.createElement('li');
          adminLi.innerHTML = '<a href="/dashboard.html" class="admin-link">Admin Dashboard</a>';
          nav.appendChild(adminLi);
        }
      }
    } else {
      if (authButtons) {
        authButtons.innerHTML = `
          <a href="/login.html" class="btn btn-primary">Login</a>
          <a href="/register.html" class="btn btn-secondary">Register</a>
        `;
      }
      
      // Hide profile link for non-authenticated users
      if (profileLink) {
        profileLink.style.display = 'none';
      }
    }
    
    this.updateCartUI();
  },

  updateCartUI() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = totalItems;
    }
  }
};

// Cart functions
const cartManager = {
  addToCart(product, quantity = 1) {
    const existingItem = cart.find(item => item.productId === product._id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }
    
    this.saveCart();
    auth.updateCartUI();
    showAlert('Product added to cart!', 'success');
  },

  removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    this.saveCart();
    auth.updateCartUI();
  },

  updateQuantity(productId, quantity) {
    const item = cart.find(item => item.productId === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.saveCart();
        auth.updateCartUI();
      }
    }
  },

  getTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  clearCart() {
    cart = [];
    this.saveCart();
    auth.updateCartUI();
  },

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

// Product functions
const productManager = {
  async loadProducts(category = '', search = '') {
    try {
      const params = {};
      if (category) params.category = category;
      if (search) params.search = search;
      
      const data = await api.getProducts(params);
      this.displayProducts(data.products);
    } catch (error) {
      showAlert('Error loading products: ' + error.message, 'error');
    }
  },

  displayProducts(products) {
    const container = document.querySelector('.products-grid');
    if (!container) return;

    if (products.length === 0) {
      container.innerHTML = '<p class="text-center">No products found.</p>';
      return;
    }

    container.innerHTML = products.map(product => `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-price">${formatPrice(product.price)}</div>
          <div class="product-actions">
            <button class="btn btn-primary" onclick="cartManager.addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
              Add to Cart
            </button>
            <button class="btn btn-secondary" onclick="viewProduct('${product._id}')">
              View Details
            </button>
          </div>
        </div>
      </div>
    `).join('');
  },

  setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        this.loadProducts(category);
      });
    });

    const searchInput = document.querySelector('#searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const search = e.target.value;
        const activeFilter = document.querySelector('.filter-btn.active');
        const category = activeFilter ? activeFilter.dataset.category : '';
        this.loadProducts(category, search);
      });
    }
  }
};

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
  await auth.checkAuth();
  
  // Setup navigation
  const currentPage = window.location.pathname;
  
  if (currentPage === '/' || currentPage === '/index.html') {
    productManager.loadProducts();
    productManager.setupFilters();
  }
});

// Global functions for HTML onclick handlers
window.viewProduct = (productId) => {
  window.location.href = `/product.html?id=${productId}`;
};

window.auth = auth;
window.cartManager = cartManager;
window.api = api;