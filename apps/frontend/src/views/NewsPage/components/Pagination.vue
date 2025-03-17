<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
    totalPages: number;
    modelValue: number;
}
const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const currentPage = ref(props.modelValue);

const updatePage = (page: number) => {
    if (page > 0 && page <= props.totalPages) {
        currentPage.value = page;
        emit("update:modelValue", page);
    }
};

const pages = computed(() => {
    const { totalPages } = props;
    const visiblePages = 3;
    const pageList: (number | string)[] = [];

    if (totalPages <= visiblePages + 2) {
        for (let i = 1; i <= totalPages; i++) pageList.push(i);
    } else {
        const startPages = [1, 2, 3];
        const endPages = [totalPages - 2, totalPages - 1, totalPages];

        if (currentPage.value < totalPages - 3) {
            pageList.push(...startPages, "...", ...endPages.slice(-2));
        } else {
            pageList.push(1, "...", ...endPages);
        }
    }
    return pageList;
});
</script>

<template>
    <div class="pagination">
        <button @click="updatePage(currentPage - 1)" :disabled="currentPage === 1" class="nav"><i
                class="fal fa-chevron-left"></i></button>
        <button v-for="page in pages" :key="page" :class="['page', { active: page === currentPage }]"
            @click="typeof page === 'number' && updatePage(page)">
            {{ page }}
        </button>
        <button @click="updatePage(currentPage + 1)" :disabled="currentPage === totalPages" class="nav"><i
                class="fal fa-chevron-right"></i></button>
    </div>
</template>

<style lang="scss" scoped>
.pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    padding: 10px;
    border-radius: 8px;
    margin-top: 40px;
}

.page,
.nav {
    background: #18171e;
    color: #545560;
    border-radius: 10px;
    cursor: pointer;
    font-family: 'Alegreya-Bold';

    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
        color: #86489c;
    }
}

.page.active {
    background: #8255D4;
    color: white;
}

.nav {
    color: #8255D4;
}
</style>
