<template>
    <div class="search-wrap">
        <Input class="search-input m-right" v-model="msg" :placeholder="placeholder" :maxlength="128"/>
        <Button class="m-right" type="primary" @click="onSearch">查询</Button>
        <Button class="btn" type="primary" style='right:70px' @click="onBack" v-if="isShowBack">返回</Button>
        <Button class="btn" type="primary" style='right:0' @click="onAdd" v-if="isAdd">添加</Button>
    </div>

</template>

<script>
    //例如：import 《组件名称》 from '《组件路径》'
    export default {
        name: "admin-search",
        props: {
            searchInfo: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: ''
            },
            isShowBack:{
                type: Boolean,
                default: false
            },
            isAdd:{
                type: Boolean,
                default: true
            }
        },
        components: {},
        data() {
            return {
                msg: this.searchInfo
            }
        },
//监听属性 类似于data概念
        computed: {},
//监控data中的数据变化
        watch: {},
//方法集合
        methods: {
            onSearch() {
                this.$emit('on-search', this.msg)
            },
            onAdd() {
                this.$emit('on-add-item')
            },
            onBack(){
                this.$emit('on-back-item')
            }
        }
    }
</script>

<style lang='less' scoped>
    @import "../styles/custom.less";

    .search-wrap {
        display: flex;
        align-items: center;
        position: relative;
        margin-bottom: 28px;

        .search-input {
            width: 200px;
        }

        .m-right {
            margin-right: 20px;
        }

        .btn {
            position: absolute;
        }
    }

</style>