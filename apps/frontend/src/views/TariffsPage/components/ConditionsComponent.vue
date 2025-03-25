<script>

</script>
<template>
    <div class="conditions">
        <div class="conditions__container container">
            <h3 class="conditions__title">Условия посещения клуба</h3>

            <div class="conditions__flex">
                <div class="conditions__flex-item">
                    <img src="../images/conditions/edit.svg" alt="">
                    <div class="conditions__flex-txt"> Участие в Событиях (играх) проходит по предварительной записи
                        (через сайт или по телефону).</div>
                </div>
                <div class="conditions__flex-item">
                    <img src="../images/conditions/four.svg" alt="">
                    <div class="conditions__flex-txt"> Участие в Событиях (играх) проходит по предварительной записи
                        (через сайт или по телефону).</div>
                </div>
                <div class="conditions__flex-item">
                    <img src="../images/conditions/people.svg" alt="">
                    <div class="conditions__flex-txt"> Участие в Событиях (играх) проходит по предварительной записи
                        (через сайт или по телефону).</div>
                </div>
                <div class="conditions__flex-item">
                    <img src="../images/conditions/hand.svg" alt="">
                    <div class="conditions__flex-txt"> Участие в Событиях (играх) проходит по предварительной записи
                        (через сайт или по телефону).</div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.conditions {
    margin-top: 80px;
    margin-bottom: 50px;
    padding: 0 10px;

    .conditions__title {
        color: #ffffff;
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

    .conditions__flex {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        row-gap: 70px;

        @media (max-width: 1024px) {
            justify-content: center;
        }

        .conditions__flex-item {
            max-width: 580px;
            width: 100%;
            position: relative;

            .conditions__flex-txt {
                color: #fff;
                font-size: 20px;

                padding-left: 38px;

                font-size: calc(16px + 4 * (100vw / 1920));

                @media (max-width: 500px) {
                    padding-left: 18px !important;
                }

                @media (max-width: 320px) {
                    font-size: calc(16px + (4 + 4 * 0.7) * ((100vw - 320px) / 1920));
                }
            }


            img {
                position: absolute;
                left: 0;
                top: -20px;
            }
        }
    }
}
</style>