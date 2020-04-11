<template>
    <div class=''>
        <template v-if="isShowListTable">
            <doctorListTable @show-user-table="onShowUserTable"></doctorListTable>
        </template>
        <template v-else>
            <doctorUserTable @show-List-table="onShowListTable" :regionName="regionName" ref="doctorUserTable"></doctorUserTable>
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
                isShowListTable: true,
                regionName:''
            }
        },
        methods: {
            onShowUserTable(data) {
                this.isShowListTable = false;
                this.regionName = data.regionName
                this.$nextTick(() => {
                    this.$refs.doctorUserTable.getDataList(data.regionId);
                })
            },
            onShowListTable() {
                this.isShowListTable = true
            }
        }
    }
</script>

<style lang='less' scoped>

</style>