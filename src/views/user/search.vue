<template>
    <div class="capsule">
        <UserTwoBanner :banner="banner"></UserTwoBanner>
        <!-- 左侧 -->
        <div :class="{'content-cell':true, 'pc-cell':!isShowSmall}">
            <UserTwoNav :navList="navList" :title="title" :search="true"></UserTwoNav>
            <!-- 右侧 -->
            <div class="content-right">
                <UserConType :type="type" :dataList="dataList" :dataInfo="dataInfo"
                             :isBack="type !==3?true:false"></UserConType>
            </div>
        </div>
    </div>
</template>

<script>
    import UserTwoBanner from "./components/user-two-banner"
    import UserTwoNav from "./components/user-two-nav"
    import UserConType from "./components/user-content-type"
    import {GetMenuArticle, GetMenuInfoId} from "../../api/web";

    export default {
        name: "capsule",
        props: {},
        components: {UserTwoBanner, UserTwoNav, UserConType},
        data() {
            return {
                navList: [
                    {
                        to: {
                            path: 'search',
                        },
                        name: '站内搜索'
                    },
                ],
                title: '站内搜索',
                dataList: [],
                dataInfo: {},
                type: 2,
                banner:require('../../assets/banner.jpg')
            }
        },
        computed: {
            isShowSmall() {
                return this.$store.state.isShowSmall
            }
        },
        methods: {
            init() {
                this.getData()
            },
            getData(msg) {
                GetMenuArticle({searchInfo: msg, type: 1}).then(res => {
                    if (res.status && res.data) {
                        if (res.data.length > 1) {
                            this.dataList = res.data;
                            this.type = 2;
                        } else {
                            this.getInfo(res.data[0])
                        }
                    } else {
                        this.$Notice.warning({title: '错误', desc: res.msg})
                    }
                })
            },
            getInfo(item){
                GetMenuInfoId(item.infoId).then(res => {
                    if (res.status) {
                        this.dataInfo = res.data;
                        this.type = 3;
                    }else {
                        this.$Notice.warning({title: '错误', desc: res.msg})
                    }
                })
            }
        },
        mounted() {
            this.bus.$on("searchInfo", msg => {
                this.getData(msg)
            });
        },
        beforeDestroy() {
            this.bus.$off("searchInfo");
        }
    }
</script>

<style lang='less' scoped>
    @import "../../styles/custom.less";
    @import "../../styles/mixin.less";
    @media screen and (max-width: 996px) {
        .content-right{
            width: 100% !important;
        }
    }
    .capsule {
        .data-info()
    }
</style>