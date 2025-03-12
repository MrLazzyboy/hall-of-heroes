<template>
    <transition name="fade">
        <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
            <transition name="modal">
                <div class="modal-content">
                    <div class="modal__content-top">
                        <button class="close-btn" @click="closeModal"><i class="fal fa-times"></i></button>
                    </div>
                    <h3 class="modal-content__title">Соскучились по приключениям?</h3>

                    <form class="modal-content__form">
                        <div class="inputs">
                            <div class="input__group">
                                <input type="text" placeholder="Введите логин, Email или телефон">
                            </div>

                            <div class="input__group">
                                <input :type="passwordVisible ? 'text' : 'password'" placeholder="Введите пароль">
                                <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
                                    @click="togglePasswordVisibility">
                                </i>
                            </div>
                        </div>

                        <router-link to="/user" @click="closeModal" class="content__form-btn login">Войти</router-link>

                        <router-link to="/admin" @click="closeModal" class="content__form-btn vk">
                            <i class="fab fa-vk"></i> Войти с помощью ВКонтакте
                        </router-link>

                        <router-link to="/registration" @click="closeModal"
                            class="content__form-btn registration">Зарегистрироваться</router-link>

                        <router-link to="/reset-password" @click="closeModal"
                            class="content__form-link forgot__password" href="#!">Забыли пароль?</router-link>
                    </form>
                </div>
            </transition>
        </div>
    </transition>
</template>
<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

defineProps<{ isOpen: boolean }>();
const emit = defineEmits(['close']);

const passwordVisible = ref(false);

const closeModal = () => {
    emit('close');
};

const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value;
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Анимация модального окна */
.modal-enter-active,
.modal-leave-active {
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(0.9);
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
}

.modal-content {
    background: #0a060c;
    padding: 20px;
    border-radius: 10px;
    position: relative;

    display: flex;
    flex-direction: column;

    max-width: 481px;
}

.modal__content-top {
    display: flex;
    align-items: center;
    justify-content: end;

    .close-btn {
        background: none;
        border: none;
        outline: none;

        i {
            color: #38393f;
            font-size: 18px;
        }
    }
}

.modal-content__title {
    background: var(--04-text-h1-style,
            linear-gradient(90deg,
                rgba(203, 190, 205, 1) 0%,
                rgba(255, 255, 255, 1) 46.50000035762787%,
                rgba(203, 190, 205, 1) 100%));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    font-size: 32px;
    margin-bottom: 28px;
}

.modal-content__form {
    display: flex;
    flex-direction: column;


    .inputs {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
}

.content__form-btn {
    width: 100%;
    padding: 15px 0;
    border-radius: 10px;
    color: #eee0f1;
    font-size: 20px;
    border: none;
    outline: none;


    display: flex;
    align-items: center;
    justify-content: center;

}

.login {
    background: #422748;
    margin-top: 28px;
    margin-bottom: 12px;
}

.vk {
    background: #335781;
    margin-bottom: 28px;
    gap: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
        color: #233751;
        font-size: 16px;
    }
}

.registration {
    background: #86489c;
    margin-bottom: 28px;
}

.content__form-link {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #86489c;
}
</style>