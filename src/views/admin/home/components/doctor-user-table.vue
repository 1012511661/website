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
    import AdminSearch from '../../../../components/web-search'
    import DoctorUserModal from './doctor-user-modal'
    import {operation} from "../../../../js/render";
    import {GetRegionId, DelCadId} from '../../../../api/web'
    import {deepCopy} from "../../../../js/common";

    export default {
        name: "doctor-user-table",
        props: {
            regionName: {
                type: String,
                default: ''
            }
        },
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
                        type: 'index',
                        width: 100
                    },
                    {
                        title: '姓名',
                        key: 'cdName',
                        width: 150
                    },
                    {
                        title: '所属地区',
                        key: 'regionName',
                        width: 150
                    },
                    {
                        title: '图片地址',
                        key: 'cdPicture'
                    },
                    {
                        title: '操作',
                        render: operationRender,
                        width: 120
                    }
                ],
                dataList: [],
                regionId: null,
                params: {
                    pageNum: 1,
                    pageSize: 10000,
                    searchInfo: '',
                    regionId: null
                }
            }
        },
        methods: {
            getDataList(id) {
                this.regionId = id;
                this.params.regionId = id;
                GetRegionId(this.params).then(res => {
                    if (res.status) {
                        this.dataList = (res.data.dataList || []).map(item => {
                            item.regionName = this.regionName
                            return item
                        })
                    } else {
                        this.$Notice.warning({title: '错误', desc: res.msg})
                    }
                })
            },
            onSearch(msg) {
                this.params.searchInfo = msg;
                this.getDataList(this.regionId);
            },
            onAddItem() {
                this.showUserModal = true;
                this.id = null;
                // this.$refs.DoctorUserModal.infoFrom = {};
                this.$refs.DoctorUserModal.srcList = [];
            },
            onUploadUser() {
                this.getDataList(this.regionId);
            },
            onEdit(params) {
                this.showUserModal = true;
                this.id = params.cdId;
                this.$refs.DoctorUserModal.infoFrom = deepCopy(params);
                this.$refs.DoctorUserModal.srcList = [params.cdPicture];
            },
            onDel(params) {
                this.$Modal.confirm({
                    title: '確定刪除？',
                    onOk: () => {
                        DelCadId(params.cdId).then(res => {
                            if (res.status) {
                                this.$Notice.success({title: '成功', desc: '删除成功'});
                                this.getDataList(this.regionId);
                            } else {
                                this.$Notice.warning({title: '错误', desc: res.msg})
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