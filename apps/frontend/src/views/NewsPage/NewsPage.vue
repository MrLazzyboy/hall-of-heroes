<script setup lang="ts">
import Pagination from './components/Pagination.vue'
import image from './images/image.png'

import { computed, onMounted, ref } from 'vue'
import { newsService } from '@/services/publicServices'
import { isoToDate } from '@/utils'
import { useToast } from 'vue-toastification'
import { useRoute, useRouter } from 'vue-router'
import { useUserGlobal } from '@/stores/userGlobal'
import NewsAddModal from '@/views/NewsPage/components/NewsAddModal.vue'
import { createAdminService } from '@/services/adminService'

const currentPage = ref(1)

const paginatoionn = ref({
  page: 1,
  total: 123,
  limit: 10
})

const route = useRoute()
const router = useRouter()
const itemsPerPage = ref(10)
const news = ref([])
const toast = useToast()
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
const submit  = (e) => {
  if (e._id) {
    createAdminService().updateNews(e._id, e)
      .then(() => {
        toast.success('Новость успешно изменена')
        closeModal()
        newsService()
          .getNews({
            page: currentPage.value,
            limit: itemsPerPage.value
          })
          .then((response) => {
            // Обработка полученных данных
            news.value = response.news
            paginatoionn.value = {
              ...response.pagination,
              total: Math.ceil(response.pagination.total / 10)
            }
          })
          .catch((error) => {
            // Обработка ошибок
            toast.error(error.data.error)
          })
      })
      .catch((error) => {
        toast.error(error.data.error)
      })
  } else {
    createAdminService().addNews(e)
      .then(() => {
        toast.success('Новость успешно добавлена')
        closeModal()
        newsService()
          .getNews({
            page: currentPage.value,
            limit: itemsPerPage.value
          })
          .then((response) => {
            // Обработка полученных данных
            news.value = response.news
            paginatoionn.value = {
              ...response.pagination,
              total: Math.ceil(response.pagination.total / 10)
            }
          })
          .catch((error) => {
            // Обработка ошибок
            toast.error(error.data.error)
          })
      })
      .catch((error) => {
        toast.error(error.data.error)
      })
  }
}
const paginate = (page: number) => {
  currentPage.value = page
  router.push({ query: { page } })
  newsService()
    .getNews({
      page,
      limit: itemsPerPage.value
    })
    .then((response) => {
      // Обработка полученных данных
      news.value = response.news
      paginatoionn.value = {
        ...response.pagination,
        total: Math.ceil(response.pagination.total / 10)
      }
    })
    .catch((error) => {
      // Обработка ошибок
      toast.error(error.data.error)
    })
}
const editNews = ref({
  title: '',
  short_description: '',
  description: ''
})

const goEdit = (item: any) => {
  editNews.value = item
  shhowAddModal.value = true
}
onMounted(() => {
  // Здесь можно выполнить дополнительные действия при монтировании компонента
  if (route.query.page) {
    currentPage.value = Number(route.query.page)
  }
  newsService()
    .getNews({
      page: currentPage.value,
      limit: itemsPerPage.value
    })
    .then((response) => {
      // Обработка полученных данных
      news.value = response.news
      paginatoionn.value = {
        ...response.pagination,
        total: Math.ceil(response.pagination.total / 10)
      }
    })
    .catch((error) => {
      // Обработка ошибок
      toast.error(error.data.error)
    })
})
</script>
<template>
  <div class="news">
    <div class="news__container container">
      <h3 class="news__title">Новости <button v-if="user?.role === 'Admin'" @click="goEdit({
  title: '',
  short_description: '',
  description: ''
})" class="news-add-btn">
        <img src="@/assets/icons/Plus.svg" alt="">
      </button></h3>
      <div class="news__content">
        <template v-for="item in news" :key="item.id">
          <div class="news__content-item">
            <button v-if="user?.role === 'Admin'" @click="goEdit(item)" class="news__content-edit">
              <img src="./images/PencilSimple.svg" alt="">
            </button>
            <div class="news__item-img">
              <img :src="image" alt="">
            </div>

            <div class="news__item-info">
              <div class="news__item-top">
                <div class="news__item-title">{{ item.title }}</div>
                <div class="news__item-date">{{ isoToDate(item.publishDate) }}</div>
              </div>
              <div class="news__item-descr">
                {{ item.content }}
              </div>
              <router-link :to="{
                      name: 'news-self',
                      params: { id: item._id }
                    }" class="news__item-btn btn">Подробнее
              </router-link>
            </div>
          </div>
        </template>
      </div>
      <Pagination :model-value="paginatoionn.page" :totalPages="paginatoionn.total" @update:model-value="paginate" />
    </div>
    <NewsAddModal :item="editNews" :is-open="shhowAddModal" @close="closeModal" @save="submit" />
  </div>
</template>


<style lang="scss" scoped>
.news {
  padding: 150px 0;
.news-add-btn {
  width: 32px;
  height: 32px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4A7548;
  margin-left: 15px;
  img {
    width: 18px;
    height: 18px;
  }
}
  .news__title {
    color: #ffffff;
    font-size: 46px;
    font-family: 'Alegreya-Medium';
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;

    font-size: calc(32px + 14 * (100vw / 1920));

    @media (max-width: 320px) {
      font-size: calc(32px + (14 + 14 * 0.7) * ((100vw - 320px) / 1920));
    }
  }

  .news__content {
    display: grid;
    grid-template-columns: repeat(2, 50%);

    gap: 20px;

    &-edit {
      width: 56px;
      height: 54px;
      position: absolute;
      background: #D23C48;
      border-radius: 10px;
      padding: 16px;
      top: 15px;
      right: 15px;
    }

    @media (max-width: 768px) {
      display: flex !important;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    .news__content-item {
      position: relative;
      width: 100%;

      @media (max-width: 768px) {
        max-width: 580px;
      }

      background: radial-gradient(closest-side,
        rgba(44, 38, 47, 0.2) 0%,
        rgba(13, 12, 14, 0.2) 100%);
      border-radius: 15px;
      border-style: solid;
      border-color: var(--based-stroke, #18171e);
      border-width: 1px;

      padding: 30px;

      .news__item-img {
        max-width: 520px;
        width: 100%;
        height: 261px;
        border-radius: 10px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .news__item-info {
        display: flex;
        flex-direction: column;
        gap: 12px;

        .news__item-top {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          margin-top: 30px;

          @media (max-height: 1070px) {
            flex-direction: column;
            align-items: start;
          }


          .news__item-title {
            color: var(--01-primary-color-main, #86489c);
            text-align: left;
            font-family: var("Alegreya-Medium");

            font-size: calc(22px + 10 * (100vw / 1920));

            @media (max-width: 320px) {
              font-size: calc(22px + (10 + 10 * 0.7) * ((100vw - 320px) / 1920));
            }
          }

          .news__item-date {
            color: #525558;
            text-align: left;
            white-space: nowrap;
            font-family: "Alegreya-Regular";
            font-size: calc(16px + 4 * (100vw / 1920));

            @media (max-width: 320px) {
              font-size: calc(16px + (4 + 4 * 0.7) * ((100vw - 320px) / 1920));
            }
          }
        }

        .news__item-descr {
          color: #c6c6c6;
          text-align: left;
          font-family: "Alegreya-Regular";
          font-size: calc(16px + 4 * (100vw / 1920));

          @media (max-width: 320px) {
            font-size: calc(16px + (4 + 4 * 0.7) * ((100vw - 320px) / 1920));
          }

          max-width: 520px;
          width: 100%;
        }

        .news__item-btn {
          max-width: 250px;
          width: 100%;
          padding: 15px 0;
          background: var(--01-primary-color-main, #86489c);
          border-radius: 10px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: var(--04-text-main, #eee0f1);
          text-align: center;
          font-family: "Alegreya-Medium";
          font-size: var(--pc-button-1-font-size, 20px);
        }
      }
    }
  }
}
</style>
