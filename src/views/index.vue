<template>
    <div class='index'>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "user",
        props: {},
        components: {},
        data() {
            return {}
        }
    }
</script>

<style lang='less' scoped>
    //@import url($3); 引入公共css类
    .index {
        width: 100vw;
        overflow-x: hidden;
    }
</style>