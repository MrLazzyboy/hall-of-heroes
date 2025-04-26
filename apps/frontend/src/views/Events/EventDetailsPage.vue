<template>
  <div class="event-page">
    <!-- Main Content -->
    <main class="event ">
      <div class="event__container container">
        <!-- Event Header -->
        <div class="event__header">
          <div class="event__titles">
            <h1 class="event__title">Название события</h1>
            <h2 class="event__subtitle">Игровая сессия</h2>
          </div>
          <router-link :to="{ name: 'events'}" class="event__back-btn">
            <span class="event__back-icon">
              <img src="./images/CaretDown.svg" alt="">
            </span>
            <span>
              Вернуться к событиям
            </span>

          </router-link>
        </div>

        <!-- Event Card -->
        <div class="event-content__wrapper">
          <button v-if="event.role === 'Master' && user.role === 'Admin'" class="event-card__edit-btn" @click="goToEdit">
            <img src="@/assets/icons/PencilSimple.svg" alt="">
          </button>
          <div class="event-card" :class="{
            'event-card--approved': event.status === 'approved',
            'event-card--pending': event.status === 'pending',
            'event-card--rejected': event.status === 'rejected'
          }">
            <div class="event-card__image-container">
              <img src="./images/bg.jpg" alt="Event image" class="event-card__image">
              <div v-if="event.status === 'pending'" class="event-card__status">Ждёт утверждения</div>
              <div class="event-card__price">{{ event.price }} ₽</div>
            </div>

            <div class="event-card__content">
              <div class="event-card__header">
                <h3 class="event-card__name">Система, Oneshot (3–4 часа)</h3>

              </div>

              <div class="event-card__tags">
                <span class="event-card__tag event-card__tag--purple">Genre</span>
                <span class="event-card__tag event-card__tag--purple">Genre</span>
                <span class="event-card__tag event-card__tag--purple">Genre</span>
                <span class="event-card__tag event-card__tag--purple">Genre</span>
                <span class="event-card__tag event-card__tag--green">Setting</span>
                <span class="event-card__tag event-card__tag--blue">Duration</span>
              </div>

              <div class="event-card__details">
                <div class="event-card__details-column">
                  <div class="event-card__detail">
                  <span class="event-card__detail-icon event-card__detail-icon--purple">
                    <img src="./images/CalendarBlank.svg" alt="">
                  </span>
                    <span class="event-card__detail-text">25 ноября</span>
                  </div>
                  <div class="event-card__detail">
                  <span class="event-card__detail-icon event-card__detail-icon--purple">
                    <img src="./images/Clock.svg" alt="">
                  </span>
                    <span class="event-card__detail-text">19:00-23:00</span>
                  </div>
                  <div class="event-card__detail">
                  <span class="event-card__detail-icon event-card__detail-icon--purple">
                    <img src="./images/Door.svg" alt="">
                  </span>
                    <span class="event-card__detail-text">Зал Балдежа</span>
                  </div>
                </div>

                <div class="event-card__details-column">
                  <div class="event-card__detail">
                  <span class="event-card__detail-icon event-card__detail-icon--purple">
                    <img src="./images/CastleTurret.svg" alt="">
                  </span>
                    <span class="event-card__detail-text">Только новички</span>
                  </div>
                  <div class="event-card__detail">
                  <span class="event-card__detail-icon event-card__detail-icon--purple">
                    <img src="./images/Sword.svg" alt="">
                  </span>
                    <span class="event-card__detail-text">Подготовка минимальная</span>
                  </div>
                  <div class="event-card__detail">
                  <span class="event-card__detail-icon event-card__detail-icon--purple">
                    <img src="./images/Ghost.svg" alt="">
                  </span>
                    <span class="event-card__detail-text">Низкий уровень персонажа</span>
                  </div>
                </div>
              </div>

              <div class="event-card__description">
                <p class="event-card__text">
                  В королевстве, охваченном тьмой, группа смелых искателей приключений отправляется в опасное путешествие,
                  чтобы спасти мир от забытого зла. Их путь лежит через мрачные леса и заброшенные руины, где каждый шаг
                  может стать последним.
                </p>
                <p class="event-card__text">
                  Смогут ли они преодолеть все преграды и вернуть свет в этот мир, или тьма поглотит их навсегда?..
                </p>
              </div>
            </div>
          </div>

          <!-- Occupancy -->
          <div class="occupancy">
            <div class="occupancy-actions">
              <div class="occupancy__header">
                <h3 class="occupancy__title">Занято мест</h3>
                <div class="occupancy__counter">
                  <img src="./images/Users.svg" alt="">
                  <span class="occupancy__counter-current">8</span>
                  <span class="occupancy__counter-separator">/</span>
                  <span class="occupancy__counter-total">10</span>
                </div>
              </div>

              <div class="occupancy__actions" :class="{
                wrap: event.status === 'pending' && user.role === 'Admin'
              }">

                <template v-if="user.role === 'Admin' || user.role !== 'Master'">
                  <template v-if="event.status === 'pending' && user.role === 'Admin'">
                    <button class="occupancy__btn occupancy__btn--green">
                      <span class="occupancy__btn-icon">
                        <img src="./images/ThumbsUp.svg" alt="">
                      </span>
                      Утвердить событие
                    </button>
                    <button class="occupancy__btn occupancy__btn--close">
                    <span class="occupancy__btn-icon rotate-180">
                      <img src="./images/ThumbsUp.svg" alt="" >
                    </span>
                      Отправить на доработку
                    </button>
                  </template>
                  <template v-else>
                    <div class="occupancy__btn occupancy__btn--lock">
                      <span class="occupancy__btn-icon">
                        <img src="./images/LockKeyOpen.svg" alt="">
                      </span>
                    </div>
                    <button class="occupancy__btn occupancy__btn--close">
                      <span class="occupancy__btn-icon">
                        <img src="./images/WarningCircle.svg" alt="">
                      </span>
                      Закрыть запись
                    </button>
                    <button v-if="user.role === 'Admin'" class="occupancy__btn occupancy__btn--cancel">
                        <span class="occupancy__btn-icon">
                          <img src="@/assets/icons/Skull.svg" alt="">
                        </span>
                      Отменить событие
                    </button>
                  </template>

                </template>
              </div>
            </div>
            <div v-if="user.role === 'Admin'" class="game-master">
              <h3 class="game-master__title">Проводит мастер</h3>
              <div class="game-master__info">
                <div class="game-master__avatar">

                </div>
                <div class="game-master__name">Nickname</div>
                <div class="game-master__star">⭐</div>
              </div>
            </div>
            <div class="participants" v-if="event.status !== 'approved'">
              <div class="participants__list">
                <label for="" class="filters__option">
                  <div class="filters__checkbox">
                    <input type="checkbox" name="" id="">
                  </div>
                  <div class="filters__label">Никнейм22231</div>
                </label>
                <label for="" class="filters__option">
                  <div class="filters__checkbox">
                    <input type="checkbox" name="" id="">
                  </div>
                  <div class="filters__label">Никнейм22231</div>
                </label>
                <label for="" class="filters__option">
                  <div class="filters__checkbox">
                    <input type="checkbox" name="" id="">
                  </div>
                  <div class="filters__label">Никнейм22231</div>
                </label>
                <label for="" class="filters__option">
                  <div class="filters__checkbox">
                    <input type="checkbox" name="" id="">
                  </div>
                  <div class="filters__label">Никнейм22231</div>
                </label>
                <label for="" class="filters__option">
                  <div class="filters__checkbox">
                    <input type="checkbox" name="" id="">
                  </div>
                  <div class="filters__label">Никнейм22231</div>
                </label>
                <label for="" class="filters__option">
                  <div class="filters__checkbox">
                    <input type="checkbox" name="" id="">
                  </div>
                  <div class="filters__label">Никнейм22231</div>
                </label>
                <label for="" class="filters__option">
                  <div class="filters__checkbox">
                    <input type="checkbox" name="" id="">
                  </div>
                  <div class="filters__label">Никнейм22231</div>
                </label>
                <div class="participants__actions">
                  <button class="participants__btn participants__btn--add-user">

                  <span class="participants__btn-icon">
                    <img src="./images/UserCirclePlus.svg" alt="">
                  </span>
                    Добавить пользователя
                  </button>
                  <button class="participants__btn participants__btn--add-favorite">
                  <span class="participants__btn-icon">
                    <img src="./images/PersonArmsSpread.svg" alt="">
                  </span>
                    Добавить болванку
                  </button>
                </div>
              </div>
            </div>

          </div>

          <!-- Game Master -->


          <!-- Participants -->


          <!-- Tabs -->
          <div class="event-tabs">
            <div class="event-tabs__header">
              <button class="event-tabs__tab event-tabs__tab--active">Описание</button>
              <button class="event-tabs__tab">О мастере</button>
            </div>

            <div class="event-tabs__content">
              <div class="event-tabs__section">
                <h4 class="event-tabs__subtitle">Предыстория:</h4>
                <p class="event-tabs__text">
                  Королевство Эландор когда-то было процветающим и мирным местом, но теперь его окутала тьма. Древние
                  пророчества шепчут о возвращении забытого зла, известного как Темный Властелин. Группа отважных героев
                  решает взять на себя миссию по спасению мира.
                </p>

                <h4 class="event-tabs__subtitle">Сюжет:</h4>
                <p class="event-tabs__text">
                  Группа героев начинает своё путешествие с небольшого городка, где они узнают о первых знаках возвращения
                  Тёмного Властелина. Они отправляются в мрачные леса, где сталкиваются с древними духами и магическими
                  существами. Затем их путь лежит через заброшенные руины, охраняемые древними стражами, и города, где
                  каждый шаг может стать последним.
                </p>

                <h4 class="event-tabs__subtitle">Цели:</h4>

              </div>
            </div>
          </div>
        </div>


      </div>
    </main>
  </div>
</template>

<script setup lang="ts">

import { computed, onMounted, ref } from 'vue'
import { createEventsService } from '@/services/eventsService'
import { useRoute, useRouter } from 'vue-router'
import { useUserGlobal } from '@/stores/userGlobal'
import { useToast } from 'vue-toastification'

const event = ref({})
const route = useRoute()
const router = useRouter()

const userStore = useUserGlobal()
const toast = useToast()
const user = computed(() => {
  return userStore.user
})

const goToEdit = () => {
  router.push({
    name: 'event-add',
    params: {
      id: event.value._id
    }
  })
}
onMounted(() => {
  // Fetch event details from API or store
  // For example:
  // const eventDetails = await fetchEventDetails(eventId);
  // event.value = eventDetails;

  createEventsService().getEventById(route.params.id)
    .then(res => {
      event.value = res
    })
    .catch(error => {
      toast.error(error.data.error || 'Ошибка при получении события')
    })
})
</script>

<style scoped lang="scss">
/* Reset and base styles */


/* BEM Styling */
.event-page {
  display: flex;
  flex-direction: column;
  background: url("./images/44d058525e0269b3c780970e3b2a667b.jpg") no-repeat center center;

}


/* Event */
.event {
  flex: 1;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.9) 0%, rgba(5, 16, 15, 0.95) 50%, rgba(0, 0, 0, 0.9) 100%),
  linear-gradient(180deg, #070407 0%, rgba(33, 26, 37, 0) 88.08%),
  linear-gradient(180deg, rgba(0, 0, 0, 0) 91.26%, #000000 100%);

}
.event-content__wrapper {
  background: radial-gradient(53.64% 101.47% at 51.36% 54.36%, rgba(44, 38, 47, 0.3) 0%, rgba(21, 21, 22, 0.3) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
;
  padding: 28px;
  border: 1px solid #18171E;
  border-radius: 10px;
  position: relative;

}
.filters__option {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-direction: row-reverse;
  cursor: pointer;
  justify-content: flex-end;

  .filters__checkbox {
    position: relative;
    width: 20px;
    height: 20px;

    input {
      width: 100%;
      height: 100%;
      appearance: none;
      background: var(--08-unavailable-dark, #26262c);
      border-radius: 4px;
      border: 2px solid var(--based-stroke, #18171e);
      transition: background 0.3s ease, border-color 0.3s ease;
      position: relative;
      cursor: pointer;

      &:checked {
        background: #9b59b6;
        border-color: #9b59b6;
      }

      &:checked::before {
        content: "\2713"; // Юникод галочки
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
        color: white;
        font-weight: bold;
      }
    }
  }

  .filters__label {
    color: var(--04-text-main, #eee0f1);
    text-align: left;
    font-size: var(--pc-button-3-font-size, 16px);
  }

}

.event__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 40px;
  padding: 16px 0;
}

.event__titles {
  display: flex;
  align-items: center;
  gap: 20px;
}

.event__title {
  font-size: 32px;
  font-weight: bold;
  color: #ffffff;
}

.event__subtitle {
  font-size: 20px;
  color: #4a90e2;
  font-weight: normal;
}

.event__back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #EEE0F1;
  text-decoration: none;
  font-size: 14px;
  background: #18171E;
  padding: 8px 16px;
  border-radius: 10px;
  transition: background-color 0.3s;

  &-icon {
    display: flex;
    align-items: center;
    justify-content: center;

    img  {
      width: 24px;
      height: 24px;
    }
  }
}

.event__back-btn:hover {
  background-color: #252535;
}

/* Event Card */
.event-card {

  overflow: hidden;
  margin-bottom: 30px;
  display: flex;
  &__status {
    font-family: Alegreya;
    font-weight: 400;
    font-size: 16px;
    line-height: 120%;
    letter-spacing: 0%;
    text-align: center;
    font-variant-numeric-figure: lining-nums;
    font-variant-numeric-spacing: proportional-nums;
    width: 158px;
    height: 35px;
    border-radius: 10px;
    gap: 8px;
    padding-top: 8px;
    padding-right: 14px;
    padding-bottom: 8px;
    padding-left: 12px;
    background: #886535;
    color: #EEE0F1;
    position: absolute;
    left: 12px;
    top: 12px;
  }
}

.event-card__image-container {
  min-width: 352px;
  max-width: 352px;
  min-height: 422px;
  max-height: 422px;
  border-radius: 15px;
  gap: 10px;
  overflow: hidden;

  position: relative;
}

.event-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.event-card__price {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background-color: #4caf50;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  width: 142px;
  height: 54px;
  border-radius: 10px;
  gap: 8px;
  padding-top: 8px;
  padding-right: 14px;
  padding-bottom: 8px;
  padding-left: 12px;

}

.event-card__content {
  padding: 20px;
}

.event-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.event-card__name {
  font-family: Alegreya SC;
  font-weight: 500;
  font-size: 32px;
  line-height: 114.99999999999999%;
  letter-spacing: 0%;
  font-variant-numeric-figure: lining-nums;
  font-variant-numeric-spacing: proportional-nums;
  color: #CDC2D1;
}

.event-card__edit-btn {
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 56px;
  height: 54px;
  background: #D23C48;
  border-radius: 10px;
  padding: 16px;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
}

.event-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.event-card__tag {
  padding: 8px 12px;
  border-radius: 28px;
  color: #EEE0F1;
  font-family: Alegreya;
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  letter-spacing: 0%;
  font-variant-numeric-figure: lining-nums;
  font-variant-numeric-spacing: proportional-nums;

}

.event-card__tag--purple {
  background-color: #86489C;
}

.event-card__tag--green {
  background-color: #4A7548;
}

.event-card__tag--blue {
  background-color: #335781;
}

.event-card__details {
  display: flex;
  margin-bottom: 20px;
}

.event-card__details-column {
  flex: 1;
}

.event-card__detail {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.event-card__detail-text {
  font-family: Alegreya;
  font-weight: 400;
  font-size: 20px;
  line-height: 120%;
  letter-spacing: 0%;
  font-variant-numeric-figure: lining-nums;
  font-variant-numeric-spacing: proportional-nums;
  color: #D5B0E4;

}

.event-card__detail-icon {
  margin-right: 10px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.event-card__detail-icon--purple {
  color: #9c27b0;
}

.event-card__description {
  font-family: Alegreya;
  font-weight: 400;
  font-size: 20px;
  line-height: 120%;
  letter-spacing: 0%;
  font-variant-numeric-figure: lining-nums;
  font-variant-numeric-spacing: proportional-nums;
  color: #EEE0F1;

}

.event-card__text {
  margin-bottom: 15px;
}

/* Occupancy */
.occupancy {
  background: linear-gradient(257.41deg, rgba(90, 51, 98, 0.2) -4.79%, rgba(31, 24, 33, 0.2) 86.4%);

  border-radius: 10px;
  padding: 20px 28px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.occupancy-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.occupancy__header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.occupancy__title {
  font-family: Alegreya SC;
  font-weight: 500;
  font-size: 32px;
  line-height: 114.99999999999999%;
  letter-spacing: 0%;
  font-variant-numeric-figure: lining-nums;
  font-variant-numeric-spacing: proportional-nums;
  color: #EEE0F1;
}

.occupancy__counter {
  display: flex;
  align-items: center;
  font-family: Alegreya SC;
  font-weight: 500;
  font-size: 20px;
  line-height: 120%;
  letter-spacing: 0%;
  text-align: center;
  font-variant-numeric-figure: lining-nums;
  font-variant-numeric-spacing: proportional-nums;
  color: #86489C;

}

.occupancy__counter img {
  margin-right: 10px;
  width: 24px;
  height: 24px;
}

.occupancy__counter-separator {
  margin: 0 3px;
}

.occupancy__lock-icon {
  margin-left: auto;
}

.occupancy__actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.occupancy__btn {
  border: none;
  color: #EEE0F1;

  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 54px;
  border-radius: 10px;
  gap: 10px;
  padding-top: 16px;
  padding-right: 24px;
  padding-bottom: 16px;
  padding-left: 22px;
  font-family: Alegreya SC;
  font-weight: 500;
  font-size: 20px;
  line-height: 120%;
  letter-spacing: 0%;
  text-align: center;
  font-variant-numeric-figure: lining-nums;
  font-variant-numeric-spacing: proportional-nums;

}

.occupancy__btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 24px;
    height: 24px;
  }

  &.rotate-180 {
    transform: rotate(180deg);
  }
}

.occupancy__btn--lock {
  width: 56px !important;
  height: 54px !important;
  border-radius: 10px;
  padding: 16px;
  gap: 10px;
  background: linear-gradient(109.35deg, rgba(0, 0, 0, 0.3) -1.6%, rgba(22, 19, 23, 0.3) 48.61%, rgba(0, 0, 0, 0.3) 98.83%);
  border: 1px solid #18171E
}

.occupancy__btn--close {
  background: #E44653;
}
.occupancy__btn--green{
  background: #4A7548;
}

.occupancy__btn--cancel {
  border: 1px solid #742628;
  background: #1F1821;
  color: #D23C48;
}

/* Game Master */
.game-master {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  gap: 12px;
}

.game-master__title {
  font-family: Alegreya SC;
  font-weight: 500;
  font-size: 32px;
  line-height: 114.99999999999999%;
  letter-spacing: 0%;
  font-variant-numeric-figure: lining-nums;
  font-variant-numeric-spacing: proportional-nums;
  color: #EEE0F1;
}

.game-master__info {
  display: flex;
  align-items: center;
}

.game-master__avatar {
  width: 32px;
  height: 32px;
  background-color: #333340;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.game-master__name {
  color: #4a90e2;
  font-weight: bold;
  margin-right: 10px;
}

/* Participants */
.participants {
  margin-bottom: 30px;
}

.participants__list {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px 10px;
  margin-bottom: 20px;
}

.participants__item {
  background-color: #252535;
  border-radius: 5px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
}

.participants__name {
  font-size: 14px;
}

.participants__name--green {
  color: #4caf50;
}

.participants__name--red {
  color: #e74c3c;
}

.participants__name--gray {
  color: #a8a8b3;
}

.participants__name--gold {
  color: #ffc107;
}

.participants__remove {
  margin-left: 8px;
  color: #e74c3c;
  cursor: pointer;
}

.participants__actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  grid-column-start: 4;
  grid-column-end: 7;
}

.participants__btn {
  border-radius: 10px;
  gap: 10px;
  height: 44px;
  padding-top: 16px;
  padding-right: 12px;
  padding-bottom: 16px;
  padding-left: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #86489C;
  font-family: Alegreya;
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  letter-spacing: 0%;
  text-align: center;
  font-variant-numeric-figure: lining-nums;
  font-variant-numeric-spacing: proportional-nums;
  color: #EEE0F1;

  &-icon {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 24px;
      height: 24px;
    }

  }
}

.participants__btn--add-user {
  background: #86489C;
}

.participants__btn--add-favorite {
  background-color: #18171E;
}

/* Event Tabs */
.event-tabs {
  border-radius: 10px;
  overflow: hidden;
}

.event-tabs__header {
  display: flex;
  width: max-content;
  border-radius: 5px;
  border: 1.34px solid #1F1821;
overflow: hidden;
}

.event-tabs__tab {
  width: 174.5px;
  height: 55px;
  justify-content: space-between;
  padding: 10.73px;

  cursor: pointer;
  transition: background-color 0.3s;

  background: #18171E;
  font-family: Alegreya SC;
  font-weight: 500;
  font-size: 20px;
  line-height: 120%;
  letter-spacing: 0%;
  font-variant-numeric-figure: lining-nums;
  font-variant-numeric-spacing: proportional-nums;
  color: #EEE0F1;

}

.event-tabs__tab--active {
  background: #422748;
  color: #D5B0E4;
  font-weight: bold;
}

.event-tabs__content {
  padding: 20px;
}

.event-tabs__subtitle {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #ffffff;
}

.event-tabs__text {
  font-family: Alegreya;
  font-weight: 400;
  font-size: 20px;
  line-height: 120%;
  letter-spacing: 0%;
  font-variant-numeric-figure: lining-nums;
  font-variant-numeric-spacing: proportional-nums;
  color: #FFFFFF;
}


@media (max-width: 576px) {
  .event__container {
    padding-left: 10px;
    padding-right: 10px;
  }
  .event__header {
    align-items: flex-start;
  }
  .event__titles {
    flex-direction: column;
    gap: 5px;
    align-items: flex-start;
  }

  .event__titles {
    margin-bottom: 10px;
  }

  .event__back-btn {
    span:last-child {
      display: none;
    }
  }

  .event__title {
    font-size: 26px;
  }

  .event__subtitle {
    font-size: 22px;
  }

  .event-content__wrapper {
    padding: 10px;
  }

  .event-card__image-container {
    max-width: 100%;
    min-width: 100%;
    min-height: 253px;
    padding: 0;
    img {
      min-height: 253px;
    }

  }
  .event-card__content {
    padding: 10px 0;
  }
  .event-card__name {
    font-size: 22px;
  }
  .occupancy {
    padding: 18px;
    .occupancy__actions {
      width: 100%;
      &.wrap {
        flex-direction: column;
        gap: 10px;
      }
      .occupancy__btn {
        width: 100%;
      }
    }
    .occupancy__header {
      width: 100%;
      margin-top: 24px;
    }
  }

  .participants__list {
    grid-template-columns: repeat(2, 1fr);
  }

  .participants__actions {
    grid-column-start: 1;
    grid-column-end: 3;
    flex-direction: column;
  }

  .event-tabs__header {
    width: 100%;
  }

  .event-tabs__tab {
    width: 100%;
  }

  .occupancy-actions {
    flex-direction: column-reverse;
    width: 100%;
  }

  .event-card {
    flex-direction: column;
    align-items: flex-start;
    max-width: 100%;
    margin-bottom: 20px;
  }

  .occupancy__btn--lock {
    width: 56px !important;
    height: 56px !important;
    border-radius: 5px;
    padding: 8px;
    gap: 5px;
  }
}
</style>
