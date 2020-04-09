<template>
    <div class=''>
        <AdminSearch @on-search="onSearch" @on-add-item="onAddItem"></AdminSearch>
        <Table :columns="columns" :data="dataList"></Table>
        <DoctorListModal v-model="showListModal" @upload-doctor-list="onUploadList" :len="dataList.length"
                         :title="infoFrom.regionId?'修改':'添加'" :infoData="infoFrom"
                         ref="DoctorListModal"></DoctorListModal>
    </div>
</template>

<script>
    import AdminSearch from '../../../../components/web-search'
    import DoctorListModal from './doctor-list-modal'
    import {operation} from "../../../../js/render";
    import {GetRegion, DelVote} from "../../../../api/web"

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
                },
                {
                    title: '删除', onClick: (params) => {
                        this.onDel(params.row)
                    }
                }
            ]
            let operationRender = operation(operationList);
            return {
                showListModal: false,
                columns: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 100
                    },
                    {
                        title: '地区',
                        key: 'regionName'
                    },
                    {
                        title: '排序',
                        key: 'regionNumber'
                    },
                    {
                        title: '操作',
                        render: operationRender,
                        width: 200
                    }
                ],
                dataList: [],
                infoFrom: {},
                params: {
                    pageNum: 1,
                    pageSize: 100000,
                    searchInfo: ''
                }
            }
        },
        methods: {
            init() {
                GetRegion(this.params).then(res => {
                    if (res.status) {
                        this.dataList = res.data.dataList || []
                    }else {
                        this.$Notice.warning({title: '错误', desc: res.msg})
                    }
                })
            },
            onSearch(msg) {
                this.params.searchInfo = msg;
                this.init();
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
            },
            onDel(params) {
                this.$Modal.confirm({
                    title: '確定刪除？',
                    onOk: () => {
                        DelVote(params.regionId).then(res => {
                            if (res.status) {
                                this.$Notice.success({title: '成功', desc: '删除成功'});
                                this.init();
                            }else{
                                this.$Notice.warning({title: '错误', desc: res.msg})
                            }
                        })
                    }
                })
            }
        },
        mounted() {
            this.init()
        }
    }
</script>

<style lang='less' scoped>
</style>