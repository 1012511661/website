<template>
    <div class='user-text-list'>
        <template v-if="isShowInfo">
            <div v-for="item in dataList" :key="item.id" class="item-list" @click="goInfo(item.id)">
                <span class="title">{{item.title}}</span>
                <span class="time">{{item.time}}</span>
            </div>
        </template>
        <template v-else>
            <UserInfoWarp :dataInfo="dataInfo" @on-show-info="goSteps"></UserInfoWarp>
        </template>
    </div>
</template>

<script>
    import UserInfoWarp from "./user-info-warp"

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