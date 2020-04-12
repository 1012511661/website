<template>
    <div class="comp-upload">
        <Row>
            <Col :xs="24" :sm="24" :md="{span: 12}" :lg="{ span: 12}">
                <div :class="{'comp-cell':true, 'video-cell':!isShowSmall}">
                    <div class="title-warp video-title">
                        <span class="title">公司简介</span>
                    </div>
                    <video :src="videoSrc" controls="controls" class="video" width="100%"
                           height="250px"
                           style="padding-top: 5px;">
                    </video>
                </div>
            </Col>
            <Col :xs="24" :sm="24" :md="{ span: 12}" :lg="{ span: 12}">
                <div :class="{'comp-cell':true, 'list-cell':!isShowSmall}">
                    <Tabs value="name1" class="" style=" background: #e5e5e6;">
                        <TabPane label="公司动态" name="name1" class="tabs-item">
                            <div class="img-list" v-if="!isShowSmall">
                                <!-- img-list -->
                                <div class="item">
                                    <img :src="dataList[currentIndex].infoPicture||'http://img.zcool.cn/community/01aa925b890fc3a80120245cd2ccfb.gif'"
                                         style="">
                                </div>
                                <!-- 按鈕組-->
                                <div class="page">
                                    <ul>
                                        <li v-for="(item,index) in dataList" @click="gotoPage(index)"
                                            :class="{'current':currentIndex == index,'li-icon':true}">
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="upload-list">
                                <template v-for="(item,index) in dataList">
                                    <div :key="index" class="upload-list-cell" @click="goDataInfo(item)">
                                        <Icon type="ios-eye-outline" style="color: green;"/>
                                        <span class="title">
                                            {{item.infoName}}
                                        </span>
                                        <i>
                                            {{item.gmtUpdated|timeFilter}}
                                        </i>
                                    </div>
                                </template>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
    import {GetMenuArticle} from "../../../../api/web";
    import moment from 'moment';

    export default {
        name: "company-upload",
        props: {},
        components: {},
        data() {
            return {
                dataList: [],
                currentIndex: 0,   //默认显示图片
                timer: null,    //定时器
                value1: 0,
                videoSrc: ''
            }
        },
        computed: {
            isShowSmall() {
                return this.$store.state.isShowSmall
            },
            //下一张
            nextIndex() {
                if (this.currentIndex == this.dataList.length - 1) {
                    return 0;
                } else {
                    return this.currentIndex + 1;
                }
            }
        },
        filters: {
            timeFilter(val) {
                return val ? moment(val).format("MM-DD") : '';
            }
        },
        methods: {
            gotoPage(index) {
                this.currentIndex = index;
                // clearInterval(this.timer)
            },
            //定时器
            runInv() {
                this.timer = setInterval(() => {
                    this.gotoPage(this.nextIndex)
                }, 3000)
            },
            // 详情
            goDataInfo(item) {
                this.$router.push({
                    name: "DATAINFO",
                    params: {
                        item: item,
                        type: 1
                    }
                });
            },
            init() {
                this.bus.$on("companyVideoUrl", msg => {
                    this.videoSrc = msg
                });
                GetMenuArticle({searchInfo: '', type: 0}).then(res => {
                    if (res.status) {
                        this.dataList = res.data.splice(0, 7) || [];
                    } else {
                        this.$Notice.warning({title: '错误', desc: res.msg})
                    }
                })
            }
        },
        mounted() {
            this.runInv()
            this.init()
        },
        beforeDestroy() {
            clearInterval(this.timer);
            this.bus.$off('companyVideoUrl')
        },
    }
</script>

<style lang='less' scoped>
    @import "../../../../styles/custom.less";
    @import "../../../../styles/mixin.less";

    .comp-upload {
        max-width: 1200px;
        margin: 0 auto 20px;

        .comp-cell {
            margin-top: 20px;
            height: 290px;
            overflow: hidden;

            .title-warp {
                background: @nav-default-color;
                height: 36px;
                line-height: 36px;
                display: flex;
                justify-content: space-between;

                .title {
                    font-weight: normal;
                    color: @bg-color;
                    width: 88px;
                    text-align: center;
                    background: @primary-color;
                    font-size: 14px;
                }

                .icon-more {
                    margin-right: 20px;
                    color: @home-header-bg-color;
                    cursor: pointer
                }
            }
        }

        .video-cell {
            margin-right: 10px;
        }

        .list-cell {
            margin-left: 10px;
        }

        .tabs-item {
            background-color: #fff;
            display: flex;

            .upload-list {
                width: 100%;

                .upload-list-cell {
                    margin: 5px 10px;
                    padding: 4.5px;
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    border-bottom: 1px dashed @nav-default-color;

                    &:hover {
                        cursor: pointer;
                    }

                    .title {
                        width: 82%;
                        padding-left: 5px;
                        display: inline-block;
                        .eclipsis(1);
                    }

                }
            }
        }

        .img-list {
            position: relative;
            padding-top: 5px;

            .item {
                img {
                    width: 200px;
                    height: 245px;
                    object-fit: fill;
                }
            }

            .page {
                position: absolute;
                bottom: 10px;
                right: 0;

                ul {
                    display: flex;

                    .li-icon {
                        list-style-type: none;
                        width: 15px;
                        height: 10px;
                        margin-right: 5px;
                        background-color: @nav-default-color;
                        cursor: pointer;
                    }

                    .current {
                        background-color: @primary-color;
                    }
                }
            }
        }
    }

    /deep/ .ivu-tabs-nav {
        .ivu-tabs-tab-active {
            background-color: @primary-color;
            color: @bg-color;
        }
    }

    /deep/ .ivu-tabs-bar {
        margin-bottom: 0 !important;
    }
</style>
