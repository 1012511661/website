<template>
    <div class="user-info-warp">
        <template v-if="isBack">
            <p class="back-title"><i @click="goSteps"><= 返回</i></p>
        </template>
        <div class='data-info'>
            <p class="title">{{dataInfo.title}}</p>
            <p class="time">时间：{{dataInfo.time}}</p>
            <div v-html="dataInfo.content"></div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "user-info-warp",
        props: {
            dataList: {
                type: Array,
                default: () => {
                    return []
                }
            },
            dataInfo: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            isBack: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            // 返回
            goSteps() {
                this.$emit('on-show-info')
            },
        }
    }
</script>

<style lang='less' scoped>
    @import "../../../styles/mixin";

    .user-info-warp {
        .back-title {
            text-align: right;

            i {
                padding: 5px 10px;
                display: inline-block;
                margin-right: 30px;
                color: #2a85cf;

                &:hover {
                    cursor: pointer;
                }
            }
        }

        .data-info {
            padding: 10px;

            .title {
                text-align: center;
                font-size: 24px;
                font-weight: 900;
                padding: 5px 0;
                border-bottom: 1px solid #eee;
            }

            .time {
                text-align: center;
                font-size: 14px;
                padding-top: 20px;
            }

            .content {
                margin: 30px;
                text-align: center;
            }
        }
    }

</style>