<template>
    <div class='contact-cooperation'>
        <UserConType :type="type" :dataList="dataList" :dataInfo="dataInfo" :isBack="type===3?true:false"></UserConType>
    </div>
</template>

<script>
    import UserConType from "../components/user-content-type"
    import {GetMenuInfo, GetMenuInfoId} from "../../../api/web";
    export default {
        name: "cooperation",
        components: {UserConType},
        data() {
            return {
                dataList: [],
                dataInfo: {},
                type: 2
            }
        },
        methods: {
            init() {
                this.getDataList()
            },
            getDataList() {
                GetMenuInfo('COOPERATION').then(res => {
                    if (res.status && res.data.length) {
                        this.type = res.data[0].menuPo.menuType || 0;
                        if (this.type != 3) {
                            this.dataList = res.data;
                        } else {
                            this.getInfo(res.data[0])
                        }
                    }
                })
            },
            getInfo(item) {
                GetMenuInfoId(item.infoId).then(res => {
                    if (res.status) {
                        this.dataInfo = res.data;
                        this.type = 3;
                    } else {
                        this.$Notice.warning({title: '错误', desc: res.msg})
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
    //@import url($3); 引入公共css类
</style>