<template>
    <div class='foot-warp'>
        <Row class="foot-cell">
            <Col :xs="24" :sm="24" :md="8" :lg="8">
                <div class="comp block">
                    <p class="">{{infoFrom.companyName}}</p>
                    <p>{{infoFrom.companyEmail}}</p>
                    <p>{{infoFrom.companyMobile}}</p>
                    <p>{{infoFrom.companyAddr}}</p>
                </div>
            </Col>
            <Col :xs="12" :sm="10" :md="{ span: 6, push:2 }" :lg="{ span: 6, push: 2 }">
                <div class="people block">
                    <template v-for="item in infoFrom.userPos">
                        <template v-if="item.userName">
                            <p>联系人：{{item.userName}} 电话：{{item.mobile}}</p>
                        </template>
                    </template>
                </div>
            </Col>
            <Col :xs="{ span: 10, push:2 }" :sm="{ span: 10, push:2 }" :md="{ span: 6, push: 2 }"
                 :lg="{ span: 6, push:7 }">
                <div class="er-img">
                    <img :src="infoFrom.companyPicture" alt="">
                </div>
            </Col>
        </Row>
        <div>
            <p>友情链接：</p>
        </div>
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
        background: @content-deputy-color;
        padding: 30px 50px;

        .foot-cell {
            max-width: 1000px;
            margin: 0 auto;

            .block {
                font-size: 16px;

                p {
                    padding: 15px 0;
                    color: #fff;
                }
            }


            img {
                width: 150px;
                height: 210px;
                object-fit: cover;
            }
        }
    }
</style>