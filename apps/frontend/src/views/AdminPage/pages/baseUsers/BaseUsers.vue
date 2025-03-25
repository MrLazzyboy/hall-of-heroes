<script lang="ts" setup>
import { ref } from 'vue';
import UserAddModal from './components/UserAddModal.vue';

const users = ref([
    { id: 1, username: "Бубебубебубу", phone: "+7 999 999-99-99", email: "EXAMASDASD@FJFA.COM", role: "Админ" },
    { id: 2, username: "Бубеб", phone: "+7 999 999-99-99", email: "EXAMASDASD@FJFA.COM", role: "Мастер" },
    { id: 3, username: "Бубебебе", phone: "+7 999 999-99-99", email: "EXAMASDASD@FJFA.COM", role: "Мастер" },
    { id: 4, username: "Бубебубебубу", phone: "+7 999 999-99-99", email: "EXAMASDASD@FJFA.COM", role: "Админ" },
    { id: 5, username: "Вувувувувду", phone: "+7 (888) 888-88-88", email: "TEST111@TEST.COM", role: "Админ" },
    { id: 6, username: "Дададададада", phone: "+7 (777) 777-77-77", email: "HELLO_WORLD@EXAMPLE.COM", role: "Игрок" },
    { id: 7, username: "Зазазазазазаза", phone: "+7 (666) 666-66-66", email: "MYEMAIL@GMAIL.COM", role: "Игрок" }
]);

const addModal = ref(false)


</script>
<template>
    <div class="base">
        <div class="base__container">

            <div class="base__table-header">
                <div class="input__group base__table-input">
                    <input type="text" placeholder="Введите никнейм">
                    <img src="../../images/search.svg" alt="">
                </div>
                <div class="base__table-filter">
                    <div class="filter__title">Фильтровать по</div>

                    <div class="filters">
                        <div class="filters-checkbox">
                            <input type="checkbox" name="" id="">
                            <label for="">Админ</label>
                        </div>
                        <div class="filters-checkbox">
                            <input type="checkbox" name="" id="">
                            <label for="">Мастер</label>
                        </div>
                        <div class="filters-checkbox">
                            <input type="checkbox" name="" id="">
                            <label for="">Игрок</label>
                        </div>
                    </div>
                </div>
                <div class="base__table-btn btn" @click="addModal = true">
                    <i class="fal fa-plus fa-2x"></i>
                </div>

            </div>

            <table class="base__table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Логин</th>
                        <th>Телефон</th>
                        <th>Email</th>
                        <th>Роль</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.username }}</td>
                        <td>{{ user.phone }}</td>
                        <td>{{ user.email }}</td>
                        <td>
                            <span :class="['role-badge', user.role.toLowerCase()]">{{ user.role }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="base__table-bottom">
                <div class="base__table-left">
                    <div class="left-title"></div>
                    <div class="left-item"></div>
                </div>
                <div class="base__table-right"></div>
            </div>

        </div>
    </div>

    <UserAddModal :isOpen="addModal" @close="addModal = false" />
</template>
<style lang="scss" scoped>
.base {
    background: var(--plate-main,
            radial-gradient(closest-side,
                rgba(44, 38, 47, 0.3) 0%,
                rgba(21, 21, 22, 0.3) 100%));
    border-radius: 10px;
    border-style: solid;
    border-color: var(--based-stroke, #18171e);
    border-width: 1px;
    padding: 18px 24px;

    .base__container {
        display: flex;
        flex-direction: column;
        width: 100%;


        .base__table-header {
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: space-between;


            .base__table-input {
                border-radius: 15px;
                border-style: solid;
                border-color: var(--based-stroke, #18171e);
                border-width: 1px;
            }
        }


        .base__table-filter {

            display: flex;
            flex-direction: column;
            gap: 7px;

            .filter__title {
                color: var(--01-primary-color-3, #6a3b7b);
                text-align: left;
                font-size: var(--pc-helper-text-font-size, 14px);
            }

            .filters {
                display: flex;
                gap: 28px;

                .filters-checkbox {
                    display: flex;
                    align-items: center;
                    gap: 8px;

                    input {
                        width: 14px;
                        height: 14px;
                    }

                    label {
                        color: var(--04-text-main, #eee0f1);
                        text-align: left;
                        font-size: var(--pc-button-3-font-size, 16px);
                    }
                }
            }
        }

        .base__table-btn {
            width: 54px;
            height: 54px;
            justify-content: center;
            display: flex;
            align-items: center;
            background: var(--05-success-main, #4a7548);
            border-radius: 5px;

            i {
                color: #Fff;
            }
        }
    }
}

.base__table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.base__table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.base__table th,
.base__table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #333;
}

.role-badge {
    padding: 5px 10px;
    border-radius: 5px;
    color: white;
}

.админ {
    background: red;
}

.мастер {
    background: green;
}

.игрок {
    background: blue;
}

thead {
    background: var(--plate-01,
            linear-gradient(257.41deg,
                rgba(90, 51, 98, 0.2) 0%,
                rgba(31, 24, 33, 0.2) 100%));
    border-style: solid;
    border-color: var(--hover-stroke, #1f1821);
    border-width: 1px;
}

thead tr th {
    padding: 16px;
    text-align: left;
}

tbody {
    background: var(--plate-01,
            linear-gradient(257.41deg,
                rgba(90, 51, 98, 0.2) 0%,
                rgba(31, 24, 33, 0.2) 100%));
    border-style: solid;
    border-color: var(--hover-stroke, #1f1821);
    border-width: 1px;

}

th,
td {
    color: #fff;
}
</style>