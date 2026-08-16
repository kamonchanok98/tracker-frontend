<script setup lang="ts">
import ProductCard, { type Product } from '../components/ProductCard.vue';

// Set default fallback values for props
withDefaults(
  defineProps<{
    products?: Product[];
    favoriteIds?: Set<number>;
  }>(),
  {
    products: () => [],
    favoriteIds: () => new Set(),
  }
);

const emit = defineEmits<{
  'toggle-favorite': [productId: number];
}>();
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      :is-favorite="favoriteIds.has(product.id)"
      @toggle-favorite="emit('toggle-favorite', product.id)"
    />
  </div>
</template>
