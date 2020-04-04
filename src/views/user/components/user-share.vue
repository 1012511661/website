<template>
    <div class="user-share">
        <div style="position: fixed; top: 45%; right: 10px;">
            <!-- 分享 -->
            <Icon type="md-share" style="color:#41eee1;font-size: 30px" @click="onShowShare"/>
        </div>
        <template v-if="isShow">
            <div class="share-modal">
                <div class="share-bg" @click="onShowShare"></div>
                <div class="share-share">
                    <img src="http://zixuephp.net/static/images/qqzoneshare.png" width="30" @click="onShare(1)"/>
                    <img src="http://zixuephp.net/static/images/qqshare.png" width="32" @click="onShare(1)"/>
                    <img src="http://zixuephp.net/static/images/sinaweiboshare.png" width="36" @click="onShare(1)"/>
                    <img src="http://zixuephp.net/static/images/wechatshare.png" width="32" @click="onShare(1)"/>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: "user-share",
        props: {},
        components: {},
        data() {
            return {
                isShow: false,
            }
        },
        methods: {
            onShowShare() {
                this.isShow = !this.isShow;
            },
            onShare(num) {
                window.console.log(num, '11111')
            }
        }
    }
</script>

<style lang='less' scoped>
    .user-share {
        // 遮罩
        .share-modal {
            width: 100%;
            height: 100vh;
            position: fixed;
            z-index: 100;
            top: 0;

            .share-bg {
                background: rgb(238, 238, 238);
                opacity: 0.5;
                width: 100%;
                height: 100vh;
                position: fixed;
            }

            .share-share {
                position: fixed;
                top: 50%;
                right: 10px;
                width: 100%;
                background-color: #d8d8d8;
                text-align: right;
                img {
                    display: inline-block;
                    margin: 10px;
                }
            }
        }
    }

</style>