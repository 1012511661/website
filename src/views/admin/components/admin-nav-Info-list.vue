<template>
    <div class='admin-nav-table'>
        <AdminSearch :isShowBack="true" :isSearch="false" @on-add-item="onAddItem"
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
    import {typeCode} from "../../../js/code";

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
                        width: 100
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
                        key: 'menuName'
                    },
                    {
                        title: '父级类型',
                        key: 'typeName'
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
            onAddItem() {
                this.showModal = true;
            },
            getDataList() {
                GetMenuInfo({menuId: this.menuId}).then(res => {
                    if (res.status) {
                        this.dataList = res.data.map(item => {
                            let status = typeCode.find(find => find.typeId === item.menuPo.menuType);
                            item.typeName = (status || typeCode[0]).typeName;
                            item.gmtUpdated = moment(item.gmtUpdated).format("YYYY-MM-DD HH:mm:ss");
                            item.menuName = item.menuPo.menuName||'';
                            return item;
                        })
                    } else {
                        this.$Notice.warning({title: '错误', desc: res.msg})
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
                this.$Modal.confirm({
                    title: '確定刪除？',
                    onOk: () => {
                        DelMenuInfoId({infoId:params.infoId}).then(res => {
                            if (res.status) {
                                this.$Notice.success({title: '成功', desc: '删除成功'});
                                this.getDataList()
                            } else {
                                this.$Notice.warning({title: '错误', desc: res.msg})
                            }
                        })
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