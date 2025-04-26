<script setup lang="ts">
import { type PropType, ref } from 'vue'

const props = defineProps({
  filter: {
    type: Object as PropType<{
      _id: string
      name: string
      options: Array<{
        _id: string
        tagName: string
        fullName: string
      }>
    }>,
    required: true
  }
})
const openSections = ref<string[]>([])
const emit = defineEmits(['update:model-value'])
const toggleSection = (section: string) => {
  if (openSections.value.includes(section)) {
    openSections.value = openSections.value.filter((item) => item !== section)
  } else {
    openSections.value.push(section)
  }
}

const _emit = (item: { _id: string; tagName: string; fullName: string }) => {
  emit('update:model-value', { filter: props.filter, item: item })
}
</script>

<template>
  <div class="filters__section filters__section--system">
    <div class="filters__section-title" @click="toggleSection(filter._id)">{{ filter.name }} <i
      class="far fa-chevron-down"></i></div>
    <div class="filters__options" v-if="openSections.includes(filter._id)">
      <label :for="item._id" v-for="item in filter.options" :key="item._id" class="filters__option">
        <div class="filters__checkbox">
          <input v-model="item.checked" :value="item._id" type="checkbox" name="" :id="item._id" @update:model-value="_emit(item)">
        </div>
        <div class="filters__label">{{ item.fullName }}</div>
      </label>
      <div class="filters__show-more">Показать все</div>
    </div>
  </div>
</template>

<style lang="scss">

</style>
