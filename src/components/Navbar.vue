<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  favCount: number;
}>();
// 1. Define typed emitted events for parent component communication
const emit = defineEmits<{
  (e: 'search', searchQuery: string): void;
  (e: 'open-register'): void;
}>();

// 2. Strongly typed reactive state for the search input
const searchQuery = ref<string>('');

// Popular search terms list
const popularSearches = ref<string[]>([
  'Earbuds',
  'Smart Watch',
  'Mechanical Keyboard',
  'Power Bank',
  'Gaming Headphones',
]);

// 3. Event handler that emits the search query string upward
const handleSearch = (): void => {
  emit('search', searchQuery.value.trim());
};
const selectPopularTerm = (term: string): void => {
  searchQuery.value = term;
  emit('search', term);
};
</script>

<template>
  <header class="w-full">
    <!-- Top Micro-Bar -->
    <div class="bg-[#ee4d2d] text-white text-xs py-1.5 px-4">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex items-center gap-3">
          <a href="#" class="hover:opacity-80">Seller Centre</a>
          <span class="opacity-40">|</span>
          <a href="#" class="hover:opacity-80">Download</a>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2 font-semibold border-l border-white/20 pl-4">
            <button
              type="button"
              @click="emit('open-register')"
              class="hover:opacity-80 transition cursor-pointer font-semibold"
            >
              Sign Up
            </button>
            <span class="opacity-40">|</span>
            <a href="#" class="hover:opacity-80 transition">Login</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Search Header -->
    <div class="bg-[#ee4d2d] text-white py-4 px-4 shadow-md">
      <div class="max-w-7xl mx-auto flex items-center justify-between gap-6">
        <!-- Brand Logo -->
        <div class="flex items-center gap-2 cursor-pointer flex-shrink-0">
          <div class="text-3xl font-black italic tracking-tighter">Product Price Tracker</div>
          <span
            class="text-[10px] bg-white text-[#ee4d2d] px-1 py-0.5 rounded font-bold uppercase tracking-wider"
            >Clone</span
          >
        </div>

        <!-- Search Bar Area -->
        <div class="flex-1 max-w-2xl">
          <!-- Search Bar Form -->
          <form
            @submit.prevent="handleSearch"
            class="flex-1 max-w-2xl bg-white p-1 rounded-sm flex"
          >
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Sign up and track price of your first product!"
              class="w-full px-3 py-2 text-black text-sm outline-none bg-transparent placeholder-gray-400"
            />
            <button
              type="submit"
              class="bg-[#fb5533] hover:bg-[#f04826] text-white px-6 py-2 rounded-sm flex items-center justify-center transition"
            >
              🔍
            </button>
          </form>
          <!-- Popular Search Terms -->
          <div class="flex gap-4 text-xs mt-1.5 opacity-90 overflow-x-auto whitespace-nowrap">
            <button
              v-for="term in popularSearches"
              :key="term"
              @click="selectPopularTerm(term)"
              class="hover:text-amber-200 transition-colors cursor-pointer"
            >
              {{ term }}
            </button>
          </div>
        </div>

        <!-- Cart Icon -->
        <div class="relative cursor-pointer flex-shrink-0 pr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.8"
            stroke="currentColor"
            class="w-8 h-8 text-white hover:opacity-90 transition"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
            />
          </svg>

          <!-- Cart Badge -->
          <span
            v-show="favCount > 0"
            class="absolute -top-1.5 right-1 bg-white text-[#ee4d2d] text-xs font-bold px-1.5 py-0.2 rounded-full border border-[#ee4d2d]"
          >
            {{ favCount }}
          </span>
        </div>
      </div>
    </div>
  </header>
</template>
