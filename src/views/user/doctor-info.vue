<template>
    <!--    木竭胶囊-->
    <div class="capsule">
        <UserTwoBanner></UserTwoBanner>
        <!-- 左侧 -->
        <div :class="{'content-cell':true, 'pc-cell':!isShowSmall}">
            <UserTwoNav :navList="navList" :title="title" :search="true"></UserTwoNav>
            <!-- 右侧 -->
            <div class="content-right">
                <UserConType :type="4" :dataInfo="dataInfo" isBack="false"></UserConType>
            </div>
        </div>
    </div>
</template>

<script>
    import UserTwoBanner from "./components/user-two-banner"
    import UserTwoNav from "./components/user-two-nav"
    import UserConType from "./components/user-content-type"

    export default {
        name: "doctor-info",
        props: {},
        components: {UserTwoBanner, UserTwoNav, UserConType},
        data() {
            return {
                navList: [],
                title: '医生简介',
                dataInfo: {
                    id: 1,
                    title: '一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十',
                    time: '2019-20-20',
                    content: '11111111111111111111111111111111111111'
                },
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
                            path: 'search',
                        },
                        name: '站内搜索'
                    },
                ]
            },
        },
        mounted() {
            this.init()
        }
    }
</script>

<style lang='less' scoped>
    @import "../../styles/custom.less";

    .capsule {
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