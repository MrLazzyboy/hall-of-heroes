<template>
  <v-text-field
    v-model="time"
    :active="menu"
    :focus="menu"
    class="v-text-field"
    readonly
  >
    <template v-slot:prepend>
      <img src="@/assets/icons/clock.svg" alt="">
    </template>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      activator="parent"
      transition="scale-transition"
    >
      <v-time-picker
        v-if="menu"
        v-model="time"
        full-width
      ></v-time-picker>
    </v-menu>
  </v-text-field>
</template>

<script setup>
import { ref, computed } from 'vue'
import { VTextField } from 'vuetify/components/VTextField'
import { VMenu } from 'vuetify/components/VMenu'
import { VTimePicker } from 'vuetify/labs/VTimePicker'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])
const time = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  }
})
const menu = ref(false)
</script>

<style scoped>
.v-text-field:deep {
  max-height: 56px;

  input {
    color: #eee0f1 !important;
  }

  .v-input__details {
    display: none;
  }
}
</style>
