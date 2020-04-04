<template>
    <div class='home'>
        <!-- 轮播 -->
        <BannerList :bannerList="bannerList"></BannerList>
        <!-- 公司动态 -->
        <CompUpload></CompUpload>
        <!-- 医生 -->
        <DoctorList></DoctorList>
        <!-- foot-->
        <div></div>
    </div>
</template>

<script>
    import BannerList from './components/banner-list'
    import CompUpload from './components/company-upload'
    import DoctorList from './components/doctor-list'

    export default {
        name: "home",
        props: {},
        components: {BannerList, CompUpload, DoctorList},
        data() {
            return {}
        },
        computed: {
            bannerList() {
                let _menuList = JSON.parse(sessionStorage.getItem('menu'));
                for (let i of _menuList) {
                    if (i.menuId === 'HOME') {
                        return i.pictures;
                    }
                }
            }
        }
    }
</script>
<style lang='less' scoped>
    .home {
    }
</style>