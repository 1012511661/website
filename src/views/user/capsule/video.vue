<template>
    <div class='capsule-video'>
        <UserConType :type="type" :dataList="dataList" :dataInfo="dataInfo" :isBack="type!==3?true:false"></UserConType>
    </div>
</template>

<script>
    import UserConType from "../components/user-content-type"
    import {GetMenuInfo} from "../../../api/web"

    export default {
        name: "video",
        props: {},
        components: {UserConType},
        data() {
            return {
                dataList: [],
                dataInfo: {},
                type: 0
            }
        },
        methods: {
            init() {
                this.getDataList()
            },
            getDataList() {
                GetMenuInfo( 'VIDEO').then(res => {
                    if (res.status&&res.data.length) {
                        this.type = res.data[0].menuPo.menuType||0;
                        if(this.type !==3){
                            this.dataList = res.data
                        } else {
                            this.dataInfo = res.data[0];
                        }
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