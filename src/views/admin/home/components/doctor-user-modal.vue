<template>
    <div class=''>
        <AdminModal v-model="showModal" :title="title" @on-ok="onSave">
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
                        <!--                        cdPicture-->
                        <AdminUpload footTitle="图片尺寸 150*185"></AdminUpload>
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
            }
        },
        watch: {
            showModal(newV) {
                this.$emit("input", newV);
                if (!newV) {
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
            onSave() {
                this.$refs.infoFrom.validate((valid) => {
                    if (valid) {
                        this.infoFrom.regionId = this.regionId;
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
        }
    }
</script>

<style lang='less' scoped>
    @import "../../../../styles/mixin";

    .doctor-user-content {
        .modalContent();
    }
</style>