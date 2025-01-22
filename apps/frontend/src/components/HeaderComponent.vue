<!-- Header.vue -->
<template>
  <header class="header">
    <div class="nav-wrapper">
      <!-- Логотип с иконками -->
      <div class="logo-wrapper">
        <router-link to="/" class="logo">
          <img src="../assets/images/main-logo.svg" alt="Чертоги Героев" class="logo-img" />
        </router-link>
        <n-space class="social-icons" align="center">
          <a href="https://vk.com" target="_blank" class="social-link">
            <img src="../assets/icons/vk-icon.svg" alt="VK" class="social-icon" />
          </a>
          <a href="https://telegram.org" target="_blank" class="social-link">
            <img src="../assets/icons/tg-icon.svg" alt="Telegram" class="social-icon" />
          </a>
        </n-space>
      </div>

      <!-- Навигация -->
      <n-space class="nav-items" justify="center" align="center">
        <router-link to="/" exact class="nav-item">О клубе</router-link>
        <router-link to="/tariffs" class="nav-item">Тарифы</router-link>
        <router-link to="/calendar" class="nav-item">К приключениям!</router-link>
        <router-link to="/news" class="nav-item">Новости</router-link>
        <router-link to="/contacts" class="nav-item">Контакты</router-link>
      </n-space>

      <!-- Кнопка Войти -->
      <n-button class="login-button" text @click="goToLogin">
        <n-icon>
          <img src="../assets/icons/user-icon.svg" alt="Войти" class="login-icon" />
        </n-icon>
        Войти
      </n-button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { NSpace, NButton, NIcon } from 'naive-ui'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  router.push({ name: 'login' })
}
</script>

<style scoped lang=scss>

.header {
  // position: sticky;
  // top: 0;
  // left: 0;
  // width: 100%;
  // z-index: 1000;
  flex: 0 0 auto;
  background: $main-color-5;
  padding: 10px 40px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}

.nav-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-wrapper {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 50px;
  margin-right: 20px;
}

.social-icons {
  display: flex;
  align-items: center;
  gap: 10px;
}

.social-link {
  display: inline-block;
}

.social-icon {
  height: 24px;
  width: 24px;
}

.nav-items {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.nav-item {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  transition: color 0.3s;

  &:hover {
    color: $main-color;
  }

  &.router-link-active {
    color: $main-color;
  }
}

.login-button {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: transparent;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #ffffff;
  }
}

.login-icon {
  height: 24px;
  width: 24px;
}
</style>
