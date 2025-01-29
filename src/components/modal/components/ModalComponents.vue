<template>
  <div class="d-flex flex-column justify-content-center align-items-center gap-5">
    <img :src="image" alt="Modal Image" class="modal-image" />
    <ul class="m-0 p-0 d-flex flex-column">
      <li class="w-full bg-custom rounded-2 p-2 mb-3"></li>
      <li class="w-full bg-custom rounded-2 p-2 mb-3"></li>
      <li class="w-full bg-custom rounded-2 p-2 mb-3"></li>
      <li class="w-full bg-custom rounded-2 p-2 mb-3"></li>
      <li class="w-full bg-custom rounded-2 p-2 mb-3"></li>
    </ul>
    <div v-if="!showInput" class="delete-section">
      <button @click="showInput = true" class="delete-button">Удалить</button>
    </div>

    <div v-else class="input-section">
      <input
          v-model.number="inputValue"
          type="number"
          placeholder="Введите количество"
          class="number-input"
          min="0"
      />
      <div class="d-flex gap-3">
        <button @click="handleCancel" class="cancel-button">Отмена</button>
        <button @click="handleConfirm" class="confirm-button">Подтвердить</button>
      </div>
      <p v-if="error" class="error-message">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  closeModal: {
    type: Function,
    required: true
  }
});

const emit = defineEmits(['confirm-delete']);

const showInput = ref(false);
const inputValue = ref(null);
const error = ref('');
const handleCancel = () => {
  showInput.value = false;
  inputValue.value = null;
  error.value = '';
};
const handleConfirm = () => {
  if (inputValue.value === null || inputValue.value === '') {
    error.value = 'Пожалуйста, введите число.';
    return;
  }
  if (inputValue.value > props.count) {
    error.value = `Число не должно превышать ${props.count}.`;
    return;
  }
  emit('confirm-delete', inputValue.value);
  props.closeModal()
};
</script>

<style scoped>

.w-full{
  width: 300px;
}
.modal-image {
  width: 120px;
  height: 120px;
}

.delete-section,
.input-section {
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.delete-button,
.cancel-button,
.confirm-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.delete-button {
  background-color: #FA7272;
  color: white;
  width: 300px;
}
.delete-button:hover {
  background-color: #fa6969;
  color: white;
}

.cancel-button {
  background-color: #f0f0f0;
  color: #333;
}
.cancel-button:hover {
  background-color: #f0f0f0;
  color: #333;
}
.confirm-button {
  background-color: #FA7272;
  color: white;
}

.number-input {
  padding: 0.5rem;
  border: 1px solid #4D4D4D;
  border-radius: 8px;
  width: 80%;
  background: #262626;
  color: white;
}

.error-message {
  color: #ff4d4f;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}
</style>