<script lang="ts" setup>
import { nextTick, onMounted, ref } from "vue";

const activeIndex = ref<number | null>(null);
const realHeights = ref<number[]>([]);

const toggleAccordion = async (index: number) => {
    activeIndex.value = activeIndex.value === index ? null : index;
    await nextTick();
    updateHeights();
};

const updateHeights = () => {
    realHeights.value = realHeights.value.map((_, i) => {
        const element = document.getElementById(`answer-${i}`);
        return element ? element.scrollHeight : 0;
    });
};

const faqList = ref([
    {
        question: "Я никогда не играл в НРИ. Подойдёт ли мне клуб?",
        answer: "<strong>Настольные ролевые игры (НРИ)</strong> — это игры, в которых участники управляют вымышленными персонажами в выдуманных мирах, создавая историю вместе с другими игроками под руководством Мастера игры. В процессе игры вы будете решать задачи, исследовать фантастические локации и участвовать в сражениях."
    },
    {
        question: "Как записаться в клуб?",
        answer: "Вы можете записаться через наш сайт, выбрав удобное время и игру."
    },
    {
        question: "Как записаться в клуб?",
        answer: "Вы можете записаться через наш сайт, выбрав удобное время и игру."
    },
    {
        question: "Как записаться в клуб?",
        answer: "Вы можете записаться через наш сайт, выбрав удобное время и игру."
    },
    {
        question: "Как записаться в клуб?",
        answer: "Вы можете записаться через наш сайт, выбрав удобное время и игру."
    },
    {
        question: "Как записаться в клуб?",
        answer: "Вы можете записаться через наш сайт, выбрав удобное время и игру."
    }
]);

onMounted(updateHeights);
</script>

<template>
    <div class="questions">
        <img class="questions__bg" src="../images/questions/bg.png" alt="">
        <div class="questions__container container">
            <h3 class="questions__title">Часто задаваемые вопросы</h3>

            <div class="questions__cards">
                <div class="questions__card" v-for="(item, index) in faqList" :key="index"
                    @click="toggleAccordion(index)">
                    <div class="questions__card-top">
                        <div :class="{
                            'questions__card-title': true,
                            'open__text': activeIndex === index
                        }">
                            {{ item.question }}
                        </div>

                        <i class="fal fa-plus" :class="{ 'open__icon': activeIndex === index }"></i>
                    </div>
                    <div :id="`answer-${index}`" class="questions__card-list" v-html="item.answer"
                        :style="activeIndex === index ? { maxHeight: '300px', paddingTop: '28px' } : {}">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.questions {
    padding-top: 81px;
    padding-bottom: 100px;
    position: relative;

    .questions__bg {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        z-index: -1;
    }

    .questions__title {
        color: #ffffff;
        font-size: 46px;
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

    .questions__cards {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;

        .questions__card {
            background: linear-gradient(257.41deg, rgba(90, 51, 98, 0.2) 0%, rgba(31, 24, 33, 0.2) 100%);
            border-radius: 10px;
            max-width: 580px;
            width: 100%;
            display: flex;
            flex-direction: column;
            cursor: pointer;
            padding: 28px;
            transition: background 0.3s ease;

            @media (max-width: 1180px) {
                max-width: 100%;
            }

            .questions__card-top {
                display: flex;
                width: 100%;
                justify-content: space-between;
                cursor: pointer;


                @media (max-width: 600px) {
                    align-items: center;
                    gap: 30px;
                }

                i {
                    color: #422748;
                    font-size: 48px;
                    transition: transform 0.3s ease;

                    @media (max-width: 600px) {
                        font-size: 30px;
                    }
                }

                .open__icon {
                    transform: rotate(45deg);
                    color: #f0515e;
                }

                .open__text {
                    color: #f0515e !important;
                }

                .questions__card-title {
                    color: #eee0f1;
                    max-width: 449px;
                    width: 100%;
                    font-family: 'Alegreya-Medium';
                    font-weight: 500;
                    transition: all .3 ease;

                    font-size: calc(18px + 4 * (100vw / 1920));

                    @media (max-width: 1180px) {
                        max-width: 100%;
                    }

                    @media (max-width: 320px) {
                        font-size: calc(18px + (4 + 4 * 0.7) * ((100vw - 320px) / 1920));
                    }
                }
            }

            .questions__card-list {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.4s ease, padding 0.3s ease;
                padding: 0;
                color: #eee0f1;
                font-size: 18px;


            }
        }
    }
}
</style>
