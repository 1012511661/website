<template>
    <div class=''>
        <AdminModal v-model="showModal" :title="title" @on-ok="onSave">
            <div class="project-content">
                <Form ref="proFrom" :model="proFrom" :rules="proFromValidate" :label-width="80">
                    <FormItem label="视频地址" prop="src">
                        <Input v-model="proFrom.src" type="textarea" placeholder="视频地址" :maxlength="500"
                               :autosize="{minRows: 2,maxRows: 10}" class="input"/>
                    </FormItem>
                </Form>
            </div>
        </AdminModal>
    </div>
</template>

<script>
    import AdminModal from '../../../../components/web-modal'

    export default {
        name: "home-project-modal",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: "修改"
            },
        },
        components: {AdminModal},
        data() {
            return {
                showModal: this.value,
                proFrom: {
                    src: '',
                },
                proFromValidate: {
                    src: [
                        {required: true, message: ' ', trigger: 'blur'}
                    ],
                }
            }
        },
        watch: {
            showModal(newV) {
                this.$emit("input", newV);
            },
            value(newV) {
                this.showModal = newV;
            },
        },
        methods: {
            onSave() {
                this.$refs.proFrom.validate((valid) => {
                    if (valid) {
                        this.showModal = false;
                        this.$emit('upload-project');
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

    .project-content {
        .modalContent();
    }
</style>