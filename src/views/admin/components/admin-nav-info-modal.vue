<template>
    <AdminModal v-model="showModal" :title="title" width="1200" @on-ok="onSave">
        <div class="info-content">
            <Form ref="infoFrom" :model="infoFrom" :rules="infoRule" :label-width="200">
                <FormItem label="題目" prop="infoName">
                    <Input v-model="infoFrom.infoName" placeholder="请输入" :maxlength="32" class="input"/>
                </FormItem>
                <FormItem label="封面(只针对图片列表)">
                    <AdminUpload :multiple="false" :defaultList="[]" :widthImg="250" :heightImg="185"
                                 footTitle="图片尺寸 250*185" ref="AdminUpload"></AdminUpload>
                </FormItem>
                <FormItem label="视频链接(只针对视频列表)">
                    <Input v-model="infoFrom.videoUrl" placeholder="请输入" class="input"/>
                </FormItem>
                <FormItem label="内容">
                    <div ref="websiteEditorElem" id="websiteEditorElem" style="height:300px;background: #ffffff">
                    </div>
                </FormItem>
            </Form>
        </div>
    </AdminModal>
</template>

<script>
    import AdminModal from '../../../components/web-modal'
    import AdminUpload from '../components/admin-upload'
    import E from "wangeditor";
    import {PostMenuInfo, PutMenuInfo} from '../../../api/web'

    export default {
        name: "admin-nav-modal",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: "修改"
            },
            id: {
                type: Number,
                default: 1
            },
            menuId: {
                type: String,
                default: ''
            },
            info: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        components: {AdminModal, AdminUpload},
        data() {
            return {
                showModal: this.value,
                infoFrom: {
                    infoName: '',
                    file: '',
                    infoInfo: '',
                    videoUrl:''
                },
                infoRule: {
                    infoName: [
                        {required: true, message: '名称不能为空', trigger: 'blur'}
                    ],
                },
                phoneEditor: ''
            }
        },
        watch: {
            showModal(newV) {
                this.$emit("input", newV);
                if (!newV) {
                    // this.phoneEditor = null;
                    this.infoFrom = {
                        infoName: '',
                        file: '',
                        infoInfo: '',
                    }
                    this.phoneEditor.txt.clear()
                } else {
                    this.infoFrom = this.info;
                }
            },
            value(newV) {
                this.showModal = newV;
            },
        },
        methods: {
            Ewangeditor() {
                this.phoneEditor = new E(this.$refs.websiteEditorElem);
                // 上传图片到服务器，base64形式
                // this.phoneEditor.customConfig.uploadImgShowBase64 = true;
                // 隐藏网络图片
                this.phoneEditor.customConfig.showLinkImg = true;
                // 创建一个富文本编辑器
                this.phoneEditor.create();
                // 富文本内容
                this.phoneEditor.txt.html(`${this.infoFrom.infoInfo}`)
            },
            onSave() {
                this.$refs.infoFrom.validate((valid) => {
                    if (valid) {
                        let _arr = this.$refs.AdminUpload.fileArr;
                        var formData = new FormData();
                        if (_arr.length) {
                            formData.append(`file`, _arr[0]);
                        }
                        formData.append(`infoName`, this.infoFrom.infoName);
                        formData.append(`infoInfo`, this.phoneEditor.txt.html()||'');
                        formData.append(`menuId`, this.menuId);
                        formData.append(`videoUrl`, this.infoFrom.videoUrl);
                        // this.infoFrom.infoInfo = this.phoneEditor.txt.html();
                        this.infoFrom.menuId = this.menuId;
                        if (this.infoFrom.infoId) {//修改
                            formData.append(`infoId`, this.infoFrom.infoId || null);
                            PutMenuInfo(formData).then(res => {
                                if (res.status) {
                                    this.showModal = false;
                                    this.$emit('upload-nav-table')
                                } else {
                                    this.$Notice.warning({title: '错误', desc: res.msg})
                                }
                            })
                        } else {//新增
                            PostMenuInfo(formData).then(res => {
                                if (res.status) {
                                    this.showModal = false;
                                    this.$emit('upload-nav-table')
                                } else {
                                    this.$Notice.warning({title: '错误', desc: res.msg})
                                }
                            })
                        }
                    } else {
                        this.$Notice.warning({title: '错误', desc: '请填写正确信息'})
                    }
                })
            }
        },
        mounted() {

            this.Ewangeditor();
        }
    }
</script>

<style lang='less' scoped>
    @import "../../../styles/mixin";

    .info-content {
        .modalContent();
        margin-top: 0;
        padding: 20px;
        /*height: 70vh;*/
    }
</style>