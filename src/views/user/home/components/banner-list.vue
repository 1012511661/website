<template>
    <div class="banner-list">
        <Carousel autoplay v-model="msg" loop @on-click="onClickCar">
            <template v-for="(item,index) in bannerList">
                <CarouselItem :key="index">
                    <div class="demo-carousel">
                        <img :src="item" alt="" style=" object-fit: cover; width: 100%; height: 100%;">
                    </div>
                </CarouselItem>
            </template>
        </Carousel>
    </div>
</template>

<script>
    export default {
        name: "banner-list",
        props: {
            bannerList: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        components: {},
        data() {
            return {
                msg: 0
            }
        },
        methods: {
            onClickCar(val) {
                window.console.log(val, '轮播')
            }
        },
    }
</script>

<style lang='less' scoped>
    .demo-carousel {
        height: 400px;
        max-height: 400px !important;
        overflow: hidden;
    }
</style>