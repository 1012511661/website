<template>
    <div class='footer-warp'>
        <div>
            <p>公司基本信息</p>
            <p>公司名：{{infoFrom.projectName}}</p>
            <p>邮箱：{{infoFrom.email}}</p>
            <p>电话：{{infoFrom.projectPhone}}</p>
            <p>地址：{{infoFrom.address}}</p>
        </div>
        <div>
            <p>联系人列表</p>
            <template v-for="item in infoFrom.people">
                <p :key="item.userPhone">{{item.userName}}：{{item.userPhone}}</p>
            </template>
        </div>
        <div>
            <img :src="infoFrom.picSrc" alt="">
        </div>
        <div></div>
    </div>
</template>

<script>
    //例如：import 《组件名称》 from '《组件路径》'
    export default {
        name: "home-foot-warp",
        props: {},
        components: {},
        data() {
            return {
                infoFrom: {
                    projectName: '颈腰康事业部(陕西)',
                    email: '12345646123@QQ.COM',
                    projectPhone: '029-11223344',
                    address: '地址地址地址地址地址地址地址地址地址地址',
                    people: [
                        {
                            userName: '王经理',
                            userPhone: '13012121215'
                        },
                        {
                            userName: '王经理',
                            userPhone: '13012121214'
                        },
                        {
                            userName: '王经理',
                            userPhone: '13012121213'
                        },
                        {
                            userName: '王经理',
                            userPhone: '13012121212'
                        }
                    ],
                    picSrc: require("../../../../assets/erweima.jpg")
                },
            }
        },
//监听属性 类似于data概念
        computed: {},
//监控data中的数据变化
        watch: {},
//方法集合
        methods: {},
//生命周期 - 创建之前
        beforeCreate() {
        },
//生命周期 - 创建完成（可以访问当前this实例）
        created() {
        },
//生命周期 - 挂载之前
        beforeMount() {
        },
//生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
        },
//生命周期 - 更新之前
        beforeUpdate() {
        },
        //生命周期 - 更新之后
        updated() {
        },
//生命周期 - 销毁之前
        beforeDestroy() {
        },
        //生命周期 - 销毁完成
        destroyed() {
        },
//如果页面有keep-alive缓存功能，这个函数会触发
        activated() {
        }
    }
</script>

<style lang='less' scoped>
    //@import url($3); 引入公共css类
    .footer-warp {
        display: flex;
        justify-content: space-between;

        div {
            p {
                margin: 5px;
            }
        }
    }
</style>