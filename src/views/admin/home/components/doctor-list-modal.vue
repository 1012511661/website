<template>
    <AdminModal v-model="showModal" :title="title" @on-ok="onSave">
        <div class="doctor-list-content">
            <Form ref="infoFrom" :model="infoFrom" :rules="infoRules" :label-width="80">
                <FormItem label="地区" prop="regionName">
                    <Input v-model="infoFrom.regionName" placeholder="请输入地区" :maxlength="32" class="input"/>
                </FormItem>
                <FormItem label="排序">
                    <InputNumber v-model="infoFrom.regionNumber" :max="len" :min="1"/>
                </FormItem>
            </Form>
        </div>
    </AdminModal>
</template>

<script>
    import AdminModal from '../../../../components/web-modal'
    import {PutVoteUpdate, PostVote} from "../../../../api/web"

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
            },
            infoData: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        components: {AdminModal},
        data() {
            return {
                showModal: this.value,
                infoFrom: {
                    regionName: '',
                    regionNumber: this.len + 1,
                },
                infoRules: {
                    regionName: [
                        {required: true, message: '名称不能为空', trigger: 'blur'}
                    ],
                    regionNumber: [
                        {required: true, message: ' ', trigger: 'blur',}
                    ],
                }
            }
        },
        watch: {
            showModal(newV) {
                this.$emit("input", newV);
                if (!newV) {
                    this.infoFrom = {
                        regionName: '',
                        regionNumber: this.len + 1
                    }
                }
            },
            value(newV) {
                this.showModal = newV;
            },
            infoData(newV) {
                if (newV.regionId) {
                    this.infoFrom = {...newV}
                }
            }
        },
        methods: {
            onSave() {
                this.$refs.infoFrom.validate((valid) => {
                    if (valid) {
                        if (this.infoFrom.regionId) {
                            PutVoteUpdate(this.infoFrom).then(res => {
                                if (res.status) {
                                    this.showModal = false;
                                    this.$emit('upload-doctor-list')
                                } else {
                                    this.$Notice.warning({title: '错误', desc: res.msg})
                                }
                            })
                        } else {
                            PostVote(this.infoFrom).then(res => {
                                if (res.status) {
                                    this.showModal = false;
                                    this.$emit('upload-doctor-list')
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
        }
    }
</script>

<style lang='less' scoped>
    @import "../../../../styles/mixin";

    .doctor-list-content {
        .modalContent();

    }
</style>