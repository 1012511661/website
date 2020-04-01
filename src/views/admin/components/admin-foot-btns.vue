/**
* author: yongwenhao
* date: 2020/03/22 11:02:29
* describe: 列表右下角 按钮组
*/
<template>
    <div class="group-btns">
        <p class="btn" @click="onDelItem">
            删除
        </p>
    </div>
</template>

<script>
    export default {
        name: "admin-foot-btns",
        props: {},
        methods: {
            // 删除
            onDelItem() {
                this.$emit('on-del')
            },
        },
    }
</script>

<style lang="less" scoped>
    @import "../../../styles/custom.less";

    .group-btns {
        position: absolute;
        text-align: center;
        visibility: hidden;
        color: @content-dark-color;

        .btn {
            width: 40px;
            height: 22px;
            text-align: center;
            line-height: 22px;
            margin: 0 2px;
            display: inline-block;
            background-color: @content-dark-color;
            color: @bg-color;

            &:hover {
                cursor: pointer;
            }
        }
    }
</style>