<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

defineProps<{ title?: string }>()
defineEmits(['update:modelValue'])
</script>

<template>
  <VueFinalModal
      content-class="modal-content-custom"
      swipe-to-close="down"
      content-transition="vfm-slide-right"
      overlay-transition="vfm-fade"
  >
    <div class="modal-header mt-10">
      <h1 class="modal-title">{{ title }}</h1>
      <button class="close-button" @click="$emit('update:modelValue', false)">
        <span class="close-icon">×</span>
      </button>
    </div>
    <slot />
  </VueFinalModal>
</template>

<style>
.modal-content-custom {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 400px;
  padding: 1rem;
  background-color: #26262680;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-title {
  font-size: 1.25rem;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 20px;
  right: 15px;
}

.close-icon {
  font-size: 1.5rem;
  color: #fff;
  line-height: 1;
}

.modal-body {
  font-size: 1.875rem;
}
.mt-10{
  margin-top: 150px;
}
</style>