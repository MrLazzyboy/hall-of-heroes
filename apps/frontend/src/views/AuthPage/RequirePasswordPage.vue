<script setup lang="ts"></script>
<template>
    <div class="require">
        <img class="require__bg" src="./images/bg1.png" alt="">
        <div class="require__container container">
            <h3 class="require__title">На вашу почту отправлено письмо</h3>
            <h4 class="require__subtitle">Перейдите по ссылке из письма, чтобы подтвердить аккаунт</h4>
        </div>
    </div>
</template>
<style lang="scss" setup>
.require {
    padding-top: 151px;
    margin-bottom: 81px;
    position: relative;
    min-height: 100vh;
    height: 100%;
    display: flex;
    justify-content: center;

    .require__bg {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: -1;
        object-fit: cover;
    }

    .require__container {
        padding: 100px 0;

        .require__title {
            background: linear-gradient(90deg, rgba(203, 190, 205, 1) 0%, rgba(255, 255, 255, 1) 46.5%, rgba(203, 190, 205, 1) 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-align: center;
            font-size: 56px;
            font-family: 'Alegreya-Medium';
            font-weight: 700;
            margin-bottom: 12px;
            margin-bottom: 30px;

            font-size: calc(32px + 24 * (100vw / 1920));

            @media (max-width: 320px) {
                font-size: calc(32px + (24 + 24 * 0.7) * ((100vw - 320px) / 1920));
            }
        }

        .require__subtitle {
            color: #d23c48;

            text-align: center;
            font-weight: 700;

            font-size: calc(18px + 8 * (100vw / 1920));

            @media (max-width: 320px) {
                font-size: calc(18px + (8 + 8 * 0.7) * ((100vw - 320px) / 1920));
            }
        }
    }
}
</style>