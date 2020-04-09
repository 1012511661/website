<template>
    <div class='banner-modal'>
        <ul class="file-list">
            <template v-for="(list,index) in fileArrS">
            <li :key="index">
                <template v-if="!list.name">
                    <p v-if="index ===0 ">当前显示的：</p>
                    <img :src="list" :style="{width:`${widthImg}px`,height:`${heightImg}px`}">
                </template>
                <template v-else>
                    <p>替换上传的：</p>
                    <span style="font-size:15px;color:#000">文件名: {{ list.name }}</span>
                </template>
                <Icon type="ios-close" size="25" color="red" @click="delFileList(index)"></Icon>
            </li>
                </template>
        </ul>
        <Upload
                ref="upload"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :on-format-error="handleFormatError"
                :before-upload="handleBeforeUpload"
                :multiple="multiple"
                type="drag"
                :action="action"
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
                fileArrS: [...this.defaultList],
                fileArr: [],
                file: null,
                action: ''
            }
        },
        watch: {
            defaultList: {
                handler(newV) {
                    this.fileArrS = [...newV]
                },
                deep: true
            }
        },
        methods: {
            delFileList(index) {
                this.fileArrS.splice(index, 1);
                this.fileArr.splice(index, 1);
            },
            upload() {
            },
            // 成功
            handleSuccess(res, file) {
                window.console.log(res, file, '成功')
            },
            // 失败
            handleFormatError(file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            // 上传文件之前
            handleBeforeUpload(file) {
                this.fileArr.push(file);
                this.fileArrS.push(file);
                this.file = file;
                return false;
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