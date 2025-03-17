<template>
  <HeaderComponent />
  <main class="main-content">
    <RouterView />
  </main>
  <FooterComponent />
  <Demo />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'


</script>


<style lang=scss>
.main-content {
  min-height: 100vh;
  height: 100%;
}
</style>
