<script setup lang="ts">
import Card from './components/Card.vue'
import { onMounted, ref } from 'vue'
import { useUserGlobal } from '@/stores/userGlobal'
import { useToast } from 'vue-toastification'
import { createUserService } from '@/services'

const userStore = useUserGlobal()
const notifications = ref([])
const toast = useToast()
onMounted(() => {
  // Здесь можно добавить логику, которая будет выполняться при монтировании компонента
  const userService = createUserService()
  userService.getNotifications()
    .then((response) => {
      // Здесь можно обработать ответ от сервера
      notifications.value = response.notifications
    })
    .catch((error) => {
      // Здесь можно обработать ошибку
      toast.error(error.message)
    })
})

</script>
<template>
  <div class="notifications">
    <div class="notifications__active">
      <Card v-for="notification in notifications" :key="notification.id " :type="notification.type || 'info'"
            :title="notification.title" :message="notification.message" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.notifications {

  .notifications__active {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

}
</style>
