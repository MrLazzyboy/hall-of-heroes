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
import { useUserGlobal } from '@/stores/userGlobal'
import { onMounted } from 'vue'
import { isAuthenticated } from '@/services/authService'

const userStore = useUserGlobal()


onMounted(() => {
  if (isAuthenticated()) {
    userStore.setLoggedIn(true)
    userStore.initUserGlobal()
  } else {
    userStore.setLoggedIn(false)
  }
})
</script>


<style lang=scss>
.main-content {
  min-height: 100vh;
  height: 100%;
}
</style>
