<template>
  <v-text-field
    v-model="time"
    :active="menu"
    :focus="menu"
    class="v-text-field"
    readonly
  >
    <template v-slot:prepend>
      <img src="@/assets/icons/CalendarBlank.svg" alt="">
    </template>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      activator="parent"
      transition="scale-transition"
    >
      <v-date-picker
        v-if="menu"
        v-model="time"
        full-width
      ></v-date-picker>
    </v-menu>
  </v-text-field>
</template>

<script setup>
import { ref, computed } from 'vue'
import { VTextField } from 'vuetify/components/VTextField'
import { VMenu } from 'vuetify/components/VMenu'
import { VDatePicker } from 'vuetify/components/VDatePicker'
import { useDate } from 'vuetify'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const date = useDate()
const emit = defineEmits(['update:modelValue'])
const time = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', date.format(value, 'YYYY-MM-DD'))
  }
})
const menu = ref(false)
</script>

<style scoped>
.v-text-field:deep {
  max-height: 56px;

  input, .v-field__input {
    max-height: 56px;

    color: #eee0f1 !important;
  }

  .v-input__details {
    display: none;
  }
}
</style>
