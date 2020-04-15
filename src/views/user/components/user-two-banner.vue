<template>
    <div class='two_banner' :style="{background: `url(${banner}) no-repeat`}">
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
        height: 300px;
        border-bottom: 2px solid #949090;
        background-size: cover !important;
        background-position: center !important;
    }
</style>