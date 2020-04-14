<template>
    <div class='foot-warp'>
        <Row class="foot-cell">
            <Col :xs="24" :sm="24" :md="8" :lg="8">
                <div class="comp block">
                    <p>{{infoFrom.companyName}}</p>
                    <p>邮箱：{{infoFrom.companyEmail}}</p>
                    <p>电话：{{infoFrom.companyMobile}}</p>
                    <p>地址：{{infoFrom.companyAddr}}</p>
                </div>
            </Col>
            <Col :xs="24" :sm="10" :md="{ span: 8, push:2 }" :lg="8">
                <div class="people block">
                    <template v-for="item in infoFrom.userPos">
                        <template v-if="item.userName">
                            <p :key="item.mobile"><span>联系人：{{item.userName}}</span><span>电话：{{item.mobile}}</span></p>
                        </template>
                    </template>
                </div>
            </Col>
            <Col :xs="24" :sm="{ span: 10, push:2 }" :md="8"
                 :lg="{ span: 6, push:7 }">
                <div class="er-img">
                    <img :src="infoFrom.companyPicture" alt="">
                </div>
            </Col>
            <Col :span="24">
                <div class="out-warp">
                    <span> 友情链接：</span>
                    <a href="http://www.xiuzheng.com/" target="_blank">修正药业</a>
                    <a href="http://www.xzjyk.cn/" target="_blank"> 颈腰康事业部</a>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
    import {GetCompany} from "../../api/web"

    export default {
        name: "footer-warp",
        data() {
            return {
                infoFrom: {}
            }
        },
        methods: {
            init() {
                GetCompany().then(res => {
                    if (res.status) {
                        this.infoFrom = res.data || {};
                        this.bus.$emit("companyVideoUrl", res.data.companyVideoUrl);
                    } else {
                        this.$Notice.warning({title: '错误', desc: res.msg})
                    }
                })
            }
        },
        mounted() {
            this.init();
        }
    }
</script>

<style lang='less' scoped>
    @import "../../styles/custom.less";
    @import "../../styles/mixin.less";

    .foot-warp {
        background: #606060;

        .foot-cell {
            max-width: 1000px;
            margin: 0 auto;
            padding: 30px 50px;

            .block {
                font-size: 15px;

                p {
                    padding: 10px 0;
                    color: #fff;

                    span {
                        margin-right: 10px;
                    }
                }
            }


            img {
                width: 150px;
                height: 210px;
                object-fit: cover;
            }

            .out-warp {
                border-top: 1px dashed #bdbdbd;
                color: #bebebe;
                padding-top: 10px;

                a {
                    color: #bebebe;
                    padding: 0 15px;
                    border-right: 1px solid #bdbdbd;
                }

            }
        }
    }
</style>