<script setup>

import Profile from "./components/Profile.vue";
import Inventory from "./components/Inventory.vue";
import Footer from "./components/Footer.vue";
import { ModalsContainer } from 'vue-final-modal'

</script>

<template>
  <div class="p-lg-4">
    <div class="main">
      <Profile class="g1"/>
      <inventory class="g2"/>
    </div>
    <div class="d-flex justify-content-center">
      <Footer/>
    </div>
  </div>
  <ModalsContainer />

</template>

<style scoped>
.main{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  height: 700px;
  gap: 10px;
  justify-items: center;
}
.g1{
  grid-column: span 1;
}
.g2{
  grid-column: span 3;
}
</style>
