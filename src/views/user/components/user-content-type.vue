<template>
    <div class=''>
        <template v-if="type == 0">
            <UserImgList :dataList="dataList"></UserImgList>
        </template>
        <template v-else-if="type == 1">
            <UserVideoList :dataList="dataList"></UserVideoList>
        </template>
        <template v-else-if="type == 2">
            <UserTextList :dataList="dataList"></UserTextList>
        </template>
        <template v-else>
            <UserInfoWarp :dataInfo="dataInfo"></UserInfoWarp>
        </template>
    </div>
</template>

<script>
    import UserImgList from "./user-img-list"
    import UserVideoList from "./user-video-list"
    import UserTextList from "./user-text-list"
    import UserInfoWarp from "./user-info-warp"

    export default {
        name: "user-content-type",
        props: {
            type: {
                type: Number,
                default: 0
            },
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
            }
        },
        components: {UserImgList, UserVideoList, UserTextList, UserInfoWarp},
        data() {
            return {}
        },
    }
</script>

<style lang='less' scoped>
</style>