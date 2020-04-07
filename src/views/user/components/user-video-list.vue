<template>
    <div class='user-video-list'>
        <template v-if="isShowInfo">
            <Row>
                <template v-for="item in dataList">
                    <Col :xs="12" :sm="8" :md="8" :lg="8">
                        <div class="list-warp" style="" :key="item.id" @click="goInfo(item.id)">
                            <div class="video-cell">
                                <video :src="item.src"
                                       controls="controls"
                                       width="90%"
                                       height="100%">
                                </video>
                            </div>
                            <p class="title">
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
            goInfo(id) {
                this.isShowInfo = false;
                this.dataInfo = this.dataList[id]
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

            .video-cell {
                padding-top: 10px;

                .title {
                    padding: 10px 0;
                }
            }
        }
    }
</style>