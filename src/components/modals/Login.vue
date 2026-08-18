<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal-card">
          <!-- Close Button -->
          <button class="close-btn" @click="closeModal" aria-label="Close modal">&times;</button>

          <!-- Header -->
          <div class="modal-header">
            <h3>Welcome Back</h3>
            <p>Log in to track product prices and get instant alerts.</p>
          </div>

          <!-- Body with LINE Button -->
          <div class="modal-body">
            <LineLoginButton />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import LineLoginButton from '../LineLoginButton.vue';

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-card {
  background: #ffffff;
  padding: 32px 24px;
  border-radius: 16px;
  width: 90%;
  max-width: 360px;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  color: #888;
  cursor: pointer;
  line-height: 1;
}

.close-btn:hover {
  color: #333;
}

.modal-header h3 {
  margin: 0 0 8px 0;
  font-size: 20px;
  color: #111;
}

.modal-header p {
  margin: 0 0 24px 0;
  font-size: 14px;
  color: #666;
}

.modal-body {
  width: 100%;
  display: flex;
  justify-content: center;
}

/* Transition Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
