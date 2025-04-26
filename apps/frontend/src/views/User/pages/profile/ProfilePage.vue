<script setup lang="ts">
import { useUserGlobal } from '@/stores/userGlobal'
import { computed } from 'vue'
import { isoToDate } from '../../../../utils'
import avatar from './images/avatar.png'
const userStore = useUserGlobal()

const user = computed(() => userStore.user)

</script>
<template>
  <div class="profile">
    <div class="profile__top">
      <div class="profile__top-left">
        <img :src="user.avatar || avatar" alt="">
        <div class="profile__left-info">
          <div class="profile__left-login">{{ user.username }}</div>
        </div>
      </div>
      <div class="profile__top-right">
        <div class="profile__top-item">
          <div class="profile__top-label">Имя</div>
          <div class="profile__top-title">{{ user.firstName }}</div>
        </div>
        <div class="profile__top-item">
          <div class="profile__top-label">Ссылка на соц. сети</div>
          <a target="_blank" :href="user.socialLink" class="profile__top-title">{{ user.socialLink }}</a>
        </div>
        <div class="profile__top-item">
          <div class="profile__top-label">Телефон</div>
          <div class="profile__top-title">{{ user.phone }}</div>
        </div>
        <div class="profile__top-item">
          <div class="profile__top-label">EMAIL</div>
          <div class="profile__top-title">{{ user.email }}</div>
        </div>
        <div class="profile__top-item">
          <div class="profile__top-label">Дата регистрации</div>
          <div class="profile__top-title">{{ isoToDate(user.created_at) }}</div>
        </div>
      </div>
    </div>
    <div class="profile__about">
      <div class="profile__about-label">Обо мне</div>
      <div class="profile__about-txt">{{ user.profile?.bio }}</div>
    </div>
    <div class="profile__info">
      <div class="profile__info-item">
        <div class="profile__info-label">Стаж</div>
        <div class="profile__info-txt">365 дней</div>
      </div>
      <div class="profile__info-item">
        <div class="profile__info-label">Участник</div>
        <div class="profile__info-txt">{{ user.events?.length || 0 }} событий</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.profile {
  padding: 28px;
  background: var(--plate-main,
    radial-gradient(closest-side,
      rgba(44, 38, 47, 0.3) 0%,
      rgba(21, 21, 22, 0.3) 100%));
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  gap: 28px;

  @media (max-width: 600px) {
    padding: 12px;

  }


  .profile__top {
    display: flex;
    gap: 30px;

    @media (max-width: 600px) {
      flex-direction: column;
    }

    .profile__top-left {
      width: 256px;


      @media (max-width: 600px) {

        display: flex;
        width: 100%;
        gap: 12px;
      }

      img {
        object-fit: cover;

        @media (max-width: 600px) {

          max-width: 154px;
          width: 100%;

        }
      }

      .profile__left-login {
        display: none;

        @media (max-width: 600px) {
          display: flex;
          color: var(--01-primary-color-main, #86489c);
          text-align: left;
          font-size: var(--mob-h3-font-size, 22px);
        }
      }
    }

    .profile__top-right {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      @media (max-width: 600px) {
        width: 100%;
        flex-grow: 1;
        gap: 12px;
      }


      .profile__top-item {
        max-width: 245px;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 11px;

        @media (max-width: 600px) {
          flex-direction: row;
          max-width: 100%;
          gap: 16px;
        }


        .profile__top-label {
          color: #6a3b7b;
          font-size: 20px;

          font-size: calc(18px + 2 * (100vw / 1920));

          @media (max-width: 320px) {
            font-size: calc(18px + (2 + 2 * 0.7) * ((100vw - 320px) / 1920));
          }
        }

        .profile__top-title {
          color: #eee0f1;

          font-size: calc(16px + 8 * (100vw / 1920));

          @media (max-width: 320px) {
            font-size: calc(16px + (8 + 8 * 0.7) * ((100vw - 320px) / 1920));
          }
        }
      }
    }
  }

  .profile__about {
    display: flex;
    flex-direction: column;
    gap: 14px;

    .profile__about-label {
      color: #6a3b7b;
      font-size: 20px;
    }

    .profile__about-txt {
      font-size: 20px;
      color: #eee0f1;
      max-width: 800px;

      font-size: calc(16px + 4 * (100vw / 1920));

      @media (max-width: 320px) {
        font-size: calc(16px + (4 + 4 * 0.7) * ((100vw - 320px) / 1920));
      }
    }
  }

  .profile__info {
    display: flex;
    gap: 22px;

    .profile__info-item {
      padding: 16px;
      background: linear-gradient(257.41deg,
        rgba(134, 72, 156, 0.2) 0%,
        rgba(58, 58, 58, 0.2) 100%);
      border-radius: 10px;
      gap: 6px;

      .profile__info-label {
        font-size: 20px;
        color: #d5b0e4;

        font-size: calc(18px + 2 * (100vw / 1920));

        @media (max-width: 320px) {
          font-size: calc(18px + (2 + 2 * 0.7) * ((100vw - 320px) / 1920));
        }
      }

      .profile__info-txt {
        color: #eee0f1;
        font-size: calc(24px + 8 * (100vw / 1920));

        @media (max-width: 320px) {
          font-size: calc(24px + (8 + 8 * 0.7) * ((100vw - 320px) / 1920));
        }
      }
    }
  }
}
</style>
