<script setup lang="ts">
</script>
<template>
  <div class="home">
    <img class="home__bg" src="../images/home/bg.png" alt="" />
    <div class="home__container container">
      <div class="home__content">
        <div class="home__content-brand">
          <img src="../../../assets/images/logo-row.svg" alt="" />
        </div>
        <h3 class="home__content-title">аутентичный клуб для игр в D&D в Москве</h3>
        <p class="home__content-txt">Погрузитесь в фэнтезийную атмосферу вместе с нами!</p>
        <div class="home__content-btn">К приключениям!!!</div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.home {
  position: relative;
  min-height: 100vh;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;


  @media (max-width: 500px) {
    min-height: 80vh;
    height: 100%;
  }

  .home__bg {
    position: absolute;
    width: 100%;
    object-fit: cover;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;

  }

  .home__content-brand {

    img {
      max-width: 685px;
      width: 100%;
    }
  }

  .home__content {
    z-index: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;

    .home__content-title {
      color: #fff;

      text-transform: uppercase;
      font-family: 'Alegreya-Bold';
      font-weight: 700;

      font-size: calc(32px + 20 * (100vw / 1920));
      text-align: center;

      @media (max-width: 400px) {
        font-size: calc(22px + (20 + 20 * 0.7) * ((100vw - 320px) / 1920));
      }

      @media (max-width: 320px) {
        font-size: calc(32px + (20 + 20 * 0.7) * ((100vw - 320px) / 1920));
      }
    }

    .home__content-txt {

      font-family: 'Alegreya-Regular';
      font-weight: 400;
      color: #fff;
      margin-top: 50px;
      text-align: center;
      font-size: calc(18px + 6 * (100vw / 1920));

      @media (max-width: 400px) {
        margin-top: 15px;
      }

      @media (max-width: 320px) {
        font-size: calc(18px + (6 + 6 * 0.7) * ((100vw - 320px) / 1920));
      }
    }

    .home__content-btn {
      padding: 20px 40px;
      background: linear-gradient(313.32deg, #6e3284 17.58%, #86489c 131.17%);
      color: #fff;
      border-radius: 10px;

      margin-top: 50px;
      margin-bottom: 30px;

      font-size: calc(20px + 12 * (100vw / 1920));

      @media (max-width: 320px) {
        font-size: calc(20px + (12 + 12 * 0.7) * ((100vw - 320px) / 1920));
      }
    }
  }

  .home__container {
    max-width: 1180px;
    width: 100%;
    margin: 0 auto;
  }
}
</style>
