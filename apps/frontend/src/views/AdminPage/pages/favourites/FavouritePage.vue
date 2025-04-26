<script setup lang="ts">


</script>
<template>
    <div class="favourite__masters">
        <div class="favourite__masters-item">
            <img src="./images/avatar.png" alt="">
            <div class="favourite__masters-username">ываыввыа</div>
        </div>

        <div class="favourite__masters-item">
            <img src="./images/avatar.png" alt="">
            <div class="favourite__masters-username">ваываываываав</div>
        </div>

    </div>
</template>
<style lang="scss" scoped>
.favourite__masters {
    display: flex;
    flex-wrap: wrap;
    row-gap: 24px;
    column-gap: 34px;

    .favourite__masters-item {
        display: flex;
        gap: 10px;
        align-items: center;

        img {
            width: 32px;
            height: 32px;
            object-fit: cover;
        }

        .favourite__masters-username {
            color: #335781;
            font-size: 20px;
        }
    }
}
</style>