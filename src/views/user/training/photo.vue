<template>
    <div class='training-photo'>
        <UserConType :type="type" :dataList="dataList" :dataInfo="dataInfo"></UserConType>

    </div>
</template>

<script>
    import UserConType from "../components/user-content-type"
    import {GetMenuId, GetMenuInfo} from "../../../api/web";

    export default {
        name: "photo",
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
                GetMenuInfo({menuId: 'PHOTO'}).then(res => {
                    if (res.status&&res.data.length) {
                        this.type = res.data[0].menuPo.menuType || 0;
                        if (this.type != 3) {
                            this.dataList = res.data;
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