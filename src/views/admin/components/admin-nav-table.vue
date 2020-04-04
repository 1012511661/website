<template>
    <div class='admin-nav-table'>
        <Table :columns="columns" :data="dataTable"></Table>
        <AdminNavModal v-model="showModal" @upload-nav-table="uploadNavTable" ref="AdminNavModal"></AdminNavModal>
    </div>
</template>

<script>
    import {typeCode} from '../../../js/code'
    import {operation} from "../../../js/render";
    import AdminNavModal from './admin-nav-modal'
    import {GetMenuId} from "../../../api/web";
    import {deepCopy} from "../../../js/common";

    export default {
        name: "admin-nav-table",
        props: {
            dataList: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        components: {
            AdminNavModal
        },
        data() {
            let operationList = [
                {
                    title: '修改', onClick: (params) => {
                        this.onEdit(params.row)
                    }
                },
                {
                    title: '查看', onClick: (params) => {
                        this.onView(params.row)
                    }
                }
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
                        title: '栏目名',
                        key: 'menuName'
                    },
                    {
                        title: '排序',
                        key: 'menuNumber',
                    },
                    {
                        title: '类型',
                        key: 'typeName',
                    },
                    {
                        title: '是否显示',
                        key: 'menuShowType',
                        width: 100
                    },
                    {
                        title: '操作',
                        render: operationRender,
                        width: 200
                    }
                ],
                dataTable: this.dataList
            }
        },
        methods: {
            getDataList(id) {
                this.menuId = id;
                GetMenuId(id).then(res => {
                    if (res.status) {
                        this.dataTable = (res.data.menuPos || []).map(item => {
                            let status = typeCode.find(find => find.typeId === item.menuType);
                            item.typeName = (status || typeCode[0]).typeName;
                            item.menuShowType = item.menuShow ? '是' : '否';
                            item.menuShow = item.menuShow ? 1 : 0;
                            item.menuType = item.menuType || 0;
                            return item;
                        })
                    }
                })
            },
            uploadNavTable() {
                this.getDataList(this.menuId)
            },
            onEdit(params) {
                this.showModal = true;
                this.id = params.id;
                this.$refs.AdminNavModal.navFrom = deepCopy(params)
            },
            onView(params) {
                this.$emit('on-view-list', params)
            }
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