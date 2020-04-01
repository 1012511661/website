<template>
    <div class="two-nav">
        <template v-if="!isShowSmall">
            <div class="left-nav">
                <p class='title' style="color: rgb(32, 81, 207);">{{title}}</p>
                <router-link v-for="item in navList" :key="item.name" activeClass="link-active" class="link-title"
                             :to="item.to">{{item.name}}
                </router-link>
            </div>
        </template>
        <template v-else>
            <div class="left-small">
                <router-link :to="{name:'HOME'}"><span style="color: #000;padding-right: 10px;">首页</span></router-link>
                <span style="color: #999999;padding-right: 10px;">/</span>
                <Breadcrumb>
                    <template v-for="(item,index) in pathList">
                        <BreadcrumbItem :to="{name:item.name? item.name : 'INDEX'}" :key="index">
                            <span :class="{'active-span':index===pathList.length-1}">{{item.meta.title}}</span>
                        </BreadcrumbItem>
                    </template>
                </Breadcrumb>
            </div>
        </template>

    </div>
</template>

<script>
    export default {
        name: "two-nav",
        props: {
            title: {
                type: String,
                default: ''
            },
            navList: {
                type: Array,
                default: () => {
                    return []
                }
            },
            search: {
                type: Boolean,
                default: false
            }
        },
        components: {},
        data() {
            this.getNav = {
                HOME: '首页',
                CAPSULE: '木竭胶囊',
                VIDEO: '视频宣传',
                PARSING: '组方解析',
                PROJECT: '木竭项目介绍',
                EXPERTS: '专家义诊',
                ADDRESS: '定点义诊',
                INTRODUCTION: '专家简介',
                DECLARED: '义诊宣告',
                TRAINING: '技术培训',
                THERAPY: '太极调衡疗法',
                PHOTO: '培训合影',
                CONTACT: '联系我们',
                RECRUITMENT: '人才招聘',
                COOPERATION: '定点合作登记'
            }
            return {
                pathList: [], //路径数组
            }
        },
        computed: {
            isShowSmall() {
                return this.$store.state.isShowSmall
            }
        },
        watch: {
            $route(n, o) {
                this.updateData(n)
            }
        },
        methods: {
            updateData($route) {
                this.pathList.length = 0;
                if (this.search) {
                    this.pathList.push({
                        name: 'SEARCH',
                        meta: {
                            title: '站内搜索'
                        }
                    })
                } else {
                    for (let match of $route.matched) {
                        if (match.meta.title) {
                            match.meta.title = this.getNav[match.name]
                            this.pathList.push(match)
                        }
                    }
                }
            }
        },
        created() {
            let $route = this.$route;
            this.updateData($route)
        }
    }
</script>

<style lang='less' scoped>
    @import "../../../styles/custom.less";

    .two-nav {
        .left-nav {
            width: 250px;
            font-size: 14px;
            background: url("../../../assets/two_black.png");
            margin-top: -50px;
            margin-left: 90px;
            min-height: 50vh;

            .title {
                color: #2051CF;
                font-size: 24px;
                text-align: center;
                padding: 20px 0;
                width: 230px;
            }

            .link-title {
                display: block;
                height: 42px;
                line-height: 42px;
                font-size: 16px;
                font-weight: 400;
                width: 230px;
                text-align: center;
            }

            .link-active {
                border-right: 4px solid #2051CF;
                color: @primary-color;
            }
        }

        .left-small {
            margin: 20px;

            .ivu-breadcrumb {
                display: inline-block;
            }

            .active-span {
                color: @primary-color;
            }
        }
    }
</style>