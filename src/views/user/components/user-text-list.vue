<template>
    <div class='user-text-list'>
        <template v-if="isShowInfo">
            <div v-for="item in dataList" :key="item.id" class="item-list" @click="goInfo(item)">
                <span class="title">{{item.infoName}}</span>
                <span class="time">{{item.gmtUpdated|timeFilter}}</span>
            </div>
        </template>
        <template v-else>
            <UserInfoWarp :dataInfo="dataInfo" @on-show-info="goSteps"></UserInfoWarp>
        </template>
    </div>
</template>

<script>
    import UserInfoWarp from "./user-info-warp"
    import moment from 'moment'
    import {GetMenuInfoId} from "../../../api/web";

    export default {
        name: "user-text-list",
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
        filters: {
            timeFilter(val) {
                return val ? moment(val).format("YYYY-MM-DD HH:mm:ss") : '';
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
    .user-text-list {
        .item-list {
            padding: 20px;
            border: 1px solid #eee;
            margin: 10px 0;

            .time {
                float: right;
                padding-right: 25px;
            }

            &:hover {
                cursor: pointer;
                border: 1px solid #2a85cf;
            }
        }
    }
</style>