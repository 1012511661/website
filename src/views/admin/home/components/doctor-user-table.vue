<template>
    <div class=''>
        <AdminSearch :isShowBack="true" @on-search="onSearch" @on-add-item="onAddItem"
                     @on-back-item="onBack"></AdminSearch>
        <Table :columns="columns" :data="dataList"></Table>
        <DoctorUserModal v-model="showUserModal" @upload-doctor-user="onUploadUser"
                         :title="id?'修改':'添加'" :regionId="regionId" ref="DoctorUserModal"></DoctorUserModal>
    </div>
</template>
<script>
    //例如：import 《组件名称》 from '《组件路径》'
    import AdminSearch from '../../../../components/web-search'
    import DoctorUserModal from './doctor-user-modal'
    import {operation} from "../../../../js/render";
    import {GetRegionId,DelCadId} from '../../../../api/web'
    import {deepCopy} from "../../../../js/common";

    export default {
        name: "doctor-user-table",
        props: {},
        components: {AdminSearch, DoctorUserModal},
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
                showUserModal: false,
                id: null,
                columns: [
                    {
                        title: '序号',
                        type: 'index'
                    },
                    {
                        title: '姓名',
                        key: 'cdName'
                    },
                    // {
                    //     title: '医院',
                    //     key: 'doctor'
                    // },
                    {
                        title: '图片地址',
                        key: 'src'
                    },
                    {
                        title: '操作',
                        render: operationRender,
                        width: 200
                    }
                ],
                dataList: [],
                regionId: null
            }
        },
        computed: {},
        watch: {},
        methods: {
            getDataList(id) {
                this.regionId = id;
                GetRegionId(id).then(res => {
                    if (res.status) {
                        this.dataList = res.data || []
                    }
                })
            },
            onSearch(msg) {
                window.console.log(msg, '搜索')
            },
            onAddItem() {
                this.showUserModal = true;
                this.id = null;
            },
            onUploadUser() {
                this.getDataList(this.regionId);
            },
            onEdit(params) {
                this.showUserModal = true;
                this.id = params.cdId;
                this.$refs.DoctorUserModal.infoFrom = deepCopy(params);
            },
            onDel(params) {
                this.$Modal.confirm({
                    title: '確定刪除？',
                    onOk: () => {
                        DelCadId (params.cdId).then(res => {
                            if (res.status) {
                                this.$Notice.success('刪除成功');
                                this. getDataList(this.regionId);
                            }
                        })
                    }
                })
            },
            onBack() {
                this.$emit('show-List-table')
            }
        }
    }
</script>

<style lang='less' scoped>
</style>