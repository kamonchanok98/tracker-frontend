<script setup lang="ts">
export interface Product {
  id: number;
  name: string;
  price: number;
  sold: string;
  discount?: number;
  isMall?: boolean;
  isPreferred?: boolean;
  freeReturn?: boolean;
}

defineProps<{
  product: Product;
}>();

const emit = defineEmits<{
  'toggle-favorite': [productId: number];
}>();
</script>

<template>
  <div
    class="bg-white rounded-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition duration-200 cursor-pointer border border-gray-100 flex flex-col justify-between overflow-hidden"
  >
    <div>
      <!-- Image Placeholder -->
      <div
        class="w-full aspect-square bg-gray-200 flex items-center justify-center text-gray-400 text-xs relative"
      >
        {{ product.name }}

        <!-- Favorite Icon -->
        <div
          class="absolute top-0 left-0 text-xs font-bold px-1.5 py-0.5 text-red-600 flex flex-col items-center leading-none"
        >
          <button
            @click="emit('toggle-favorite', product.id)"
            class="cursor-pointer hover:scale-110 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.8"
              stroke="currentColor"
              class="w-6 h-6 text-white hover:opacity-90 transition"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
              />
            </svg>
          </button>
        </div>

        <!-- Discount Badge -->
        <div
          v-if="product.discount"
          class="absolute top-0 right-0 bg-amber-400 text-xs font-bold px-1.5 py-0.5 text-red-600 flex flex-col items-center leading-none"
        >
          <span>{{ product.discount }}%</span>
          <span class="text-[9px] uppercase font-semibold text-white">OFF</span>
        </div>
      </div>

      <!-- Details -->
      <div class="p-2.5 space-y-2">
        <h3 class="text-xs text-gray-800 line-clamp-2 leading-relaxed">
          {{ product.name }}
        </h3>

        <div class="flex gap-1">
          <span v-if="product.isMall" class="text-[10px] bg-[#ee4d2d] text-white px-1 rounded-xs"
            >Mall</span
          >
          <span
            v-if="product.isPreferred"
            class="text-[10px] bg-emerald-600 text-white px-1 rounded-xs"
            >Preferred</span
          >
          <span
            v-if="product.freeReturn"
            class="text-[10px] border border-[#ee4d2d] text-[#ee4d2d] px-1 rounded-xs"
            >Free Return</span
          >
        </div>
      </div>
    </div>

    <!-- Price Footer -->
    <div class="p-2.5 pt-0">
      <div class="flex items-baseline gap-1">
        <span class="text-xs text-[#ee4d2d]">฿</span>
        <span class="text-base font-bold text-[#ee4d2d]">{{ product.price }}</span>
      </div>
      <div class="flex justify-between items-center text-[10px] text-gray-400 mt-1">
        <span>⭐⭐⭐⭐⭐</span>
        <span>{{ product.sold }} sold</span>
      </div>
    </div>
  </div>
</template>
