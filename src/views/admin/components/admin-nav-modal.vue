<template>
    <AdminModal v-model="showModal" :title="title" @on-ok="onSave">
        <div class="manage-content">
            <Form ref="navFrom" :model="navFrom" :rules="navRuleValidate" :label-width="80">
                <FormItem label="名称" prop="menuName">
                    <Input v-model="navFrom.menuName" placeholder="请输入名称" :maxlength="32" class="input"/>
                </FormItem>
                <FormItem label="类型" prop="menuType">
                    <Select v-model.trim="navFrom.menuType" class="input">
                        <Option v-for="item in typeCodeLst" :key="item.typeId" :value="item.typeId">
                            {{item.typeName}}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="排序" prop="menuNumber">
                    <InputNumber v-model="navFrom.menuNumber" :max="999" :min="1"/>
                </FormItem>
                <FormItem label="是否显示" prop="menuShow">
                    <RadioGroup v-model="navFrom.menuShow">
                        <Radio :label=1>
                            <span>是</span>
                        </Radio>
                        <Radio :label=0>
                            <span>否</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
            </Form>
        </div>
    </AdminModal>
</template>

<script>
    import AdminModal from '../../../components/web-modal'
    import {typeCode} from "../../../js/code";
    import {PutMenuUpdate} from "../../../api/web";

    export default {
        name: "admin-nav-modal",
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
                navFrom: {
                    menuName: '',
                    menuNumber: 0,
                    menuType: '',
                },
                navRuleValidate: {
                    menuName: [
                        {required: true, message: '名称不能为空', trigger: 'blur'}
                    ],
                    menuNumber: [
                        {required: true, message: ' ', trigger: 'blur', type: 'number',},
                    ],
                    menuType: [
                        {required: true, message: ' ', trigger: 'change', type: "number"}
                    ],
                },
                typeCodeLst: typeCode
            }
        },
        watch: {
            showModal(newV) {
                this.$emit("input", newV);
                if (!newV) {
                    this.navFrom = {
                        menuName: '',
                        menuNumber: 0,
                        menuType: 0,
                    }
                }
            },
            value(newV) {
                this.showModal = newV;
            },
        },
        methods: {
            onSave() {
                this.$refs.navFrom.validate((valid) => {
                    if (valid) {
                        PutMenuUpdate(this.navFrom).then(res => {
                            if (res.status) {
                                this.showModal = false;
                                this.$emit('upload-nav-table')
                            } else {

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
    @import "../../../styles/mixin";

    .manage-content {
        .modalContent();

    }
</style>