<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
<p class="text-primary">привет</p>
</template>

<style scoped>

</style>
