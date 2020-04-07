<template>
    <div class='admin-nav-table'>
        <AdminSearch :isShowBack="true" @on-search="onSearch" @on-add-item="onAddItem"
                     @on-back-item="onBackItem"></AdminSearch>
        <Table :columns="columns" :data="dataList"></Table>
        <AdminNavInfoModal v-model="showModal" :menuId="menuId" :info="info" @upload-nav-table="uploadInfoList"
                           ref="AdminNavInfoModal"></AdminNavInfoModal>
    </div>
</template>

<script>
    import {operation} from "../../../js/render";
    import AdminNavInfoModal from './admin-nav-info-modal'
    import AdminSearch from '../../../components/web-search'
    import {deepCopy} from "../../../js/common";
    import {GetMenuInfo, DelMenuInfoId} from '../../../api/web'
    import moment from 'moment';

    export default {
        name: "admin-nav-table",
        props: {
            menuId: {
                type: String,
                default: ''
            }
        },
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
                        title: '标题',
                        key: 'infoName'
                    },
                    {
                        title: '时间',
                        key: 'gmtUpdated'
                    },
                    {
                        title: '父级名',
                        key: 'gmtUpdated'
                    },
                    {
                        title: '父级类型',
                        key: 'gmtUpdated'
                    },
                    {
                        title: '操作',
                        render: operationRender,
                        width: 200
                    }
                ],
                dataList: [],
                info: {}
            }
        },
        methods: {
            onSearch() {
            },
            onAddItem() {
                this.showModal = true;
            },
            getDataList() {
                GetMenuInfo({menuId: this.menuId}).then(res => {
                    if (res.status) {
                        this.dataList = res.data.map(item => {
                            item.gmtUpdated = moment(item.gmtUpdated).format("YYYY-MM-DD");
                            return item;
                        })
                    } else {
                    }
                })
            },
            uploadInfoList() {
                this.getDataList()
            },
            onBackItem() {
                this.$emit('on-back-nav')
            },
            onEdit(params) {
                this.showModal = true;
                this.id = params.id;
                this.info = deepCopy(params)
            },
            onDel(params) {
                DelMenuInfoId({infoId:params.infoId}).then(res => {
                    if (res.status) {

                    } else {
                    }
                })
            },
        },
        mounted() {
            this.getDataList()
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