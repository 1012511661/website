<template>
    <div class=''>
        <AdminModal v-model="showModal" :title="title" @on-ok="onSave">
            <div class="doctor-user-content">
                <Form ref="infoFrom" :model="infoFrom" :rules="infoRules" :label-width="80">
                    <FormItem label="姓名" prop="cdName">
                        <Input v-model="infoFrom.cdName" placeholder="请输入姓名" :maxlength="10" class="input"/>
                    </FormItem>
                    <FormItem label="图片地址" prop="src">
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
        },
        components: {AdminModal, AdminUpload},
        data() {
            return {
                showModal: this.value,
                infoFrom: {
                    cdName: '',
                    src: '',
                },
                infoRules: {
                    cdName: [
                        {required: true, message: ' ', trigger: 'blur'}
                    ],
                    src: [
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
                        doctor: '',
                        src: '',
                    }
                } else {
                    this.uploadList = this.$refs.upload.fileList;
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
                        this.showModal = false;
                        this.$emit('upload-doctor-user')
                    } else {
                        this.$Message.error('Fail!');
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