<template>
    <div class='doctor-list-modal'>
        <AdminModal v-model="showModal" :title="title" @on-ok="onSave">
            <div class="doctor-list-content">
                <Form ref="listFrom" :model="listFrom" :rules="listRuleValidate" :label-width="80">
                    <FormItem label="地区" prop="regionName">
                        <Input v-model="listFrom.regionName" placeholder="请输入地区" :maxlength="32" class="input"/>
                    </FormItem>
                    <FormItem label="排序">
                        <InputNumber v-model="listFrom.order" :max="999" :min="1"/>
                    </FormItem>
                </Form>
            </div>
        </AdminModal>
    </div>
</template>

<script>
    import AdminModal from '../../../../components/web-modal'
    import {PutVoteUpdate, PostVoteUpdate} from "../../../../api/web"

    export default {
        name: "doctor-list-modal",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: "新建"
            },
            len: {
                type: Number,
                default: 1
            }
        },
        components: {AdminModal},
        data() {
            return {
                showModal: this.value,
                listFrom: {
                    regionName: '',
                    order: this.len + 1,
                },
                listRuleValidate: {
                    regionName: [
                        {required: true, message: '名称不能为空', trigger: 'blur'}
                    ],
                    order: [
                        {required: true, message: ' ', trigger: 'blur',}
                    ],
                }
            }
        },
        watch: {
            showModal(newV) {
                this.$emit("input", newV);
                if (!newV) {
                    this.listFrom = {
                        regionName: '',
                        order: this.len + 1
                    }
                }
            },
            value(newV) {
                this.showModal = newV;
            },
            len(newV) {
                this.listFrom.order = newV + 1;
            }
        },
        methods: {
            onSave() {
                this.$refs.listFrom.validate((valid) => {
                    if (valid) {
                        if (this.listFrom.regionId) {
                            PutVoteUpdate(this.listFrom).then(res => {
                                if (res.status) {
                                    this.showModal = false;
                                    this.$emit('upload-doctor-list')
                                } else {
                                    this.$Notice.warning({title: '错误', desc: res.msg})
                                }
                            })
                        } else {
                            PostVoteUpdate(this.listFrom).then(res => {
                                if (res.status) {
                                    this.showModal = false;
                                    this.$emit('upload-doctor-list')
                                } else {
                                    this.$Notice.warning({title: '错误', desc: res.msg})
                                }
                            })
                        }
                    } else {
                        this.$Message.error('请填写正确信息');
                    }
                })

            }
        }
    }
</script>

<style lang='less' scoped>
    @import "../../../../styles/mixin";

    .doctor-list-content {
        .modalContent();

    }
</style>