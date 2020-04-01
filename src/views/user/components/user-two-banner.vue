<template>
    <div class='two_banner' :style="{background: `url(${banner}) center center no-repeat`,backgroundSize:'auto 100%'}">
    </div>
</template>

<script>
    export default {
        name: "user-two-banner",
        props: {
            banner: {
                type: String,
                default: '../assets/two_banner.jpg'
            }
        },
        components: {},
        data() {
            return {}
        },
    }
</script>

<style lang='less' scoped>
    .two_banner {
        height: 200px;
        border-bottom: 2px solid #949090;
        /*background: url("../assets/two_banner.jpg");*/
    }
</style>