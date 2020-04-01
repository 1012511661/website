<template>
    <!--    木竭胶囊-->
    <div class="experts">
        <UserTwoBanner :banner="bannerSrc"></UserTwoBanner>
        <!-- 左侧 -->
        <div :class="{'content-cell':true, 'pc-cell':!isShowSmall}">
            <UserTwoNav :navList="navList" :title="title"></UserTwoNav>
            <!-- 右侧 -->
            <div class="content-right">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import UserTwoBanner from "../components/user-two-banner"
    import UserTwoNav from "../components/user-two-nav"

    export default {
        name: "experts",
        props: {},
        components: {UserTwoBanner, UserTwoNav},
        data() {
            return {
                navList: [],
                title: '',
                bannerSrc: ''
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
                let _menuList = JSON.parse(sessionStorage.getItem('menu'))
                for (let i of _menuList) {
                    if (i.menuId === 'EXPERTS') {
                        this.bannerSrc = i.pictures[0];
                        this.title = i.menuName;
                        for (let k = 0; k < i.menuPos.length; k++) {
                            let _obj = {
                                to: {
                                    path: i.menuPos[k].menuId.toLowerCase()
                                },
                                name: i.menuPos[k].menuName
                            };
                            this.navList.push(_obj)
                        }
                    }
                }
            },
        },
        mounted() {
            this.init()
        }
    }
</script>

<style lang='less' scoped>
    @import "../../../styles/custom.less";

    .experts {
        .pc-cell{
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