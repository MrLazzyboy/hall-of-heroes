<script lang="ts" setup>

</script>

<template>
    <div class="include">
        <div class="include__container container">
            <h3 class="include__title">
                Что входит в стоимость
            </h3>
            <div class="include__grid">
                <div class="include__grid-item">
                    <img src="../images/1.png" alt="">
                    <div class="include__grid-txt">
                        Полный доступ к выбранной игровой комнате с тематическим оформлением
                        и управляемым освещением
                    </div>
                </div>
                <div class="include__grid-item">
                    <img src="../images/2.png" alt="">
                    <div class="include__grid-txt">
                        Предоставление любого игрового инвентаря:
                        дайсы, миниатюры, маты, ширмы для Мастеров и т.д.
                    </div>
                </div>
                <div class="include__grid-item">
                    <img src="../images/3.png" alt="">
                    <div class="include__grid-txt">
                        Доступ к аудио- и видеосистемам для создания игровой атмосферы
                    </div>
                </div>
                <div class="include__grid-item">
                    <img src="../images/4.png" alt="">
                    <div class="include__grid-txt">
                        Вкусный черный и зеленый чай, ароматный кофе и разнообразные снеки для
                        всех гостей
                    </div>
                </div>
                <div class="include__grid-item">
                    <img src="../images/5.png" alt="">
                    <div class="include__grid-txt">
                        Доступ в комфортную зону отдыха на все время посещение клуба
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<style lang="scss" scoped>
.include {
    margin-top: 81px;
    padding: 0 10px;

    .include__title {
        color: #ffffff;
        font-size: 46px;
        font-family: 'Alegreya-Medium';
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 40px;

        font-size: calc(20px + 26 * (100vw / 1920));




        @media (max-width: 320px) {
            font-size: calc(20px + (26 + 26 * 0.7) * ((100vw - 320px) / 1920));
        }
    }

    .include__grid {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;

        @media (max-width: 1000px) {
            flex-direction: column;
        }

        .include__grid-item {
            max-width: 380px;
            background: var(--plate-01,
                    linear-gradient(257.41deg,
                        rgba(90, 51, 98, 0.2) 0%,
                        rgba(31, 24, 33, 0.2) 100%));
            border-radius: 10px;
            position: relative;
            padding: 50px 14px;
            overflow: hidden;

            display: flex;
            justify-content: center;
            align-items: center;



            @media (max-width: 1180px) {
                max-width: 320px !important;
            }

            @media (max-width: 1000px) {
                max-width: 100% !important;
            }


            img {
                position: absolute;
                width: 100%;
                height: 100%;
                object-fit: cover;
                z-index: -1;
            }

            &:nth-of-type(1),
            &:nth-of-type(2) {
                min-width: 580px !important;

                @media (max-width: 1180px) {
                    min-width: 480px !important;
                }

                @media (max-width: 1000px) {
                    min-width: 100% !important;
                }
            }

            .include__grid-txt {
                max-width: 517px;
                width: 100%;
                color: #eee0f1;
                font-size: 22px;
                text-align: center;

                font-size: calc(14px + 8 * (100vw / 1920));

                @media (max-width: 1000px) {
                    max-width: 100% !important;
                }


                @media (max-width: 320px) {
                    font-size: calc(14px + (8 + 8 * 0.7) * ((100vw - 320px) / 1920));
                }
            }
        }


    }
}
</style>
