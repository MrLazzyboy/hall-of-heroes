<script setup lang="ts">
defineProps<{
    type: 'success' | 'warning' | 'error' | 'info';
    title: string;
    message: string;
}>();
</script>

<template>
    <div :class="['notifications-item', type]">
      
        <p class="notifications-message" v-html="message"></p>
    </div>
</template>

<style lang="scss" scoped>
.notifications {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 500px;
}

.notifications-item {
    padding: 31px;
    border-radius: 8px;
    font-size: 16px;
    color: #eee;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    gap: 10px;
}

.notifications-title {
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 22px;
    font-size: calc(16px + 6 * (100vw / 1920));

    @media (max-width: 320px) {
        font-size: calc(16px + (6 + 6 * 0.7) * ((100vw - 320px) / 1920));
    }
}

.notifications-message {

    font-size: 22px;
}

/* Стили для выделения имен */
.player-name {
    color: #335781;
    font-weight: bold;
    text-shadow: 0 0 5px rgba(74, 178, 255, 0.5);
    font-size: 22px;
    font-size: calc(16px + 6 * (100vw / 1920));

    @media (max-width: 320px) {
        font-size: calc(16px + (6 + 6 * 0.7) * ((100vw - 320px) / 1920));
    }
}

/* Цвета для разных типов */
.success {
    background: linear-gradient(114.17deg, rgba(54, 38, 38, 0.3) 0%, rgba(34, 27, 36, 0.3) 50%, rgba(54, 38, 38, 0.3) 100%);
    border-left: 5px solid #4a7548;
}

.warning {
    background: linear-gradient(114.17deg, rgba(54, 38, 38, 0.3) 0%, rgba(34, 27, 36, 0.3) 50%, rgba(54, 38, 38, 0.3) 100%);
    border-left: 5px solid #886535;
}

.error {
    background: linear-gradient(114.17deg, rgba(54, 38, 38, 0.3) 0%, rgba(34, 27, 36, 0.3) 50%, rgba(54, 38, 38, 0.3) 100%);
    border-left: 5px solid #d23c48;
}

.info {
    background: linear-gradient(114.17deg, rgba(54, 38, 38, 0.3) 0%, rgba(34, 27, 36, 0.3) 50%, rgba(54, 38, 38, 0.3) 100%);
    border-left: 5px solid #3585e3;
}
</style>
