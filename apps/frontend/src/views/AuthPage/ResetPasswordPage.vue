<!-- MainContent.vue -->
<template>
  <div class="reset">
    <img class="reset__bg" src="./images/bg1.png" alt="">
    <div class="reset__container container">
      <h3 class="reset__title">Восстановление пароля</h3>

      <form action="" class="reset__form">
        <div class="reset__form-row">
          <div class="reset__form-title">Введите email, к которому привязан аккаунт</div>
          <div class="reset__form-input">
            <div class="input__group">
              <input type="email" name="" id="" placeholder="Введите Email">
            </div>
          </div>
        </div>
        <router-link to="/require-password" class="reset__btn btn">Восстановить</router-link>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.reset {
  padding: 151px 10px 0 10px;
  margin-bottom: 81px;
  position: relative;
  min-height: 100vh;
  height: 100%;
  display: flex;
  justify-content: center;


  .reset__bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    object-fit: cover;
  }

  .reset__container {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;

    flex-direction: column;
    padding: 100px 0;

    .reset__title {
      background: linear-gradient(90deg, rgba(203, 190, 205, 1) 0%, rgba(255, 255, 255, 1) 46.5%, rgba(203, 190, 205, 1) 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-align: center;
      font-size: 56px;
      font-family: 'Alegreya-Medium';
      font-weight: 500;
      margin-bottom: 12px;
      margin-bottom: 50px;


      font-size: calc(32px + 24 * (100vw / 1920));


      @media (max-width: 648px) {

        margin-bottom: 16px !important;
      }


      @media (max-width: 320px) {
        font-size: calc(32px + (24 + 24 * 0.7) * ((100vw - 320px) / 1920));
      }

    }

    .reset__form {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 35px;
    }

    .reset__form-row {
      display: flex;
      gap: 5px;
      width: 100%;
      flex-grow: 1;
      justify-content: center;



      @media (max-width: 648px) {
        flex-direction: column;
        align-items: center;
      }

      .reset__form-title {
        color: #eee0f1;

        max-width: 359px;
        width: 100%;


        font-size: calc(18px + 8 * (100vw / 1920));

        @media (max-width: 648px) {
          text-align: center;
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
        }


        @media (max-width: 320px) {
          font-size: calc(18px + (8 + 8 * 0.7) * ((100vw - 320px) / 1920));
        }
      }

      .reset__form-input {
        max-width: 400px;
        width: 100%;

        @media (max-width: 648px) {
          max-width: 100%;
        }

        div {
          width: 100%;
        }
      }
    }

    .reset__btn {
      background: #86489c;
      color: #eee0f1;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 380px;
      width: 100%;
      padding: 15px 0;
      border-radius: 10px;
      flex-grow: 1;
      flex-shrink: 1;
    }

  }
}
</style>
