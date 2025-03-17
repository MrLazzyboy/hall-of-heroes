<template>
  <HeaderComponent />
  <main class="main-content">
    <RouterView />
  </main>
  <FooterComponent />
  <Demo/>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
// import DemoPage from './views/Demo/DemoPage.vue';
</script>


<style lang=scss>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  flex: 1 1 auto;
  padding: 16px;
  overflow: auto;
  background-color: rgba(29, 29, 29, 1);
}
</style>
