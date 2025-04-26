<script setup lang="ts">
import Card from './components/Card.vue'

import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useUserGlobal } from '@/stores/userGlobal'
import { createUserService } from '@/services'
const events = ref([])
const toast = useToast()
const userStore = useUserGlobal()


onMounted(() => {
  const userService = createUserService()
  userService.getUserEvents(userStore.user.id)
    .then((response) => {
      events.value = response.events
    })
    .catch((error) => {
      toast.error(error.message)
    })
})
</script>
<template>
  <div class="events">
    <Card v-for="event in events" :key="event" :event="event" />
  </div>
</template>
<style lang="scss" scoped></style>
