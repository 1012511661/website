<template>
    <div class='capsule-video'>
        <UserConType :type="type" :dataList="dataList" :dataInfo="dataInfo" :isBack="type===3?true:false"></UserConType>
    </div>
</template>

<script>
    import UserConType from "../components/user-content-type"
    import { GetMenuInfo} from "../../../api/web";

    export default {
        name: "parsing",
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
                GetMenuInfo('PARSING').then(res => {
                    if (res.status&&res.data.length) {
                        this.type = res.data[0].menuPo.menuType||0;
                        if(this.type !=3){
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
    //@import url($3); 引入公共css类
</style>