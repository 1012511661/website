<template>
    <div class=''>
        <header class="main-head-div">
            <div class="logo-warp">
                <!-- logo-->
                <LogoSearch class="logo-search-cell"></LogoSearch>
                <!-- 导航 -->
                <HeaderNav :menuList="menuList"></HeaderNav>
            </div>
        </header>
        <router-view></router-view>
        <footer>
            <FooterWarp></FooterWarp>
        </footer>
        <!--分享 -->
<!--        <UserShare></UserShare>-->
    </div>
</template>

<script>
    import LogoSearch from "./logo-search"
    import HeaderNav from './header-nav'
    import FooterWarp from './footer-warp'
    import UserShare from './components/user-share'
    import {GetMenuList} from '../../api/web'
    export default {
        name: "user",
        props: {},
        components: {LogoSearch, HeaderNav, FooterWarp, UserShare},
        data() {
            return {
                menuList: []
            }
        },

        methods: {
            init() {
                this.getWidth();
                this.getData();

            },
            getData() {
                GetMenuList().then(res => {
                    if (res.status) {
                        this.menuList = res.data
                        sessionStorage.setItem('menu', JSON.stringify(res.data))
                    }else {
                        this.$Notice.warning({title: '错误', desc: res.msg})
                    }
                })
                // let _arr = [
                //     {
                //         menuId: "HOME",
                //         menuName: "首页",
                //         single: true,
                //         child: [],
                //         imgList: []
                //     },
                //     {
                //         menuId: "CAPSULE",
                //         menuName: "木竭胶囊",
                //         single: false,
                //         imgList: [],
                //         child: [
                //             {
                //                 menuId: "VIDEO",
                //                 menuName: "视频宣传",
                //             },
                //             {
                //                 menuId: "PARSING",
                //                 menuName: "组方解析",
                //             },
                //             {
                //                 menuId: "PROJECT",
                //                 menuName: "木竭项目介绍",
                //             }
                //         ]
                //     },
                //     {
                //         menuId: "EXPERTS",
                //         menuName: "专家义诊",
                //         single: false,
                //         child: [
                //             {
                //                 menuId: "ADDRESS",
                //                 menuName: "定点义诊",
                //             },
                //             {
                //                 menuId: "INTRODUCTION",
                //                 menuName: "专家简介",
                //             },
                //             {
                //                 menuId: "DECLARED",
                //                 menuName: "义诊宣告",
                //             }
                //         ]
                //     },
                //     {
                //         menuId: "TRAINING",
                //         menuName: "技术培训",
                //         single: false,
                //         child: [
                //             {
                //                 menuId: "THERAPY",
                //                 menuName: "太极调衡疗法",
                //             }, {
                //                 menuId: "PHOTO",
                //                 menuName: "培训合影",
                //             }
                //         ]
                //     },
                //     {
                //         menuId: "CONTACT",
                //         menuName: "联系我们",
                //         single: false,
                //         child: [
                //             {
                //                 menuId: "RECRUITMENT",
                //                 menuName: "人才招聘",
                //             },
                //             {
                //                 menuId: "COOPERATION",
                //                 menuName: "定点合作登记",
                //             }
                //         ]
                //     },
                // ];
                // this.menuList = _arr;
                // sessionStorage.setItem('menu', JSON.stringify(_arr))
            },
            getWidth() {
                if (window.innerWidth < 850) {
                    this.$store.commit("setShowSmall", true)
                } else {
                    this.$store.commit("setShowSmall", false)
                }
            }
        },
        created() {
            window.addEventListener('resize', this.getWidth);

            this.init()
        },
        mounted() {
        },
        destroyed() {
            window.removeEventListener('resize', this.getWidth)
        },
    }
</script>

<style lang='sass' scoped>
</style>