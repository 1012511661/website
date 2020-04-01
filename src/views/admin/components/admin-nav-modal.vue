<template>
    <AdminModal v-model="showModal" :title="title" @on-ok="onSave">
        <div class="manage-content">
            <Form ref="navFrom" :model="navFrom" :rules="navRuleValidate" :label-width="80">
                <FormItem label="名称" prop="menuName">
                    <Input v-model="navFrom.menuName" placeholder="请输入名称" :maxlength="32" class="input"/>
                </FormItem>
                <FormItem label="类型" prop="type">
                    <Select v-model.trim="navFrom.type" class="input">
                        <Option v-for="item in typeList" :key="item.value" :value="item.value">
                            {{item.label}}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="排序" prop="menuNumber">
                    <InputNumber v-model="navFrom.menuNumber" :max="999" :min="1"/>
                </FormItem>
            </Form>
        </div>
    </AdminModal>
</template>

<script>
    import AdminModal from '../../../components/web-modal'
    import {typeCode} from "../../../js/code";

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
            this.typeList = [
                {
                    value: '0',
                    label: '图片列表'
                },
                {
                    value: '1',
                    label: '视频列表'
                },
                {
                    value: '2',
                    label: '文章列表'
                },
                {
                    value: '3',
                    label: '单个文章'
                }
            ]
            return {
                showModal: this.value,
                navFrom: {
                    menuName: '',
                    menuNumber: 0,
                    type: '',
                },
                navRuleValidate: {
                    menuName: [
                        {required: true, message: '名称不能为空', trigger: 'blur'}
                    ],
                    menuNumber: [
                        {required: true, message: ' ', trigger: 'blur', type: 'number',},
                    ],
                    type: [
                        {required: true, message: ' ', trigger: 'blur'}
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
                        type: '',
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
                        this.$emit('upload-nav-table')
                    } else {
                        this.$Message.error('Fail!');
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