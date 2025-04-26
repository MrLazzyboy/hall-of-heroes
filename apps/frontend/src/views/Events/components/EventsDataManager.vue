<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { useDate } from 'vuetify/framework'

defineProps({
  total : {
    type: Number,
    default: 0
  }
})
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
const emit = defineEmits(['changeDate'])
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
  console.log(dateFilter)
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

})

</script>
<template>
    <div class="events__calendar">
        <div class="events__calendar-left">
            <div class="events__calendar-prev events__calendar-changer" @click="changePeriod('prev')"><i class="far fa-chevron-left"></i></div>
            <div class="events__calendar-date">{{startOfWeek}} {{ monthPrev }} — {{endOfWeek}} {{ monthNext }}</div>
            <div class="events__calendar-next events__calendar-changer" @click="changePeriod('next')"><i class="far fa-chevron-right"></i></div>
        </div>
        <div class="events__calendar-right">{{ total }} событий</div>
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
        color: var(--01-primary-color-main, #86489c);
        text-align: center;
        font-size: var(--pc-h4-font-size, 26px);

    }
}
</style>
