<script lang="ts" setup>
</script>
<template>
  <div class="footer">
    <div class="footer__container container">
      <div class="footer__wrapper">
        <div class="footer__brand">
          <img class="footer__brand-logo" src="@/assets/images/footer-logo.svg" alt="" />
          <img class="footer__brand-phone" src="@/assets/images/text_logo.svg" alt="">
        </div>
        <div class="footer__center">
          <h3 class="footer__center-title">Мы находимся</h3>
          <div class="footer__center-address">
            г. Москва, м. Арбатская Малый Николопесковский переулок, 6
          </div>

          <div class="footer__center-social">
            <i class="fab fa-telegram-plane"></i>
            <div>Телеграм канал</div>
          </div>
        </div>

        <div class="footer__right">
          <h3 class="footer__right-title">Часы работы</h3>
          <div class="footer__working-hours">
            <div class="working__hours"><span>ПН-ПТ:</span> с 18:00 до 24:00</div>
            <div class="working__hours"><span>СБ-ВС:</span> с 12:30 до 24:00</div>
          </div>

          <div class="footer__right-social">
            <i class="fab fa-vk"></i>
            <div>Сообщество в ВК</div>
          </div>
        </div>
      </div>
      <div class="footer__copy">
        <div>ИП АЛЕКСАНДРОВ НИКОЛАЙ АЛЕКСАНДРОВИЧ
          ОГРНИП 324774600682026</div>
        <div>Политика обработки персональных данных и конфиденциальности</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Alegreya+SC:ital,wght@0,400;0,500;0,700;0,800;0,900;1,400;1,500;1,700;1,800;1,900&display=swap');

.footer {
  background: #010102;
  padding: 30px 10px 68px 10px;

  .footer__container {
    margin: 0 auto;
    max-width: 1180px;
    width: 100%;
  }

  .footer__wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      align-content: center;
    }
  }

  .footer__center {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    .footer__center-title {
      color: var(--01-primary-color-4, #aa70bf);
      font-family: 'Alegreya-Medium';

      line-height: var(--pc-button-1-line-height, 120%);
      font-weight: var(--pc-button-1-font-weight, 500);

      font-size: calc(14px + 6 * (100vw / 1920));

      @media (max-width: 320px) {
        font-size: calc(14px + (6 + 6 * 0.7) * ((100vw - 320px) / 1920));
      }
    }

    .footer__center-address {
      color: var(--04-text-main, #eee0f1);
      font-family: 'Alegreya-Regular';
      font-weight: var(--pc-p1-font-weight, 400);
      max-width: 405px;
      width: 100%;
      margin-top: 15px;

      font-size: calc(16px + 8 * (100vw / 1920));

      @media (max-width: 320px) {
        font-size: calc(16px + (8 + 8 * 0.7) * ((100vw - 320px) / 1920));
      }
    }

    .footer__center-social {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-top: 40px;

      div {
        color: var(--01-primary-color-5, #d5b0e4);

        font-family: 'Alegreya-Regular';
        font-size: var(--pc-p1-font-size, 24px);
        font-weight: var(--pc-p1-font-weight, 400);
        font-size: calc(16px + 8 * (100vw / 1920));

        @media (max-width: 320px) {
          font-size: calc(16px + (8 + 8 * 0.7) * ((100vw - 320px) / 1920));
        }
      }

      i {
        color: var(--03-primary-color-main, #86489c);
        font-size: 28px;
      }
    }
  }

  .footer__right {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    .footer__right-title {
      color: var(--01-primary-color-4, #aa70bf);
      font-family: 'Alegreya-Medium';
      font-size: var(--pc-button-1-font-size, 20px);
      line-height: var(--pc-button-1-line-height, 120%);
      font-weight: var(--pc-button-1-font-weight, 500);
      font-size: calc(14px + 6 * (100vw / 1920));

      @media (max-width: 320px) {
        font-size: calc(14px + (6 + 6 * 0.7) * ((100vw - 320px) / 1920));
      }
    }

    .footer__working-hours {
      display: flex;
      flex-direction: column;
      margin-top: 15px;
      gap: 4px;

      .working__hours {
        color: var(--04-text-main, #eee0f1);
        font-family: 'Alegreya-Regular';
        font-weight: var(--pc-p1-font-weight, 400);

        font-size: calc(16px + 8 * (100vw / 1920));

        @media (max-width: 320px) {
          font-size: calc(16px + (8 + 8 * 0.7) * ((100vw - 320px) / 1920));
        }

        span {
          color: var(--01-primary-color-5, #d5b0e4);
          font-family: 'Alegreya-Bold' !important;
          font-weight: 700;


          font-size: calc(16px + 8 * (100vw / 1920));

          @media (max-width: 320px) {
            font-size: calc(16px + (8 + 8 * 0.7) * ((100vw - 320px) / 1920));
          }
        }
      }
    }

    .footer__right-social {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-top: 40px;

      div {
        color: var(--01-primary-color-5, #d5b0e4);

        font-family: 'Alegreya-Regular';
        font-size: var(--pc-p1-font-size, 24px);
        font-weight: var(--pc-p1-font-weight, 400);

        font-size: calc(16px + 8 * (100vw / 1920));

        @media (max-width: 320px) {
          font-size: calc(16px + (8 + 8 * 0.7) * ((100vw - 320px) / 1920));
        }
      }

      i {
        color: var(--03-primary-color-main, #86489c);
        font-size: 28px;
      }
    }
  }

  .footer__copy {
    color: #38393f;
    text-align: center;
    font-size: var(--pc-helper-text-font-size, 14px);
    margin-top: 48px;
  }
}

.footer__brand-logo {
  display: flex;

  @media (max-width: 768px) {
    display: none;
  }
}

.footer__brand-phone {
  display: none;

  @media (max-width: 768px) {
    display: flex;
  }
}
</style>
