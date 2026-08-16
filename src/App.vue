<script setup lang="ts">
import { ref, computed } from 'vue';
import Navbar from './components/Navbar.vue';
import ProductCard, { type Product } from './components/ProductCard.vue';

// 1. Local search state
const searchQuery = ref<string>('');

const favoriteIds = ref<Set<number>>(new Set());

const handleToggleFavorite = (id: number): void => {
  if (favoriteIds.value.has(id)) {
    favoriteIds.value.delete(id);
  } else {
    favoriteIds.value.add(id);
  }
};

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

// 4. Handle custom event emitted from Navbar component
const handleSearch = (query: string): void => {
  searchQuery.value = query;
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 font-sans pb-12">
    <!-- Navbar Component listening to @search event -->
    <Navbar :fav-count="favoriteIds.size" @search="handleSearch" />

    <!-- Main Container -->
    <main class="max-w-7xl mx-auto px-4 py-6">
      <!-- Section Title Header -->
      <div
        class="bg-white p-4 rounded-t-sm border-b border-gray-100 flex items-center justify-between mb-4 shadow-sm"
      >
        <h2
          class="text-base sm:text-lg font-bold text-[#ee4d2d] uppercase tracking-wide flex items-center gap-2"
        >
          <span>🔥</span> Daily Discover
        </h2>
        <span class="text-xs text-gray-500"> Showing {{ filteredProducts.length }} items </span>
      </div>

      <!-- Responsive Product Grid -->
      <div
        v-if="filteredProducts.length > 0"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4"
      >
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @toggle-favorite="handleToggleFavorite"
        />
      </div>

      <!-- Empty State Fallback -->
      <div v-else class="text-center py-12 bg-white rounded-sm shadow-sm text-gray-500 text-sm">
        No products found matching "<span class="font-semibold text-gray-700">{{
          searchQuery
        }}</span
        >"
      </div>
    </main>
  </div>
</template>
