<template>
    <div class="doctor-info">
        <UserTwoBanner :banner="banner"></UserTwoBanner>
        <!-- 左侧 -->
        <div :class="{'content-cell':true, 'pc-cell':!isShowSmall}">
            <UserTwoNav :navList="navList" :title="title" :search="true"></UserTwoNav>
            <!-- 右侧 -->
            <div class="content-right">
                <UserInfoWarp :dataInfo="dataInfo" :isBack="false"></UserInfoWarp>
            </div>
        </div>
    </div>
</template>

<script>
    import UserTwoBanner from "./components/user-two-banner"
    import UserTwoNav from "./components/user-two-nav"
    import UserInfoWarp from "./components/user-info-warp"
    import {GetCadInfoId,GetMenuInfoId} from "../../api/web"

    export default {
        name: "data-info",
        props: {},
        components: {UserTwoBanner, UserTwoNav, UserInfoWarp},
        data() {
            return {
                navList: [],
                title: '医生简介',
                dataInfo: {},
                banner: require('../../assets/banner.jpg')
            }
        },
        computed: {
            isShowSmall() {
                return this.$store.state.isShowSmall
            }
        },
        methods: {
            init() {
                this.getMenu()
            },
            getMenu() {
                // this.dataInfo = this.$route.params.item;
                let item = this.$route.params.item;
                let type = this.$route.params.type;
                let name;
                if (type === 1) {
                    this.title = '公司动态';
                    name = '动态详情';
                    GetMenuInfoId(item.infoId).then(res => {
                        if (res.status) {
                            this.dataInfo = res.data;
                        }
                    })
                } else {
                    this.title = '医生简介';
                    name = '医生简介';
                    GetCadInfoId(item.cdId).then(res => {
                        if (res.status) {
                            this.dataInfo = res.data;
                        }
                    })
                }
                this.navList = [
                    {
                        to: {
                            path: 'doctorInfo',
                        },
                        name: name
                    },
                ];
            },
        },
        mounted() {
            this.init()
        }
    }
</script>

<style lang='less' scoped>
    @import "../../styles/custom.less";
    @import "../../styles/mixin.less";

    @media screen and (max-width: 996px) {
        .content-right {
            width: 100% !important;
        }
    }

    .doctor-info {
        .data-info()
    }
</style>