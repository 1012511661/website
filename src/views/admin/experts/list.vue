<template>
    <div class=''>
        <template v-if="isShowNav">
            <AdminNavTable @on-view-list="onViewInfoList" ref="AdminNavTable"></AdminNavTable>
        </template>
        <template v-else>
            <AdminNavInfoList :menuId="menuId" @on-back-nav="onBackNav" ref="AdminNavInfoList"></AdminNavInfoList>
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
                isShowNav: true,
                menuId: ''
            }
        },
        methods: {
            init() {
                this.$refs.AdminNavTable.getDataList('EXPERTS')
            },
            onViewInfoList(params) {
                this.isShowNav = false;
                this.menuId = params.menuId;
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