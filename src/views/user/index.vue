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
    import {GetCompany, GetMenuList} from '../../api/web'
    export default {
        name: "user",
        props: {},
        components: {LogoSearch, HeaderNav, FooterWarp, UserShare},
        data() {
            return {
                menuList: [],
                infoFrom:{}
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