<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { useDate } from 'vuetify/framework'

defineProps({
  total : {
    type: Number,
    default: 0
  }
})
const emit = defineEmits(['changeDate'])

const date = useDate()
const startOfWeek = ref(0)
const endOfWeek = ref(0)
const monthPrev = ref('')
const monthNext = ref('')
const getMonthName = (e: number) =>  {
  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ]
  return monthNames[e]
}
let currentdate = new Date()
const dateFilter = {
  dateFrom: '',
  dateTill: ''
}
const changePeriod = (e) => {
  if (e === 'prev') {
    const preWeekStart = date.setDate(currentdate, startOfWeek.value - 7)
    startOfWeek.value = date.getDate(date.startOfWeek(preWeekStart))
    endOfWeek.value = date.getDate(date.endOfWeek(preWeekStart))
    monthPrev.value = getMonthName(date.getMonth(preWeekStart))
    monthNext.value = startOfWeek.value < endOfWeek.value ? monthPrev.value : getMonthName(date.getMonth(date.getNextMonth(preWeekStart)))
    currentdate = preWeekStart
    dateFilter.dateFrom = date.format(currentdate, 'YYYY-MM-DD').replace(', UTC', '').replaceAll('/', '-')
    dateFilter.dateTill = date.format(date.endOfWeek(currentdate), 'YYYY-MM-DD').replace(', UTC', '').replaceAll('/', '-')
  } else {
    const nextWeekStart = date.setDate(currentdate, startOfWeek.value + 7)
    startOfWeek.value = date.getDate(date.startOfWeek(nextWeekStart))
    endOfWeek.value = date.getDate(date.endOfWeek(nextWeekStart))
    monthPrev.value = getMonthName(date.getMonth(nextWeekStart))
    monthNext.value = startOfWeek.value > endOfWeek.value ? getMonthName(date.getMonth(date.getNextMonth(nextWeekStart))) : monthPrev.value
    currentdate = nextWeekStart
    dateFilter.dateFrom = date.format(currentdate, 'YYYY-MM-DD').replace(', UTC', '').replaceAll('/', '-')
    dateFilter.dateTill = date.format(date.endOfWeek(currentdate), 'YYYY-MM-DD').replace(', UTC', '').replaceAll('/', '-')
  }
  emit('changeDate', dateFilter)
}

onMounted(() => {
  const currentDate = new Date()
  const weekStart = new Date()
  const weekEnd = date.endOfWeek(weekStart)
  startOfWeek.value = date.getDate(date.startOfWeek(weekStart))
  endOfWeek.value = date.getDate(weekEnd)
  monthPrev.value = getMonthName(date.getMonth(currentDate))
  monthNext.value = startOfWeek.value < endOfWeek.value ? monthPrev.value : getMonthName(date.getMonth(date.getNextMonth(currentDate)))
  currentdate = currentDate

  dateFilter.dateFrom = date.format(currentDate, 'YYYY-MM-DD').replace(', UTC', '').replaceAll('/', '-')
  dateFilter.dateTill = date.format(weekEnd, 'YYYY-MM-DD').replace(', UTC', '').replaceAll('/', '-')
  emit('changeDate', dateFilter)
})

defineExpose({
  getDate: () => {

    return {
      startDate: startOfWeek.value,
    }
  }
})
</script>
<template>
  <div class="events__calendar">
    <div class="events__calendar-right">
      <button class="events__calendar-filter">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_5238_3198)">
            <path
              d="M21.3572 6.25875L21.3497 6.26719L15 13.0472V18.2494C15.0003 18.4968 14.9395 18.7405 14.8229 18.9587C14.7062 19.1769 14.5375 19.3628 14.3315 19.5L11.3315 21.5006C11.1055 21.6512 10.8427 21.7376 10.5714 21.7505C10.3001 21.7635 10.0303 21.7025 9.79095 21.5741C9.55157 21.4457 9.35155 21.2547 9.21225 21.0215C9.07294 20.7883 8.99957 20.5216 8.99998 20.25V13.0472L2.65029 6.26719L2.64279 6.25875C2.44755 6.04389 2.31886 5.77699 2.27232 5.49043C2.22579 5.20387 2.26341 4.90996 2.38063 4.64436C2.49785 4.37876 2.68962 4.15288 2.93269 3.99413C3.17575 3.83538 3.45966 3.75057 3.74997 3.75H20.25C20.5405 3.75003 20.8248 3.83444 21.0683 3.99298C21.3118 4.15152 21.504 4.37737 21.6216 4.64308C21.7391 4.90878 21.777 5.20292 21.7305 5.48973C21.6841 5.77655 21.5554 6.04371 21.36 6.25875H21.3572Z"
              fill="#EEE0F1" />
          </g>
          <defs>
            <clipPath id="clip0_5238_3198">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
      <button class="events__calendar-sort">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.25 21L5.25 21C4.85217 21 4.47064 20.842 4.18934 20.5607C3.90803 20.2794 3.75 19.8978 3.75 19.5L3.75 4.5C3.75 4.10217 3.90804 3.72064 4.18934 3.43934C4.47064 3.15803 4.85218 3 5.25 3L14.25 3C14.6478 3 15.0294 3.15803 15.3107 3.43934C15.592 3.72064 15.75 4.10217 15.75 4.5L15.75 19.5C15.75 19.8978 15.592 20.2794 15.3107 20.5607C15.0294 20.842 14.6478 21 14.25 21ZM17.25 5.25L17.25 18.75C17.25 18.9489 17.329 19.1397 17.4697 19.2803C17.6103 19.421 17.8011 19.5 18 19.5C18.1989 19.5 18.3897 19.421 18.5303 19.2803C18.671 19.1397 18.75 18.9489 18.75 18.75L18.75 5.25C18.75 5.05109 18.671 4.86032 18.5303 4.71967C18.3897 4.57902 18.1989 4.5 18 4.5C17.8011 4.5 17.6103 4.57902 17.4697 4.71967C17.329 4.86032 17.25 5.05109 17.25 5.25ZM20.25 6.75L20.25 17.25C20.25 17.4489 20.329 17.6397 20.4697 17.7803C20.6103 17.921 20.8011 18 21 18C21.1989 18 21.3897 17.921 21.5303 17.7803C21.671 17.6397 21.75 17.4489 21.75 17.25L21.75 6.75C21.75 6.55109 21.671 6.36032 21.5303 6.21967C21.3897 6.07902 21.1989 6 21 6C20.8011 6 20.6103 6.07902 20.4697 6.21967C20.329 6.36032 20.25 6.55109 20.25 6.75Z"
            fill="#EEE0F1" />
        </svg>
        <span>
  Показать события  списком
</span>
      </button>

    </div>
    <div class="events__calendar-left">
      <div class="events__calendar-prev events__calendar-changer" @click="changePeriod('prev')"><i class="far fa-chevron-left"></i></div>
      <div class="events__calendar-date">{{startOfWeek}} {{ monthPrev }} — {{endOfWeek}} {{ monthNext }}</div>
      <div class="events__calendar-next events__calendar-changer" @click="changePeriod('next')"><i class="far fa-chevron-right"></i></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.events__calendar {
  padding: 20px 28px;
  margin: 30px 0;
  background: var(--plate-01,
    linear-gradient(257.41deg,
      rgba(90, 51, 98, 0.2) 0%,
      rgba(31, 24, 33, 0.2) 100%));
  border-radius: 15px;
  border-style: solid;
  border-color: var(--based-stroke, #18171e);
  border-width: 1px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &-filter {
    width: 56px;
    height: 54px;
    border-radius: 10px;
    gap: 10px;
    background: #6A3B7B;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-sort {
    width: 346px;
    height: 54px;
    border-radius: 10px;
    gap: 16px;
    background: #18171E;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 20px;
    line-height: 120%;
    letter-spacing: 0%;
    color: #EEE0F1;

  }

  .events__calendar-left {
    display: flex;
    gap: 30px;
    align-items: center;

    .events__calendar-date {
      color: var(--04-text-main, #eee0f1);
      text-align: center;
      font-size: var(--pc-h4-font-size, 26px);
    }

    .events__calendar-changer {
      padding: 16px;
      background: var(--03-dark-main, #1f1821);
      border-radius: 10px;

      i {
        color: #815692;
        width: 26px;
        height: 26px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .events__calendar-right {

    display: flex;
    align-items: center;
    gap: 10px;

  }
}

@media (max-width: 800px) {
  .events__calendar-sort {
    width: 56px;
    height: 54px;
    span {
      display: none;
    }
  }
}

@media (max-width: 576px) {
  .events__calendar {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
}
</style>
