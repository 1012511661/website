<template>
    <AdminModal v-model="showModal" :title="title" @on-ok="onSave">
        <div class="manage-content">
            <Form ref="manageFrom" :model="manageFrom" :rules="manageRuleValidate" :label-width="80">
                <FormItem label="名称" prop="name">
                    <Input v-model="manageFrom.name" placeholder="请输入名称" :maxlength="32" class="input"/>
                </FormItem>
                <FormItem label="排序" prop="order">
                    <InputNumber v-model="manageFrom.order" :max="999" :min="1"/>
                </FormItem>
            </Form>
        </div>
    </AdminModal>
</template>

<script>
    import AdminModal from '../../../../components/web-modal'

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
        components: {AdminModal},
        data() {
            return {
                showModal: this.value,
                manageFrom: {
                    name: '',
                    order: this.len + 1,
                },
                manageRuleValidate: {
                    name: [
                        {required: true, message: '名称不能为空', trigger: 'blur'}
                    ],
                    order: [
                        {required: true, message: '', trigger: 'blur', type: 'number',},
                    ],
                }
            }
        },
        watch: {
            showModal(newV) {
                this.$emit("input", newV);
                if (!newV) {
                    this.listFrom = {
                        name: '',
                        order: this.len + 1
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