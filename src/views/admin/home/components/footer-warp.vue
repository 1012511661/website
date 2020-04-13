<template>
    <div class='footer-warp'>
        <div class="footer-cell">
            <p class="title">基本信息</p>
            <p>公司名：{{infoFrom.companyName}}</p>
            <p>邮箱：{{infoFrom.companyEmail}}</p>
            <p>电话：{{infoFrom.companyMobile}}</p>
            <p>地址：{{infoFrom.companyAddr}}</p>
        </div>
        <div class="footer-cell">
            <p class="title">联系人列表</p>
            <template v-for="item in infoFrom.userPos">
                <template v-if="item.userName">
                    <p :key="item.mobile">{{item.userName}}：{{item.mobile}}</p>
                </template>
            </template>
        </div>
        <div class="footer-cell">
            <p class="title">二维码 <i style="font-size: 14px">150*210</i></p>
            <img :src="infoFrom.companyPicture" alt="">
        </div>
        <div class="footer-cell">
            <p class="title">公司视频</p>
            <video :src="infoFrom.companyVideoUrl" controls="controls" width="80%"
                   height="60%"></video>
        </div>
    </div>
</template>

<script>
    import {GetCompany} from "../../../../api/web"

    export default {
        name: "home-foot-warp",
        props: {},
        components: {},
        data() {
            return {
                img: require("../../../../assets/erweima.jpg"),
                infoFrom: {
                    companyName: '颈腰康事业部(陕西)',
                    companyEmail: '',
                    companyMobile: '',
                    companyAddr: '',
                    userPos: [],
                },
            }
        },
        methods: {
            init() {
                GetCompany().then(res => {
                    if (res.status) {
                        this.infoFrom = res.data || {};
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
    .footer-warp {
        display: grid;
        grid-template-columns: 1fr 1fr;

        .footer-cell {
            margin: 5px;
            padding: 10px 0;

            p {
                margin: 5px;
                font-size: 16px;
            }

            .title {
                font-size: 16px;
                font-weight: 800;
                border-bottom: 1px solid #c9cac8;
            }

            img {
                width: 150px;
                height: 210px;
                object-fit: cover;
            }
        }
    }
</style>