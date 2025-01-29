<script setup>
import {ref} from "vue";

const isDarkTheme = ref(true)
const mainColor = ref('')
const gradient = ref('')
const custom = ref('')
const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value
  mainColor.value = isDarkTheme.value ? '#181818' : '#ffffff'
  gradient.value = isDarkTheme.value ? 'linear-gradient(90deg, #3C3C3C 0%, #444444 51.04%, #333333 100%)' : 'linear-gradient(to right, #3c3b3f, #605c3c)'
  custom.value = isDarkTheme.value?'#262626':'#a19e9e'
  document.documentElement.style.setProperty('--main-color', mainColor.value);
  document.documentElement.style.setProperty('--linear-color', gradient.value);
  document.documentElement.style.setProperty('--custom-color', custom.value);
}
</script>

<template>
  <div style="width: 236px; border: 1px solid #4D4D4D;" class="p-3 bg-dark-custom rounded-4 h-100 position-relative">
    <img class="mb-3 w-100" src="/blank-profile-picturewebp.webp" alt="">
    <button
        @click="toggleTheme"
        class="theme-toggle-btn"
        :title="isDarkTheme ? 'Включить светлую тему' : 'Включить тёмную тему'"
    >
      {{ isDarkTheme ? '🌑' : '☀️' }}
    </button>
    <ul class="m-0 p-0 d-flex flex-column justify-content-center align-items-center">
      <li class="w-100 bg-custom rounded-2 p-2 mb-3"></li>
      <li class="w-100 bg-custom rounded-2 p-2 mb-3"></li>
      <li class="w-100 bg-custom rounded-2 p-2 mb-3"></li>
      <li class="w-100 bg-custom rounded-2 p-2 mb-3"></li>
      <li class="w-100 bg-custom rounded-2 p-2 mb-3"></li>
    </ul>
  </div>
</template>

<style>
:root {
  --main-color: #181818;
  --linear-color: linear-gradient(90deg, #3C3C3C 0%, #444444 51.04%, #333333 100%);
  --custom-color: #262626;
}

body {
  background: var(--main-color) !important;
}

.bg-custom {
  background: var(--linear-color) !important;
}

.bg-dark-custom {
  background: var(--custom-color) !important;
}
.theme-toggle-btn{
  border: none;
  background: transparent;
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>