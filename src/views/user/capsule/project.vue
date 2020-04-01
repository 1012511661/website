<template>
    <div class='capsule-project'>
        <UserConType :type="2" :dataList="dataList"></UserConType>
    </div>
</template>

<script>
    import UserConType from "../components/user-content-type"
    import {GetMenuId} from "../../../api/web";

    export default {
        name: "project",
        props: {
            type: {
                type: Number,
                default: 0
            }
        },
        components: {UserConType},
        data() {
            return {
                dataList: [
                    {
                        id: 1,
                        title: '一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十',
                        content:'一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十',
                        time: '2019-20-20'
                    },
                    {
                        id: 2,
                        title: '一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十',
                        content:'一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十',
                        time: '2019-20-20'
                    },
                    {
                        id: 3,
                        title: 'This is title 3',
                        content:'一二',
                        time: '2019-20-20'
                    }
                ]
            }
        },
        methods: {
            init() {
                this.getDataList()
            },
            getDataList() {
                GetMenuId('PROJECT').then(res => {
                    if (res.status) {
                        window.console.log(res, '123465')
                    } else {
                        this.$Notice.warning({title: '错误', desc: res.msg})
                    }
                })
            }
        },
        mounted() {
            this.init()
        }
    }
</script>
<style lang='less' scoped>
</style>