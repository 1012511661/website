<template>
    <div class="banner-list">
        <Carousel autoplay v-model="msg" loop @on-click="onClickCar">
            <template v-for="(item,index) in bannerList">
                <CarouselItem :key="index">
                    <div class="demo-carousel"
                    >
                        <!--                        :style="{background: `url(${item.src}) center center no-repeat`,backgroundSize:'auto 100%'}"-->
                        <img :src="item" alt="" style=" object-fit: cover; width: 100%; height: 100%;">
                    </div>
                    <!--                    :style="{background: `url(${item.src}) 50% 0 no-repeat`}"></div>-->
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
        max-height: 400px;
    }
</style>