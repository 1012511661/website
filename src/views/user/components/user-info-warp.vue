<template>
    <div class="user-info-warp">
        <template v-if="isBack">
            <p class="back-title"><i @click="goSteps"><= 返回</i></p>
        </template>
        <div class='data-info'>
            <p class="title">{{dataInfo.infoName||dataInfo.cdName}}</p>
            <p class="time">时间：{{dataInfo.gmtCreated|timeFilter}}</p>
            <div v-html="dataInfo.infoInfo||dataInfo.cdInfo" class="content"></div>
        </div>
    </div>

</template>

<script>
    import moment from 'moment';
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
        },
        filters:{
            timeFilter(val){
                return  val?moment(val).format("YYYY-MM-DD HH:mm:ss"):'';
            }
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
                text-align: right;
                font-size: 14px;
                padding: 20px;
            }

            .content {
                font-size: 16px;
                padding: 0 10px;
                line-height: 30px;
                width: 100%;
                min-width: 20vh;
            }
        }
    }

</style>