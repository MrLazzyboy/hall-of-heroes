<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const form = ref({
  login: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const errors = ref({
  login: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const textareaRef = ref<HTMLTextAreaElement | null>(null);


const autoResize = () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto';
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
  }
};

onMounted(() => {
  autoResize();
});

const passwordVisible = ref(false);
const passwordVisibleRequire = ref(false);

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const togglePasswordRequireVisibility = () => {
  passwordVisibleRequire.value = !passwordVisibleRequire.value;
};

const validateForm = () => {
  errors.value.login = form.value.login ? '' : 'Обязательно';
  errors.value.phone = form.value.phone ? '' : 'Обязательно';
  errors.value.email = form.value.email ? '' : 'Обязательно';
  errors.value.password = form.value.password ? '' : 'Обязательно';
  errors.value.confirmPassword = form.value.confirmPassword ? '' : 'Обязательно';

  if (form.value.password && form.value.confirmPassword && form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = 'Пароли не совпадают';
  }
};

const passwordMatchError = computed(() => {
  return form.value.password && form.value.confirmPassword && form.value.password !== form.value.confirmPassword
    ? 'Пароли не совпадают'
    : '';
});
</script>
<template>
  <div class="registration">
    <img class="registration__bg" src="./images/bg.png" alt="">
    <div class="registration__container container">
      <h3 class="registration__title">Регистрация</h3>
      <h4 class="registration__subtitle">Создайте профиль и погрузитесь в мир приключений вместе с нами!</h4>
      <div class="registration__wrapper">
        <form class="registration__form" @submit.prevent="validateForm">
          <div class="registration__form-row">
            <div class="input__wrapper" :class="{ 'input-error': errors.login }">
              <label for="login">Логин<span>*</span></label>
              <div class="input__group">
                <input type="text" v-model="form.login" name="login" id="login" placeholder="Введите Логин">
              </div>
              <p v-if="errors.login" class="error-msg">{{ errors.login }}</p>
            </div>
            <div class="input__wrapper">
              <label for="name">Имя</label>
              <div class="input__group">
                <input type="text" name="name" id="name" placeholder="Как к Вам обращаться?">
              </div>
            </div>
          </div>
          <div class="registration__form-row">
            <div class="input__wrapper" :class="{ 'input-error': errors.phone }">
              <label for="phone">Телефон<span>*</span></label>
              <div class="input__group">
                <input type="text" v-model="form.phone" name="phone" id="phone" placeholder="+7 999 999-99-99">
              </div>
              <p v-if="errors.phone" class="error-msg">{{ errors.phone }}</p>
            </div>
            <div class="input__wrapper" :class="{ 'input-error': errors.email }">
              <label for="email">Email<span>*</span></label>
              <div class="input__group">
                <input type="text" v-model="form.email" name="email" id="email" placeholder="Введите почту">
              </div>
              <p v-if="errors.email" class="error-msg">{{ errors.email }}</p>
            </div>
          </div>

          <div class="registration__form-row">
            <div class="input__wrapper">
              <label for="social">Ссылка на соц. сеть</label>
              <div class="input__group">
                <input type="text" name="social" id="social" placeholder="Телеграм или ВК">
              </div>
              <div class="input__wrapper-txt">Видно в профиле по умолчанию</div>
            </div>
            <div class="input__wrapper">
              <label for="about_you">Расскажите о себе</label>

              <textarea ref="textareaRef" @input="autoResize" name="about_you" id="about_you"
                placeholder="Пусть весь мир узнает"></textarea>

              <div class="input__wrapper-txt">Не более 350 символов, включая пробелы</div>

            </div>
          </div>

          <div class="registration__form-row">
            <div class="input__wrapper" :class="{ 'input-error': errors.password }">
              <label for="password">Придумайте пароль<span>*</span></label>
              <div class="input__group">
                <input :type="passwordVisible ? 'text' : 'password'" v-model="form.password" id="password"
                  placeholder="Введите пароль">
                <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'" @click="togglePasswordVisibility"></i>
              </div>
              <p v-if="errors.password" class="error-msg">{{ errors.password }}</p>
            </div>
            <div class="input__wrapper" :class="{ 'input-error': errors.confirmPassword || passwordMatchError }">
              <label for="confirmPassword">Повторите пароль<span>*</span></label>
              <div class="input__group">
                <input :type="passwordVisibleRequire ? 'text' : 'password'" v-model="form.confirmPassword"
                  id="confirmPassword" placeholder="Введите пароль">
                <i :class="passwordVisibleRequire ? 'fas fa-eye-slash' : 'fas fa-eye'"
                  @click="togglePasswordRequireVisibility"></i>
              </div>
              <p v-if="errors.confirmPassword || passwordMatchError" class="error-msg">
                {{ errors.confirmPassword || passwordMatchError }}
              </p>
            </div>
          </div>
          <div class="registration__form-row">
            <div class="registration__form-btn">Зарегистрироваться</div>
            <div class="registration__form-txt">Нажимая кнопку «Зарегистрироваться», вы соглашаетесь с политикой
              конфиденциальности.</div>
          </div>
        </form>
      </div>
    </div>


  </div>
</template>



<style lang="scss" scoped>
textarea {
  width: 100%;
  height: 62px !important;

  resize: none;
  overflow-y: auto;
}



.registration {
  padding: 151px 10px 0 10px;
  margin-bottom: 81px;
  position: relative;
  min-height: 100vh;
  height: 100%;
  display: flex;
  justify-content: center;



  .registration__bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    object-fit: cover;
  }

  .registration__title {
    background: linear-gradient(90deg, rgba(203, 190, 205, 1) 0%, rgba(255, 255, 255, 1) 46.5%, rgba(203, 190, 205, 1) 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    font-size: 56px;
    font-family: 'Alegreya-Medium';
    font-weight: 500;
    margin-bottom: 12px;

    font-size: calc(20px + 26 * (100vw / 1920));




    @media (max-width: 320px) {
      font-size: calc(20px + (26 + 26 * 0.7) * ((100vw - 320px) / 1920));
    }
  }

  .registration__container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .registration__subtitle {
    color: #eee0f1;
    font-size: 32px;
    max-width: 780px;
    text-align: center;
    font-family: 'Alegreya-Medium';
    font-weight: 500;
    margin-bottom: 40px;

    font-size: calc(18px + 14 * (100vw / 1920));




    @media (max-width: 320px) {
      font-size: calc(18px + (14 + 14 * 0.7) * ((100vw - 320px) / 1920));
    }
  }
}

.registration__wrapper {
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: start;
}

.registration__form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 780px;
  width: 100%;

  .registration__form-row {
    display: flex;
    gap: 20px;
    width: 100%;

    @media (max-width: 500px) {
      flex-direction: column;
      align-items: center;
    }

    .input__wrapper {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;

      .input__wrapper-txt {
        color: #545560;
        font-size: 14px;
      }

      label {
        color: #eee0f1;
        font-size: 22px;

        span {
          color: #f0515e;
        }
      }
    }

    .input__group {
      width: 100%;
    }
  }

  .input-error input {
    border-color: #f0515e !important;
  }

  .error-msg {
    color: #f0515e;
    font-size: 14px;
  }
}

.registration__form-btn {
  background: #86489c;

  max-width: 380px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  color: #eee0f1;
  font-size: 20px;

  @media (max-width: 500px) {
    padding: 15px 0;
    max-width: 100%;
  }
}

.registration__form-txt {
  color: #cdc2d1;
  font-size: 14px;
  max-width: 356px;
  width: 100%;
  padding: 15px 0;

  @media (max-width: 500px) {
    text-align: center;


  }
}
</style>
