<script lang="ts" setup>
</script>

<template>
  <div class="comforts">
    <div class="comforts__container container">
      <div class="comforts__row">
        <div class="comforts__row-item">
          <h3 class="comforts__item-title">Полное погружение в атмосферу</h3>

          <div class="comforts__item-list">
            <div class="comforts__list-row">
              <img src="../images/comforts/chess-rux.svg" alt="" />
              <p class="comforts__list-txt">Приятный интерьер с элементами фэнтези</p>
            </div>
            <div class="comforts__list-row">
              <img src="../images/comforts/sword.svg" alt="" />
              <p class="comforts__list-txt">
                Изолированные игровые комнаты для полноценного отыгрыша
              </p>
            </div>
            <div class="comforts__list-row">
              <img src="../images/comforts/note.svg" alt="" />
              <p class="comforts__list-txt">
                Музыка и звуковые эффекты, создающие идеальное настроение для игры
              </p>
            </div>
          </div>
        </div>
        <div class="comforts__row-item">
          <h3 class="comforts__item-title">Комфорт для каждого</h3>

          <div class="comforts__item-list">
            <div class="comforts__list-row">
              <img src="../images/comforts/divan.svg" alt="" />
              <p class="comforts__list-txt">Зона отдыха с диванами, напитками и закусками</p>
            </div>
            <div class="comforts__list-row">
              <img src="../images/comforts/wifi.svg" alt="" />
              <p class="comforts__list-txt">Бесплатный Wi-Fi для всех гостей</p>
            </div>
            <div class="comforts__list-row">
              <img src="../images/comforts/sandiq.svg" alt="" />
              <p class="comforts__list-txt">Весь необходимый игровой инвентарь</p>
            </div>
          </div>
        </div>
        <div class="comforts__row-item">
          <h3 class="comforts__item-title">Поддержку начинающих</h3>

          <div class="comforts__item-list">
            <div class="comforts__list-row">
              <img src="../images/comforts/pray.svg" alt="" />
              <p class="comforts__list-txt">Помощь в освоении правил и участии в первых сессиях</p>
            </div>
            <div class="comforts__list-row">
              <img src="../images/comforts/human.svg" alt="" />
              <p class="comforts__list-txt">Опытные и дружелюбные Мастера, знающие своё дело</p>
            </div>
            <div class="comforts__list-row">
              <img src="../images/comforts/happy.svg" alt="" />
              <p class="comforts__list-txt">Удобная система записи на игры и события</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.comforts {
  margin-top: 56px;
}

.comforts__row {
  display: flex;

  justify-content: space-between;


  align-content: center;

  @media (max-width: 900px) {
    flex-wrap: wrap;
    justify-content: center;
  }

  .comforts__row-item {
    padding: 40px 28px;
    background: linear-gradient(109.35deg,
        rgba(0, 0, 0, 0.3) -1.6%,
        rgba(22, 19, 23, 0.3) 48.61%,
        rgba(0, 0, 0, 0.3) 98.83%);
    display: flex;
    flex-direction: column;
    gap: 28px;

    &:nth-of-type(2) {
      .comforts__item-title {
        max-width: 188px;
        width: 100%;
      }
    }

    .comforts__item-title {
      font-size: 32px;
      color: #d5b0e4;
      font-weight: 500;
      font-family: 'Alegreya-Medium';
      max-width: 324px;
      width: 100%;

      font-size: calc(22px + 10 * (100vw / 1920));

      @media (max-width: 320px) {
        font-size: calc(22px + (10 + 10 * 0.7) * ((100vw - 320px) / 1920));
      }
    }

    .comforts__item-list {
      display: flex;
      flex-direction: column;
      gap: 16px;

      .comforts__list-row {
        display: flex;
        gap: 16px;
        align-items: center;

        .comforts__list-txt {
          color: #eee0f1;
          font-weight: 400;
          font-family: 'Alegreya-Regular';
          max-width: 282px;
          width: 100%;
          line-height: 24px;

          font-size: calc(16px + 4 * (100vw / 1920));

          @media (max-width: 320px) {
            font-size: calc(16px + (4 + 4 * 0.7) * ((100vw - 320px) / 1920));
          }
        }
      }
    }
  }
}
</style>