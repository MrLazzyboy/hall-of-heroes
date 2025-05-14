<script lang="ts" setup></script>
<template>
    <div class="welcome">
        <img class="welcome__bg" src="./images/bg.png" alt="">
        <div class="welcome__container container">
            <h3 class="welcome__title">Добро пожаловать в чертоги, Герой!</h3>
            <h4 class="welcome__subtitle">Регистрация прошла успешно. Автоматическая переадресация…</h4>
            <div class="welcome__btn">К приключениям!</div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.welcome {
    padding-top: 151px;
    margin-bottom: 81px;
    position: relative;
    min-height: 100vh;
    height: 100%;
    display: flex;
    justify-content: center;


    .welcome__bg {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: -1;
        object-fit: cover;
    }

}
</style>
