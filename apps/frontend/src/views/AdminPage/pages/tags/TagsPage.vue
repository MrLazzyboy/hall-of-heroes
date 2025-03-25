<script setup lang="ts">
import { ref } from 'vue';
import TagAddModal from './components/TagAddModal.vue';

const addModal = ref(false)

</script>

<template>
    <div class="tags">
        <div class="tags__row">
            <div class="tags__card">
                <div class="tags__card-title">Система</div>
                <div class="tags__card-item">
                    <div class="tags__card-left">
                        <div class="tags__card-name">Something type</div>
                        <div class="tags__card-undertitle">Короткое название</div>
                    </div>
                    <div class="tags__card-right">
                        <img src="images/PencilSimple.svg" alt="">
                        <img src="images/X.svg" alt="">
                    </div>

                </div>
                <div class="tags__card-bottom"  @click="addModal = true">
                    <img src="images/Vector.svg" alt="">
                    Добавить
                </div>
            </div>
            <div class="tags__card">
                <div class="tags__card-title">Система</div>
                <div class="tags__card-item">
                    <div class="tags__card-left">
                        <div class="tags__card-name">Something type</div>
                        <div class="tags__card-undertitle">Короткое название</div>
                    </div>
                    <div class="tags__card-right">
                        <img src="images/PencilSimple.svg" alt="">
                        <img src="images/X.svg" alt="">
                    </div>

                </div>
                <div class="tags__card-bottom"  @click="addModal = true">
                    <img src="images/Vector.svg" alt="">
                    Добавить
                </div>
            </div>
            <div class="tags__card">
                <div class="tags__card-title">Система</div>
                <div class="tags__card-item">
                    <div class="tags__card-left">
                        <div class="tags__card-name">Something type</div>
                        <div class="tags__card-undertitle">Короткое название</div>
                    </div>
                    <div class="tags__card-right">
                        <img src="images/PencilSimple.svg" alt="">
                        <img src="images/X.svg" alt="">
                    </div>

                </div>
                <div class="tags__card-bottom"  @click="addModal = true">
                    <img src="images/Vector.svg" alt="">
                    Добавить
                </div>
            </div>
        </div>
        <div class="tags__row">
            <div class="tags__card">
                <div class="tags__card-title">Система</div>
                <div class="tags__card-item">
                    <div class="tags__card-left">
                        <div class="tags__card-name">Something type</div>
                        <div class="tags__card-undertitle">Короткое название</div>
                    </div>
                    <div class="tags__card-right">
                        <img src="images/PencilSimple.svg" alt="">
                        <img src="images/X.svg" alt="">
                    </div>

                </div>
                <div class="tags__card-bottom"  @click="addModal = true">
                    <img src="images/Vector.svg" alt="">
                    Добавить
                </div>
            </div>
            <div class="tags__card">
                <div class="tags__card-title">Система</div>
                <div class="tags__card-item">
                    <div class="tags__card-left">
                        <div class="tags__card-name">Something type</div>
                        <div class="tags__card-undertitle">Короткое название</div>
                    </div>
                    <div class="tags__card-right">
                        <img src="images/PencilSimple.svg" alt="">
                        <img src="images/X.svg" alt="">
                    </div>

                </div>
                <div class="tags__card-bottom"  @click="addModal = true">
                    <img src="images/Vector.svg" alt="">
                    Добавить
                </div>
            </div>
            <div class="tags__card">
                <div class="tags__card-title">Система</div>
                <div class="tags__card-item">
                    <div class="tags__card-left">
                        <div class="tags__card-name">Something type</div>
                        <div class="tags__card-undertitle">Короткое название</div>
                    </div>
                    <div class="tags__card-right">
                        <img src="images/PencilSimple.svg" alt="">
                        <img src="images/X.svg" alt="">
                    </div>

                </div>
                <div class="tags__card-bottom"  @click="addModal = true">
                    <img src="images/Vector.svg" alt="">
                    Добавить
                </div>
            </div>
        </div>

    </div>

    <TagAddModal :isOpen="addModal" @close="addModal = false" />
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
