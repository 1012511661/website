<template>
    <div class='manag-list'>
        <Table :columns="columns" :data="dataList"></Table>
        <ManageModal v-model="showModal" :id="id" @upload-manage="uploadManage" ref="ManageModal"></ManageModal>
    </div>
</template>

<script>
    import {operation} from "../../../js/render";
    import ManageModal from './components/manage-modal'
    import {GetMenuList} from "../../../api/web"
    import {deepCopy} from "../../../js/common";

    export default {
        name: "manag-list",
        props: {},
        components: {ManageModal},
        data() {
            let operationList = [
                {
                    title: '隐藏', key: 'menuShow', hide: true, onClick: (params) => {
                        this.onShow(params.row, 0)
                    }
                },
                {
                    title: '显示', key: 'menuView', hide: true, onClick: (params) => {
                        this.onShow(params.row, 1)
                    }
                },
                {
                    title: '修改', key: 'menuEdit', hide: true, onClick: (params) => {
                        this.onEdit(params.row)
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
                        title: '栏目名',
                        key: 'menuName',
                    },
                    {
                        title: '排序',
                        key: 'menuNumber',
                        width: 100
                    },
                    {
                        title: '封面地址',
                        key: 'pictures',
                        minWidth: 200
                    },
                    {
                        title: '操作',
                        render: operationRender,
                        width: 200
                    }
                ],
                dataList: []
            }
        },
        computed: {},
        watch: {},
        methods: {
            init() {
                this.getDataList()
            },
            getDataList() {
                GetMenuList().then(res => {
                    if (res.status) {
                        this.dataList = (res.data || []).map((item, index) => {
                            return {
                                menuId: item.menuId,
                                menuName: item.menuName,
                                menuNumber: item.menuNumber,
                                menuPicture: item.menuPicture,
                                menuShow: item.menuShow && index !== 0,
                                menuView: !item.menuShow && index !== 0,
                                menuEdit: true && index !== 0,
                                pictures: index == 0 ? '' : item.pictures[0],
                            }
                        })
                    } else {
                        this.$Notice.warning({title: '错误', desc: res.msg})
                    }
                })
            },
            uploadManage() {
                window.console.log('请求栏目管理接口')
            },
            onEdit(params) {
                this.showModal = true;
                this.id = params.id;
                this.$refs.ManageModal.manageFrom = deepCopy(params);
            },
            onShow(params, num) {
                // this.$emit('show-user-table', params)
            },
            onView(params) {
                // this.$emit('show-user-table', params)
            }
        },
        mounted() {
            this.init()
        }
    }
</script>

<style lang='less' scoped>
    @import "../../../styles/custom.less";
    @import "../../../styles/mixin.less";

    .manag-list {
        .adminStyle(@nav-default-color, 20px);
    }
</style>