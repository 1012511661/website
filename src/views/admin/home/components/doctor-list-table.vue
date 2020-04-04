<template>
    <div class=''>
        <AdminSearch @on-search="onSearch" @on-add-item="onAddItem"></AdminSearch>
        <Table :columns="columns" :data="dataList"></Table>
        <DoctorListModal v-model="showListModal" @upload-doctor-list="onUploadList" :len="dataList.length"
                         :title="infoFrom.regionId?'修改':'添加'" :infoData="infoFrom" ref="DoctorListModal"></DoctorListModal>
    </div>
</template>

<script>
    //例如：import 《组件名称》 from '《组件路径》'
    import AdminSearch from '../../../../components/web-search'
    import DoctorListModal from './doctor-list-modal'
    import {operation} from "../../../../js/render";
    import {GetRegion} from "../../../../api/web"
    import {deepCopy} from "../../../../js/common"

    export default {
        name: "doctor-list-table",
        props: {},
        components: {AdminSearch, DoctorListModal},
        data() {
            let operationList = [
                {
                    title: '修改', onClick: (params) => {
                        this.onEdit(params.row)
                    }
                },
                {
                    title: '人员', onClick: (params) => {
                        this.onUser(params.row)
                    }
                }
            ]
            let operationRender = operation(operationList);
            return {
                showListModal: false,
                columns: [
                    {
                        title: '序号',
                        type: 'index'
                    },
                    {
                        title: '地区',
                        key: 'regionName'
                    },
                    {
                        title: '排序',
                        key: 'order'
                    },
                    {
                        title: '操作',
                        render: operationRender,
                        width: 200
                    }
                ],
                dataList: [],
                infoFrom: {}
            }
        },
        methods: {
            init() {
                GetRegion().then(res => {
                    if (res.status) {
                        this.dataList = res.data || []
                    }
                })
            },
            onSearch(msg) {
                window.console.log(msg, '搜索')
            },
            onAddItem() {
                this.showListModal = true;
            },
            onUploadList() {
                this.init()
            },
            onEdit(params) {
                this.showListModal = true;
                this.infoFrom = params;
            },
            onUser(params) {
                this.$emit('show-user-table', params)
            }
        },
        mounted() {
            this.init()
        }
    }
</script>

<style lang='less' scoped>
</style>