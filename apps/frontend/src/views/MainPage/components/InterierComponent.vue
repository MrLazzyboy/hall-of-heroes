<script lang="ts" setup>
import { ref } from 'vue'

const interies = ref([
  {
    title: 'Зал 1',
    img: new URL('../images/interier/zal1.png', import.meta.url).href,
    active: true,
  },
  {
    title: 'Зал 2',
    img: new URL('../images/interier/orig.jpg', import.meta.url).href,
    active: false,
  },
  {
    title: 'Зал 3',
    img: new URL('../images/interier/zal1.png', import.meta.url).href,
    active: false,
  },
  {
    title: 'Зал 4',
    img: new URL('../images/interier/zal1.png', import.meta.url).href,
    active: false,
  },
  {
    title: 'Зал 5',
    img: new URL('../images/interier/zal1.png', import.meta.url).href,
    active: false,
  },
])

const activeImage = ref(interies.value.find((item) => item.active)?.img || '')

const setActive = (index: number) => {
  interies.value.forEach((item) => (item.active = false))
  interies.value[index].active = true
  activeImage.value = interies.value[index].img

  console.log(activeImage.value)
}

const nextImage = () => {
  const currentIndex = interies.value.findIndex((item) => item.active)
  const nextIndex = (currentIndex + 1) % interies.value.length
  setActive(nextIndex)
}

const prevImage = () => {
  const currentIndex = interies.value.findIndex((item) => item.active)
  const prevIndex = (currentIndex - 1 + interies.value.length) % interies.value.length
  setActive(prevIndex)
}
</script>
<template>
  <div class="interier">
    <div class="interier__container container">
      <h3 class="interier__title">Наш интерьер</h3>

      <div class="interier__gallery">
        <div class="interier__gallery-btns">
          <div class="interier__gallery-btn" :class="{ active: item.active }" v-for="(item, index) in interies"
            :key="index" @click="setActive(index)">
            {{ item.title }}
            <img src="../images/interier/bg-btn.png" alt="" />
          </div>
        </div>

        <div class="interier__gallery-show">
          <div class="show__left"><i class="fas fa-chevron-left" @click="prevImage"></i></div>
          <img :src="`${activeImage}`" alt="Выбранное изображение" />
          <div class="show__right"><i class="fas fa-chevron-right" @click="nextImage"></i></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.interier {
  margin-top: 86px;
  padding: 0 10px;

  .interier__title {
    color: #ffffff;
    font-family: 'Alegreya-Medium';
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;

    font-size: calc(20px + 26 * (100vw / 1920));

    @media (max-width: 320px) {
      font-size: calc(20px + (26 + 26 * 0.7) * ((100vw - 320px) / 1920));
    }
  }

  .interier__gallery {
    display: flex;
    align-items: start;
    gap: 20px;
    width: 100%;

    @media (max-width: 900px) {
      flex-direction: column;
    }

    .interier__gallery-btns {
      display: flex;
      flex-direction: column;
      gap: 20px;

      @media (max-width: 900px) {
        flex-direction: row;
        width: 100%;
        overflow-y: auto;
      }

      .interier__gallery-btn {
        min-width: 280px;
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: start;
        padding: 18px 15px;
        color: #eee0f1;
        font-size: 32px;
        font-family: 'Alegreya-Medium', sans-serif;
        font-weight: 500;
        overflow: hidden;
        transition: color 0.3s ease;

        font-size: calc(22px + 10 * (100vw / 1920));

        @media (max-width: 320px) {
          font-size: calc(22px + (10 + 10 * 0.7) * ((100vw - 320px) / 1920));
        }

        @media (max-width: 900px) {
          min-width: 91px !important;
          width: 100%;
          display: flex;
          justify-content: center;
        }


        img {
          position: absolute;
          z-index: -1;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        &:hover,
        &.active {
          color: #815692;

          img {
            opacity: 1;
          }
        }
      }
    }

    .interier__gallery-show {
      position: relative;
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 480px;
      height: 100%;
      border-radius: 15px;
      overflow: hidden;

      @media (max-width: 500px) {
        min-height: 230px;
      }

      img {
        width: 100%;

        object-fit: cover;
        min-height: 480px;
        height: 100%;

        @media (max-width: 500px) {
          min-height: 230px;
        }
      }

      .show__left,
      .show__right {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        max-width: 91px;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--plate-03,
            linear-gradient(114.17deg,
              rgba(54, 38, 38, 0.3) 0%,
              rgba(34, 27, 36, 0.3) 50%,
              rgba(54, 38, 38, 0.3) 100%));
        color: white;
        backdrop-filter: blur(2px);

        @media (max-width: 900px) {
          display: none;
        }

        i {
          color: #815692;
          padding: 15px 17px;
          background: #18171e;
          border-radius: 10px;
        }
      }

      .show__left {
        left: 0;
      }

      .show__right {
        right: 0;
      }
    }
  }
}
</style>
