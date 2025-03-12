<script setup lang="ts">
import EventsCard from './components/EventsCard.vue';
import EventsDataManager from './components/EventsDataManager.vue';
import EventsFilter from './components/EventsFilter.vue';



</script>
<template>
    <div class="club__events">
        <div class="club__events-container container">
            <h3 class="club__events-title">Все игры и события клуба</h3>
            <div class="club__events-row">
                <div class="club__events-intro">
                    <div class="club__intro-item">
                        <img src="./images/calendar.svg" alt="">
                        <div class="club__intro-txt">Используйте <span>Стрелки <></span> для навигации по календарю
                        </div>
                    </div>
                    <div class="club__intro-item">
                        <img src="./images/filter.svg" alt="">
                        <div class="club__intro-txt">Выбирайте <span>Фильтры</span> для подбора подходящего События
                        </div>
                    </div>
                    <div class="club__intro-item">
                        <img src="./images/chat.svg" alt="">
                        <div class="club__intro-txt">Нажимайте на <span>Событие</span> для отображения подробной
                            информации</div>
                    </div>
                    <div class="club__intro-item">
                        <img src="./images/heart.svg" alt="">
                        <div class="club__intro-txt">Обратите внимание на тип <span>События </span> — Игровая сессия
                            или Мероприятие</div>
                    </div>
                    <div class="club__intro-item">
                        <img src="./images/edit.svg" alt="">
                        <div class="club__intro-txt">Кнопка <span>Записаться</span> добавит вас в список участников
                            События,
                            если есть места</div>
                    </div>
                    <div class="club__intro-item">
                        <img src="./images/watch.svg" alt="">
                        <div class="club__intro-txt">Кнопка <span>Ожидать</span> заявит о желании участвовать в Событии,
                            если появятся места</div>
                    </div>
                </div>
                <div class="club__events-help">
                    <div class="club__help-title">Теряетесь?</div>
                    <div class="club__help-subtitle">Жмите кнопку снизу, и мы поможем подобрать вам игру!</div>
                    <div class="club__help-btn"> Помогите, я новичок!</div>
                </div>
            </div>

            <EventsDataManager />

            <div class="club__events-content">
                <EventsFilter />
                <div class="club__events-cards">
                    <EventsCard></EventsCard>
                    <EventsCard></EventsCard>
                    <EventsCard></EventsCard>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.club__events {
    padding: 150px 0;

    .club__events-title {
        color: #ffffff;
        font-size: 46px;
        font-family: 'Alegreya-Medium';
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 40px;

        font-size: calc(32px + 14 * (100vw / 1920));

        @media (max-width: 320px) {
            font-size: calc(32px + (14 + 14 * 0.7) * ((100vw - 320px) / 1920));
        }
    }

    .club__events-row {
        display: flex;
        gap: 20px;

        @media (max-width: 1000px) {
            flex-direction: column;
        }

        .club__events-intro {
            background: var(--plate-03,
                    linear-gradient(114.17deg,
                        rgba(54, 38, 38, 0.3) 0%,
                        rgba(34, 27, 36, 0.3) 50%,
                        rgba(54, 38, 38, 0.3) 100%));
            border-radius: 15px;
            border-style: solid;
            border-color: var(--based-stroke, #18171e);
            border-width: 1px;
            padding: 28px;
            max-width: 780px;
            width: 100%;

            display: flex;
            flex-direction: column;
            gap: 16px;

            @media (max-width: 1000px) {
                max-width: 100%;
            }

            .club__intro-item {
                display: flex;
                gap: 16px;

                .club__intro-txt {
                    color: #ffffff;
                    font-family: var(--pc-p3-font-family, "Alegreya-Regular");
                    font-size: var(--pc-p3-font-size, 20px);

                    span {
                        color: var(--01-primary-color-5, #d5b0e4);
                        font-family: var(--pc-p3-font-family, "Alegreya-Bold");
                        font-size: var(--pc-p3-font-size, 20px);
                    }
                }
            }
        }

        .club__events-help {
            max-width: 380px;
            width: 100%;
            padding: 54px 0;
            background: radial-gradient(closest-side,
                    rgba(44, 38, 47, 0.3) 0%,
                    rgba(21, 21, 22, 0.3) 100%);
            border-radius: 15px;
            border-style: solid;
            border-color: var(--based-stroke, #18171e);
            border-width: 1px;

            display: flex;
            flex-direction: column;
            align-items: center;


            @media (max-width: 1000px) {
                max-width: 100%;
            }

            .club__help-title {
                color: var(--01-primary-color-5, #d5b0e4);
                text-align: center;
                font-size: var(--pc-h2-font-size, 46px);
                margin-bottom: 16px;
            }

            .club__help-subtitle {
                color: #ffffff;
                text-align: center;
                font-size: var(--pc-p3-font-size, 20px);
                margin-bottom: 24px;
            }

            .club__help-btn {
                padding: 15px 24px;
                background: var(--01-primary-color-3, #6a3b7b);
                border-radius: 10px;
                color: var(--04-text-main, #eee0f1);
                text-align: center;
                font-size: var(--pc-button-1-font-size, 20px);
            }
        }
    }
}

.club__events-content {
    display: flex;
    gap: 20px;
    width: 100%;
    position: relative;

    .club__events-cards {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
    }
}
</style>