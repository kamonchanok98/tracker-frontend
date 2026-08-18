<script setup lang="ts">
import { ref, computed } from 'vue';
import Navbar from './components/Navbar.vue';
import RegisterModal from './components/modals/Register.vue';
import LoginModal from './components/modals/Login.vue';
import type { Product } from './components/ProductCard.vue';

// 1. Reactive state
const isRegisterOpen = ref<boolean>(false);
const isLoginModalOpen = ref(false);
const favoriteIds = ref<Set<number>>(new Set());
const searchQuery = ref<string>('');

// 2. Strongly typed product list mock data
const products = ref<Product[]>([
  {
    id: 1,
    name: 'Wireless Bluetooth 5.3 Earbuds Noise Cancelling Gaming Headphones',
    price: 299,
    sold: '1.2k',
    discount: 35,
    isMall: true,
    freeReturn: true,
  },
  {
    id: 2,
    name: 'Smart Watch Ultra Series 8 Heart Rate Oxygen Monitor Waterproof',
    price: 450,
    sold: '3.8k',
    discount: 50,
    isPreferred: true,
  },
  {
    id: 3,
    name: 'Hot-Swappable RGB Mechanical Gaming Keyboard Blue Switch',
    price: 890,
    sold: '540',
    discount: 20,
    isMall: true,
  },
  {
    id: 4,
    name: '20000mAh Fast Charging Portable Power Bank Dual USB Output',
    price: 320,
    sold: '9.1k',
    freeReturn: true,
  },
]);

// 3. Type-safe computed filtering based on search query
const filteredProducts = computed<Product[]>(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return products.value;

  return products.value.filter(product => product.name.toLowerCase().includes(query));
});

// 4. Event Handlers
// Handle custom event emitted from Navbar component
const handleSearch = (query: string): void => {
  searchQuery.value = query;
};

const handleToggleFavorite = (id: number): void => {
  const updated = new Set(favoriteIds.value);
  if (updated.has(id)) {
    updated.delete(id);
  } else {
    updated.add(id);
  }
  favoriteIds.value = updated; // Reassignment triggers Vue reactivity
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 font-sans pb-12">
    <!-- Navbar with both search & register handlers -->
    <Navbar
      :fav-count="favoriteIds.size"
      @search="handleSearch"
      @open-register="isRegisterOpen = true"
      @open-login="isLoginModalOpen = true"
    />

    <!-- Main Container -->
    <main class="max-w-7xl mx-auto p-4">
      <!-- Use v-slot to pass props down to the active view -->
      <router-view v-slot="{ Component }">
        <component
          :is="Component"
          :products="filteredProducts"
          :favorite-ids="favoriteIds"
          @toggle-favorite="handleToggleFavorite"
        />
      </router-view>
    </main>

    <!-- Global Registration Modal -->
    <RegisterModal :is-open="isRegisterOpen" @close="isRegisterOpen = false" />
    <LoginModal :isOpen="isLoginModalOpen" @close="isLoginModalOpen = false" />
  </div>
</template>
