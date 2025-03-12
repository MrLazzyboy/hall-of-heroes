<script setup lang="ts">

</script>
<template>
  <div class="contacts">
    <img class="contacts__bg" src="./images/bg.png" alt="">
    <div class="contacts__container container">
      <h3 class="contacts__title">Ждём вас в гости!</h3>

      <div class="contacts__wrapper">
        <div class="contacts__left">
          <div class="contacts__left-item">
            <h3 class="contacts__left-title">Мы находимся</h3>
            <div class="contacts__left-txt">Малый Николопесковский переулок, 6</div>
          </div>
          <div class="contacts__left-flex">
            <div class="contacts__left-item">
              <h3 class="contacts__left-title">Часы работы</h3>
              <div class="contacts__left-hours">
                <div class="working__hours"><span>ПН-ПТ:</span> с 18:00 до 24:00</div>
                <div class="working__hours"><span>СБ-ВС:</span> с 12:30 до 24:00</div>
              </div>
            </div>

            <div class="contacts__left-item">
              <h3 class="contacts__left-title">Телефон клуба</h3>
              <div class="contacts__left-any">
                <div class="contacts__left-phone">+Х-ХХХ-ХХХ-ХХ-ХХ</div>
                <div class="contacts__left-descr">Звонить в случае крайней неоходимости</div>
              </div>
            </div>

          </div>
          <img class="contacts__left-line" src="./images/line.png" alt="">

          <div class="contacts__left-map">
            <div style="position:relative;overflow:hidden;"><a
                href="https://yandex.uz/maps/10335/tashkent/?utm_medium=mapframe&utm_source=maps"
                style="color:#eee;font-size:12px;position:absolute;top:0px;">Ташкент</a><a
                href="https://yandex.uz/maps/10335/tashkent/?ll=69.243965%2C41.276526&utm_medium=mapframe&utm_source=maps&z=11.15"
                style="color:#eee;font-size:12px;position:absolute;top:14px;">Яндекс Карты — транспорт, навигация, поиск
                мест</a><iframe src="https://yandex.uz/map-widget/v1/?ll=69.243965%2C41.276526&z=11.15" width="100%"
                height="370" frameborder="1" allowfullscreen="true" style="position:relative;"></iframe></div>
          </div>

          <div class="contacts__left-social">
            <div class="contact__social-top">
              <i class="fab fa-telegram-plane"></i>
              <h3 class="contacts__social-title">Наш телеграм канал</h3>
            </div>
            <div class="contacts__social-txt">
              Здесь мы делимся короткими новостиями о жизни проекта и его команды, делаем интересные анонсы (и вбросы),
              и конечно же не против немного подурачиться.
            </div>
          </div>
          <div class="contacts__left-social">
            <div class="contact__social-top">
              <i class="fab fa-vk"></i>
              <h3 class="contacts__social-title">Наше сообщество в ВК</h3>
            </div>
            <div class="contacts__social-txt">
              Тут публикуется только самое важное, в том числе анонсы мероприятий, организационные вопросы, а также
              проводятся конкурсы и розыгрыши.
            </div>
          </div>
        </div>
        <div class="contacts__right">
          <div style="position:relative;overflow:hidden;"><a
              href="https://yandex.uz/maps/10335/tashkent/?utm_medium=mapframe&utm_source=maps"
              style="color:#eee;font-size:12px;position:absolute;top:0px;">Ташкент</a><a
              href="https://yandex.uz/maps/10335/tashkent/?ll=69.243965%2C41.276526&utm_medium=mapframe&utm_source=maps&z=11.15"
              style="color:#eee;font-size:12px;position:absolute;top:14px;">Яндекс Карты — транспорт, навигация, поиск
              мест</a><iframe src="https://yandex.uz/map-widget/v1/?ll=69.243965%2C41.276526&z=11.15" width="100%"
              height="570" frameborder="1" allowfullscreen="true" style="position:relative;"></iframe></div>
        </div>
      </div>

      <div class="contacts__ways">
        <h3 class="contacts__ways-title">Как добраться?</h3>
        <div class="contacts__ways-boxes">
          <div class="contacts__ways-box">
            <img src="./images/1.png" alt="">

            <div class="contacts__box-info">
              <div class="contacts__box-title">Метро Арбатская: </div>

              <div class="contacts__box-links">
                <div class="contacts__box-link"><i class="fas fa-chevron-right"></i> Арбатско-покровская Выход 8</div>
                <div class="contacts__box-link"><i class="fas fa-chevron-right"></i> Филёвская Выход 1</div>
              </div>
            </div>
          </div>
          <div class="contacts__ways-box">
            <img src="./images/2.png" alt="">

            <div class="contacts__box-info">
              <div class="contacts__box-title">Далее около 10 минут пешком: </div>

              <div class="contacts__box-links">
                <div class="contacts__box-link"><i class="fas fa-chevron-right"></i> по Новому Арбату (быстрее)</div>
                <div class="contacts__box-link"><i class="fas fa-chevron-right"></i> по Старому Арбату (интереснее)
                </div>
              </div>
            </div>
          </div>
          <div class="contacts__ways-box">
            <img src="./images/3.png" alt="">

            <div class="contacts__box-info">
              <div class="contacts__box-title">Поворот в Серебрянный переулок </div>

              <div class="contacts__box-links">
                <div class="contacts__box-link"><i class="fas fa-chevron-right"></i> налево (и вниз) с Нового Арбата
                </div>
                <div class="contacts__box-link"><i class="fas fa-chevron-right"></i> направо со Старого Арбата </div>
              </div>
            </div>
          </div>
          <div class="contacts__ways-box">
            <img src="./images/4.png" alt="">

            <div class="contacts__box-info">
              <div class="contacts__box-title">Поворот во двор на углу дома «улица Арбат, 18/1с2» </div>


            </div>
          </div>
        </div>
      </div>

      <div class="contacts__footer">
        <h3 class="contacts__footer-title">Хотите стать Мастером клуба
          или интересует Сотрудничество?</h3>
        <div class="contacts__footer-subtitle">Мы всегда рады новым людям, идеям и предложениям!</div>
        <div class="contacts__footer-txt">Напишите нам  example@gmail.com</div>
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.contacts {
  margin-bottom: 81px;
  position: relative;
  padding: 151px 10px 0 10px;

  .contacts__bg {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: -1;
  }

  .contacts__title {
    color: #ffffff;
    font-size: 46px;
    font-family: 'Alegreya-Medium';
    font-weight: 500;
    display: flex;
    align-items: start;
    justify-content: start;
    margin-bottom: 40px;

    font-size: calc(20px + 26 * (100vw / 1920));




    @media (max-width: 320px) {
      font-size: calc(20px + (26 + 26 * 0.7) * ((100vw - 320px) / 1920));
    }
  }

  .contacts__wrapper {
    display: flex;
    gap: 30px;
    justify-content: space-between;

    .contacts__left {
      display: flex;
      flex-direction: column;
      gap: 40px;
      flex-grow: 1;
      width: 100%;

      .contacts__left-item {
        display: flex;
        flex-direction: column;
        gap: 8px;
        justify-content: space-between;

        .contacts__left-title {
          color: #aa70bf;
          font-weight: 500;
          font-family: 'Alegreya-Medium';

          font-size: calc(14px + 6 * (100vw / 1920));




          @media (max-width: 320px) {
            font-size: calc(14px + (6 + 6 * 0.7) * ((100vw - 320px) / 1920));
          }
        }

        .contacts__left-txt {
          color: #Fff;
          font-weight: 400;
          font-family: 'Alegreya-Regular';

          font-size: calc(16px + 8 * (100vw / 1920));




          @media (max-width: 320px) {
            font-size: calc(16px + (8 + 8 * 0.7) * ((100vw - 320px) / 1920));
          }
        }



        .contacts__left-hours {
          display: flex;
          flex-direction: column;

          gap: 4px;

          .working__hours {
            color: var(--04-text-main, #eee0f1);
            font-family: 'Alegreya-Regular';
            font-size: var(--pc-p1-font-size, 24px);
            font-weight: var(--pc-p1-font-weight, 400);

            font-size: calc(16px + 8 * (100vw / 1920));




            @media (max-width: 320px) {
              font-size: calc(16px + (8 + 8 * 0.7) * ((100vw - 320px) / 1920));
            }

            span {
              color: var(--01-primary-color-5, #d5b0e4);
              font-family: 'Alegreya-Bold' !important;
              font-weight: 700;
            }
          }
        }

        .contacts__left-phone {
          color: #Fff;
          font-weight: 400;
          font-family: 'Alegreya-Regular';
          font-size: calc(16px + 8 * (100vw / 1920));




          @media (max-width: 320px) {
            font-size: calc(16px + (8 + 8 * 0.7) * ((100vw - 320px) / 1920));
          }
        }

        .contacts__left-descr {
          color: #6a3b7b;
          font-size: 14px;
          font-weight: 400;
          font-family: 'Alegreya-Regular';

          @media (max-width: 500px) {
            text-align: right;
            max-width: 158px;
            width: 100%;
          }
        }

      }

      .contacts__left-flex {
        display: flex;
        justify-content: space-between;

        @media (max-width: 500px) {
          flex-direction: column;
          gap: 24px;
        }

        .contacts__left-any {
          @media (max-width: 500px) {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            flex-grow: 1;
          }
        }
      }

      .contacts__left-map {
        display: none;

        @media (max-width: 1024px) {
          display: flex;
          width: 100%;

          div {
            width: 100%;
          }
        }
      }

      .contacts__left-social {
        display: flex;
        flex-direction: column;
        gap: 13px;

        .contact__social-top {
          display: flex;
          gap: 20px;
          align-items: center;

          i {
            color: var(--03-primary-color-main, #6a3b7b);
            font-size: 38px;

            @media (max-width: 500px) {
              font-size: 28px;
            }
          }

          .contacts__social-title {
            color: #d5b0e4;
            font-size: 32px;
            font-weight: 500;
            font-family: 'Alegreya-Medium';
            font-size: calc(22px + 10 * (100vw / 1920));




            @media (max-width: 320px) {
              font-size: calc(22px + (10 + 10 * 0.7) * ((100vw - 320px) / 1920));
            }
          }
        }

        .contacts__social-txt {
          color: #eee0f1;
          font-size: 20px;
          max-width: 779px;
          width: 100%;
          font-weight: 400;
          font-family: 'Alegreya-Regular';

          font-size: calc(16px + 4 * (100vw / 1920));




          @media (max-width: 320px) {
            font-size: calc(16px + (4 + 4 * 0.7) * ((100vw - 320px) / 1920));
          }
        }
      }
    }

    .contacts__right {
      max-width: 500px;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      overflow: hidden;

      @media (max-width: 1024px) {
        display: none;
      }
    }
  }

  .contacts__ways {
    margin-top: 81px;

    .contacts__ways-title {
      color: #ffffff;
      font-size: 46px;
      font-family: 'Alegreya-Medium';
      font-weight: 500;
      display: flex;
      align-items: start;
      justify-content: start;
      margin-bottom: 40px;

      font-size: calc(20px + 26 * (100vw / 1920));




      @media (max-width: 320px) {
        font-size: calc(20px + (26 + 26 * 0.7) * ((100vw - 320px) / 1920));
      }
    }

    .contacts__ways-boxes {
      display: flex;
      gap: 20px;


      overflow-y: auto;

      &::-webkit-scrollbar {
        display: none;
      }


      .contacts__ways-box {
        display: flex;
        flex-direction: column;
        gap: 20px;
        min-width: 280px;
        width: 100%;

        &:nth-of-type(1) {
          .contacts__box-title {
            color: #ffffff;
            text-align: left;
            font-family: "Alegreya-Bold";

            font-weight: 700;
            font-size: calc(16px + 2 * (100vw / 1920));




            @media (max-width: 320px) {
              font-size: calc(16px + (2 + 2 * 0.7) * ((100vw - 320px) / 1920));
            }
          }
        }

        img {
          max-width: 280px;
          width: 100%;
        }

        .contacts__box-info {
          display: flex;
          flex-direction: column;
          gap: 8px;

          .contacts__box-title {
            color: #ffffff;
            text-align: left;
            font-family: "Alegreya-Regular";

            font-weight: 400;
            font-size: calc(14px + 2 * (100vw / 1920));




            @media (max-width: 320px) {
              font-size: calc(14px + (2 + 2 * 0.7) * ((100vw - 320px) / 1920));
            }
          }

          .contacts__box-links {
            display: flex;
            flex-direction: column;
            gap: 8px;

            .contacts__box-link {
              color: #ffffff;
              text-align: left;
              font-family: "Alegreya-Regular";

              font-weight: 400;
              display: flex;
              align-items: center;
              gap: 12px;
              font-size: calc(14px + 2 * (100vw / 1920));




              @media (max-width: 320px) {
                font-size: calc(14px + (2 + 2 * 0.7) * ((100vw - 320px) / 1920));
              }


              i {
                color: #6a3b7b;
                font-size: 14px;
              }
            }
          }

        }
      }
    }
  }

  .contacts__footer {
    padding: 71px 0 31px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;

    .contacts__footer-title {

      background: var(--04-text-h1-style,
          linear-gradient(90deg,
            rgba(203, 190, 205, 1) 0%,
            rgba(255, 255, 255, 1) 46.50000035762787%,
            rgba(203, 190, 205, 1) 100%));
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-family: "Alegreya-Medium";
      font-weight: 500;
      max-width: 939px;
      text-align: center;

      font-size: calc(26px + 30 * (100vw / 1920));




      @media (max-width: 320px) {
        font-size: calc(26px + (30 + 30 * 0.7) * ((100vw - 320px) / 1920));
      }
    }

    .contacts__footer-subtitle {
      color: #ffffff;
      text-align: center;

      font-family: "Alegreya-Regular";
      margin-top: 13px;

      font-size: calc(16px + 4 * (100vw / 1920));




      @media (max-width: 320px) {
        font-size: calc(16px + (4 + 4 * 0.7) * ((100vw - 320px) / 1920));
      }
    }

    .contacts__footer-txt {
      margin-top: 9px;
      color: #d23c48;
      font-family: "Alegreya-Bold";
      font-weight: 700;

      font-size: calc(16px + 4 * (100vw / 1920));




      @media (max-width: 320px) {
        font-size: calc(16px + (4 + 4 * 0.7) * ((100vw - 320px) / 1920));
      }
    }
  }
}
</style>
