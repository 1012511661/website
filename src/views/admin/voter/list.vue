<template>
    <div class='voter-list'>
        <AdminSearch @on-search="onSearch" :isAdd="false"></AdminSearch>
        <Table :columns="columns" :data="dataTable"></Table>
    </div>
</template>

<script>
    import AdminSearch from '../../../components/web-search'
    import {GetCadVoter} from '../../../api/web'

    export default {
        name: "list",
        components: {AdminSearch},
        data() {
            return {
                columns: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 100
                    },
                    {
                        title: '投票人',
                        key: 'voterName'
                    },
                    {
                        title: '投票人电话',
                        key: 'voterMobile',
                    },
                    {
                        title: '所投医生',
                        key: 'cdName',
                    },
                    {
                        title: '所属地区',
                        key: 'regionName',
                    },
                ],
                dataTable: [],
                searchInfo: ''
            }
        },
        methods: {
            init() {
                GetCadVoter({searchInfo: this.searchInfo}).then(res => {
                    if (res.status) {
                        this.dataTable = res.data || [];
                    } else {
                    this.$Notice.warning({title: '错误', desc: res.msg})
                }
                })
            },
            onSearch(msg) {
                this.searchInfo = msg;
                this.init();
            },
        },
        mounted() {
            this.init()
        }
    }
</script>

<style lang='less' scoped>
    @import "../../../styles/custom.less";
    @import "../../../styles/mixin.less";

    .voter-list {
        .adminStyle(@nav-default-color, 20px);
    }
</style>