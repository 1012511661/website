<template>
    <div class="nav-warp">
        <template v-if="!isShowSmall">
            <div class="nav-cell">
                <header class="horizontal-header">
                    <template v-for="(item,index) in menuList">
                        <template v-if="item.menuPos.length===0">
                            <router-link :key="item.menuId" activeClass="header-link-active" class="link header-link"
                                         :to="{name:item.menuId}">{{item.menuName}}
                            </router-link>
                        </template>
                        <template v-else>
                            <Dropdown :key="item.menuId" trigger="hover" :visible="item.visible"
                                      @on-visible-change="(value) => onVisibleChange(index, value)">
                                <div class="menu-group-title">
                                    <template v-if="item.menuShow">
                                        <router-link class="link header-link" @mousedown.native="onMenuClick"
                                                     activeClass="header-link-active"
                                                     :to="{name:item.menuId}">{{item.menuName}}
                                        </router-link>
                                        </template>
                                    <div class="mask"></div>
                                </div>
                                <DropdownMenu slot="list" @click.native="(value) => onItemClick(index, value)">
                                    <template v-for="childItem in item.menuPos">
                                        <template v-if="childItem.menuShow">
                                            <router-link :key="childItem.menuId" tag="li" activeClass="item-link-active"
                                                         class="link item-link"
                                                         :to="{name:childItem.menuId}">{{childItem.menuName}}
                                            </router-link>
                                        </template>
                                    </template>
                                </DropdownMenu>
                            </Dropdown>
                        </template>
                    </template>
                </header>
            </div>
        </template>
        <template v-else>
            <div class="nav-icon">
                <Icon type="ios-apps" @click="onShowModal" class="icon"/>
            </div>
            <template v-if="isShow">
                <div class="nav-modal">
                    <div class="nav-bg" @click="onShowModal"></div>
                    <Menu theme="dark" style="width: 240px; top: 50px;float: right;" @on-select="onSelectMenu">
                        <MenuItem name="HOME" :to="{name:'HOME'}">
                            <Icon type="ios-home"/>
                            <span> 首页</span>
                        </MenuItem>
                        <template v-for="(item,index) in menuList">
                            <template v-if="item.menuPos.length!==0">
                                <Submenu :name="index" :key="item.menuName">
                                    <template slot="title">
                                        <Icon :type="['','ios-paper','ios-people','ios-albums','ios-call'][index]"
                                              :size="17"/>
                                        {{item.menuName}}
                                    </template>
                                    <template v-for="childItem in item.menuPos">
                                        <MenuItem :name="index-index" :key="childItem.menuName"
                                                  :to="{name:childItem.menuId}">
                                            {{childItem.menuName}}
                                        </MenuItem>
                                    </template>
                                </Submenu>
                            </template>
                        </template>
                    </Menu>
                </div>
            </template>
        </template>
    </div>
</template>

<script>
    export default {
        name: "header-nav",
        props: {
            menuList: {
                type: Array,
                default: () => {
                    return []
                }
            },
        },
        data() {
            return {
                visible: false,
                isShow: false,
            }
        },
        computed: {
            isShowSmall() {
                return this.$store.state.isShowSmall
            },
        },
        watch: {},
        methods: {
            //监听弹窗状态
            onVisibleChange(index, visible) {
                this.menuList[index].visible = visible;
            },
            //监听弹窗点击
            onItemClick(index, name) {
                this.menuList[index].visible = false;
            },
            onMenuClick(ev) {
                ev.preventDefault()
            },
            onShowModal() {
                this.isShow = !this.isShow;
            },
            onSelectMenu(name) {
                this.isShow = false
            }
        },
    }
</script>

<style lang='less' scoped>
    @import "../../styles/custom.less";
    @import "../../styles/mixin.less";

    .nav-warp {
        .nav-cell {
            background-color: @home-header-color;
            justify-content: space-between;

            .horizontal-header {
                display: flex;
                align-items: center;
                font-size: 16px;
                max-width: 1200px;
                margin: 0 auto;
                height: 50px;
                line-height: 50px;
                padding: 2px 50px;

                .header-link {
                    margin-right: 18px;
                    color: #f8f8f9;
                }

                .header-link-active {
                    box-shadow: 0 -4px 0 @primary-color inset;
                    color: @bg-color;
                    // background-color: @nav-active-bg-color;
                }

                .item-link {
                    padding: 5px 10px;
                }

                .item-link-active {
                    background-color: @nav-active-bg-color;
                    color: @primary-color;
                }
            }
        }

        .nav-icon {
            position: fixed;
            z-index: 99;
            right: 10px;
            top: 35%;

            .icon {
                font-size: 36px;
                //color: @home-header-color;
                color: red;

                &:hover {
                    cursor: pointer;
                }
            }
        }

        // 遮罩
        .nav-modal {
            width: 100%;
            height: 100vh;
            position: fixed;
            z-index: 100;
            top: 0;

            .nav-bg {
                background: rgb(238, 238, 238);
                opacity: 0.5;
                width: 100%;
                height: 100vh;
                position: fixed;
            }
        }
    }

    .menu-group-title {
        height: 100%;
        position: relative;
        cursor: pointer;

        .mask {
            top: 0;
            height: 100%;
            width: 100%;
            position: absolute;
        }
    }

    .link {
        height: 100%;
        padding: 0 6px;
        cursor: pointer;
        .center();
        margin: 0 5px;
        min-width: 120px;
        color: @nav-default-color;
    }


    /*用于iview*/
    /deep/ .ivu-dropdown {
        height: 100%;
        margin: 0 30px;

        .ivu-dropdown-rel {
            height: 100%;
        }

        .ivu-select-dropdown {
            background-color: @home-header-bg-color;
        }
    }


</style>
<style lang="less">
    @import "../../styles/custom.less";

    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active {
        background-color: @home-header-bg-color !important;
    }
</style>