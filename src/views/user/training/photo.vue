<template>
    <div class='training-photo'>
        <UserConType :type="0" :dataList="dataList"></UserConType>
    </div>
</template>

<script>
    import UserConType from "../components/user-content-type"
    import {GetMenuId} from "../../../api/web";

    export default {
        name: "photo",
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
                        title: 'AAAA',
                        time: '2020-03-24 19:22:00',
                        src: 'https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large'
                    },
                    {
                        id: 2,
                        title: 'AAAA',
                        time: '2020-03-24 19:22:00',
                        src: 'https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large'
                    },
                    {
                        id: 3,
                        title: 'AAAA',
                        time: '2020-03-24 19:22:00',
                        src: 'https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large'
                    },
                    {
                        id: 4,
                        title: 'AAAA',
                        time: '2020-03-24 19:22:00',
                        src: 'https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large'
                    },
                    {
                        id: 5,
                        title: 'AAAA',
                        time: '2020-03-24 19:22:00',
                        src: 'https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large'
                    },
                    {
                        id: 6,
                        title: 'AAAA',
                        time: '2020-03-24 19:22:00',
                        src: 'https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large'
                    },
                ]
            }
        },
        methods: {
            init() {
                this.getDataList()
            },
            getDataList() {
                GetMenuId('PHOTO').then(res => {
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