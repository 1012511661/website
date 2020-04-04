<template>
    <div class='banner-modal'>
        <template v-for="(item,index) in defaultList">
            <div class="home-banner-upload-list" :key="index" :style="{width:`${widthImg}px`,height:`${heightImg}px`}">
                <img :src="item" :onerror="errImg">
            </div>
        </template>
        <Upload
                ref="upload"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :on-format-error="handleFormatError"
                :before-upload="handleBeforeUpload"
                :multiple="multiple"
                type="drag"
                action="https://jsonplaceholder.typicode.com/posts/"
                style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;float: right">
                <Icon type="ios-camera" size="20"></Icon>
            </div>
        </Upload>
        <p slot="foot">{{footTitle}}</p>
    </div>
</template>

<script>

    export default {
        name: "home-banner",
        props: {
            multiple: {
                type: Boolean,
                default: false
            },
            defaultList: {
                type: Array,
                default: () => {
                    return []
                }
            },
            footTitle: {
                type: String,
                default: ''
            },
            widthImg: {
                type: Number,
                default: 300
            },
            heightImg: {
                type: Number,
                default: 180
            },
        },
        data() {
            return {
                formInfo: {},
                errImg: 'this.src="' + require('../../../assets/banner1.jpg') + '"'
            }
        },
        watch: {},
        methods: {
            imgError() {
                var img = event.srcElement;
                img.src = "http://placehold.it/600x300/0f0/ccc.png";
                img.onerror = null;
            },
            // 成功
            handleSuccess(res, file) {
                file.url = 'https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large';
                file.name = '7eb99afb9d5f317c912f08b5212fd69a';
            },
            // 失败
            handleFormatError(file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            // 上传文件之前
            handleBeforeUpload() {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to five pictures can be uploaded.'
                    });
                }
                return check;
            }
        }
    }
</script>

<style lang='less' scoped>
    .home-banner-upload-list {
        display: inline-block;
        margin-right: 10px;

        img {
            width: 100%;
            height: 100%;
        }
    }
</style>