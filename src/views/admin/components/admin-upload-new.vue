<template>
    <div class=''>
        <Button @click="asd">12365</Button>
        <Modal v-model="add.dialog" title="文件上传" :loading="true" :closable="false" width="540">
            <Upload :before-upload="handleUpload" action multiple :format="['jpg','jpeg','png']">
                <Button icon="ios-cloud-upload-outline">Select the file to upload</Button>
            </Upload>
            <div>
                <ul class="file-list" v-for="(list,index) in add.uploadFile" :key="index">
                    <li>
                        <span style="font-size:15px;color:#000F">文件名: {{ list.name }}</span>
                        <Icon type="ios-close" size="25" color="red" @click="delFileList(index)"></Icon>
                    </li>
                </ul>
            </div>
            <div slot="footer">
                <Button type="text" size="large" @click="cancleUpload">取消</Button>
                <Button
                        type="primary"
                        @click="upload"
                        :loading="loadingStatus"
                >{{ loadingStatus ? '上传中...' : '上传' }}
                </Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    //例如：import 《组件名称》 from '《组件路径》'

    export default {
        name: "admin-upload-new",
        props: {},
        components: {},
        data() {
            return {
                list: [],
                add: {
                    dialog: false,
                    uploadFile: []
                },
                loadingStatus: false
            }
        },
//监听属性 类似于data概念
        computed: {},
//监控data中的数据变化
        watch: {},
//方法集合
        methods: {
            cancleUpload() {
                this.add.dialog = false
            },
            asd() {
                this.add.dialog = true
            },
            delFileList(index) {
                this.add.uploadFile.splice(index, 1);
            },
            handleUpload(file) {
                this.add.uploadFile.push(file);
                return false;
            },
            upload() {
                this.loadingStatus = true;
                window.console.log("上传：" + this.add.uploadFile);
                var formData = new FormData();
                if (this.add.uploadFile.length > 0) {
                    //多个文件上传
                    for (var i = 0; i < this.add.uploadFile.length; i++) {
                        formData.append("uploadFile", this.add.uploadFile[i]); // 文件对象
                    }
                    window.console.log(formData, 'formData')
                    // this.$http
                    //     .postFile(this.ports.package.upload, formData)  //使用自己封装的axios方法
                    //     .then(rdata => {
                    //         console.log(rdata);
                    //         if (rdata.data.succ) {
                    //             this.loadingStatus = false;
                    //             this.add.uploadFile = [];
                    //             this.$Message.success("Success");
                    //             this.add.dialog = false;
                    //         }
                    //     })
                    //     .catch(error => {
                    //         this.loadingStatus = false;
                    //         this.$Message.error("服务器错误" + error);
                    //     });
                } else {
                    this.loadingStatus = false;
                    this.$Message.error("请至少上传一个文件");
                }
            },
        },
//生命周期 - 创建之前
        beforeCreate() {
        },
//生命周期 - 创建完成（可以访问当前this实例）
        created() {
        },
//生命周期 - 挂载之前
        beforeMount() {
        },
//生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
        },
//生命周期 - 更新之前
        beforeUpdate() {
        },
        //生命周期 - 更新之后
        updated() {
        },
//生命周期 - 销毁之前
        beforeDestroy() {
        },
        //生命周期 - 销毁完成
        destroyed() {
        },
//如果页面有keep-alive缓存功能，这个函数会触发
        activated() {
        }
    }
</script>

<style lang='less' scoped>
    //@import url($3); 引入公共css类
</style>