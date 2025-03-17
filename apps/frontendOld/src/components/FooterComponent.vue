<!-- Footer.vue -->
<template>
  <footer class="footer">
    <ul class="footer-list">
      <li class="footer-item">О нас</li>
      <li class="footer-item">Политика конфиденциальности</li>
      <li class="footer-item">Контакты</li>
    </ul>
    <p class="copyright">&copy; 2024 Чертоги Героев. Все права защищены.</p>
  </footer>
</template>

<script lang="ts" setup>
// На данный момент логика отсутствует, можно добавить позже
</script>

<style scoped>
.footer {
  flex: 0 0 auto;
  background: #2b2b2b;
  color: white;
  text-align: center;
  padding: 20px 0;
}

.footer-list {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin-bottom: 10px;
}

.footer-item {
  margin: 0 15px;
  font-size: 1rem;
  cursor: pointer;
}

.copyright {
  font-size: 0.8rem;
}
</style>
