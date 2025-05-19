<template>
  <div class="under-construction">
    <div class="under-construction__container">
      <h1 class="under-construction__title">Сайт находится в разработке</h1>
      <p class="under-construction__text">Мы работаем над улучшением нашего сайта. Скоро мы вернемся с обновленной версией!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.under-construction {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(257.41deg, rgba(90, 51, 98, 0.2) -4.79%, rgba(31, 24, 33, 0.2) 86.4%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  &__container {
    text-align: center;
    padding: 2rem;
    max-width: 600px;
  }

  &__title {
    font-size: 2.5rem;
    color: #fff;
    margin-bottom: 1rem;
    font-family: 'Alegreya-Medium';
  }

  &__text {
    font-size: 1.2rem;
    color: #eee0f1;
    line-height: 1.6;
  }
}
</style> 