<template>
    <div class='home'>
        <!-- banner -->
        <Card class="card-warp banner">
            <p slot="title">
                <Icon type="ios-reverse-camera"/>
                轮播列表
            </p>
            <Button slot="extra" type="primary" @click="goAddBanner">添加</Button>
            <div class="banner-list">
                <template v-for="(item,index) in bannerList">
                    <div class="img-warp" :key="index">
                        <img :src="item" alt=""/>
<!--                        <AdminFootBtns @on-del="onDelItem(item, index)"></AdminFootBtns>-->
                    </div>
                </template>
            </div>
        </Card>
        <!-- 百强名医录 -->
        <Card class="card-warp">
            <p slot="title">
                <Icon type="md-contacts"/>
                百强名医录
            </p>
            <DoctorWarp></DoctorWarp>
        </Card>
        <!-- 页面底部 -->
        <Card class="card-warp">
            <p slot="title">
                <Icon type="logo-twitter"/>
                公司信息
            </p>
            <Button slot="extra" type="primary" @click="goEditFoot">编辑</Button>
            <FooterWarp ref="FooterWarp"></FooterWarp>
        </Card>
        <BannerModal v-model="showBannerModal" :defaultList="bannerList"
                     @upload-order-list="uploadBannerlist"></BannerModal>
        <FooterModal v-model="showFooterModal" @upload-footer="uploadFooter" ref="FooterModal"></FooterModal>
    </div>
</template>

<script>
    import AdminFootBtns from '../components/admin-foot-btns'
    import BannerModal from './components/banner-modal'
    import DoctorWarp from './components/doctor-warp'

    import FooterWarp from './components/footer-warp'
    import FooterModal from './components/footer-modal'
    import {deepCopy} from "../../../js/common";
    import {GetMenuList} from "../../../api/web";

    export default {
        name: "home",
        props: {},
        components: {
            AdminFootBtns,
            BannerModal,
            DoctorWarp,
            FooterWarp,
            FooterModal
        },
        data() {
            return {
                showBannerModal: false,
                showProModal: false,
                showFooterModal: false,
                bannerList: [],
                videoSrc: 'https://www.w3school.com.cn/i/movie.ogg',
                companyInfo: {}
            }
        },
        computed: {},
        watch: {},
        methods: {
            // banner
            goAddBanner() {
                this.showBannerModal = true
            },
            onDelItem(item, index) {
                window.console.log(item, index, 'item,index')
            },
            getMenuList() {
                GetMenuList().then(res => {
                    if (res.status) {
                        this.bannerList = res.data[0].pictures
                        window.console.log(res, '111111')
                    }
                })
            },
            uploadBannerlist() {
                this.getMenuList();
            },
            // 公司信息
            goEditPro() {
                this.showProModal = true;
                this.$refs.ProjectModal.proFrom = {
                    src: this.videoSrc
                }
            },
            // foot
            goEditFoot() {
                this.showFooterModal = true;
                this.$refs.FooterModal.infoFrom = deepCopy(this.$refs.FooterWarp.infoFrom)
            },
            uploadFooter() {
                this.$refs.FooterWarp.init();
            }
        },
        mounted() {
            this.getMenuList()
        }
    }
</script>

<style lang='less' scoped>
    @import "../../../styles/custom.less";
    @import "../../../styles/mixin.less";

    .home {
        .adminStyle(@nav-default-color);

        .card-warp {
            margin: 10px 0;
        }

        .banner {
            .banner-list {
                display: flex;
                flex-wrap: wrap;

                .img-warp {
                    margin: 5px 10px;
                    width: 31%;
                    flex: 1;
                    min-width: 31%;
                    max-width: 31%;
                    position: relative;

                    &:hover {
                        .group-btns {
                            visibility: visible;
                            right: 5px;
                            bottom: 5px;
                        }
                    }

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover
                    }
                }
            }
        }
    }
</style>