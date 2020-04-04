<template>
    <div>
        <Button @click="asd">11111111111</Button>

        <Modal v-model="add.dialog" title="文件上传" :loading="true" :closable="false" width="540">
            <Tabs>
                <TabPane label="选择文件">
                    <Upload
                            ref="upload"
                            :before-upload="handleUpload"
                            :action="actionSrc"
                            multiple
                            :format="['jpg','jpeg','png']">
                        <Button icon="ios-cloud-upload-outline">Select the file to upload</Button>
                    </Upload>
                    <div>
                        <ul class="file-list" v-for="(list,index) in add.uploadFile" :key="index">
                            <li>
                                <span style="font-size:15px;color:#000">文件名: {{ list.name }}</span>
                                <Icon type="ios-close" size="25" color="red" @click="delFileList(index)"></Icon>
                            </li>
                        </ul>
                    </div>
                </TabPane>
            </Tabs>
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
    import axios from "axios";
    export default {
        data() {
            return {
                add: {
                    dialog: false,
                    uploadFile: []
                },
                loadingStatus: false,
                actionSrc: '',
                file:null
            }
        },
        methods: {
            asd() {
                this.add.dialog = true;
            },
            delFileList(index) {
                this.add.uploadFile.splice(index, 1);
            },
            handleUpload(file) {
                this.add.uploadFile.push(file);
                this.file = file;
                return false;
            },
            upload() {
                this.loadingStatus = true;
                console.log("上传：" + this.add.uploadFile, this.add.uploadFile.length);
                var formData = new FormData();
                if (this.add.uploadFile.length > 0) {
                    //多个文件上传
                    // formData.append('companyId', 1)
                    // formData.append('menuId', 'CAPSULE')
                    for (var i = 0; i < this.add.uploadFile.length; i++) {
                        formData.append(`files`, this.add.uploadFile[i]); // 文件对象
                    }
                    this.loadingStatus = false;
                    let _obj ={
                        menuId:'CAPSULE',
                        files:[this.add.uploadFile[0]]
                    }
                    window.console.log(formData, formData.get("companyId"), formData.getAll('files'), 'formData')
                    this.actionSrc = `http://39.101.203.68:8082/ws/menu/import?menuId=CAPSULE`;
                    setTimeout(() => {
                        this.$refs.upload.post(formData);
                    }, 1000)
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
            cancleUpload() {
            }
        }
    }
</script>
<style lang="less" scoped>
    .title {
        height: 60px;
        line-height: 60px;
        background: #fff;
        font-size: 20px;
        text-indent: 20px;
    }

    .ivu-form .ivu-form-item-label {
        text-align: justify !important
    }

    .iconlabelUrl {
        width: 240px;
        height: 120px;
    }

</style>