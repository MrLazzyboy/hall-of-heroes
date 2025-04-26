<template>
  <v-menu
    transition="scale-transition"
  >
    <template v-slot:activator="{ props }">
      <v-text-field
        :model-value="selectedItem.title"
        v-bind="props"
        class="v-text-field"
        :placeholder="placeholder"
        readonly
      >
        <template v-if="icon" v-slot:prepend>
          <img :src="icon" alt="">
        </template>
      </v-text-field>
    </template>

    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item['itemValue']"
        @click="selectItem(item)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>

</template>

<script setup>
import { ref, computed } from 'vue'
import { VTextField } from 'vuetify/components/VTextField'
import { VMenu } from 'vuetify/components/VMenu'
import { useDate } from 'vuetify'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Select an item'
  },
  items: {
    type: Array,
    default: () => []
  },
  itemValue: {
    type: String,
    default: 'value'
  }
})
const date = useDate()
const emit = defineEmits(['update:modelValue'])
const selectedItem = ref({})
const time = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', date.format(value, 'keyboardDate'))
  }
})
const selectItem = (item) => {
  emit('update:modelValue', item[props.itemValue])
  selectedItem.value = item
}
const menu = ref(false)
</script>

<style scoped>
.v-text-field:deep {
  max-height: 56px;

  input {
    max-height: 56px;

    color: #eee0f1 !important;
  }

  .v-input__details {
    display: none;
  }
}
</style>
