<script lang="ts" setup>
import LoginModal from './LoginModal.vue';
import { ref } from 'vue';


const isLoginModalOpen = ref(false);
</script>

<template>
  <nav class="navbar">
    <div class="navbar__container container">
      <div class="navbar__wrapper">
        <div class="navbar__left">
          <router-link to="/" class="navbar__brand">
            <img src="../assets/images/main-logo.svg" alt="Logo" class="navbar__logo" />
          </router-link>
          <div class="navbar__socials">
            <div class="navbar__socials-btn"><i class="fab fa-vk"></i></div>
            <div class="navbar__socials-btn"><i class="fab fa-telegram-plane"></i></div>
          </div>
        </div>
        <div class="navbar__center">
          <ul class="navbar__list">
            <li class="navbar__list-item"><router-link to="/tariffs" class="navbar__list-link">О клубе</router-link>
            </li>
            <li class="navbar__list-item"><router-link to="/tariffs" class="navbar__list-link">Тарифы</router-link></li>
            <router-link to="/events" class="navbar__list-item navbar__list-wings">
              <img src="../assets/icons/left-wing-icon.svg" alt="" />
              <div href="" class="navbar__list-link">К приключениям</div>
              <img src="../assets/icons/right-wing-icon.svg" alt="" />
            </router-link>
            <li class="navbar__list-item"><router-link to="/news" class="navbar__list-link">Новости</router-link></li>
            <li class="navbar__list-item"><router-link to="/contacts" class="navbar__list-link">Контакты</router-link>
            </li>
          </ul>
        </div>
        <div class="navbar__right">
          <div class="navbar__right-btn" @click="isLoginModalOpen = true">
            <i class="fas fa-user-circle"></i>
            Войти
          </div>
          <div class="navbar__burger">
            <img src="../assets/images/burger.svg" alt="">
          </div>
        </div>

      </div>
    </div>
  </nav>
  <LoginModal :isOpen="isLoginModalOpen" @close="isLoginModalOpen = false" />
</template>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background: linear-gradient(257.41deg, rgba(90, 51, 98, 0.2) -4.79%, rgba(31, 24, 33, 0.2) 86.4%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 99;
}

.navbar__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar__container {
  max-width: 1180px;
  width: 100%;
  margin: 0 auto;
}

.navbar__left {
  display: flex;
  align-items: center;
  gap: 10px;

  @media(max-width: 375px) {

    gap: 5px;
  }
}

.navbar__socials {
  display: flex;
  gap: 10px;
  align-items: center;

  @media(max-width: 375px) {
    flex-direction: column;
    gap: 3px;
  }

  .navbar__socials-btn {
    padding: 5px 10px;
    background: #ff7e7e0f;



    i {
      color: #742628;
      font-size: 20px;

      @media(max-width: 375px) {
        font-size: 16px;
      }
    }
  }
}

.navbar__center {


  .navbar__list {
    display: flex;
    align-items: center;
    gap: 36.5px;

    .navbar__list-wings {
      position: relative;

      img {
        position: absolute;

        &:nth-of-type(1) {
          left: -24px;
          top: -6px;
        }

        &:nth-of-type(2) {
          right: -24px;
          top: -6px;
        }
      }
    }

    .navbar__list-link {
      font-family: 'Alegreya-Medium';
      font-weight: 500;
      font-size: 22px;
      color: #fff;
      transition: all 0.4s ease;

      &:hover {
        color: var(--01-primary-color-main, #86489c);
      }
    }
  }

  @media (max-width: 1024px) {
    display: none;
  }
}

.navbar__right {
  display: flex;
  align-items: center;
  gap: 9px;
}

.navbar__right-btn {
  background: var(--plate-03,
      linear-gradient(114.17deg,
        rgba(54, 38, 38, 0.3) 0%,
        rgba(34, 27, 36, 0.3) 50%,
        rgba(54, 38, 38, 0.3) 100%));
  border-radius: 5px;
  padding: 12px 24px 12px 20px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;

  position: relative;
  color: #fff;

  @media (max-width: 1024px) {
    padding: 11.5px 24px 8px 15.5px;
  }

  i {
    color: var(--01-primary-color-main, #86489c);
    font-size: 18px;
  }
}

.navbar__burger {
  width: 40px;
  height: 40px;
  background: var(--gradient-1,
      linear-gradient(205.07deg,
        rgba(87, 27, 109, 0.1) 0%,
        rgba(210, 60, 72, 0.1) 100%));
  border-radius: 4px;


  align-items: center;
  justify-content: center;
  display: none;

  @media (max-width: 1024px) {
    display: flex;
  }
}
</style>
