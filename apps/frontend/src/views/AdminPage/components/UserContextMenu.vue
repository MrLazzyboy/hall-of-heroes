<template>
  <div class="context-menu">
    <ul class="context-menu__list">
      <li class="context-menu__item" @click="changeTo('master')">
        <div class="context-menu__icon context-menu__icon--master">
          <svg class="context-menu__svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M12,2A9,9 0 0,0 3,11C3,14.03 4.53,16.82 7,18.47V22H9V19H11V22H13V19H15V22H17V18.46C19.47,16.81 21,14 21,11A9,9 0 0,0 12,2M12,8C13.1,8 14,8.9 14,10C14,11.1 13.1,12 12,12C10.9,12 10,11.1 10,10C10,8.9 10.9,8 12,8M17,15.38C15.91,16.5 14.03,17.25 12,17.25C9.97,17.25 8.09,16.5 7,15.38C7.32,13.7 9.5,12.5 12,12.5C14.5,12.5 16.68,13.7 17,15.38Z" />
          </svg>
        </div>
        <span class="context-menu__text">
          Назначить <span class="context-menu__highlight context-menu__highlight--master">мастером</span>
        </span>
      </li>

      <li class="context-menu__item" @click="changeTo('admin')">
        <div class="context-menu__icon context-menu__icon--admin">
          <svg class="context-menu__svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M12,2L15.09,8.26L22,9.27L17,14.14L18.18,21.02L12,17.77L5.82,21.02L7,14.14L2,9.27L8.91,8.26L12,2M12,4.1L9.66,8.58L4.62,9.33L8.31,12.9L7.4,17.88L12,15.47L16.6,17.88L15.69,12.9L19.38,9.33L14.34,8.58L12,4.1Z" />
          </svg>
        </div>
        <span class="context-menu__text">
          Назначить <span class="context-menu__highlight context-menu__highlight--admin">админом</span>
        </span>
      </li>

      <li class="context-menu__item" @click="changeTo('player')">
        <div class="context-menu__icon context-menu__icon--player">
          <svg class="context-menu__svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22A10,10 0 0,0 22,12C22,6.47 17.53,2 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M16.18,7.76L15.12,6.7L11,10.83L8.88,8.7L7.82,9.76L11,12.94L16.18,7.76Z" />
          </svg>
        </div>
        <span class="context-menu__text">
          Разжаловать в <span class="context-menu__highlight context-menu__highlight--player">игроки</span>
        </span>
      </li>

      <li class="context-menu__item">
        <div class="context-menu__icon context-menu__icon--edit">
          <svg class="context-menu__svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
          </svg>
        </div>
        <span class="context-menu__text">
          Редактировать профиль
        </span>
      </li>

      <li @click="deleteUser" class="context-menu__item">
        <div class="context-menu__icon context-menu__icon--delete">
          <svg class="context-menu__svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
          </svg>
        </div>
        <span class="context-menu__text">
          <span class="context-menu__highlight context-menu__highlight--delete">Удалить профиль</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>

import { createAdminService } from '@/services/adminService'
import { useToast } from 'vue-toastification'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const toast = useToast()

const changeTo = (role) => {

  createAdminService().changeRole({
    id: props.id,
    role
  })
    .then((response) => {
      toast.success(response.message || 'Роль успешно изменена')
    })
    .catch((error) => {
      toast.error(error.data.error || 'Ошибка при изменении роли:')
    })
}

const deleteUser = () => {
  createAdminService().deleteUser(props.id)
    .then((response) => {
      toast.success(response.message || 'Пользователь успешно удалён')
    })
    .catch((error) => {
      toast.error(error.data.error || 'Ошибка при удалении пользователя:')
    })
}
</script>

<style scoped>
/* BEM-style CSS for the context menu */
.context-menu {
  background-color: #121212;
  border-radius: 12px;
  width: 280px;
  padding: 8px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  font-family: 'Arial', sans-serif;
}

.context-menu__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.context-menu__item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.context-menu__item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.context-menu__icon {
  width: 24px;
  height: 24px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.context-menu__svg {
  width: 24px;
  height: 24px;
  fill: currentColor;
}

.context-menu__icon--master {
  color: #4caf50;
}

.context-menu__icon--admin {
  color: #f44336;
}

.context-menu__icon--player {
  color: #2196f3;
}

.context-menu__icon--edit {
  color: #ce93d8;
}

.context-menu__icon--delete {
  color: #f44336;
}

.context-menu__text {
  color: #ffffff;
  font-size: 16px;
}

.context-menu__highlight {
  font-weight: normal;
}

.context-menu__highlight--master {
  color: #4caf50;
}

.context-menu__highlight--admin {
  color: #f44336;
}

.context-menu__highlight--player {
  color: #2196f3;
}

.context-menu__highlight--delete {
  color: #f44336;
}
</style>
