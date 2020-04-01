<template>
    <AdminModal v-model="showModal" :title="title" @on-ok="onSave">
        <div class="manage-content">
            <Form ref="manageFrom" :model="manageFrom" :rules="manageRuleValidate" :label-width="80">
                <FormItem label="栏目名" prop="menuName">
                    <Input v-model="manageFrom.menuName" placeholder="请输入名称" :maxlength="32" class="input"/>
                </FormItem>
                <FormItem label="排序" prop="menuNumber">
                    <InputNumber v-model="manageFrom.menuNumber" :max="999" :min="1"/>
                </FormItem>
                <FormItem label="封面">
                    <AdminUpload :defaultList="[manageFrom.pictures]" footTitle="图片尺寸 150*185"></AdminUpload>
                </FormItem>
            </Form>
        </div>
    </AdminModal>
</template>

<script>
    import AdminModal from '../../../../components/web-modal'
    import AdminUpload from '../../components/admin-upload'

    export default {
        name: "manage-moadl",
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
            }
        },
        components: {AdminModal, AdminUpload},
        data() {
            return {
                showModal: this.value,
                manageFrom: {
                    menuName: '',
                    menuNumber: this.len + 1,
                },
                manageRuleValidate: {
                    menuName: [
                        {required: true, message: '名称不能为空', trigger: 'blur'}
                    ],
                    menuNumber: [
                        {required: true, message: '', trigger: 'blur', type: 'number',},
                    ],
                },
                uploadList: [ //上传返回的列表
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': 'https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large'
                    }]
            }
        },
        watch: {
            showModal(newV) {
                this.$emit("input", newV);
                if (!newV) {
                    this.listFrom = {
                        menuName: '',
                        menuNumber: this.len + 1
                    }
                }
            },
            value(newV) {
                this.showModal = newV;
            },
        },
        methods: {
            onSave() {
                this.$refs.userFrom.validate((valid) => {
                    if (valid) {
                        this.showModal = false;
                        this.$emit('upload-manage')
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        }
    }
</script>

<style lang='less' scoped>
    @import "../../../../styles/mixin";

    .manage-content {
        .modalContent();

    }
</style>