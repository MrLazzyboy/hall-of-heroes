<template>
  <div class="tariffs">
    <img class="tariffs__bg" src="./images/bg.png" alt="">
    <PriceComponents />
    <IncludeComponent />
    <TypesComponent />
    <ConditionsComponentVue />
  </div>
</template>

<script setup lang="ts">
import ConditionsComponentVue from './components/ConditionsComponent.vue';
import IncludeComponent from './components/IncludeComponent.vue';
import PriceComponents from './components/PriceComponents.vue';
import TypesComponent from './components/TypesComponent.vue';




</script>

<style lang="scss" scoped>
.tariffs {
  position: relative;
  padding-top: 151px;
  margin-bottom: 81px;

  .tariffs__bg {
    width: 100%;
    // height: 100%;
    object-fit: cover;
    position: absolute;
    z-index: -1;
    bottom: 0;
    left: 0;
  }
}
</style>
