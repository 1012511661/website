<template>
    <div class='banner-modal'>
        <ul class="file-list" v-for="(list,index) in fileArr" :key="index">
            <li>
                <template v-if="!list.name">
                    <p>当前显示的：</p>
                    <img :src="list" :style="{width:`${widthImg}px`,height:`${heightImg}px`}">
                </template>
                <template v-else>
                    <p>替换上传的：</p>
                    <span style="font-size:15px;color:#000">文件名: {{ list.name }}</span>
                </template>
                <Icon type="ios-close" size="25" color="red" @click="delFileList(index)"></Icon>
            </li>
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
    import axios from "axios";

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
                fileArr: [...this.defaultList],
                file: null,
                action: ''
            }
        },
        watch: {
            defaultList: {
                handler(newV, oldV) {
                    window.console.log(newV, oldV, 'newV,oldV')
                },
                deep: true
            }
        },
        methods: {
            imgError() {
                var img = event.srcElement;
                img.src = "http://placehold.it/600x300/0f0/ccc.png";
                img.onerror = null;
            },
            delFileList(index) {
                this.fileArr.splice(index, 1);
            },
            upload(info) {
                var formData = new FormData();
                formData.append('menuId', info.menuId);
                for (var i = 0; i < this.fileArr.length; i++) {
                    formData.append(`files`, this.fileArr[i]); // 文件对象
                }
                let config = {
                    headers: {'Content-Type': 'multipart/form-data'}
                };  //添加请求头
                axios.post(`http://39.101.203.68:8082/ws/menu/import`, formData, config)
                    .then(res => {
                        console.log('res=>', res);

                    })

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