<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import picture from '../images/pic.png'
import image from '../images/image.png'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { computed, onMounted, ref } from 'vue'
import { newsService } from '@/services/publicServices'
import { useToast } from 'vue-toastification'
import { isoToDate } from '../../../utils'
import NewsAddModal from '@/views/NewsPage/components/NewsAddModal.vue'
import { useUserGlobal } from '@/stores/userGlobal'
import { createAdminService } from '@/services/adminService'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}

const news = ref([])
const currentNews = ref({})
const route = useRoute()
const toast = useToast()
const editNews = ref({
  title: '',
  short_description: '',
  description: ''
})
const userStore = useUserGlobal()
const shhowAddModal = ref(false)

const user = computed(() => userStore.user)
const closeModal = () => {
  shhowAddModal.value = false
  editNews.value = {
    title: '',
    short_description: '',
    description: ''
  }
}
const submit = (e) => {
  createAdminService().updateNews(currentNews.value._id, e)
    .then(() => {
      toast.success('Новость успешно изменена')
      closeModal()
    })
    .catch((error) => {
      toast.error(error.data.error)
    })

}
const goEdit = (item: any) => {
  editNews.value = {...currentNews.value}
  shhowAddModal.value = true
}
onMounted(() => {
  newsService().getNewsById(route.params.id)
    .then((response) => {
      currentNews.value = response
    })
    .catch((error) => {
      toast.error(error.message)
    })

  newsService().getNews()
    .then((response) => {
      news.value = response.news
    })
    .catch((error) => {
      toast.error(error.message)
    })

})
</script>
<template>
  <div class="news__self">
    <div class="news__self-container container">
      <div class="news__self-top">
        <h3 class="news__self-title">{{ currentNews.title }}</h3>
        <div class="news__self-back" @click="goBack"><i class="fal fa-chevron-left"></i></div>
      </div>

      <div class="news__self-more">
        <div class="news__more-left">
          <img :src="picture" alt="">
        </div>
        <div class="news__self-right">
          <div class="news__right-top">
            <div class="news__right-title">{{ isoToDate(currentNews.publishDate) }}</div>
          </div>
          <div class="news__right-descr">
            {{ currentNews.content }}
          </div>
          <button v-if="user?.role === 'Admin'" @click="goEdit" class="news__content-edit">
            <img src="../images/PencilSimple.svg" alt="">
          </button>
        </div>
      </div>

      <div class="news__self-carousel">
        <div class="news__carousel-top">
          <div class="news__carousel-title">
            К другим новостям
          </div>
          <div class="news__carousel-navigation">
            <div class="news__carousel-prev news__carousel-btn"><i class="fal fa-chevron-left"></i></div>
            <div class="news__carousel-next news__carousel-btn"><i class="fal fa-chevron-right"></i></div>
          </div>
        </div>
        <swiper :modules="[Navigation]" :loop="false"
                :navigation="{ nextEl: '.news__carousel-next', prevEl: '.news__carousel-prev' }"
                :slides-per-view="3" :space-between="20" :breakpoints="{
                        1024: { slidesPerView: 3, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 15 },
                        480: { slidesPerView: 1, spaceBetween: 10 },
                        320: { slidesPerView: 1, spaceBetween: 2 }
                    }" class="news__swiper">

          <swiper-slide v-for="(i, index) in news" :key="index" class="news__slide">
            <div class="news__slide-content">
              <div class="news__slide-img"><img :src="i.image" alt=""></div>
              <div class="news__slide-title">{{ i.title }}</div>
              <div class="news__slide-date">{{ isoToDate(i.publishDate) }}</div>
              <div class="news__slide-description">{{ i.content }}</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
  <NewsAddModal :item="editNews" :is-open="shhowAddModal" @close="closeModal" @save="submit" />

</template>


<style lang="scss" scoped>
.news__content-edit {
  width: 56px;
  height: 54px;
  position: absolute;
  background: #D23C48;
  border-radius: 10px;
  padding: 16px;
  top: 0px;
  right: 0px;
}

.news__self {
  padding: 150px 10px;


  .news__self-top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .news__self-title {
      color: #ffffff;
      font-size: 46px;
      font-family: 'Alegreya-Medium';
      font-weight: 500;

      margin-bottom: 40px;

      font-size: calc(32px + 14 * (100vw / 1920));

      @media (max-width: 320px) {
        font-size: calc(32px + (14 + 14 * 0.7) * ((100vw - 320px) / 1920));
      }
    }

    .news__self-back {
      width: 55px;
      height: 55px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--03-dark-2, #18171e);
      border-radius: 10px;

      i {
        color: #d5b0e4;
        font-size: 20px;
      }
    }
  }

  .news__self-more {
    background: var(--plate-main,
      radial-gradient(closest-side,
        rgba(44, 38, 47, 0.3) 0%,
        rgba(21, 21, 22, 0.3) 100%));
    border-radius: 15px;
    border-style: solid;
    border-color: var(--based-stroke, #18171e);
    border-width: 1px;
    padding: 28px;

    display: flex;
    gap: 28px;
    margin-bottom: 40px;

    @media (max-width: 1024px) {
      flex-direction: column;
    }

    .news__more-left {
      max-width: 352px;
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 15px;

      @media (max-width: 1024px) {
        max-width: 100%;
        height: 500px;
      }


      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }


    .news__self-right {
      display: flex;
      flex-direction: column;
      gap: 15px;
      max-width: 740px;
      width: 100%;
      position: relative;

      @media (max-width: 1024px) {
        max-width: 100%;
      }

      .news__right-top {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .news__right-title {
          color: var(--04-text-1, #cdc2d1);
          text-align: left;
          font-family: "Alegreya-Medium";
          font-size: calc(22px + 10 * (100vw / 1920));

          @media (max-width: 320px) {
            font-size: calc(22px + (10 + 10 * 0.7) * ((100vw - 320px) / 1920));
          }
        }


      }

      .news__right-descr {
        color: var(--04-text-main, #eee0f1);
        text-align: left;
        font-family: "Alegreya-Regular";
        font-size: calc(16px + 4 * (100vw / 1920));

        @media (max-width: 320px) {
          font-size: calc(16px + (4 + 4 * 0.7) * ((100vw - 320px) / 1920));
        }
      }


    }
  }

  .news__self-carousel {
    display: flex;
    flex-direction: column;
    gap: 24px;


    .news__carousel-top {
      display: flex;
      justify-content: space-between;
      align-items: center;

      @media (max-width: 768px) {
        display: none;
      }

      .news__carousel-title {
        background: var(--04-text-h1-style,
          linear-gradient(90deg,
            rgba(203, 190, 205, 1) 0%,
            rgba(255, 255, 255, 1) 46.50000035762787%,
            rgba(203, 190, 205, 1) 100%));
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: left;
        font-family: "Alegreya-Medium";
        font-size: var(--pc-h3-font-size, 32px);
      }

      .news__carousel-navigation {
        display: flex;
        gap: 40px;

        .news__carousel-btn {
          width: 40px;
          height: 40px;
          background: var(--03-dark-2, #18171e);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;

          i {
            color: #86489c;
          }
        }
      }
    }

    .news__swiper {
      max-width: 100%;
      width: 100%;
      overflow: hidden;

      .news__slide {
        background: radial-gradient(closest-side,
          rgba(44, 38, 47, 0.2) 0%,
          rgba(13, 12, 14, 0.2) 100%);
        border-radius: 15px;
        border-style: solid;
        border-color: var(--based-stroke, #18171e);
        padding: 30px 26px;
        max-width: 380px;
        width: 100%;
        overflow: hidden;


        .news__slide-img {
          width: 100%;
          height: 261px;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

        }

        .news__slide-title {
          color: var(--01-primary-color-main, #86489c);
          text-align: left;
          font-family: "Alegreya-Medium";
          font-size: var(--pc-h3-font-size, 32px);
          margin-top: 12px;
          line-height: 30px;
        }

        .news__slide-date {
          color: #525558;
          text-align: left;
          font-family: "Alegreya-Regular";
          font-size: var(--pc-p3-font-size, 20px);
          margin-bottom: 12px;
        }

        .news__slide-description {
          color: var(--04-text-main, #eee0f1);
          text-align: left;
          font-family: "Alegreya-Regular";
          font-size: var(--pc-p3-font-size, 20px);
        }
      }
    }
  }
}
</style>
