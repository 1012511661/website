<template>
    <div class='contact-cooperation'>
        <UserConType :type="3" :dataInfo="dataInfo"></UserConType>
    </div>
</template>

<script>
    import UserConType from "../components/user-content-type"
    import {GetMenuId} from "../../../api/web";
    export default {
        name: "cooperation",
        props: {
            type: {
                type: Number,
                default: 0
            }
        },
        components: {UserConType},
        data() {
            return {
                dataInfo: {
                    id: 1,
                    name: '题目',
                    content:'内容内容内容内容内容内容'
                }
            }
        },
        methods: {
            init() {
                this.getDataList()
            },
            getDataList() {
                GetMenuId('COOPERATION').then(res => {
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
    //@import url($3); 引入公共css类
</style>