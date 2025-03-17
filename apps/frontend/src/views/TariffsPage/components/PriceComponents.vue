<script setup lang="ts">
import { ref, computed } from 'vue';

const activeTab = ref<'masters' | 'rent'>('masters');

const isMobile = computed(() => window.innerWidth <= 500);
</script>

<template>
  <div class="price">
    <div class="price__container container">
      <h3 class="price__title">Тарифы</h3>
      <div class="price__toggle-buttons" v-if="isMobile">
        <div class="price__toggle-button" :class="{ active: activeTab === 'masters' }" @click="activeTab = 'masters'">
          Игра с нашими Мастерами
        </div>
        <div class="price__toggle-button" :class="{ active: activeTab === 'rent' }" @click="activeTab = 'rent'">
          Аренда комнаты
        </div>
      </div>
      <div class="price__boxes">
        <div class="price__box" v-show="!isMobile || activeTab === 'masters'">
          <div class="price__box-title">Игра с нашими Мастерами <span>*</span></div>
          <div class="price__box-flex">
            <div class="price__box-schedule">
              <div class="price__schedule-day">В будние дни</div>
              <div class="price__schedule-item">
                <div class="price__schedule-time">13:00–18:00</div>
                <div class="price__schedule-price">1500₽</div>
              </div>
              <div class="price__schedule-item">
                <div class="price__schedule-time">18:00–23:30</div>
                <div class="price__schedule-price">2000₽</div>
              </div>
            </div>
            <div class="price__box-schedule">
              <div class="price__schedule-day">В выходные</div>
              <div class="price__schedule-item">
                <div class="price__schedule-time">13:00–18:00</div>
                <div class="price__schedule-price">2200₽</div>
              </div>
              <div class="price__schedule-item">
                <div class="price__schedule-time">18:00–23:30</div>
                <div class="price__schedule-price">2500₽</div>
              </div>
            </div>
          </div>
          <div class="price__schedule-warning"><span>*</span>финальная цена всегда указана в анонсе События!</div>
        </div>
        <div class="price__box" v-show="!isMobile || activeTab === 'rent'">
          <div class="price__box-title">Аренда комнаты <span>*</span></div>
          <div class="price__box-flex">
            <div class="price__box-schedule">
              <div class="price__schedule-day">В будние дни</div>
              <div class="price__schedule-item">
                <div class="price__schedule-time">13:00–18:00</div>
                <div class="price__schedule-price">5000₽</div>
              </div>
              <div class="price__schedule-item">
                <div class="price__schedule-time">18:00–23:30</div>
                <div class="price__schedule-price">8000₽</div>
              </div>
            </div>
            <div class="price__box-schedule">
              <div class="price__schedule-day">В выходные</div>
              <div class="price__schedule-item">
                <div class="price__schedule-time">13:00–18:00</div>
                <div class="price__schedule-price">9000₽</div>
              </div>
              <div class="price__schedule-item">
                <div class="price__schedule-time">18:00–23:30</div>
                <div class="price__schedule-price">10000₽</div>
              </div>
            </div>
          </div>
          <div class="price__schedule-warning"><span>*</span>финальная цена всегда указана в анонсе События!</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.price {
  padding: 0 10px 0 10px;

  .price__title {
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

  .price__boxes {
    display: flex;
    gap: 21px;

    @media (max-width: 990px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .price__box {
      max-width: 579px;
      width: 100%;

      background: linear-gradient(114.17deg,
          rgba(54, 38, 38, 0.3) 0%,
          rgba(34, 27, 36, 0.3) 50%,
          rgba(54, 38, 38, 0.3) 100%);
      border-radius: 10px;

      padding: 30px;

      @media (max-width: 500px) {
        padding: 20px;

      }

      .price__box-title {
        color: #eee0f1;
        font-size: 32px;
        font-family: 'Alegreya-Medium';
        margin-bottom: 32px;

        span {
          color: #e44653 !important;
        }

        @media (max-width: 500px) {
          display: none;
        }
      }

      .price__box-flex {
        display: flex;
        align-items: start;
        justify-content: space-between;

        @media (max-width: 500px) {
          gap: 21px;
        }

        .price__box-schedule {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 442px;
          width: 100%;

          .price__schedule-day {
            color: #d5b0e4;
            font-family: 'Alegreya-Regular';

            font-size: calc(22px + 4 * (100vw / 1920));




            @media (max-width: 320px) {
              font-size: calc(22px + (4 + 4 * 0.7) * ((100vw - 320px) / 1920));
            }
          }

          .price__schedule-item {
            display: flex;
            flex-direction: column;

            .price__schedule-time {
              color: #cdc2d1;
              font-size: 20px;
              font-family: 'Alegreya-Regular';
              font-size: calc(18px + 2 * (100vw / 1920));




              @media (max-width: 320px) {
                font-size: calc(18px + (2 + 2 * 0.7) * ((100vw - 320px) / 1920));
              }
            }

            .price__schedule-price {
           
              color: #86489c;
              font-family: 'Alegreya-Medium';
              font-weight: 700;

              font-size: calc(32px + 4 * (100vw / 1920));




              @media (max-width: 320px) {
                font-size: calc(32px + (4 + 4 * 0.7) * ((100vw - 320px) / 1920));
              }
            }
          }
        }
      }
    }
  }

  .price__schedule-warning {
    color: #d5b0e4;
    font-size: 20px;
    font-family: 'Alegreya-Regular';
    margin-top: 40px;

    font-size: calc(16px + 4 * (100vw / 1920));



    @media (max-width: 500px) {
      text-align: center;
    }

    @media (max-width: 320px) {
      font-size: calc(16px + (4 + 4 * 0.7) * ((100vw - 320px) / 1920));
    }

    span {
      color: #e44653 !important;
    }
  }
}

.price__toggle-buttons {
  display: none;

  .price__toggle-button {
    background: linear-gradient(114.17deg,
        rgba(54, 38, 38, 0.3) 0%,
        rgba(34, 27, 36, 0.3) 50%,
        rgba(54, 38, 38, 0.3) 100%);
    border-radius: 8px;
    border-style: solid;
    border-color: var(--based-stroke, #18171e);
    border-width: 1px;

    color: var(--04-text-main, #eee0f1);
    text-align: center;
    font-size: var(--mob-p2-font-size, 16px);

    padding: 7px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .active {
    background: #86489c;
    color: #fff;
  }

  @media (max-width:500px) {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;

  }
}
</style>