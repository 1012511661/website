<template>
    <div class='header-warp'>
        <img alt="logo" src="../../assets/logo.jpg" class="logo-img"/>
        <Dropdown trigger="hover" :visible="visible"
                  @on-click="onUserRoute">
            <a href="javascript:void(0)">
                <Icon type="ios-contact" style="font-size: 26px;"/>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem name="out">退出登录</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
    export default {
        name: "header-warp",
        props: {},
        components: {},
        data() {
            return {
                visible: false,
            }
        },
        methods: {
            //监听弹窗状态
            onVisibleChange(visible) {
                this.visible = visible;
            },
            onUserRoute(name) {
                if (name === 'out') {
                    sessionStorage.clear();
                    this.$router.replace("/login");
                }
            }
        }
    }
</script>

<style lang='less' scoped>
    @import "../../styles/custom.less";

    .header-warp {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 66px;
        line-height: 66px;
        .logo-img {
            width: 250px;
            max-width: 340px;
            object-fit: cover;
        }

        .iconuser {
            cursor: pointer;
            vertical-align: sub;
            font-size: 25px;
            margin-left: 5px;
            color: #3ABEC4;
        }

    }
</style>