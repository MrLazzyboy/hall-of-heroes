<template>
  <transition name="fade">
    <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
      <transition name="modal">
        <div class="modal-content add-modal">
          <div class="modal__content-top">
            <button class="close-btn" @click="closeModal"><i class="fal fa-times"></i></button>
          </div>
          <h3 class="modal-content__title">
            {{ item._id ? 'Изменить новость' : 'Добавить новость' }}</h3>

          <form @submit.prevent="submit" class="modal-content__form">
            <div class="inputs">
              <div class="input__wrapper">
                <label>Название<span>*</span></label>
                <div class="input__group">
                  <input v-model="values.title" type="text" name="title" id="title"
                         placeholder="Как будет называться новость?">
                </div>
                <p v-if="errors.title" class="error-msg">{{ errors.title }}</p>

              </div>
              <div class="event-main__image">
                <label class="settings__top-left">
                  <div class="file-upload__img">
                    <img src="@/assets/icons/FilePlus.svg" alt="">
                  </div>
                  <input hidden="hidden" type="file" id="image" accept="image/jpeg, image/jpg, image/png"
                         @change="handleFileUpload">
                  <div class="file-upload__info">
                    <div class="settings__left-title">Нажмите для выбора изображения, либо перетащите его</div>
                    <div class="settings__left-subtitle">Формат jpeg, jpg, png, весом не более 1 MB и размером не более
                      2000 × 200
                    </div>
                  </div>
                </label>
              </div>
              <div class="input__wrapper">
                <label>Краткое описание<span>*</span></label>

                <textarea v-model="values.short_description" type="text" name="about_you" id="about_you"
                          placeholder="Напишите здесь что-нибудь"></textarea>
                <div class="input__wrapper-txt">Не более 350 символов, включая пробелы</div>
                <p v-if="errors.short_description" class="error-msg">{{ errors.description }}</p>

              </div>
              <div class="input__wrapper">
                <label>Полное описание <span>*</span></label>

                <textarea v-model="values.description" type="text" name="about_you" id="about_you"
                          placeholder="Напишите здесь что-нибудь"></textarea>
                <div class="input__wrapper-txt">Не более 350 символов, включая пробелы</div>
                <p v-if="errors.description" class="error-msg">{{ errors.description }}</p>

              </div>
            </div>

            <button  @click="submit" class="content__form-btn add">
              {{ item._id ? 'Изменить' : 'Добавить' }}
            </button>


          </form>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted, watch } from 'vue'
import { useToast } from 'vue-toastification'
import { createUserService } from '@/services'

const props = defineProps<{ isOpen: boolean, item: object }>()
const emit = defineEmits(['close', 'save'])

const passwordVisible = ref(false)

const values = ref({
  title: '',
  short_description: '',
  description: '',
})
const errors = ref({
  title: '',
  short_description: '',
  description: ''
})
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    values.value = props.item
  } else {
    values.value = {
      title: '',
      short_description: '',
      description: '',
    }
  }
}, { immediate: true })
const closeModal = () => {
  emit('close')
}
const saveModal = () => {
  emit('save', values.value)
}
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FormData()

    reader.append('file', file)
    // createUserService().updateAvatar(reader).then(() => {
    //   toast.success('Avatar updated successfully')
    // }).catch(error => {
    //   toast.error(error.message)
    // }).finally(() => {
    //   avatarUpload.value = false
    // })
  }
}
const toast = useToast()

const submit = () => {
  if (values.value.title && values.value.description && values.value.short_description) {
    if (props.item) {
      saveModal()
    } else {
      closeModal()
    }
  } else {
    toast.error('Заполните все поля')
  }
}
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value
}

</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
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
    white-space: nowrap;

    span {
      color: #f0515e;
    }
  }

}
.input-error input {
  border-color: #f0515e !important;
}

.error-msg {
  color: #f0515e;
  font-size: 14px;
}
.input__group {
  width: 100%;


  &._no-padding {
    padding: 0 12px;
  }
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

.add-modal {
  max-width: 560px;
  width: 100%;
}

.modal-content {
  background: #0a060c;
  padding: 20px;
  border-radius: 10px;
  position: relative;

  display: flex;
  flex-direction: column;

  max-width: 758px;
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

.add {
  margin-top: 31px;
  background: #000;
  background: var(--05-success-main, #4a7548);
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

.settings__top-left {
  width: 100%;
  background: transparent;
  border-radius: 15px;
  border-style: dashed;
  border-color: #321939;
  border-width: 1px;
  gap: 24px;
  display: flex;
  flex-direction: row !important;
  align-items: center;
  justify-content: center;
  padding: 14px 14px;
  margin-top: 28px;


  .file-upload__img {
    background: linear-gradient(114.17deg, rgba(54, 38, 38, 0.3) -3.5%, rgba(34, 27, 36, 0.3) 47.08%, rgba(54, 38, 38, 0.3) 97.65%);
    min-width: 180px;
    height: 167px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .file-upload__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .settings__left-title {
      color: var(--04-text-main, #eee0f1);
      text-align: center;
      font-size: var(--pc-button-1-font-size, 20px);
      margin-bottom: 16px;
    }

    .settings__left-subtitle {
      color: var(--04-text-main, #eee0f1);
      text-align: center;
      max-width: unset;
    }
  }

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
</style>
