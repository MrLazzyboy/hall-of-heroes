<script setup lang="ts">

</script>
<template>
    <div class="mission">
        <div class="mission__container container">
            <h3 class="mission__title">Наша миссия</h3>
            <div class="mission__grid">
                <div class="mission__grid-first">
                    <div class="mission__first-txt">
                        Создать условия, объединяющие игроков любого уровня с мастерами, и погрузиться в захватывающие
                        миры приключений!
                    </div>
                </div>
                <div class="mission__grid-item">
                    <img src="../images/missions/fighters.png" alt="">
                    <div class="mission__grid-title">Объединение людей</div>
                    <div class="mission__grid-txt">Мы создали площадку, где игроки разного опыта и увлечённые мастера
                        смогут легко находить друг друга для создания уникальных игровых переживаний.</div>
                </div>
                <div class="mission__grid-item">
                    <img src="../images/missions/village.png" alt="">
                    <div class="mission__grid-title">Погружение в миры приключений</div>
                    <div class="mission__grid-txt">Обеспечиваем максимально комфортные условия и вдохновляющую
                        атмосферу, которые будут способствовать идеальному погружению</div>
                </div>
                <div class="mission__grid-item">
                    <img src="../images/missions/castle.png" alt="">
                    <div class="mission__grid-title">Развитие культуры ролевых игр</div>
                    <div class="mission__grid-txt">Повышаем уровень культуры настольно-ролевых игр, благодаря
                        объединению неравнодушных и увлечённых людей!</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.mission {
    margin-top: 66px;
}

.mission__title {
    color: #ffffff;

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

.mission__grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    .mission__grid-first {
        max-width: 580px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 60px 0;

        @media (max-width: 1200px) {
            display: none;
        }

        .mission__first-txt {
            color: var(--04-text-main, #eee0f1);
            text-align: center;
            font-family: var(--pc-p2-font-family, "Alegreya-Regular");
            font-size: var(--pc-p2-font-size, 22px);
            line-height: var(--pc-p2-line-height, 125%);
            font-weight: var(--pc-p2-font-weight, 400);
            max-width: 500px;
            width: 100%;
        }
    }

    .mission__grid-item {
        max-width: 580px;
        width: 100%;
        padding: 40px 28px;

        background: var(--plate-01,
                linear-gradient(257.41deg,
                    rgba(90, 51, 98, 0.2) 0%,
                    rgba(31, 24, 33, 0.2) 100%));
        border-radius: 10px;
        position: relative;
        overflow: hidden;

        @media (max-width: 1180px) {
            max-width: 100%;
        }

        img {
            position: absolute;
            right: 0;
            top: 0;
        }

        &:nth-of-type(4) {
            img {
                top: -40px;
                right: -20px;
            }
        }

        .mission__grid-title {
            color: #d5b0e4;
            text-align: left;
            font-family: "Alegreya-Bold";
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 26px;
            font-size: calc(22px + 10 * (100vw / 1920));

            @media (max-width: 320px) {
                font-size: calc(22px + (10 + 10 * 0.7) * ((100vw - 320px) / 1920));
            }
        }

        .mission__grid-txt {
            color: #eee0f1;
            text-align: left;
            font-family: "Alegreya-Regular";
            font-size: 20px;
            font-weight: 400;
            max-width: 486px;
            width: 100%;
            font-size: calc(16px + 4 * (100vw / 1920));

            @media (max-width: 1180px) {
                max-width: 100%;
            }

            @media (max-width: 320px) {
                font-size: calc(16px + (4 + 4 * 0.7) * ((100vw - 320px) / 1920));
            }
        }
    }
}
</style>
