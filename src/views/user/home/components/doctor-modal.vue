<template>
    <AdminModal v-model="showModal" :title="title" @on-ok="onSave">
        <div class="doctor-content">
            <Form ref="doctorFrom" :model="doctorFrom" :rules="doctorRule" :label-width="120">
                <FormItem label="投票人姓名" prop="voterName">
                    <Input v-model="doctorFrom.voterName" :maxlength="10" class="input"/>
                </FormItem>
                <FormItem label="投票人电话" prop="voterMobile">
                    <Input v-model="doctorFrom.voterMobile" type="tel"/>
                </FormItem>
            </Form>
        </div>
    </AdminModal>

</template>

<script>
    import AdminModal from '../../../../components/web-modal'
    import {PutVote} from '../../../../api/web'

    export default {
        name: "doctor-modal",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: "投票"
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
                doctorFrom: {
                    voterName: '',
                    voterMobile: ''
                },
                doctorRule: {
                    voterName: [
                        {required: true, message: '姓名不能为空', trigger: 'blur'}
                    ],
                    voterMobile: [
                        {required: true, message: '请填写正确的手机号码', trigger: 'blur'},
                    ],
                },
            }
        },
        watch: {
            showModal(newV) {
                this.$emit("input", newV);
                if (!newV) {
                    this.doctorFrom = {
                        voterName: '',
                        voterMobile: '',
                    }
                }
            },
            value(newV) {
                this.showModal = newV;
            },
        },
        methods: {
            onSave() {
                this.$refs.doctorFrom.validate((valid) => {
                    if (valid) {
                        PutVote({cdId: this.id, ...this.doctorFrom}).then(res => {
                            if (res.status) {
                                this.$Notice.success({title: '成功', desc: '投票成功'})
                                this.showModal = false;
                                this.$emit('upload-nav-table')
                            } else {
                                this.$Notice.warning({title: '错误', desc: res.msg})
                            }
                        })

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

    .doctor-content {
        .modalContent();
    }
</style>