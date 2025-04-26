<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TagAddModal from './components/TagAddModal.vue';
import { filtersService } from '@/services/publicServices'
import { useToast } from 'vue-toastification'

const isEdit = ref(false)
const addModal = ref(false)
const toast = useToast()
const filters = ref([])
const selectedFilterItem = ref({ })
const closeAddModal = () => {
  addModal.value = false
  isEdit.value = false
  selectedFilterItem.value = {}
}
const updateFilterItem = (item) => {
  // Здесь можно добавить логику для обновления элемента фильтра
  if (isEdit.value) {
    filtersService().updateFilter(item)
      .then((response) => {
        filtersService().getFilters()
          .then((response) => {
            filters.value = response
          })
          .catch((error) => {
            toast.error(error.data.error || 'Ошибка при получении фильтров:')
          })
        closeAddModal()
        toast.success('Фильтр успешно обновлен')
      })
      .catch((error) => {
        toast.error(error.data.error || 'Ошибка при создании фильтра:')
      })
  } else {
    filtersService().createFilter(item)
      .then((response) => {
        filtersService().getFilters()
          .then((response) => {
            filters.value = response
          })
          .catch((error) => {
            toast.error(error.data.error || 'Ошибка при получении фильтров:')
          })
        addModal.value = false
        toast.success('Фильтр успешно создан')
      })
      .catch((error) => {
        toast.error(error.data.error || 'Ошибка при создании фильтра')
      })
  }
}

const editFilterItem = (filter, item) => {
  selectedFilterItem.value = { ...item }
  isEdit.value = true
  addModal.value = true
}

const deleteFilterItem = (filter, item) => {
  filtersService().deleteFilter(item._id)
    .then((response) => {
      filtersService().getFilters()
        .then((response) => {
          filters.value = response
        })
        .catch((error) => {
          toast.error(error.data.error || 'Ошибка при получении фильтров:')
        })
      addModal.value = false
      toast.success('Фильтр успешно создан')
    })
    .catch((error) => {
      toast.error(error.data.error || 'Ошибка при удаление фильтра')
    })
}


onMounted(() => {
  filtersService().getFilters()
    .then((response) => {
      filters.value = response
    })
    .catch((error) => {
      console.error('Ошибка при получении фильтров:', error.data.error)
    })
})

</script>

<template>
    <div class="tags">
        <div class="tags__row">
          <template v-for="filter in filters" :key="filter._id">
            <div class="tags__card">
              <div class="tags__card-title">{{ filter.name }}</div>
              <div v-for="item in filter.options" :key="item._id" class="tags__card-item">
                <div  class="tags__card-left">
                  <div class="tags__card-name">{{ item.fullName }}</div>
                  <div class="tags__card-undertitle">{{ item.description }}</div>
                </div>
                <div class="tags__card-right">
                  <img @click="editFilterItem(filter, item)" src="./images/PencilSimple.svg" alt="">
                  <img @click="deleteFilterItem(filter, item)" src="./images/X.svg" alt="">
                </div>

              </div>
              <div class="tags__card-bottom"  @click="addModal = true">
                <img src="./images/Vector.svg" alt="">
                Добавить
              </div>
            </div>
          </template>

        </div>
    </div>

    <TagAddModal :isOpen="addModal" @close="closeAddModal" @save="updateFilterItem" :item="selectedFilterItem" />
</template>

<style scoped lang="scss">
.tags {
    background: var(--plate-main,
            radial-gradient(closest-side,
                rgba(44, 38, 47, 0.3) 0%,
                rgba(21, 21, 22, 0.3) 100%));
    border-radius: 10px;
    border-style: solid;
    border-color: var(--based-stroke, #18171e);
    border-width: 1px;
    padding: 28px;

    display: flex;
    flex-direction: column;
    gap: 20px;


    .tags__row {
        display: flex;
        align-items: start;
        gap: 20px;

        .tags__card {
            display: flex;
            flex-direction: column;
            gap: 20px;
            max-width: 260px;
            width: 100%;
            background: var(--plate-03,
                    linear-gradient(114.17deg,
                        rgba(54, 38, 38, 0.3) 0%,
                        rgba(34, 27, 36, 0.3) 50%,
                        rgba(54, 38, 38, 0.3) 100%));
            border-radius: 10px;
            padding: 20px;


            .tags__card-title {
                color: #815692;
                font-size: var(--pc-button-1-font-size, 20px);
            }

            .tags__card-item {
                display: flex;
                gap: 8px;
                align-items: center;

                .tags__card-left {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;

                    .tags__card-name {
                        color: var(--04-text-main, #eee0f1);
                        font-size: var(--pc-button-3-font-size, 16px);
                    }

                    .tags__card-undertitle {
                        color: var(--08-unavailable-2, #545560);
                        font-size: var(--pc-helper-text-font-size, 14px);
                    }
                }

                .tags__card-right {

                    display: flex;
                    gap: 8px;

                    i {


                        &:nth-of-type(1) {
                            color: #815692;
                        }

                        &:nth-of-type(2) {
                            color: #d23c48;
                        }
                    }
                }
            }

            .tags__card-bottom {
                color: var(--05-success-main, #4a7548);
                font-size: var(--pc-button-1-font-size, 20px);
                display: flex;
                align-items: center;
                gap: 10px;
            }
        }
    }
}
</style>
