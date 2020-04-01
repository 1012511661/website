<template>
    <div class='banner-modal'>
        <template v-for="(item,index) in defaultList">
            <div class="home-banner-upload-list" :key="index">
                <img :src="item">
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
        },
        data() {
            return {
                formInfo: {},
            }
        },
        watch: {},
        methods: {
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
        width: 300px;
        text-align: center;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        margin-right: 4px;

        img {
            width: 100%;
            height: 100%;
        }
    }
</style>