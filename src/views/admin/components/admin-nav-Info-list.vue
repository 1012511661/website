<template>
    <div class='admin-nav-table'>
        <AdminSearch :isShowBack="true" @on-search="onSearch" @on-add-item="onAddItem"
                     @on-back-item="onBackItem"></AdminSearch>
        <Table :columns="columns" :data="dataList"></Table>
        <AdminNavInfoModal v-model="showModal" @upload-nav-table="uploadInfoList"
                           ref="AdminNavInfoModal"></AdminNavInfoModal>
    </div>
</template>

<script>
    import {operation} from "../../../js/render";
    import AdminNavInfoModal from './admin-nav-info-modal'
    import AdminSearch from '../../../components/web-search'
    import {deepCopy} from "../../../js/common";

    export default {
        name: "admin-nav-table",
        props: {},
        components: {
            AdminNavInfoModal,
            AdminSearch
        },
        data() {
            let operationList = [
                {
                    title: '修改', onClick: (params) => {
                        this.onEdit(params.row)
                    }
                },
                {
                    title: '删除', onClick: (params) => {
                        this.onDel(params.row)
                    }
                },
            ]
            let operationRender = operation(operationList);
            return {
                showModal: false,
                id: null,
                columns: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 80
                    },
                    {
                        title: '名字',
                        key: 'name'
                    },
                    {
                        title: '时间',
                        key: 'time'
                    },
                    {
                        title: '操作',
                        render: operationRender,
                        width: 200
                    }
                ],
                dataList: [
                    {
                        name: '文章1',
                    },
                    {
                        name: '文章2',
                    }
                ]
            }
        },
        methods: {
            onSearch() {
            },
            onAddItem() {
                this.showModal = true;
            },
            getDataList(id) {
                // this.dataTable = data.map(item => {
                //     return {
                //         id: item.id,
                //         name: item.name,
                //         type: "" + item.type,
                //         typeName: typeCode[item.type].typeName,
                //         order: item.order,
                //         isShow: item.isShow,
                //         isView: !item.isShow
                //     }
                // })
            },
            uploadInfoList() {
                window.console.log('请求详情列表')
            },
            onBackItem() {
                this.$emit('on-back-nav')
            },
            onEdit(params) {
                this.showModal = true;
                this.id = params.id;
                this.$refs.AdminNavInfoModal.infoFrom = deepCopy(params)
            },
            onDel(params) {
            },
        }
    }
</script>

<style lang='less' scoped>
    @import "../../../styles/custom.less";
    @import "../../../styles/mixin.less";

    .admin-nav-table {
        .adminStyle(@nav-default-color, 20px);
    }
</style>