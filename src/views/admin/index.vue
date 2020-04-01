<template>
    <div class="layout">
        <Layout :style="{height: '100vh','overflow':'hidden','min-width':'1200px'}">
            <Header>
                <HeaderWarp></HeaderWarp>
            </Header>
            <Layout :style="{overflow:'auto'}">
                <Sider :width="200" :style="{background: '#eaedf1'}">
                    <div class="menu">
                        <ul class="menu-children">
                            <template v-for="item in navList">
                                <div :key="item.menuId">
                                    <router-link
                                            tag="li"
                                            :to="{name:item.menuId}"
                                    >
                                        {{item.menuName}}
                                    </router-link>
                                </div>
                            </template>
                        </ul>
                    </div>
                </Sider>
                <Content :style="{padding: '15px 15px 30px 15px'}">
                    <router-view :style="{'height': '100%'}"></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import HeaderWarp from "./header-warp"

    export default {
        name: "admin",
        components: {HeaderWarp},
        data() {
            return {
                navList: [
                    {
                        menuId: "ADMIN_HOME",
                        menuName: "首页",
                    },
                    {
                        menuId: "ADMIN_MANAG",
                        menuName: "栏目管理",
                    },
                    {
                        menuId: "ADMIN_CAPSULE",
                        menuName: "木竭胶囊",
                    },
                    {
                        menuId: "ADMIN_EXPERTS",
                        menuName: "专家义诊",
                    },
                    {
                        menuId: "ADMIN_TRAINING",
                        menuName: "技术培训",
                    },
                    {
                        menuId: "ADMIN_CONTACT",
                        menuName: "联系我们",
                    },
                ]
            }
        },
        methods: {},
        mounted() {
        }
    }
</script>

<style lang='less' scoped>
    @import "../../styles/custom.less";

    .ivu-layout-header {
        background: #fff;
    }

    .menu {
        padding: 10px;
        .title {
            font-size: 15px;
            color: @content-dark-color;
            padding: 8px;
            font-weight: bold;
            border-radius: 4px;

            &:hover {
                cursor: pointer;
            }

            &.router-link-active {
                color: #fff;
                background-color: @primary-color;

                .iconfont {
                    color: #fff;
                }
            }
        }

        .menu-children {
            list-style: none;

            .menu-div {
                padding: 15px 0;
            }

            li {
                padding: 8px;
                font-size: 16px;
                border-radius: 4px;
                font-weight: bold;
                text-align: center;
                margin: 10px 0;


                &:hover {
                    cursor: pointer;
                }

                &.router-link-active {
                    color: @bg-color;
                    background-color: @admin-nav-color;
                }
            }
        }
    }
</style>

