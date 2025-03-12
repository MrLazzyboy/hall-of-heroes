<script setup lang="ts">
</script>

<template>
  <div class="user__nav">
    <ul class="user__nav-list">
      <li class="user__nav-item">
        <router-link :to="{ name: 'user-profile' }" class="user__nav-link" active-class="active">
          <img src="./images/user.svg" alt=""> Профиль
        </router-link>
      </li>
      <li class="user__nav-item">
        <router-link :to="{ name: 'user-events' }" class="user__nav-link" active-class="active">
          <img src="./images/event.svg" alt=""> Мои события
        </router-link>
      </li>
      <li class="user__nav-item">
        <router-link :to="{ name: 'user-notifications' }" class="user__nav-link" active-class="active">
          <img src="./images/notifs.svg" alt=""> Уведомления
        </router-link>
      </li>
      <li class="user__nav-item">
        <router-link :to="{ name: 'user-favourites' }" class="user__nav-link" active-class="active">
          <img src="./images/star.svg" alt=""> Избранные мастера
        </router-link>
      </li>
      <li class="user__nav-item">
        <router-link :to="{ name: 'user-settings' }" class="user__nav-link" active-class="active">
          <img src="./images/settings.svg" alt=""> Настройки
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.user__nav {
  max-width: 280px;

  @media (max-width: 768px) {
    display: none;
  }

  .user__nav-list {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .user__nav-link {
      color: #eee0f1;
      display: flex;
      gap: 16px;
      align-items: center;
      font-size: 20px;
      padding: 18px 22px;
      width: 100%;
      background: #18171e;
      border-radius: 10px;
      transition: background 0.3s ease-in-out;

      &.active {
        background: #422748;
      }
    }
  }
}
</style>
