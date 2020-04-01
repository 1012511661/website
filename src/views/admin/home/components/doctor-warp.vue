<template>
    <div class=''>
        <template v-if="isShowListTable">
            <doctorListTable @show-user-table="onShowUserTable"></doctorListTable>
        </template>
        <template v-else>
            <doctorUserTable @show-List-table="onShowListTable" ref="doctorUserTable"></doctorUserTable>
        </template>
    </div>
</template>

<script>
    import doctorListTable from './doctor-list-table'
    import doctorUserTable from './doctor-user-table'

    export default {
        name: "doctor-warp",
        props: {},
        components: {doctorListTable, doctorUserTable},
        data() {
            return {
                isShowListTable: true
            }
        },
//监听属性 类似于data概念
        computed: {},
//监控data中的数据变化
        watch: {},
//方法集合
        methods: {
            onShowUserTable(data) {
                this.isShowListTable = false
                this.$nextTick(() => {
                    this.$refs.doctorUserTable.getDataList(data.regionId);
                })
            },
            onShowListTable() {
                this.isShowListTable = true
            }
        },
//生命周期 - 创建之前
        beforeCreate() {
        },
//生命周期 - 创建完成（可以访问当前this实例）
        created() {
        },
//生命周期 - 挂载之前
        beforeMount() {
        },
//生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
        },
//生命周期 - 更新之前
        beforeUpdate() {
        },
        //生命周期 - 更新之后
        updated() {
        },
//生命周期 - 销毁之前
        beforeDestroy() {
        },
        //生命周期 - 销毁完成
        destroyed() {
        },
//如果页面有keep-alive缓存功能，这个函数会触发
        activated() {
        }
    }
</script>

<style lang='less' scoped>
    //@import url($3); 引入公共css类
</style>