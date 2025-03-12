<script lang="ts" setup>
</script>
<template>
  <div class="canfind">
    <div class="canfind__container container">
      <h3 class="canfind__title">У нас вы найдете</h3>

      <div class="canfind__box">
        <div class="canfind__box-left">
          <h3 class="canfind__box-title">Уникальное сообщество</h3>

          <div class="canfind__box-items">
            <div class="canfind__box-item">
              <img src="../images/canfind/userfour.svg" alt="" />
              <p class="canfind__box-txt">
                Команда крутых Мастеров, готовых провести игры из различных систем и сеттингов
                (не только D&D)
              </p>
            </div>
            <div class="canfind__box-item">
              <img src="../images/canfind/maskhappy.svg" alt="" />
              <p class="canfind__box-txt">
                Регулярные мероприятия, турниры и тематические вечера для всех любителей
                настольно-ролевых игр
              </p>
            </div>
            <div class="canfind__box-item">
              <img src="../images/canfind/winner.svg" alt="" />
              <p class="canfind__box-txt">
                Различные конкурсы, розыгрыши и возможность участвовать в жизни клуба для всех
              </p>
            </div>
          </div>
        </div>
        <div class="canfind__box-right">
          <img src="../images/canfind/ava.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.canfind__container {
  margin: 0 auto;
  max-width: 1180px;
  width: 100%;
}

.canfind__title {
  font-family: 'Alegreya-Meduim';
  font-weight: 500;
  color: #fff;
  margin-bottom: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: calc(20px + 26 * (100vw / 1920));

  @media (max-width: 320px) {
    font-size: calc(20px + (26 + 26 * 0.7) * ((100vw - 320px) / 1920));
  }
}

.canfind__box {
  background: linear-gradient(114.17deg,
      rgba(54, 38, 38, 0.3) -3.5%,
      rgba(34, 27, 36, 0.3) 47.08%,
      rgba(54, 38, 38, 0.3) 97.65%);
  border-radius: 28px;
  padding: 28px 30px;
  gap: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 940px) {
    flex-direction: column;
    background: linear-gradient(114.17deg,
        rgba(54, 38, 38, 0.3) 0%,
        rgba(34, 27, 36, 0.3) 50%,
        rgba(54, 38, 38, 0.3) 100%);
    border-radius: 8px;
  }
}

.canfind__box-left {

  @media (max-width: 940px) {

    background: linear-gradient(114.17deg,
        rgba(54, 38, 38, 0.3) 0%,
        rgba(34, 27, 36, 0.3) 50%,
        rgba(54, 38, 38, 0.3) 100%);
    border-radius: 8px;
    padding: 24px 16px;
  }

  .canfind__box-title {
    color: #9e2014;
    font-family: 'Alegreya-Meduim';
    font-weight: 500;
    margin-bottom: 35px;
    font-size: calc(22px + 10 * (100vw / 1920));

    @media (max-width: 320px) {
      font-size: calc(22px + (10 + 10 * 0.7) * ((100vw - 320px) / 1920));
    }
  }

  .canfind__box-items {
    display: flex;
    flex-direction: column;
    gap: 22px;

    .canfind__box-item {
      display: flex;
      gap: 20px;

      .canfind__box-txt {
        color: #eee0f1;
        font-family: 'Alegreya-Regular';
        max-width: 505px;
        width: 100%;
        font-size: calc(16px + 6 * (100vw / 1920));

        @media (max-width: 320px) {
          font-size: calc(16px + (6 + 6 * 0.7) * ((100vw - 320px) / 1920));
        }
      }
    }
  }
}

.canfind__box-right {
  width: 100%;
  display: flex;
  justify-content: center;

  img {
    max-width: 520px;
    width: 100%;

    @media (max-width: 940px) {
      max-width: 590px;
    }

    @media (max-width: 340px) {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
