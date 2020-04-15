<template>
    <div class='user-video-list'>
        <template v-if="isShowInfo">
            <Row>
                <template v-for="item in dataList">
                    <Col :xs="12" :sm="8" :md="8" :lg="8">
                        <div class="list-warp" style="" :key="item.id">
                            <div class="list-cell">
                                <video :src="item.videoUrl"
                                       controls="controls"
                                       class="src-warp"
                                >
                                </video>
                            </div>
                            <p class="title" @click="goInfo(item)">
                                {{item.infoName}}
                            </p>
                        </div>
                    </Col>
                </template>
            </Row>
        </template>
        <template v-else>
            <UserInfoWarp :dataInfo="dataInfo" @on-show-info="goSteps"></UserInfoWarp>
        </template>
    </div>
</template>

<script>
    import UserInfoWarp from "./user-info-warp"
    import {GetMenuInfoId} from '../../../api/web'

    export default {
        name: "user-video-list",
        props: {
            dataList: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        components: {UserInfoWarp},
        data() {
            return {
                isShowInfo: true,
                dataInfo: {}
            }
        },
        methods: {
            goInfo(item) {
                GetMenuInfoId(item.infoId).then(res => {
                    if (res.status) {
                        this.dataInfo = res.data;
                        this.isShowInfo = false;
                    }else {
                        this.$Notice.warning({title: '错误', desc: res.msg})
                    }
                })
            },
            // 返回
            goSteps() {
                this.isShowInfo = true
            },
        }
    }
</script>

<style lang='less' scoped>
    @import "../../../styles/mixin";

    .user-video-list {
        .list-warp {
            .list-warp();

            video {
                width: 90%;
                height: 185px;
                object-fit: initial;
            }
        }
    }
</style>