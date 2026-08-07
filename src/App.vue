<template>
  <div style="max-width: 800px; margin: 40px auto; font-family: sans-serif; padding: 20px;">
    <h1>🏷️ Price Tracker Dashboard</h1>

    <!-- Auth Forms (Shown when logged out) -->
    <div v-if="!token" style="display: flex; gap: 20px; margin-top: 20px;">
      <!-- Register Form -->
      <div style="flex: 1; border: 1px solid #ccc; padding: 20px; border-radius: 8px;">
        <h2>Register Account</h2>
        <form @submit.prevent="handleRegister">
          <input v-model="regUser" placeholder="Username" required style="display:block; width:90%; margin-bottom:10px; padding:8px;" />
          <input v-model="regPass" type="password" placeholder="Password" required style="display:block; width:90%; margin-bottom:10px; padding:8px;" />
          <button type="submit" style="padding: 8px 16px; background: #28a745; color: white; border: none; cursor: pointer; border-radius: 4px;">Register</button>
        </form>
      </div>

      <!-- Login Form -->
      <div style="flex: 1; border: 1px solid #ccc; padding: 20px; border-radius: 8px;">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
          <input v-model="loginUser" placeholder="Username" required style="display:block; width:90%; margin-bottom:10px; padding:8px;" />
          <input v-model="loginPass" type="password" placeholder="Password" required style="display:block; width:90%; margin-bottom:10px; padding:8px;" />
          <button type="submit" style="padding: 8px 16px; background: #007bff; color: white; border: none; cursor: pointer; border-radius: 4px;">Login</button>
        </form>
      </div>
    </div>

    <!-- Dashboard (Shown when logged in) -->
    <div v-else style="margin-top: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <p><strong>Status:</strong> Logged In</p>
        <button @click="logout" style="background: #dc3545; color: white; border: none; padding: 6px 12px; cursor: pointer; border-radius: 4px;">Logout</button>
      </div>

      <!-- Add Product Form -->
      <div style="border: 1px solid #ccc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2>Track New Product</h2>
        <form @submit.prevent="handleAddProduct" style="display: flex; gap: 10px;">
          <input v-model="newProd.name" placeholder="Product Name" required style="flex:1; padding:8px;" />
          <input v-model="newProd.url" placeholder="Product URL" required style="flex:2; padding:8px;" />
          <input v-model="newProd.target_price" placeholder="Target ($)" type="number" step="0.01" style="flex:1; padding:8px;" />
          <button type="submit" style="background: #007bff; color: white; border: none; padding: 8px 16px; cursor: pointer; border-radius: 4px;">Add Product</button>
        </form>
      </div>

      <!-- Products List -->
      <h2>Your Tracked Products</h2>
      <div v-if="products.length === 0">No products tracked yet.</div>
      <div v-for="prod in products" :key="prod.id" style="border: 1px solid #eee; padding: 15px; margin-bottom: 10px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h3 style="margin: 0 0 5px 0;">{{ prod.name }}</h3>
          <a :href="prod.url" target="_blank" style="color: #007bff;">Product Link</a>
          <p style="margin: 5px 0 0 0; color: #555;">
            Current Price: <strong>{{ prod.price_history && prod.price_history.length ? '$' + prod.price_history[0].price : 'Not scraped yet' }}</strong> | Target: ${{ prod.target_price || 'N/A' }}
          </p>
        </div>
        <button @click="scrapeProduct(prod.id)" style="background: #17a2b8; color: white; border: none; padding: 8px 12px; cursor: pointer; border-radius: 4px;">
          Scrape Now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from './api';

const token = ref(localStorage.getItem('access_token'));
const products = ref([]);

const regUser = ref('');
const regPass = ref('');
const loginUser = ref('');
const loginPass = ref('');
const newProd = ref({ name: '', url: '', target_price: '' });

const handleRegister = async () => {
  try {
    await api.post('register/', { username: regUser.value, password: regPass.value });
    alert('Registration successful! Please log in.');
    regUser.value = '';
    regPass.value = '';
  } catch (err) {
    alert('Registration failed: ' + JSON.stringify(err.response?.data || 'Error'));
  }
};

const handleLogin = async () => {
  try {
    const res = await api.post('token/', { username: loginUser.value, password: loginPass.value });
    localStorage.setItem('access_token', res.data.access);
    token.value = res.data.access;
    fetchProducts();
  } catch (err) {
    alert('Login failed! Check your credentials.');
  }
};

const logout = () => {
  localStorage.removeItem('access_token');
  token.value = null;
  products.value = [];
};

const fetchProducts = async () => {
  if (!token.value) return;
  try {
    const res = await api.get('products/');
    products.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

const handleAddProduct = async () => {
  try {
    await api.post('products/', newProd.value);
    newProd.value = { name: '', url: '', target_price: '' };
    fetchProducts();
  } catch (err) {
    alert('Failed to add product');
  }
};

const scrapeProduct = async (id) => {
  try {
    const res = await api.post(`products/${id}/scrape/`);
    alert(`Scrape complete! Current price: $${res.data.current_price}`);
    fetchProducts();
  } catch (err) {
    alert('Scrape failed: ' + (err.response?.data?.error || 'Error'));
  }
};

onMounted(() => {
  if (token.value) {
    fetchProducts();
  }
});
</script>