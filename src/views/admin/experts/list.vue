<template>
    <div class=''>
        <template v-if="isShowNav">
            <AdminNavTable @on-view-list="onViewInfoList" ref="AdminNavTable"></AdminNavTable>
        </template>
        <template v-else>
            <AdminNavInfoList @on-back-nav="onBackNav" ref="AdminNavInfoList"></AdminNavInfoList>
        </template>
    </div>
</template>

<script>
    import AdminNavTable from '../components/admin-nav-table'
    import AdminNavInfoList from '../components/admin-nav-Info-list'

    export default {
        name: "list",
        props: {},
        components: {AdminNavTable, AdminNavInfoList},
        data() {
            return {
                isShowNav: true
            }
        },
//监听属性 类似于data概念
        computed: {},
//监控data中的数据变化
        watch: {},
//方法集合
        methods: {
            init() {
                this.$refs.AdminNavTable.getDataList('EXPERTS')
            },
            onViewInfoList(params) {
                this.isShowNav = false;
                this.$nextTick((() => {
                    this.$refs.AdminNavInfoList.getDataList(params.menuId)
                }))
            },
            onBackNav() {
                this.isShowNav = true;
                this.$nextTick((() => {
                    this.init()
                }))
            }
        },
        mounted() {
            this.init()
        }
    }
</script>

<style lang='less' scoped>
    //@import url($3); 引入公共css类
</style>