<template>
    <div class="doctor-info">
        <UserTwoBanner></UserTwoBanner>
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

    export default {
        name: "doctor-info",
        props: {},
        components: {UserTwoBanner, UserTwoNav, UserInfoWarp},
        data() {
            return {
                navList: [],
                title: '医生简介',
                dataInfo: {},
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
                this.navList = [
                    {
                        to: {
                            path: 'doctorInfo',
                        },
                        name: '医生简介'
                    },
                ];
                this.dataInfo = this.$route.params.item;
                window.console.log(this.dataInfo,'this.dataInfo')
            },
        },
        mounted() {
            this.init()
        }
    }
</script>

<style lang='less' scoped>
    @import "../../styles/custom.less";
    .doctor-info {
        .pc-cell {
            display: flex;
        }

        .content-cell {
            min-height: 70vh;

            .content-right {
                width: 100%;
                border: 1px dashed #eee;
                padding: 10px;
                margin: 20px 0;
            }
        }
    }
</style>