<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AdminNav from './components/AdminNav.vue';

const route = useRoute();

const pageTitles: Record<string, string> = {
    'user-profile': 'Профиль',
    'user-events': 'Мои события',
    'user-notifications': 'Уведомления',
    'user-favourites': 'Избранное',
    'user-settings': 'Настройки'
};

const pageTitle = computed(() => pageTitles[route.name as string] || 'Профиль');

</script>
<template>
    <div class="user">
        <div class="user__container container">
            <div class="user__header">
                <div class="user__header-title">{{ pageTitle }} <span class="kotiqueee-span4">(игрок)</span></div>
                <div class="user__header-username"><span class="kotiqueee-span3">Kotiqueee</span>
                    <span class="kotiqueee-span4">(игрок)</span>
                </div>
            </div>
            <div class="user__wrapper">
                <AdminNav />
                <div class="user__wrapper-layout">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.user {
    padding: 145px 10px;

    .user__header {
        display: flex;
        align-items: center;
        gap: 30px;
        margin-bottom: 55px;

        @media (max-width: 600px) {
            margin-bottom: 24px;
            width: 100%;


        }

        .user__header-title {
            color: #eee0f1 !important;

            max-width: 300px;
            width: 100%;

            font-size: calc(32px + 14 * (100vw / 1920));


            @media (max-width: 600px) {
                display: flex;
                align-items: center;
                gap: 5px;


            }

            @media (max-width: 320px) {
                font-size: calc(32px + (14 + 14 * 0.7) * ((100vw - 320px) / 1920));
            }

            span {
                color: #233751;
                display: none;

                @media (max-width: 600px) {
                    display: flex;
                }
            }
        }

        .user__header-username {

            @media (max-width: 600px) {
                display: none;
            }

            .kotiqueee-span3 {
                color: var(--03-dark-3, #422748);
                font-family: var(--pc-h3-font-family, "AlegreyaSc-Medium");
                font-size: var(--pc-h3-font-size, 32px);
                line-height: var(--pc-h3-line-height, 115%);
                font-weight: var(--pc-h3-font-weight, 500);
            }

            .kotiqueee-span4 {
                color: var(--06-second-accent-dark, #233751);
                font-family: var(--pc-h3-font-family, "AlegreyaSc-Medium");
                font-size: var(--pc-h3-font-size, 32px);
                line-height: var(--pc-h3-line-height, 115%);
                font-weight: var(--pc-h3-font-weight, 500);
            }

        }
    }

    .user__wrapper {
        display: flex;
        gap: 20px;
    }

    .user__wrapper-layout {
        max-width: 880px;
        width: 100%;
    }
}
</style>