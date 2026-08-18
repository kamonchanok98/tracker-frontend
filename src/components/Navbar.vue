<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';

const router = useRouter();
const { user, logout } = useAuth();

// Default fallback avatar (data URI) if user has no profile photo
const DEFAULT_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="%23cccccc"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`;

// Compute picture URL safely (supports both camelCase and snake_case)
const userAvatar = computed(() => {
  if (!user.value) return DEFAULT_AVATAR;
  // @ts-ignore - defensive check for older localStorage schema
  return user.value.pictureUrl || user.value.picture_url || DEFAULT_AVATAR;
});

// Emitted events for parent component
const emit = defineEmits<{
  (e: 'search', searchQuery: string): void;
  (e: 'open-register'): void;
  (e: 'open-login'): void;
}>();

defineProps<{
  favCount: number;
}>();

const searchQuery = ref<string>('');

const popularSearches = ref<string[]>([
  'Earbuds',
  'Smart Watch',
  'Mechanical Keyboard',
  'Power Bank',
  'Gaming Headphones',
]);

const loginWithLine = async () => {
  try {
    const res = await fetch('/api/accounts/line/login-url/');
    const data = await res.json();
    if (data.auth_url) {
      window.location.href = data.auth_url;
    }
  } catch (err) {
    console.error('Failed to get LINE login URL:', err);
  }
};

const handleSearch = (): void => {
  emit('search', searchQuery.value.trim());
};

const selectPopularTerm = (term: string): void => {
  searchQuery.value = term;
  emit('search', term);
};

const handleLogout = () => {
  logout();
  router.push('/');
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

        <!-- Right Side: Auth / Profile -->
        <div class="flex items-center gap-4">
          <!-- LOGGED IN USER -->
          <div v-if="user" class="flex items-center gap-2 font-semibold">
            <img
              :src="userAvatar"
              alt="Profile"
              class="w-6 h-6 rounded-full object-cover border border-white/80"
              @error="e => ((e.target as HTMLImageElement).src = DEFAULT_AVATAR)"
            />
            <span class="text-white">{{ user.displayName }}</span>
            <span class="opacity-40">|</span>
            <button
              type="button"
              @click="handleLogout"
              class="hover:opacity-80 transition cursor-pointer font-semibold text-white/90"
            >
              Logout
            </button>
          </div>

          <!-- LOGGED OUT -->
          <div v-else class="flex items-center gap-2 font-semibold border-l border-white/20 pl-4">
            <button
              type="button"
              @click="emit('open-register')"
              class="hover:opacity-80 transition cursor-pointer font-semibold"
            >
              Sign Up
            </button>
            <span class="opacity-40">|</span>
            <button
              type="button"
              @click="emit('open-login')"
              class="hover:opacity-80 transition cursor-pointer font-semibold"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Search Header -->
    <div class="bg-[#ee4d2d] text-white py-4 px-4 shadow-md">
      <div class="max-w-7xl mx-auto flex items-center justify-between gap-6">
        <!-- Brand Logo -->
        <div class="flex items-center gap-2 cursor-pointer flex-shrink-0">
          <router-link class="text-3xl font-black italic tracking-tighter" to="/"
            >Product Price Tracker</router-link
          >
          <span
            class="text-[10px] bg-white text-[#ee4d2d] px-1 py-0.5 rounded font-bold uppercase tracking-wider"
            >Clone</span
          >
        </div>

        <!-- Search Bar Area -->
        <div class="flex-1 max-w-2xl">
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
