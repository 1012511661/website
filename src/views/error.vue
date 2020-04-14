<template>
    <div class='error'></div>
</template>
<script>
    export default {
        name: "error",
    }
</script>

<style lang='less' scoped>
    .error{
        width: 100vw;
        height: 100vh;
        background-image: url("../assets/error.jpg");
        background-repeat:no-repeat ;
        background-size:100% 100%;
        background-attachment: fixed;
    }
</style>