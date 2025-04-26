<script setup lang="ts">
import { onMounted, type PropType, ref } from 'vue'
import FilterItem from '@/views/Events/components/FilterItem.vue'
import { useRoute, useRouter, stringifyQuery, parseQuery } from 'vue-router'
import { stringify, parse } from 'qs'

type Filter = {
  _id: string
  name: string
  options: Array<{
    _id: string
    tagName: string
    fullName: string
  }>
}
const props = defineProps({
  filters: {
    type: Array as PropType<Filter[]>,
    default: () => []
  }
})
const emit = defineEmits(['filter'])
const openSections = ref<Record<string, boolean>>({})

const toggleSection = (section: string) => {
  openSections.value[section] = !openSections.value[section]
}

const checkboxes = ref<Record<string, boolean>>({})

const toggleCheckbox = (key: string) => {
  checkboxes.value[key] = !checkboxes.value[key]
}
const router = useRouter()
const route = useRoute()
const test = (e: {
  filter: {
    _id: string
    name: string
  }
  item: {
    _id: string
    tagName: string
    fullName: string
  }
}) => {
  const query = parse(route.query)
  if (!query.features) {
    query.features = {}
  }
  if (query.features && query.features[e.filter._id] && query.features[e.filter._id].includes(e.item._id)) {
    query.features[e.filter._id] = query.features[e.filter._id].filter((item: string) => item !== e.item._id)
  } else {
    query.features[e.filter._id] = query.features[e.filter._id] || []
    query.features[e.filter._id].push(e.item._id)
  }

  console.log()
  console.log()

  // console.log(stringifyQuery(query))

  router.push({
    name: 'events',
    query: query
  }).then(() => {
    emit('filter')
  })
}
onMounted(() => {
  console.log(route.query)
})
</script>

<template>
  <div class="filters">
    <div class="filters__header">
      <div class="filters__title">Фильтры</div>
      <div class="filters__reset">
        <div class="filters__reset-text" @click="$emit('clear')">Сбросить</div>
      </div>
    </div>
    <div class="filters__content">
      <div class="filters__section filters__section--event-type">
        <div class="filters__section-title" @click="toggleSection('eventType')">Тип события <i
          class="far fa-chevron-down"></i></div>
        <div class="filters__options" v-if="openSections.eventType">
          <div class="filters__option">
            <div class="filters__checkbox">
              <input type="checkbox" name="" id="">
            </div>
            <div class="filters__label">Something type</div>
          </div>
          <div class="filters__option">
            <div class="filters__checkbox">
              <input type="checkbox" name="" id="">
            </div>
            <div class="filters__label">Something type</div>
          </div>
        </div>
      </div>
      <div class="filters__section filters__section--price">
        <div class="filters__section-title">Стоимость игры</div>
        <div class="filters__inputs">
          <input type="text" placeholder="от 300 " class="filters__input" />
          <input type="text" placeholder="до 50000 " class="filters__input" />
        </div>
      </div>
      <template v-for="filter in filters" :key="filter.id">
        <FilterItem :filter="filter" @update:model-value="test" />

      </template>
    </div>
    <div class="filters__apply-button">
      <div class="filters__apply-text">Применить фильтры</div>
    </div>
  </div>
</template>
<style lang="scss">
.filters {
  background: var(--plate-main,
    radial-gradient(closest-side,
      rgba(44, 38, 47, 0.3) 0%,
      rgba(21, 21, 22, 0.3) 100%));
  border-radius: 15px;
  border-style: solid;
  border-color: var(--based-stroke, #18171e);
  border-width: 1px;
  padding: 20px;
  max-width: 277px;
  width: 100%;

  @media (max-width: 768px) {
    position: absolute;
    background: #000;
    transform: translateX(-100%);
  }

  .filters__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 22px;
    margin-bottom: 24px;

    .filters__title {
      background: var(--04-text-h1-style,
        linear-gradient(90deg,
          rgba(203, 190, 205, 1) 0%,
          rgba(255, 255, 255, 1) 46.50000035762787%,
          rgba(203, 190, 205, 1) 100%));
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-align: center;
      font-size: var(--pc-h3-font-size, 32px);


    }

    .filters__reset-text {
      color: var(--02-accent-1, #e44653);
      text-align: right;
      font-size: var(--pc-helper-text-font-size, 14px);
    }
  }

  .filters__content {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .filters__section {
      .filters__section-title {
        color: #fff;
        color: var(--01-primary-color-5, #d5b0e4);
        text-align: left;
        font-size: var(--pc-button-1-font-size, 20px);

        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 0;

        i {
          color: var(--01-primary-color-5, #d5b0e4);
          font-size: 20px;
        }
      }

      .filters__options {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .filters__option {
          display: flex;
          gap: 8px;

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
      }
    }
  }
}

.filters__inputs {
  display: flex;
  gap: 10px;

  max-width: 228px;
  width: 100%;


  .filters__input {
    padding: 15px 12px;
    background: var(--imput-main, #1d1a1e);
    border-radius: 4px;
    border-style: solid;
    border-color: var(--based-stroke, #18171e);
    border-width: 1px;
    color: #fff;
    max-width: 100px;
    width: 100%;
  }

}


.filters__apply-button {
  padding: 15px 20px;
  background: var(--01-primary-color-main, #86489c);
  border-radius: 10px;
  color: var(--04-text-main, #eee0f1);
  text-align: center;
  margin-top: 40px;
}
</style>
