<script lang="ts" setup>

</script>
<template>
    <div class="types">
        <div class="types__container container">
            <h3 class="types__title">Какие бывают типы игр?</h3>

            <div class="types__boxes">
                <div class="types__box">
                    <div class="types__box-top">
                        <div class="types__box-title">Нулевая сессия</div>
                        <div class="types__box-info">Около двух часов</div>
                    </div>
                    <div class="types__box-descr">Это подготовительная встреча перед началом приключения
                        (в основном длительных компаний). <br><br>

                        На этой сессии игроки создают персонажей, обсуждают ожидания от игры, выбирают правила
                        и проясняют детали предстоящего приключения. Это отличная возможность познакомиться с Мастером
                        и другими игроками. Такие встречи могут проводиться бесплатно на базе клуба или онлайн.</div>
                    <router-link :to="{
                        name: 'events'
                    }" class="types__box-link">Подобрать игру <i class="fal fa-arrow-right"></i></router-link>
                </div>
                <div class="types__box">
                    <div class="types__box-top">
                        <div class="types__box-title">Oneshot</div>
                        <div class="types__box-info">Около четырёх часов</div>
                    </div>
                    <div class="types__box-descr">Это приключение, которое завершается за одну игровую сессию. <br><br>

                        Оно идеально подходит для тех, кто хочет быстро погрузиться в историю и завершить её за один
                        раз, испытав сразу всю гамму эмоций от хорошей истории. Такие игры часто имеют более динамичный
                        сюжет и чёткие цели, и пользуются большой популярностью, позволяя пробовать каждый раз что‑то
                        новое.

                    </div>
                  <router-link :to="{
                        name: 'events'
                      }" class="types__box-link">Подобрать игру <i class="fal fa-arrow-right"></i></router-link>
                </div>
                <div class="types__box">
                    <div class="types__box-top">
                        <div class="types__box-title">Серия</div>
                        <div class="types__box-info">Несколько сессий</div>
                    </div>
                    <div class="types__box-descr">Некоторые приключения требуют больше одной сессии. Это позволяет более
                        глубоко погрузиться в сюжет и развить персонажей, при этом сохраняя относительно короткий срок
                        игры. <br><br>

                        Эти игры могут иметь несколько частей или эпизодов, которые логично завершатся в течение
                        нескольких встреч.</div>
                    <router-link :to="{
                        name: 'events'
                    }" class="types__box-link">Подобрать игру <i class="fal fa-arrow-right"></i></router-link>
                </div>
                <div class="types__box">
                    <div class="types__box-top">
                        <div class="types__box-title">Кампания</div>
                        <div class="types__box-info">Более 5 сессий</div>
                    </div>
                    <div class="types__box-descr">Кампания — это длительное приключение, которое развивается
                        на протяжении нескольких встреч. Игроки постепенно исследуют мир, развивают своих персонажей
                        и взаимодействуют с сюжетными арками. Кампании требуют регулярных встреч и обычно более
                        глубокого погружают в игровой процесс и историю.</div>
                    <router-link :to="{
                      name: 'events'
                    }" class="types__box-link">Подобрать игру <i class="fal fa-arrow-right"></i></router-link>
                </div>

            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.types {
    margin-top: 80px;
    padding: 0 10px 0 10px;

    .types__title {
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

    .types__boxes {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;

        .types__box {
            padding: 40px 28px;
            max-width: 580px;
            width: 100%;
            background: var(--plate-02,
                    linear-gradient(109.35deg,
                        rgba(0, 0, 0, 0.3) 0%,
                        rgba(22, 19, 23, 0.3) 50%,
                        rgba(0, 0, 0, 0.3) 100%));
            border-radius: 15px;

            .types__box-top {
                display: flex;
              align-items: center;
                gap: 24px;
                margin-bottom: 30px;

                .types__box-title {
                    font-size: 32px;
                    color: #86489c;
                    font-weight: 500;
                    font-family: 'Alegreya-Medium';

                    font-size: calc(22px + 10 * (100vw / 1920));




                    @media (max-width: 320px) {
                        font-size: calc(22px + (10 + 10 * 0.7) * ((100vw - 320px) / 1920));
                    }
                }

                .types__box-info {
                    padding: 4px 16px;
                    background: #742628;
                    color: #d5b0e4;
                    font-family: "Alegreya-Regular";
                    border-radius: 40px;
                    text-align: center;
                    font-size: calc(14px + 2 * (100vw / 1920));
                    height: 35px;

                    @media (max-width: 320px) {
                        font-size: calc(14px + (2 + 2 * 0.7) * ((100vw - 320px) / 1920));
                    }
                }
            }

            .types__box-descr {
                color: #fff;

                margin-bottom: 28px;

                font-size: calc(16px + 4 * (100vw / 1920));

                @media (max-width: 320px) {
                    font-size: calc(16px + (4 + 4 * 0.7) * ((100vw - 320px) / 1920));
                }
            }

            .types__box-link {
                color: #d23c48;

                font-family: 'Alegreya-Bold';

                display: flex;
                align-items: center;
                gap: 16px;

                font-size: calc(22px + 10 * (100vw / 1920));




                @media (max-width: 320px) {
                    font-size: calc(22px + (10 + 10 * 0.7) * ((100vw - 320px) / 1920));
                }

            }
        }
    }
}
</style>
