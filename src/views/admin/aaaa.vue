<template>
    <div class="demo">
        <div class="demo-upload-list" v-for="(item,index) in imageUrlList" :key="index">
            <img :src="item.url" />
            <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemoveList(index)"></Icon>
            </div>
        </div>
        <Upload
                :show-upload-list="false"
                :on-exceeded-size="handleMaxSize"
                :on-success="handleSuccessList"
                :before-upload="handleUpload"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                multiple
                type="drag"
                :action="actionUrl"
                style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
            </div>
        </Upload>
        <Button @click="upload">11111</Button>
        <Modal title="图片预览" v-model="visible">
            <img :src="showImageUrl" v-if="visible" style="width: 100%" />
        </Modal>
    </div>
</template>
<script>
    export default {
        name: 'slideshow',
        data () {
            return {
                actionUrl: '服务器请求地此，上传文件的接口',
                imageUrl: '',
                hasImage: false,
                showImageUrl: '',
                visible: false,
                imageUrlList: [
                    {
                        url: require("../../assets/banner1.jpg"),
                    }
                ]
            }
        },
        methods: {
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '图片大小限制',
                    desc: '文件 ' + file.name + '太大,不能超过 2M.'
                })
            },
            upload () {
                this.loadingStatus = true;
                setTimeout(() => {
                    this.file = null
                    this.loadingStatus = false
                    this.$Message.success('Success')
                }, 1500)
            },
            handleView (imageUrl) {
                this.showImageUrl = imageUrl
                this.visible = true
            },
            handleRemoveList (index) {
                // 删除
                this.imageUrlList.splice(index, 1)
            },
            handleUpload(file){
                this.$refs.upload.clearFiles();
                this.file = file;
                this.onImport();
                return false;
            },
            handleSuccessList (res, file) {
                let image = { url: res.data }
                console.log('image:' + image.url)
                this.imageUrlList.push(image)
                console.log(this.imageUrlList)
            },
        }
    }
</script>

<style lang='less' scoped>
    .demo-upload-list {
        display: inline-block;width: 60px;height: 60px;text-align: center;line-height: 60px;
        border: 1px solid transparent;border-radius: 4px;overflow: hidden;background: #fff;
        position: relative;box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);margin-right: 4px;
    }
    .demo-upload-list img {
        width: 100%;height: 100%;
    }
    .demo-upload-list-cover {
        display: none;position: absolute;top: 0;bottom: 0;
        left: 0;right: 0;background: rgba(0, 0, 0, 0.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover {
        display: block;
    }
    .demo-upload-list-cover i {
        color: #fff;font-size: 20px;cursor: pointer;margin: 0 2px;
    }
</style>