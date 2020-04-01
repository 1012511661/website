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
                        <AdminFootBtns @on-del="onDelItem(item, index)"></AdminFootBtns>
                    </div>
                </template>
            </div>
        </Card>
        <!-- 公司介绍 -->
        <Card class="card-warp">
            <p slot="title">
                <Icon type="ios-home"/>
                公司介绍
            </p>
            <Button slot="extra" type="primary" @click="goEditPro">编辑</Button>
            <div class="banner-list">
                <video :src="videoSrc" controls="controls" width="30%"
                       height="100%"></video>
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
                页面底部
            </p>
            <Button slot="extra" type="primary" @click="goEditFoot">编辑</Button>
            <FooterWarp ref="FooterWarp"></FooterWarp>
        </Card>
        <BannerModal v-model="showBannerModal" :defaultList="bannerList" @upload-order-list="uploadBannerlist"></BannerModal>
        <ProjectModal v-model="showProModal" @upload-project="uploadProject" ref="ProjectModal"></ProjectModal>
        <FooterModal v-model="showFooterModal" @upload-footer="uploadFooter" ref="FooterModal"></FooterModal>
    </div>
</template>

<script>
    import AdminFootBtns from '../components/admin-foot-btns'
    import BannerModal from './components/banner-modal'
    import ProjectModal from './components/project-modal'
    import DoctorWarp from './components/doctor-warp'

    import FooterWarp from './components/footer-warp'
    import FooterModal from './components/footer-modal'
    import {deepCopy} from "../../../js/common";

    export default {
        name: "home",
        props: {},
        components: {
            AdminFootBtns,
            BannerModal,
            ProjectModal,
            DoctorWarp,
            FooterWarp,
            FooterModal
        },
        data() {
            return {
                showBannerModal: false,
                showProModal: false,
                showFooterModal: false,
                bannerList: [
                    'https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large',
                    'https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large'],
                aaa: [
                    {
                        src: require("../../../assets/banner1.jpg"),
                        id: 1
                    },
                    {
                        src: require("../../../assets/banner2.jpg"),
                        id: 2
                    },
                    {
                        src: require("../../../assets/banner3.jpg"),
                        id: 3
                    },
                    {
                        src: require("../../../assets/banner3.jpg"),
                        id: 4
                    }
                ],
                videoSrc: 'https://www.w3school.com.cn/i/movie.ogg'
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
            uploadBannerlist() {
                window.console.log('更新 banner')
            },
            // 公司信息
            goEditPro() {
                this.showProModal = true;
                window.console.log(this.videoSrc, 'this.videoSrc')
                this.$refs.ProjectModal.proFrom = {
                    src: this.videoSrc
                }
            },
            uploadProject() {
                window.console.log('更新 公司信息')
            },
            // foot
            goEditFoot() {
                this.showFooterModal = true;
                this.$refs.FooterModal.infoFrom = deepCopy(this.$refs.FooterWarp.infoFrom)
            },
            uploadFooter() {
                window.console.log('更新 footer')
            }
        },
        mounted() {
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
                        object-fit: cover
                    }
                }
            }
        }
    }
</style>