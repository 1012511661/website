<template>
    <div class=''>
        <AdminModal v-model="showModal" :title="title" @on-ok="onSave" width="850">
            <div class="doctor-user-content">
                {{regionId}}--{{infoFrom}}
                <Form ref="infoFrom" :model="infoFrom" :rules="infoRules" :label-width="80">
                    <FormItem label="姓名" prop="cdName">
                        <Input v-model="infoFrom.cdName" placeholder="请输入" :maxlength="10" class="input"/>
                    </FormItem>
                    <FormItem label="电话" prop="cdMobile">
                        <Input v-model="infoFrom.cdMobile" placeholder="请输入" :maxlength="10" class="input" type="tel"/>
                    </FormItem>
                    <FormItem label="邮箱" prop="cdEmail">
                        <Input v-model="infoFrom.cdEmail" placeholder="请输入" :maxlength="10" class="input" type="email"/>
                    </FormItem>
                    <FormItem label="图片地址">
                        <AdminUpload footTitle="图片尺寸 150*185"></AdminUpload>
                    </FormItem>
                    <FormItem label="内容">
                        <div id="websiteEditorElem" style="height:300px;background: #ffffff;"></div>
                    </FormItem>
                </Form>
            </div>
        </AdminModal>
    </div>
</template>

<script>
    import AdminModal from '../../../../components/web-modal'
    import AdminUpload from '../../components/admin-upload'
    import {PostCad, PutCad} from '../../../../api/web'
    import qs from 'qs'
    import E from "wangeditor";

    export default {
        name: "doctor-user-modal",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: "新建"
            },
            regionId: {
                type: Number,
                default: 0
            }
        },
        components: {AdminModal, AdminUpload},
        data() {
            return {
                showModal: this.value,
                infoFrom: {
                    cdName: '',
                    cdMobile: '',
                    cdEmail: ''
                },
                infoRules: {
                    cdName: [
                        {required: true, message: ' ', trigger: 'blur'}
                    ],
                    cdMobile: [
                        {required: true, message: ' ', trigger: 'blur'}
                    ],
                    cdEmail: [
                        {required: true, message: ' ', trigger: 'blur'}
                    ],
                },
                editor: ''
            }
        },
        watch: {
            showModal(newV) {
                this.$emit("input", newV);
                if (!newV) {
                    this.editor = null;
                    this.infoFrom = {
                        cdName: '',
                        cdMobile: '',
                        cdEmail: ''
                    }
                    this.$refs.infoFrom.resetFields();
                }
            },
            value(newV) {
                this.showModal = newV;
            },
        },
        methods: {
            Ewangeditor() {
                this.editor = new E('#websiteEditorElem');
                // 上传图片到服务器，base64形式
                this.editor.customConfig.uploadImgShowBase64 = true;
                // 隐藏网络图片
                this.editor.customConfig.showLinkImg = true;
                // 创建一个富文本编辑器
                this.editor.create();
                // 富文本内容
                this.editor.txt.html()
            },

            onSave() {
                this.$refs.infoFrom.validate((valid) => {
                    if (valid) {
                        this.infoFrom.regionId = this.regionId;
                        this.infoFrom.infoInfo = this.editor.txt.html()
                        window.console.log(this.infoFrom,'this.infoFrom')
                        if (this.infoFrom.cdId) {
                            PutCad(qs.stringify(this.infoFrom)).then(res => {
                                if (res.status) {
                                    this.showModal = false;
                                    this.$emit('upload-doctor-user')
                                } else {
                                    this.$Notice.warning({title: '错误', desc: res.msg})
                                }
                            })
                        } else {
                            PostCad(qs.stringify(this.infoFrom)).then(res => {
                                if (res.status) {
                                    this.showModal = false;
                                    this.$emit('upload-doctor-user')
                                } else {
                                    this.$Notice.warning({title: '错误', desc: res.msg})
                                }
                            })
                        }
                    } else {
                        this.$Notice.warning({title: '错误', desc: '请填写正确信息'})
                    }
                })
            },
        },
        mounted() {
            this.Ewangeditor();
        }
    }
</script>

<style lang='less' scoped>
    @import "../../../../styles/mixin";

    .doctor-user-content {
        .modalContent();
    }
</style>