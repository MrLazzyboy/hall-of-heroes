<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useUserGlobal } from '@/stores/userGlobal'
import router from '@/router'

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

enum Statuses {
  pending = 'Событие ожидает',
  rejected = 'Событие отменено',
  approved = 'Событие подтверждено',
  archived = 'Событие завершено',
}

const cancelApproved = () => {
  // Здесь можно добавить логику для отмены события
  console.log('Отмена события', props.event.id)
}

const cancelPending = () => {
  // Здесь можно добавить логику для отмены ожидающего события
  console.log('Отмена ожидающего события', props.event.id)
}
const userStore = useUserGlobal()

const user = computed(() => {
  return userStore.user
})
const goEventAddPage = () => {
  router.push({
    name: 'eventAdd',
    params: {
      id: props.event.id
    }
  })
}
const getDateFormated = (isoDate: string) => {
  const date = new Date(isoDate)

// Get components
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

onMounted(() => {
  // Здесь можно добавить логику, которая будет выполняться при монтировании компонента
  console.log('Card component mounted', props)
})

</script>
<template>
  <div class="event__card">
    <div class="event__card-top">
      <div class="event__card-name">
        {{ event.title }}
      </div>
      <div class="event__top-right">
        <div class="event__card-subtitle">Игровая сессия
        </div>

        <div class="event__card-status">Авторская</div>
      </div>
      <div class="event__top-bottom">
        <div class="event__top-date"><img src="../images/CalendarBlank.svg" alt=""> {{ getDateFormated(event.date) }}
        </div>
        <div class="event__top-room"><img src="../images/Vector.svg" alt="">{{ event.invitations
          }}/{{ event.participants }}
        </div>
      </div>
    </div>
    <div class="event__card-content">
      <div class="event__card-left">
        <img class="event__left-img" src="../images/pic.png" alt="" />
        <div class="event__left-bottom">
          <div v-if="event.discount" class="event__left-discount">-{{ event.discount }}%</div>
          <div v-if="event.price" class="event__left-price "><img src="../images/price.svg" alt=""> {{ event.price }} ₽
          </div>
        </div>
      </div>
      <div class="event__card-right">
        <div class="event__card-genres">
          <div v-for="tag in event.tags" :key="tag" class="event__card-genre">{{ tag }}</div>
        </div>
        <div class="event__card-descr">
          {{ event.description }}
        </div>

      </div>
    </div>

    <div class="event__card-bottom">
      <div class="event__card-date"><img src="../images/CalendarBlank.svg" alt=""> {{ getDateFormated(event.date) }}
      </div>
      <router-link :to="{
        name: 'event',
        params: {
          id: event.id || 1
        }
      }" class="event__card-any">Подробнее
      </router-link>
      <div v-if="event.status === 'pending'" class="event__card-btn">{{ Statuses[event.status] }}</div>
      <div v-if="event.status === 'approved'" class="event__card-btn">{{ Statuses[event.status] }}</div>
      <div v-if="event.status === 'rejected' " class="event__card-btn">{{ Statuses[event.status] }}</div>
      <div v-if="event.status === 'archived'" class="event__card-btn">{{ Statuses[event.status] }}</div>
      <div v-if="event.status === 'inprogress' && user.isAdmin" @click="goEventAddPage">Продолжить черновик</div>
      <div class="event__card-room"><img src="../images/Vector.svg" alt="">{{ event.invitations?.length || 0
        }}/{{ event.participants?.length || 0 }}
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.event__card {
  padding: 28px;
  background: radial-gradient(closest-side,
    rgba(44, 38, 47, 0.2) 0%,
    rgba(13, 12, 14, 0.2) 100%);
  border-radius: 15px;
  border-style: solid;
  border-color: var(--based-stroke, #18171e);
  max-width: 880px;
  width: 100%;

  @media (max-width: 450px) {
    padding: 18px;
  }


  .event__card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
    gap: 20px;

    @media (max-width: 1024px) {
      flex-direction: column;
      align-items: start;
    }

    .event__top-bottom {
      display: none;
      width: 100%;

      @media (max-width: 1024px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }


      .event__top-date {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--04-text-1, #cdc2d1);
        text-align: left;
        font-family: "AlegreyaSc-Medium";
        margin-right: 24px;

        font-size: calc(22px + 6 * (100vw / 1920));


        @media (max-width: 320px) {
          font-size: calc(22px + (6 + 6 * 0.7) * ((100vw - 320px) / 1920));
        }
      }

      .event__top-room {
        display: flex;
        gap: 10px;
        color: var(--05-success-main, #4a7548);
        text-align: center;
        font-size: 20px;


      }
    }

    .event__top-right {
      display: flex;
      flex-grow: 1;
      justify-content: space-between;
      align-items: center;

      @media (max-width: 1024px) {
        width: 100%;
      }
    }

    .event__card-name {
      color: #cdc2d1;
      font-size: 32px;

      display: flex;
      align-items: center;
      gap: 32px;
      font-size: calc(26px + 6 * (100vw / 1920));

      @media (max-width: 320px) {
        font-size: calc(26px + (6 + 6 * 0.7) * ((100vw - 320px) / 1920));
      }

    }

    .event__card-subtitle {
      color: #335781;
      font-size: 20px;
    }

    .event__card-status {
      background: var(--03-dark-3, #422748);
      border-radius: 40px;
      padding: 8px 16px;

      color: var(--01-primary-color-5, #d5b0e4);
      font-size: 20px;

      font-size: calc(14px + 6 * (100vw / 1920));

      @media (max-width: 320px) {
        font-size: calc(14px + (6 + 6 * 0.7) * ((100vw - 320px) / 1920));
      }
    }
  }

  .event__card-content {
    display: flex;
    gap: 24px;

    @media (max-width: 930px) {
      flex-direction: column;
    }


    .event__card-left {
      position: relative;
      max-width: 265px;
      height: 280px;
      width: 100%;
      overflow: hidden;
      border-radius: 15px;

      @media (max-width: 930px) {
        max-width: 100%;
      }

      .event__left-img {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
      }

      .event__left-bottom {
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg,
          rgba(0, 0, 0, 0) 0%,
          rgba(24, 23, 30, 1) 100%);

        display: flex;
        align-items: end;
        padding: 12px;
        gap: 12px;

        .event__left-discount {
          padding: 8px 12px;
          color: #eee0f1;
          font-size: 22px;
          background: var(--02-accent-main, #d23c48);
          border-radius: 10px;
        }

        .event__left-price {
          display: flex;
          gap: 8px;
          align-items: center;
          padding: 8px 12px;
          color: #eee0f1;
          font-size: 22px;
          background: var(--price,
            linear-gradient(113.61deg,
              rgba(74, 154, 70, 1) 0%,
              rgba(55, 149, 122, 1) 100%));
          border-radius: 10px;
        }

      }
    }

    .event__card-right {
      display: flex;
      flex-direction: column;
      gap: 16px;

      padding: 17px 0;

      .event__card-genres {
        display: flex;
        gap: 14px;
        overflow-y: auto;

        &::-webkit-scrollbar {
          display: none;
        }

        .event__card-genre {
          background: var(--01-primary-color-main, #86489c);
          border-radius: 28px;
          padding: 8px 12px;

          color: #eee0f1;
        }
      }

      .event__card-descr {
        color: var(--04-text-main, #eee0f1);
        text-align: left;
        max-width: 535px;

        font-size: calc(16px + 6 * (100vw / 1920));

        @media (max-width: 320px) {
          font-size: calc(16px + (6 + 6 * 0.7) * ((100vw - 320px) / 1920));
        }
      }
    }
  }

  .event__card-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;

    @media (max-width: 1054px) {
      flex-direction: row-reverse;
    }

    .event__card-date {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--04-text-1, #cdc2d1);
      text-align: left;
      font-family: "AlegreyaSc-Medium";
      margin-right: 24px;

      font-size: calc(22px + 6 * (100vw / 1920));

      @media (max-width: 1054px) {
        display: none;
      }

      @media (max-width: 320px) {
        font-size: calc(22px + (6 + 6 * 0.7) * ((100vw - 320px) / 1920));
      }
    }

    .event__card-any {
      padding: 15px 24px;
      background: var(--03-dark-2, #18171e);
      border-radius: 10px;

      color: var(--04-text-main, #eee0f1);
      text-align: center;
      font-size: 20px;
      margin-right: 20px;

      @media (max-width: 450px) {
        display: none;
      }


    }

    .event__card-btn {
      max-width: 251px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 15px 0;

      background: var(--07-wait-main, #886535);
      border-radius: 10px;

      color: var(--04-text-main, #eee0f1);
      text-align: center;
      font-size: 20px;
      margin-right: 17px;

      @media (max-width: 450px) {
        max-width: 100%;
      }
    }

    .event__card-room {
      display: flex;
      gap: 10px;
      color: var(--05-success-main, #4a7548);
      text-align: center;
      font-size: 20px;

      @media (max-width: 1054px) {
        display: none;
      }
    }
  }
}
</style>
