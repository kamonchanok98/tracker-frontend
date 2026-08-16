<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const email = ref<string>('');
const password = ref<string>('');
const confirmPassword = ref<string>('');

const handleRegister = (): void => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match');
    return;
  }

  // Handled submission logic
  console.log('Registering user:', { email: email.value, password: password.value });

  // Reset form and close
  email.value = '';
  password.value = '';
  confirmPassword.value = '';
  emit('close');
};
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop Overlay -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4"
      @click.self="emit('close')"
    >
      <!-- Modal Box -->
      <div
        class="bg-white rounded-md shadow-xl w-full max-w-md p-6 relative animate-in fade-in zoom-in-95 duration-150"
      >
        <!-- Close Button -->
        <button
          @click="emit('close')"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-lg cursor-pointer"
        >
          ✕
        </button>

        <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Create an Account</h2>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-gray-600 mb-1">Email</label>
            <input
              v-model="email"
              type="email"
              required
              placeholder="Enter your email"
              class="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm outline-none focus:border-[#ee4d2d]"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-600 mb-1">Password</label>
            <input
              v-model="password"
              type="password"
              required
              placeholder="Create password"
              class="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm outline-none focus:border-[#ee4d2d]"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-600 mb-1">Confirm Password</label>
            <input
              v-model="confirmPassword"
              type="password"
              required
              placeholder="Confirm password"
              class="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm outline-none focus:border-[#ee4d2d]"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-[#ee4d2d] hover:bg-[#d73d1f] text-white py-2.5 rounded-sm font-semibold transition cursor-pointer mt-2"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  </Teleport>
</template>
