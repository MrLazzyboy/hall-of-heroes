<script setup lang="ts">
import CanFindComponentVue from './components/CanFindComponent.vue'
import ComfortsComponentVue from './components/ComfortsComponent.vue'
import HomeComponentVue from './components/HomeComponent.vue'
import InterierComponent from './components/InterierComponent.vue'
import MissionComponent from './components/MissionComponent.vue'
import Questioncomponent from './components/Questioncomponent.vue'
import StepsComponentVue from './components/StepsComponent.vue'



</script>

<template>
  <div class="main">
    <HomeComponentVue />
    <CanFindComponentVue />
    <ComfortsComponentVue />
    <InterierComponent />
    <StepsComponentVue />
    <MissionComponent />
    <Questioncomponent />

  </div>
</template>


<style lang="scss" scoped>
.main__container {
  max-width: 1180px;
  width: 100%;
  margin: 0 auto;
}
</style>
