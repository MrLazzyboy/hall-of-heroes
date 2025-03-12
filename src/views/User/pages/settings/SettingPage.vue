<script setup lang="ts">
import { ref, computed } from 'vue';

const form = ref({
    login: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    oldPassword: ''
});

const errors = ref({
    login: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    oldPassword: ''
});

const oldPasswordVisible = ref(false);
const passwordVisible = ref(false);
const passwordVisibleRequire = ref(false);

const toggleOldPasswordVisibility = () => {
    oldPasswordVisible.value = !oldPasswordVisible.value;
};


const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value;
};

const togglePasswordRequireVisibility = () => {
    passwordVisibleRequire.value = !passwordVisibleRequire.value;
};

</script>
<template>
    <div class="settings">
        <form action="">
            <div class="settings__top">
                <div class="settings__top-left">
                    <img src="./images/Vector.svg" alt="">

                    <div class="settings__left-title">Нажмите для выбора изображения, либо перетащите его</div>
                    <div class="settings__left-subtitle">Формат jpeg, jpg, png, весом не более 1 MB и размером не более
                        2000 × 200</div>
                </div>
                <div class="settings__top-right">
                    <div class="settings__right-title">Личная информация</div>
                    <div class="setting__right-row">
                        <div class="input__wrapper">
                            <label for="name">Имя</label>
                            <div class="input__group">
                                <input type="text" name="name" id="name" placeholder="Как к Вам обращаться?">
                            </div>
                        </div>
                        <div class="input__wrapper">
                            <label for="login">Логин</label>
                            <div class="input__group">
                                <input type="text" v-model="form.login" name="login" id="login"
                                    placeholder="Введите Логин">
                            </div>

                        </div>

                    </div>

                    <div class="setting__right-row">
                        <div class="input__wrapper">
                            <label for="phone">Телефон</label>
                            <div class="input__group">
                                <input type="text" v-model="form.phone" name="phone" id="phone"
                                    placeholder="+7 999 999-99-99">
                            </div>
                            <div class="input__wrapper-txt">Виден только администрации</div>
                        </div>
                        <div class="input__wrapper">
                            <label for="email">Email</label>
                            <div class="input__group">
                                <input type="text" v-model="form.email" name="email" id="email"
                                    placeholder="Введите почту">
                            </div>
                            <div class="input__wrapper-txt">Виден только администрации</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="setting__right-row">


                <div class="input__wrapper">
                    <label for="about_you">Расскажите о себе</label>

                    <textarea type="text" name="about_you" id="about_you"
                        placeholder="Пусть весь мир узнает"></textarea>
                    <div class="input__wrapper-txt">Не более 350 символов, включая пробелы</div>

                </div>
                <div class="input__wrapper">
                    <label for="social">Ссылка на соц. сеть</label>
                    <div class="input__group">
                        <input type="text" name="social" id="social" placeholder="Телеграм или ВК">
                    </div>
                    <div class="input__wrapper-txt">Видно в профиле по умолчанию</div>
                </div>


            </div>

            <div class="settings__reset-password">
                <div class="settings__reset-title">Смена пароля</div>

                <div class="settings__reset-row">
                    <div class="input__wrapper" :class="{ 'input-error': errors.password }">
                        <label for="password">Текущий пароль</label>
                        <div class="input__group">
                            <input :type="oldPasswordVisible ? 'text' : 'password'" v-model="form.oldPassword"
                                id="oldPassord" placeholder="Введите пароль">
                            <i :class="oldPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
                                @click="toggleOldPasswordVisibility"></i>
                        </div>
                        <p v-if="errors.oldPassword" class="error-msg">{{ errors.oldPassword }}</p>
                    </div>
                    <div class="input__wrapper" :class="{ 'input-error': errors.password }">
                        <label for="password">Новый пароль</label>
                        <div class="input__group">
                            <input :type="passwordVisible ? 'text' : 'password'" v-model="form.password" id="password"
                                placeholder="Введите пароль">
                            <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
                                @click="togglePasswordVisibility"></i>
                        </div>
                        <p v-if="errors.password" class="error-msg">{{ errors.password }}</p>
                    </div>
                    <div class="input__wrapper"
                        :class="{ 'input-error': errors.confirmPassword }">
                        <label for="confirmPassword">Повторите пароль</label>
                        <div class="input__group">
                            <input :type="passwordVisibleRequire ? 'text' : 'password'" v-model="form.confirmPassword"
                                id="confirmPassword" placeholder="Введите пароль">
                            <i :class="passwordVisibleRequire ? 'fas fa-eye-slash' : 'fas fa-eye'"
                                @click="togglePasswordRequireVisibility"></i>
                        </div>
                        <p v-if="errors.confirmPassword" class="error-msg">
                            {{ errors.confirmPassword }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="settings__btns">
                <div class="settings__btn submit">Новые настройки применены</div>
                <div class="settings__btn cancel">Отмена</div>
            </div>
        </form>
    </div>
</template>
<style lang="scss" scoped>
.settings {
    background: var(--plate-main,
            radial-gradient(closest-side,
                rgba(44, 38, 47, 0.3) 0%,
                rgba(21, 21, 22, 0.3) 100%));
    border-radius: 10px;
    border-style: solid;
    border-color: var(--based-stroke, #18171e);
    border-width: 1px;
    padding: 28px;

    .settings__top {
        display: flex;
        align-items: start;
        gap: 20px;
        margin-bottom: 20px;

        @media (max-width: 990px) {
            flex-direction: column;
        }

        .settings__top-left {
            max-width: 252px;
            width: 100%;
            background: var(--03-dark-2, #18171e);
            border-radius: 5px;
            border-style: dashed;
            border-color: #321939;
            border-width: 1px;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 32px 0;


            @media (max-width: 990px) {
                max-width: 100%;
            }

            img {
                margin-bottom: 12px;
            }

            .settings__left-title {
                color: var(--04-text-main, #eee0f1);
                text-align: center;
                font-size: var(--pc-button-1-font-size, 20px);
                margin-bottom: 33px;
            }

            .settings__left-subtitle {
                color: #815692;
                text-align: center;
                font-size: var(--pc-helper-text-font-size, 14px);
                max-width: 204px;
                width: 100%;
            }
        }

        .settings__top-right {
            display: flex;
            flex-direction: column;
            gap: 20px;


            @media (max-width: 990px) {
                width: 100%;
            }

            .settings__right-title {


                color: var(--01-primary-color-5, #d5b0e4);
                text-align: left;
                font-size: var(--pc-h3-font-size, 32px);

                @media (max-width: 990px) {
                    display: none;
                }
            }
        }
    }


    .setting__right-row {
        display: flex;
        gap: 8px;
        width: 100%;

        @media (max-width: 500px) {
            flex-direction: column;
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

}

.settings__reset-password {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 28px;

    .settings__reset-title {
        color: var(--01-primary-color-5, #d5b0e4);
        text-align: left;
        font-size: var(--pc-h3-font-size, 32px);
    }


    .settings__reset-row {
        display: flex;
        gap: 19px;
        width: 100%;

        @media (max-width: 990px) {
            flex-direction: column;
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
}

.settings__btns {
    display: flex;
    margin-top: 28px;
    gap: 19px;
    justify-content: space-between;

    @media (max-width: 670px) {
        flex-direction: column;
    }


    .settings__btn {
        padding: 15px 0;
        color: var(--04-text-main, #eee0f1);
        text-align: center;
        font-size: var(--pc-button-1-font-size, 20px);



    }

    .submit {
        max-width: 543px;
        width: 100%;
        background: var(--05-success-main, #4a7548);
        border-radius: 10px;

        @media (max-width: 670px) {
            max-width: 100%;
        }
    }

    .cancel {
        max-width: 262px;
        width: 100%;
        background: var(--08-unavailable-2, #545560);
        border-radius: 10px;

        @media (max-width: 670px) {
            max-width: 100%;
        }
    }
}
</style>