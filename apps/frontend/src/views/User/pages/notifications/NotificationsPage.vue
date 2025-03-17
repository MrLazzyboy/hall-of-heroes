<script setup lang="ts">
import Card from './components/Card.vue';

</script>
<template>
    <div class="notifications">
        <div class="notifications__active">
            <Card type="success" title="Вы записаны" message="Вы успешно записаны на событие!" />
            <Card type="warning" title="Название отменено" message="Игрок <span class='player-name'>TAKOЙTO</span> записался на событие <span class='player-name'>ТАКОЕТО</span>!" />
            <Card type="error" title="Неодобрено" message="Событие не одобрено и перемещено в черновики." />
            <Card type="info" title="Новое событие" message="Мастер добавил новое событие!" />
        </div>
    </div>
</template>
<style lang="scss" scoped>
.notifications {

.notifications__active{
    display: flex;
    flex-direction: column;
    gap: 20px;
}

}
</style>