<template>
    <AdminModal v-model="showModal" :title="title" @on-ok="onSave" width="850">
        <div class="doctor-user-content">
            <Form ref="infoFrom" :model="infoFrom" :rules="infoRules" :label-width="80" accept-charset="utf-8">
                <FormItem label="姓名" prop="cdName">
                    <Input v-model="infoFrom.cdName" placeholder="请输入" :maxlength="10" class="input"/>
                </FormItem>
                <FormItem label="电话">
                    <Input v-model="infoFrom.cdMobile" placeholder="请输入" class="input" type="tel"/>
                </FormItem>
                <FormItem label="邮箱">
                    <Input v-model="infoFrom.cdEmail" placeholder="请输入" class="input" type="email"/>
                </FormItem>
                <FormItem label="图片地址">
                    <AdminUpload :multiple="false" :defaultList="[...srcList]" :widthImg="200" :heightImg="220"
                                 footTitle="图片尺寸 200*220" ref="AdminUpload"></AdminUpload>
                </FormItem>
                <FormItem label="内容">
                    <div ref="websiteEditorElem" id="websiteEditorElem" style="height:300px;background: #ffffff;">
                        <div v-html="infoFrom.cdInfo"></div>
                    </div>
                </FormItem>
            </Form>
        </div>
    </AdminModal>
</template>

<script>
    import AdminModal from '../../../../components/web-modal'
    import AdminUpload from '../../components/admin-upload'
    import {PostCad, PutCad} from '../../../../api/web'
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
                    cdEmail: '',
                    cdInfo: ''
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
                editor: '',
                srcList: []
            }
        },
        watch: {
            showModal(newV) {
                this.$emit("input", newV);
                if (!newV) {
                    // this.editor = null;
                    this.infoFrom = {
                        cdName: '',
                        cdMobile: '',
                        cdEmail: '',
                        file: '',
                        cdInfo: ''
                    }
                    // this.editor.txt.clear()
                    this.$refs.infoFrom.resetFields();
                }
            },
            value(newV) {
                this.showModal = newV;
            },
        },
        methods: {
            Ewangeditor() {
                this.editor = new E(this.$refs.websiteEditorElem);
                // 上传图片到服务器，base64形式
                this.editor.customConfig.uploadImgShowBase64 = true;
                // 隐藏网络图片
                this.editor.customConfig.showLinkImg = true;
                // 创建一个富文本编辑器
                this.editor.create();
                // 富文本内容
                // this.editor.txt.html(`${this.infoFrom.cdInfo}`)
            },

            onSave() {
                this.$refs.infoFrom.validate((valid) => {
                    if (valid) {
                        this.infoFrom.regionId = this.regionId;
                        this.infoFrom.infoInfo = this.editor.txt.html();
                        let _arr = this.$refs.AdminUpload.fileArr;
                        var formData = new FormData();
                        if (_arr.length) {
                            formData.append(`file`, _arr[0]);
                        }
                        formData.append('cdName', this.infoFrom.cdName);
                        formData.append('cdEmail', this.infoFrom.cdEmail);
                        formData.append('cdMobile', this.infoFrom.cdMobile);
                        formData.append('regionId', this.regionId)
                        formData.append('cdInfo', this.editor.txt.html() || '');
                        if (this.infoFrom.cdId) {
                            formData.append('cdId', this.infoFrom.cdId || null);
                            PutCad(formData).then(res => {
                                if (res.status) {
                                    this.showModal = false;
                                    this.$Notice.success({title: '成功', desc: '修改成功'});
                                    this.$emit('upload-doctor-user')
                                } else {
                                    this.$Notice.warning({title: '错误', desc: res.msg})
                                }
                            })
                        } else {
                            PostCad(formData).then(res => {
                                if (res.status) {
                                    this.showModal = false;
                                    this.$Notice.success({title: '成功', desc: '添加成功'});
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
        margin-bottom: 20px;
    }
</style>