<script setup lang="ts"></script>
<template>
    <div class="events__calendar">
        <div class="events__calendar-left">
            <div class="events__calendar-prev events__calendar-changer"><i class="far fa-chevron-left"></i></div>
            <div class="events__calendar-date">28 октября — 3 ноября</div>
            <div class="events__calendar-next events__calendar-changer"><i class="far fa-chevron-right"></i></div>
        </div>
        <div class="events__calendar-right">8 событий</div>
    </div>
</template>
<style lang="scss" scoped>
.events__calendar {
    padding: 20px 28px;
    margin: 30px 0;
    background: var(--plate-01,
            linear-gradient(257.41deg,
                rgba(90, 51, 98, 0.2) 0%,
                rgba(31, 24, 33, 0.2) 100%));
    border-radius: 15px;
    border-style: solid;
    border-color: var(--based-stroke, #18171e);
    border-width: 1px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .events__calendar-left {
        display: flex;
        gap: 30px;
        align-items: center;

        .events__calendar-date {
            color: var(--04-text-main, #eee0f1);
            text-align: center;
            font-size: var(--pc-h4-font-size, 26px);
        }

        .events__calendar-changer {
            padding: 16px;
            background: var(--03-dark-main, #1f1821);
            border-radius: 10px;

            i {
                color: #815692;
                width: 26px;
                height: 26px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }

    .events__calendar-right {
        color: var(--01-primary-color-main, #86489c);
        text-align: center;
        font-size: var(--pc-h4-font-size, 26px);

    }
}
</style>