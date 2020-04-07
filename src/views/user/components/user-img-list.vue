<template>
    <div class='user-img-list'>
        <template v-if="isShowInfo">
            <Row>
                <template v-for="item in dataList">
                    <Col :xs="12" :sm="8" :md="8" :lg="8">
                        <div class="list-warp" style="" :key="item.id" @click="goInfo(item.id)">
                            <div class="img-cell">
                                <img :src="item.src">
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
        name: "user-img-list",
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

    .user-img-list {
        .list-warp {
            .list-warp();

            .img-cell {
                padding-top: 10px;

                img {
                    width: 90%;
                    height: 185px;
                    object-fit: initial;
                }

                .title {
                    padding: 10px 0;
                }
            }
        }
    }
</style>