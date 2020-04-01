<template>
    <div class='foot-warp'>
        <div class="foot-cell">
            <Row>
                <Col :xs="24" :sm="24" :md="8" :lg="8">
                    <div class="comp block">
                        <p class="">颈腰康事业部(陕西)</p>
                        <p>邮箱邮箱邮箱邮箱邮箱邮箱</p>
                        <p>邮箱邮箱邮箱邮箱邮箱邮箱</p>
                        <p>地址地址地址地址地址</p>
                    </div>
                </Col>
                <Col :xs="12" :sm="10" :md="{ span: 6, push:2 }" :lg="{ span: 6, push: 2 }">
                    <div class="people block">
                        <p>王经理:13012121212</p>
                        <p>王经理:13012121212</p>
                        <p>王经理:13012121212</p>
                        <p>王经理:13012121212</p>
                    </div>
                </Col>
                <Col :xs="{ span: 10, push:2 }" :sm="{ span: 10, push:2 }" :md="{ span: 6, push: 2 }" :lg="{ span: 6, push:7 }">
                    <div class="er-img">
                        <img src="../../assets/erweima.jpg" alt="">
                    </div>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
    //例如：import 《组件名称》 from '《组件路径》'
    export default {
        name: "footer-warp",
        props: {},
        components: {},
        data() {
            return {}
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
    @import "../../styles/custom.less";
    @import "../../styles/mixin.less";

    .foot-warp {
        background: @content-deputy-color;
        /*height: 300px;*/
        padding: 30px 50px;

        .foot-cell {
            max-width: 1000px;
            margin: 0 auto;
            /*display: flex;*/
            /*justify-content: space-between;*/

            .block {
                font-size: 16px;
                p {
                    padding: 15px 0;
                    color: #fff;
                }
            }
        }
    }
</style>